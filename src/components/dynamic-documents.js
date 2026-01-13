"use client";

import { useState, useEffect } from "react";
import { supabase } from "src/lib/supabase";
import { Typography, Link, Box, Chip, useTheme } from "@mui/material";
import { grey } from "src/theme/palette";
import Iconify from "src/components/iconify";

export default function DynamicDocuments({ pagePath, category }) {
  const theme = useTheme();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, [pagePath, category]);

  const fetchDocuments = async () => {
    try {
      // Check if Supabase client is available
      if (!supabase) {
        console.warn('Supabase client not available, using fallback data');
        setDocuments([]);
        return;
      }

      let query = supabase
        .from('documents')
        .select('*')
        .eq('is_active', true)
        .eq('page_path', pagePath);

      if (category && category.trim() !== '') {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (!error) {
        setDocuments(data || []);
      } else {
        console.error('Supabase query error:', error);
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading documents...</Typography>;
  }

  if (documents.length === 0) {
    return null;
  }

  return (
    <Box>
      {documents.map((doc) => (
        <Box key={doc.id} sx={{ mb: 2 }}>
          <Typography variant="h5">
            <Link
              href={doc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: grey[1000],
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Iconify icon="eva:file-text-fill" />
              {doc.title}
            </Link>
          </Typography>
          {doc.category && (
            <Chip 
              label={doc.category} 
              size="small" 
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
} 