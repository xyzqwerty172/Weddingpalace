/**
 * Page to Category Path Mapping Configuration
 * 
 * This file maps frontend static page paths to their corresponding 
 * Supabase category paths for document fetching.
 * 
 * Frontend Path: The URL path that users visit
 * Category Path: The technical path stored in Supabase categories table
 */

export const PAGE_TO_CATEGORY_MAPPING = {
  // About section
  '/about/structure': '/about/structure', // Бидний тухай -> Бүтэц
  '/about/activity': '/about/activity',   // Бидний тухай -> Чиг үүрэг
  '/about/strategy': '/about/strategy',   // Бидний тухай -> Стратегийн зорилго, зорилт
  '/about/management': '/about/management', // Бидний тухай -> Тэгүүлэх чиглэл
  
  // Services section
  '/service/arrangement': '/service/arrangement', // Үйлчилгээ -> Үйлчилгээний төрөл
  '/service/wedding': '/service/wedding', // Үйлчилгээ -> Гэрлэх ёслолын үйлчилгээ
  '/service/booking': '/service/booking', // Үйлчилгээ -> Гэрлэх ёслолын захиалга өгөхдөө
  '/service/shop': '/service/shop', // Үйлчилгээ -> Худалдаа үйлчилгээ
  '/service/photovideo': '/service/photovideo', // Үйлчилгээ -> Сургалт танилцуулга
  '/service/rent': '/service/rent', // Үйлчилгээ -> Үйлчилгээний төлбөр
  
  // Transparency section
  '/transparency/hr': '/transparency/hr', // Ил тод байдал -> Хүний нөөцийн ил тод байдал
  '/transparency/law': '/transparency/law', // Ил тод байдал -> Хууль, эрх зүй
  '/transparency/company/1': '/transparency/company/1', // Хууль, дүрэм, журам
  '/transparency/company/2': '/transparency/company/2', // Гадаад томилолт
  '/transparency/company/3': '/transparency/company/3', // Гүйцэтгэлийн төлөвлөгөө
  '/transparency/company/4': '/transparency/company/4', // Ирсэн бичгийн шийдвэрлэлт
  '/transparency/report': '/transparency/report', // Ил тод байдал -> Тайлан
  '/transparency/company/report': '/transparency/company/report', // Байгууллагын ил тод байдал -> Тайлан
  
  // Company transparency pages
  '/transparency/company/complaint': '/transparency/company/complaint', // Өргөдөл, гомдлын шийдвэрлэсэн ажлын тайлан
  '/transparency/company/research': '/transparency/company/research', // Судалгаа
  
  // Special cases - direct PDF URLs (legacy, kept for backward compatibility)
  '/assets/documents/pdf/urgudul-gomdol-tailan.pdf': '/transparency/company/complaint', // Өргөдөл гомдол шийвэрлэлтын ажилын
  '/assets/documents/pdf/sudalgaa.pdf': '/transparency/company/research', // Судалгаа
};

/**
 * Get the category path for a given frontend page path
 * @param {string} pagePath - The frontend page path (e.g., '/about/structure')
 * @returns {string|null} - The corresponding category path or null if not found
 */
export function getCategoryPathForPage(pagePath) {
  return PAGE_TO_CATEGORY_MAPPING[pagePath] || null;
}

/**
 * Get the frontend page path for a given category path
 * @param {string} categoryPath - The category path from database
 * @returns {string|null} - The corresponding frontend page path or null if not found
 */
export function getPagePathForCategory(categoryPath) {
  const entries = Object.entries(PAGE_TO_CATEGORY_MAPPING);
  const entry = entries.find(([_, catPath]) => catPath === categoryPath);
  return entry ? entry[0] : null;
}

/**
 * Check if a page path should display documents
 * @param {string} pagePath - The frontend page path
 * @returns {boolean} - True if the page should display documents
 */
export function shouldDisplayDocuments(pagePath) {
  return pagePath in PAGE_TO_CATEGORY_MAPPING;
}

/**
 * Get all page paths that should display documents
 * @returns {string[]} - Array of page paths that display documents
 */
export function getDocumentDisplayPages() {
  return Object.keys(PAGE_TO_CATEGORY_MAPPING);
}

/**
 * Get all category paths that have corresponding frontend pages
 * @returns {string[]} - Array of category paths with frontend pages
 */
export function getCategoryPathsWithPages() {
  return Object.values(PAGE_TO_CATEGORY_MAPPING);
} 