"use client";

import { useState, useEffect } from "react";
import { supabase } from "src/lib/supabase";
import { getCategoryPathForPage, shouldDisplayDocuments } from "src/constants/pageCategoryMapping";

/**
 * Custom hook to fetch documents for a specific page
 * @param {string} pagePath - The frontend page path (e.g., '/about/structure')
 * @returns {Object} - { documents, loading, error, refetch }
 */
export function useDocuments(pagePath) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if this page should display documents
      if (!shouldDisplayDocuments(pagePath)) {
        setDocuments([]);
        return;
      }

      // Get the corresponding category path
      const categoryPath = getCategoryPathForPage(pagePath);
      if (!categoryPath) {
        console.warn(`No category path found for page: ${pagePath}`);
        setDocuments([]);
        return;
      }

      // Check if Supabase client is available
      if (!supabase) {
        console.warn('Supabase client not available, using fallback data');
        setDocuments([]);
        return;
      }

      // Fetch documents from Supabase
      const { data, error: fetchError } = await supabase
        .from('documents')
        .select('*')
        .eq('is_active', true)
        .eq('page_path', categoryPath)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setDocuments(data || []);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(err.message);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pagePath) {
      fetchDocuments();
    }
  }, [pagePath]);

  const refetch = () => {
    fetchDocuments();
  };

  return {
    documents,
    loading,
    error,
    refetch,
    hasDocuments: documents.length > 0,
    categoryPath: getCategoryPathForPage(pagePath),
  };
}

/**
 * Custom hook to fetch documents by category path directly
 * @param {string} categoryPath - The category path from database
 * @returns {Object} - { documents, loading, error, refetch }
 */
export function useDocumentsByCategory(categoryPath) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!categoryPath) {
        setDocuments([]);
        return;
      }

      // Check if Supabase client is available
      if (!supabase) {
        console.warn('Supabase client not available, using fallback data');
        setDocuments([]);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('documents')
        .select('*')
        .eq('is_active', true)
        .eq('page_path', categoryPath)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setDocuments(data || []);
    } catch (err) {
      console.error('Error fetching documents by category:', err);
      setError(err.message);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryPath) {
      fetchDocuments();
    }
  }, [categoryPath]);

  const refetch = () => {
    fetchDocuments();
  };

  return {
    documents,
    loading,
    error,
    refetch,
    hasDocuments: documents.length > 0,
  };
} 