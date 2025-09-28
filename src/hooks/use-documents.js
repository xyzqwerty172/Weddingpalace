import { useState, useEffect } from 'react';
import { supabase } from 'src/lib/supabase';

export function useDocuments(pagePath = null) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);

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
          .order('created_at', { ascending: false });

        // If pagePath is provided, filter by it
        if (pagePath) {
          query = query.eq('page_path', pagePath);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setDocuments(data || []);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError(err.message);
        // Set empty array as fallback
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [pagePath]);

  return { documents, loading, error };
} 