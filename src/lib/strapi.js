// Simple Strapi client helpers
import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

export function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

export async function strapiGet(path, query = {}) {
  // Temporarily disable Strapi - return empty data structure
  const isDisabled = process.env.NEXT_PUBLIC_DISABLE_STRAPI === 'true' || true; // Force disable for now
  
  if (isDisabled) {
    console.warn('[Strapi] Disabled - returning empty data for path:', path);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        }
      }
    };
  }

  // Original Strapi logic (will be used when re-enabled)
  try {
    // Serialize with qs to ensure Strapi v5-compatible query strings
    const queryString = query && Object.keys(query).length
      ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
      : "";
    const debug = process.env.NEXT_PUBLIC_DEBUG_STRAPI === 'true';
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('[Strapi][GET]', getStrapiURL(path + queryString));
    }
    const res = await fetch(getStrapiURL(path + queryString), {
      headers: STRAPI_TOKEN
        ? {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
          }
        : undefined,
      // Next.js caching can be tuned later; default no-store to reflect admin changes immediately
      cache: "no-store",
    });
    if (!res.ok) {
      if (debug) {
        // eslint-disable-next-line no-console
        console.error('[Strapi][ERROR]', res.status, res.statusText);
      }
      throw new Error(`Strapi request failed: ${res.status}`);
    }
    const json = await res.json();
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('[Strapi][RESPONSE]', json);
    }
    return json;
  } catch (error) {
    console.error('[Strapi] Connection failed, returning empty data:', error.message);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        }
      }
    };
  }
}

export function getMediaUrl(media) {
  if (!media) return "";
  const url = media.url || media.data?.attributes?.url || media.data?.url;
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// Normalize Strapi v5/v4 entry for News content-type
export function normalizeNewsEntry(entry) {
  if (!entry) return null;
  const blocksToText = (blocks) => {
    try {
      if (!blocks) return "";
      if (typeof blocks === 'string') return blocks;
      if (!Array.isArray(blocks)) return "";
      const parts = [];
      const walk = (node) => {
        if (!node) return;
        if (typeof node === 'string') {
          parts.push(node);
          return;
        }
        if (Array.isArray(node)) {
          node.forEach(walk);
          return;
        }
        if (node.text) parts.push(node.text);
        if (node.children) walk(node.children);
        if (node.content) walk(node.content);
      };
      blocks.forEach((b) => {
        if (b.children) walk(b.children);
        if (b.text) parts.push(b.text);
        if (b.content) walk(b.content);
      });
      return parts.join(' ').replace(/\s+/g, ' ').trim();
    } catch {
      return "";
    }
  };
  const createExcerpt = (content, limit = 160) => {
    if (!content) return "";
    const raw = Array.isArray(content)
      ? blocksToText(content)
      : String(content).replace(/<[^>]+>/g, " ");
    const text = raw.replace(/\s+/g, " ").trim();
    if (text.length <= limit) return text;
    return `${text.slice(0, limit)}…`;
  };
  // Prefer v5 flat shape
  const v5 = {
    id: entry.id,
    Title: entry.Title,
    Slug: entry.Slug,
    Date: entry.Date || entry.createdAt,
    Content: entry.Content,
    Image: entry.Image,
    PDFs: entry.PDFs,
    Featured: entry.Featured,
    Summary: entry.Summary,
  };
  const hasV5 = v5.Title !== undefined || v5.Image !== undefined || v5.PDFs !== undefined;
  if (hasV5) {
    const imageUrl = getMediaUrl(
      (v5.Image && (v5.Image.url ? v5.Image : v5.Image.data?.attributes || v5.Image.data)) || {}
    );
    const pdfsArr = Array.isArray(v5.PDFs)
      ? v5.PDFs
      : Array.isArray(v5.PDFs?.data)
        ? v5.PDFs.data.map((d) => d.attributes || d)
        : [];
    const summary = typeof v5.Summary === 'string' ? v5.Summary : '';
    const excerpt = createExcerpt(v5.Content);
    return {
      id: v5.id,
      title: v5.Title || "",
      slug: v5.Slug || "",
      date: v5.Date || "",
      content: v5.Content || "",
      summary: summary || "",
      excerpt,
      featured: Boolean(v5.Featured),
      imageUrl,
      pdfs: pdfsArr.map((f) => ({
        url: getMediaUrl(f),
        name: f.name || f.alternativeText || "Attachment",
        id: f.id,
      })),
    };
  }
  // Fallback to v4 style with attributes
  const attrs = entry.attributes || {};
  const imageAttr = attrs.Image?.data?.attributes || attrs.Image?.attributes || attrs.Image || {};
  const pdfData = attrs.PDFs?.data || [];
  const summary = typeof attrs.Summary === 'string' ? attrs.Summary : '';
  const excerpt = createExcerpt(attrs.Content);
  return {
    id: entry.id,
    title: attrs.Title || "",
    slug: attrs.Slug || "",
    date: attrs.Date || attrs.createdAt || "",
    content: attrs.Content || "",
    summary: summary || "",
    excerpt,
    featured: Boolean(attrs.Featured),
    imageUrl: getMediaUrl({ url: imageAttr.url }),
    pdfs: Array.isArray(pdfData)
      ? pdfData.map((f) => {
          const fa = f.attributes || {};
          return { url: getMediaUrl({ url: fa.url }), name: fa.name || "Attachment", id: f.id };
        })
      : [],
  };
}


