"use client";

import { useDocuments } from "src/hooks/useDocuments";
import { Box, Typography } from "@mui/material";

/**
 * Component to display documents for a specific page as a simple list of links
 * @param {Object} props
 * @param {string} props.pagePath - The frontend page path (e.g., '/about/structure')
 * @param {string} props.title - Optional title for the documents section
 * @param {boolean} props.showTitle - Whether to show the title (default: true)
 * @param {string} props.emptyMessage - Message to show when no documents
 */
export default function PageDocumentsViewer({ 
  pagePath, 
  title = "Холбоотой баримтууд", 
  showTitle = true,
  emptyMessage = "Энэ хуудсанд баримт байхгүй байна."
}) {
  const { documents, loading, error, hasDocuments } = useDocuments(pagePath);

  if (loading) {
    return null; // Or a spinner if you want
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mb: 2 }}>
        Баримтуудыг ачаалж байх үед алдаа гарлаа: {error}
      </Typography>
    );
  }

  if (!hasDocuments) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {showTitle && (
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
        {documents.map((doc) => (
          <li key={doc.id} style={{ marginBottom: 12 }}>
            <a
              href={doc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00AF9A', // Match website teal theme color
                fontWeight: 700,
                textDecoration: 'underline',
                fontSize: '1.15rem',
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              {doc.title}
            </a>
          </li>
        ))}
      </Box>
    </Box>
  );
} 