"use client";

import { useState, useEffect, useMemo, useCallback, useRef, memo } from "react";
import { useRouter } from "src/routes/hooks";
import MainLayout from "src/layouts/main";
import { supabase } from "src/lib/supabase";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import Iconify from "src/components/iconify";
import { PAGE_PATH_DISPLAY_NAMES, CATEGORY_DISPLAY_NAMES } from 'src/constants/pagePathDisplayNames';
import { getPagePathForCategory, shouldDisplayDocuments } from 'src/constants/pageCategoryMapping';

function sanitizeFilename(filename) {
  // Remove path if present
  filename = filename.split(/[/\\]/).pop();
  // Convert to lowercase
  filename = filename.toLowerCase();
  // Replace spaces and most special chars with dashes
  filename = filename.replace(/[^a-z0-9._-]+/gi, '-');
  // Remove leading/trailing dashes
  filename = filename.replace(/^-+|-+$/g, '');
  // Collapse multiple dashes
  filename = filename.replace(/-+/g, '-');
  // Ensure only allowed chars remain
  filename = filename.replace(/[^a-z0-9._-]/g, '');
  // Fallback if empty
  if (!filename) filename = 'file.pdf';
  return filename;
}

// Enhanced error handling utility functions
function getErrorMessage(error, context = '') {
  if (!error) return 'Тодорхойгүй алдаа гарлаа.';
  
  const errorMessage = error.message || error.toString();
  
  // Network and connection errors
  if (errorMessage.includes('network') || errorMessage.includes('connection') || errorMessage.includes('fetch')) {
    return 'Сүлжээний холболтод алдаа гарлаа. Интернет холболтоо шалгаад дахин оролдоно уу.';
  }
  
  // Authentication errors
  if (errorMessage.includes('invalid_token') || errorMessage.includes('expired') || errorMessage.includes('unauthorized')) {
    return 'Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү.';
  }
  
  // Permission errors
  if (errorMessage.includes('permission') || errorMessage.includes('access denied') || errorMessage.includes('forbidden')) {
    return `${context} хандах эрх байхгүй байна.`;
  }
  
  // Database errors
  if (error.code === 'PGRST116') {
    return `${context} хүснэгт олдсонгүй. Системийн админтай холбогдоно уу.`;
  }
  
  if (error.code === '42P01') {
    return `${context} хүснэгт байхгүй байна. Системийн админтай холбогдоно уу.`;
  }
  
  // Storage errors
  if (errorMessage.includes('storage') || errorMessage.includes('bucket')) {
    return 'Файл хадгалах сангад алдаа гарлаа. Системийн админтай холбогдоно уу.';
  }
  
  // File size errors
  if (errorMessage.includes('size') || errorMessage.includes('large')) {
    return 'Файлын хэмжээ хэт их байна. Жижиг файл сонгоно уу.';
  }
  
  // Validation errors
  if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
    return 'Оруулсан мэдээлэл буруу байна. Дахин шалгана уу.';
  }
  
  // Default error message with context
  return context ? `${context} алдаа гарлаа: ${errorMessage}` : errorMessage;
}

// Function to show user-friendly error notifications
function showErrorNotification(error, context = '', setFeedback) {
  const message = getErrorMessage(error, context);
  console.error(`Error in ${context}:`, error);
  
  if (setFeedback) {
    setFeedback({ type: 'error', message });
  }
  
  return message;
}

// Function to show success notifications with auto-clear
function showSuccessNotification(message, setFeedback, autoClearMs = 3000) {
  if (setFeedback) {
    setFeedback({ type: 'success', message });
    
    if (autoClearMs > 0) {
      setTimeout(() => {
        setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
      }, autoClearMs);
    }
  }
}

// Memoized Category Dropdown Components for Performance Optimization
const MainCategoryDropdown = memo(({ 
  selectedMainCategory, 
  categoriesLoading, 
  categoryError, 
  categories, 
  uploadError, 
  onMainCategoryChange,
  getChildren,
  getCategoryById,
  setFeedback,
  setUploadError 
}) => {
  console.log('MainCategoryDropdown: Rendering with', categories.length, 'categories');
  
  const rootCategories = useMemo(() => {
    return categories.filter(cat => !cat.parent_id).sort((a, b) => {
      const orderA = typeof a.order_num === 'number' ? a.order_num : 0;
      const orderB = typeof b.order_num === 'number' ? b.order_num : 0;
      return orderA - orderB;
    });
  }, [categories]);

  return (
    <FormControl fullWidth margin="normal" error={!!uploadError && uploadError.includes('ангилал')}>
      <InputLabel id="mainCategory-label">Үндсэн ангилал *</InputLabel>
      <Select
        labelId="mainCategory-label"
        id="mainCategory"
        value={selectedMainCategory}
        label="Үндсэн ангилал *"
        disabled={categoriesLoading || categoryError || categories.length === 0}
        onChange={onMainCategoryChange}
      >
        {categoriesLoading ? (
          <MenuItem disabled>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Ангилал ачаалж байна...
            </Box>
          </MenuItem>
        ) : categoryError ? (
          <MenuItem disabled>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
              <Iconify icon="eva:alert-circle-fill" sx={{ mr: 1 }} />
              Ангилал ачаалахад алдаа гарлаа
            </Box>
          </MenuItem>
        ) : rootCategories.length === 0 ? (
          <MenuItem disabled>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'warning.main' }}>
              <Iconify icon="eva:info-fill" sx={{ mr: 1 }} />
              Ангилал байхгүй байна
            </Box>
          </MenuItem>
        ) : (
          rootCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name_mn || category.name_en || 'Нэргүй ангилал'}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
});

const SubCategoryDropdown = memo(({ 
  selectedMainCategory,
  selectedSubCategory, 
  onSubCategoryChange,
  getChildren,
  getCategoryById 
}) => {
  console.log('SubCategoryDropdown: Rendering for parent', selectedMainCategory);
  
  const subCategories = useMemo(() => {
    if (!selectedMainCategory) return [];
    return getChildren(selectedMainCategory);
  }, [selectedMainCategory, getChildren]);

  if (!selectedMainCategory || subCategories.length === 0) {
    return null;
  }

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="subCategory-label">Дэд ангилал *</InputLabel>
      <Select
        labelId="subCategory-label"
        id="subCategory"
        value={selectedSubCategory}
        label="Дэд ангилал *"
        onChange={onSubCategoryChange}
      >
        {subCategories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name_mn || category.name_en || 'Нэргүй ангилал'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

const SubSubCategoryDropdown = memo(({ 
  selectedSubCategory,
  selectedSubSubCategory, 
  onSubSubCategoryChange,
  getChildren 
}) => {
  console.log('SubSubCategoryDropdown: Rendering for parent', selectedSubCategory);
  
  const subSubCategories = useMemo(() => {
    if (!selectedSubCategory) return [];
    return getChildren(selectedSubCategory);
  }, [selectedSubCategory, getChildren]);

  if (!selectedSubCategory || subSubCategories.length === 0) {
    return null;
  }

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="subSubCategory-label">Дэд дэд ангилал *</InputLabel>
      <Select
        labelId="subSubCategory-label"
        id="subSubCategory"
        value={selectedSubSubCategory}
        label="Дэд дэд ангилал *"
        onChange={onSubSubCategoryChange}
      >
        {subSubCategories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name_mn || category.name_en || 'Нэргүй ангилал'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default function SupabaseAdminDashboardView() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tabValue, setTabValue] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [banners, setBanners] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    pagePath: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [sortOrder, setSortOrder] = useState('newest');
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const [categoryRetryCount, setCategoryRetryCount] = useState(0);
  const [showUploadConfirmation, setShowUploadConfirmation] = useState(false);

  // Performance optimization: Category caching and memoization
  const categoryCache = useRef({
    data: null,
    tree: null,
    timestamp: null,
    isValid: false
  });
  
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration
  
  // Memoized category tree to prevent unnecessary rebuilds
  const memoizedCategoryTree = useMemo(() => {
    if (!categories || categories.length === 0) {
      return [];
    }
    
    // Check if we can use cached tree
    const now = Date.now();
    if (categoryCache.current.isValid && 
        categoryCache.current.tree && 
        categoryCache.current.timestamp &&
        (now - categoryCache.current.timestamp) < CACHE_DURATION &&
        categoryCache.current.data === categories) {
      console.log('Using cached category tree');
      return categoryCache.current.tree;
    }
    
    console.log('Building new category tree');
    const tree = buildCategoryTree(categories);
    
    // Update cache
    categoryCache.current = {
      data: categories,
      tree: tree,
      timestamp: now,
      isValid: true
    };
    
    return tree;
  }, [categories]);

  // Memoized category lookup map for O(1) access
  const categoryLookupMap = useMemo(() => {
    if (!categories || categories.length === 0) {
      return new Map();
    }
    
    const map = new Map();
    categories.forEach(category => {
      if (category && category.id) {
        map.set(category.id, category);
      }
    });
    
    console.log(`Created category lookup map with ${map.size} entries`);
    return map;
  }, [categories]);

  // Memoized children lookup map for efficient parent-child queries
  const childrenLookupMap = useMemo(() => {
    if (!categories || categories.length === 0) {
      return new Map();
    }
    
    const map = new Map();
    
    // Initialize all categories in the map
    categories.forEach(category => {
      if (category && category.id) {
        map.set(category.id, []);
      }
    });
    
    // Add root categories
    map.set(null, []);
    
    // Populate children
    categories.forEach(category => {
      if (category && category.id) {
        const parentId = category.parent_id || null;
        if (!map.has(parentId)) {
          map.set(parentId, []);
        }
        map.get(parentId).push(category);
      }
    });
    
    // Sort children by order_num for each parent
    map.forEach((children, parentId) => {
      children.sort((a, b) => {
        const orderA = typeof a.order_num === 'number' ? a.order_num : 0;
        const orderB = typeof b.order_num === 'number' ? b.order_num : 0;
        
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        
        const nameA = a.name_mn || a.name_en || '';
        const nameB = b.name_mn || b.name_en || '';
        return nameA.localeCompare(nameB, 'mn');
      });
    });
    
    console.log(`Created children lookup map with ${map.size} parent entries`);
    return map;
  }, [categories]);

  // Helper functions - defined before event handlers to avoid TDZ issues
  
  // Optimized helper to get category by id using memoized lookup map
  const getCategoryById = useCallback((id) => {
    // Input validation
    if (!id) {
      console.warn('getCategoryById: No ID provided');
      return null;
    }
    
    // Validate ID type
    if (typeof id !== 'string' && typeof id !== 'number') {
      console.warn('getCategoryById: Invalid ID type provided:', typeof id);
      return null;
    }
    
    try {
      // Use memoized lookup map for O(1) access
      const category = categoryLookupMap.get(id);
      
      if (category) {
        console.log(`getCategoryById: Found category ${id}: ${category.name_mn || 'unnamed'}`);
      } else {
        console.warn(`getCategoryById: Category with ID ${id} not found`);
      }
      
      return category || null;
    } catch (error) {
      console.error('getCategoryById: Error getting category', id, error);
      return null;
    }
  }, [categoryLookupMap]);

  // Optimized helper to get children by parent_id using memoized lookup map
  const getChildren = useCallback((parentId) => {
    try {
      // Use memoized children lookup map for O(1) access
      const children = childrenLookupMap.get(parentId) || [];
      
      // Return a copy to prevent mutations
      return [...children];
    } catch (error) {
      console.error('getChildren: Error getting children for parent', parentId, error);
      return [];
    }
  }, [childrenLookupMap]);

  // Memoized event handlers for category dropdowns to prevent unnecessary re-renders
  const handleMainCategoryChange = useCallback((e) => {
    try {
      setSelectedMainCategory(e.target.value);
      setSelectedSubCategory('');
      setSelectedSubSubCategory('');
      setUploadError(''); // Clear errors when selection changes
      
      // Provide immediate feedback about selection
      if (e.target.value) {
        const selectedCat = getCategoryById(e.target.value);
        if (selectedCat) {
          const childCount = getChildren(e.target.value).length;
          if (childCount === 0) {
            setFeedback({ 
              type: 'success', 
              message: `"${selectedCat.name_mn}" ангилал сонгогдлоо. Энэ нь сүүлийн түвшний ангилал тул баримт байршуулах боломжтой.` 
            });
          } else {
            setFeedback({ 
              type: 'info', 
              message: `"${selectedCat.name_mn}" ангилал сонгогдлоо. ${childCount} дэд ангилал байна.` 
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in main category selection:', error);
      setUploadError('Ангилал сонгохад алдаа гарлаа.');
    }
  }, [getCategoryById, getChildren, setFeedback, setUploadError]);

  const handleSubCategoryChange = useCallback((e) => {
    try {
      setSelectedSubCategory(e.target.value);
      setSelectedSubSubCategory('');
      setUploadError('');
      
      if (e.target.value) {
        const selectedCat = getCategoryById(e.target.value);
        if (selectedCat) {
          const childCount = getChildren(e.target.value).length;
          if (childCount === 0) {
            setFeedback({ 
              type: 'success', 
              message: `"${selectedCat.name_mn}" дэд ангилал сонгогдлоо. Энэ нь сүүлийн түвшний ангилал тул баримт байршуулах боломжтой.` 
            });
          } else {
            setFeedback({ 
              type: 'info', 
              message: `"${selectedCat.name_mn}" дэд ангилал сонгогдлоо. ${childCount} дэд дэд ангилал байна.` 
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in sub category selection:', error);
      setUploadError('Дэд ангилал сонгохад алдаа гарлаа.');
    }
  }, [getCategoryById, getChildren, setFeedback, setUploadError]);

  const handleSubSubCategoryChange = useCallback((e) => {
    try {
      setSelectedSubSubCategory(e.target.value);
      setUploadError('');
      
      if (e.target.value) {
        const selectedCat = getCategoryById(e.target.value);
        if (selectedCat) {
          setFeedback({ 
            type: 'success', 
            message: `"${selectedCat.name_mn}" дэд дэд ангилал сонгогдлоо. Баримт байршуулах боломжтой.` 
          });
        }
      }
    } catch (error) {
      console.error('Error in sub-sub category selection:', error);
      setUploadError('Дэд дэд ангилал сонгохад алдаа гарлаа.');
    }
  }, [getCategoryById, setFeedback, setUploadError]);

  // Check authentication and admin status
  useEffect(() => {
    checkUser();
  }, []);

  // Enhanced user authentication and authorization check with comprehensive error handling
  const checkUser = async () => {
    try {
      setFeedback({ type: 'info', message: 'Хэрэглэгчийн эрх шалгаж байна...' });
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('Authentication error:', authError);
        
        let errorMessage = 'Хэрэглэгчийн мэдээлэл татахад алдаа гарлаа.';
        if (authError.message.includes('invalid_token') || authError.message.includes('expired')) {
          errorMessage = 'Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү.';
        } else if (authError.message.includes('network') || authError.message.includes('connection')) {
          errorMessage = 'Сүлжээний холболтод алдаа гарлаа. Интернет холболтоо шалгана уу.';
        }
        
        setFeedback({ type: 'error', message: errorMessage });
        
        // Redirect to login after showing error
        setTimeout(() => {
          router.push('/auth/supabase/login');
        }, 3000);
        return;
      }

      if (!user) {
        setFeedback({ type: 'warning', message: 'Нэвтрээгүй байна. Нэвтрэх хуудас руу шилжүүлж байна...' });
        setTimeout(() => {
          router.push('/auth/supabase/login');
        }, 2000);
        return;
      }

      setUser(user);
      
      // Check if user is admin with enhanced error handling
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        
        let errorMessage = 'Хэрэглэгчийн эрхийн мэдээлэл татахад алдаа гарлаа.';
        if (profileError.code === 'PGRST116') {
          errorMessage = 'Хэрэглэгчийн профайл олдсонгүй. Системийн админтай холбогдоно уу.';
        } else if (profileError.message.includes('permission')) {
          errorMessage = 'Профайлын мэдээлэл харах эрх байхгүй.';
        }
        
        setFeedback({ type: 'error', message: errorMessage });
        
        // Redirect to home after showing error
        setTimeout(() => {
          router.push('/');
        }, 3000);
        return;
      }

      if (!profile) {
        setFeedback({ 
          type: 'warning', 
          message: 'Хэрэглэгчийн профайл олдсонгүй. Системийн админтай холбогдоно уу.' 
        });
        setTimeout(() => {
          router.push('/');
        }, 3000);
        return;
      }

      if (profile.role !== 'admin') {
        setFeedback({ 
          type: 'error', 
          message: 'Админ эрх шаардлагатай. Хандах эрхгүй байна.' 
        });
        setTimeout(() => {
          router.push('/');
        }, 3000);
        return;
      }

      // User is authenticated and has admin role
      setIsAdmin(true);
      setFeedback({ type: 'success', message: 'Админ эрх баталгаажлаа. Мэдээлэл ачаалж байна...' });
      
      // Auto-clear success message
      setTimeout(() => {
        setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
      }, 2000);
      
      await fetchData();
      
    } catch (error) {
      console.error('Unexpected error in checkUser:', error);
      
      let errorMessage = 'Хэрэглэгчийн мэдээлэл шалгахад тодорхойгүй алдаа гарлаа.';
      if (error.message.includes('network') || error.message.includes('connection')) {
        errorMessage = 'Сүлжээний холболтод алдаа гарлаа. Интернет холболтоо шалгаад дахин оролдоно уу.';
      }
      
      setFeedback({ type: 'error', message: errorMessage });
      
      // Redirect to login after error
      setTimeout(() => {
        router.push('/auth/supabase/login');
      }, 3000);
      
    } finally {
      setLoading(false);
    }
  };

  // Enhanced data fetching with comprehensive error handling and loading states
  const fetchData = async () => {
    try {
      setFeedback({ type: 'info', message: 'Мэдээлэл ачаалж байна...' });
      
      // Fetch all data concurrently but handle errors individually
      const results = await Promise.allSettled([
        fetchDocuments(),
        fetchBlogs(),
        fetchBanners(),
        fetchCategories()
      ]);

      // Check results and provide feedback
      const failures = results.filter(result => result.status === 'rejected');
      const successes = results.filter(result => result.status === 'fulfilled');

      if (failures.length === 0) {
        setFeedback({ 
          type: 'success', 
          message: 'Бүх мэдээлэл амжилттай ачаалагдлаа.' 
        });
        
        // Auto-clear success message
        setTimeout(() => {
          setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
        }, 3000);
      } else if (successes.length > 0) {
        setFeedback({ 
          type: 'warning', 
          message: `${successes.length}/${results.length} мэдээлэл ачаалагдлаа. Зарим мэдээлэл ачаалагдсангүй.` 
        });
      } else {
        setFeedback({ 
          type: 'error', 
          message: 'Мэдээлэл ачаалахад алдаа гарлаа. Хуудсыг дахин ачаалана уу.' 
        });
      }

      // Log detailed error information for debugging
      failures.forEach((failure, index) => {
        const dataTypes = ['documents', 'blogs', 'banners', 'categories'];
        console.error(`Failed to fetch ${dataTypes[index]}:`, failure.reason);
      });

    } catch (error) {
      console.error('Unexpected error in fetchData:', error);
      setFeedback({ 
        type: 'error', 
        message: 'Мэдээлэл ачаалахад тодорхойгүй алдаа гарлаа.' 
      });
    }
  };

  // Enhanced document fetching with comprehensive error handling
  const fetchDocuments = async () => {
    try {
      setFeedback({ type: 'info', message: 'Баримтын жагсаалт ачаалж байна...' });
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: sortOrder === 'oldest' });

      if (error) {
        console.error('fetchDocuments: Database error:', error);
        
        let errorMessage = 'Баримтын жагсаалт татахад алдаа гарлаа.';
        if (error.code === 'PGRST116') {
          errorMessage = 'Баримтын хүснэгт олдсонгүй. Системийн админтай холбогдоно уу.';
        } else if (error.message.includes('permission')) {
          errorMessage = 'Баримт харах эрх байхгүй байна.';
        } else if (error.message.includes('network') || error.message.includes('connection')) {
          errorMessage = 'Сүлжээний холболтод алдаа гарлаа. Интернет холболтоо шалгана уу.';
        }
        
        setFeedback({ type: 'error', message: errorMessage });
        setDocuments([]);
        return;
      }

      if (!data) {
        console.warn('fetchDocuments: No document data received');
        setDocuments([]);
        setFeedback({ type: 'warning', message: 'Баримтын мэдээлэл байхгүй байна.' });
        return;
      }

      setDocuments(data);
      
      // Show success feedback briefly
      setFeedback({ 
        type: 'success', 
        message: `${data.length} баримт амжилттай ачаалагдлаа.` 
      });
      
      // Auto-clear success message after 2 seconds
      setTimeout(() => {
        setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
      }, 2000);
      
    } catch (error) {
      console.error('fetchDocuments: Unexpected error:', error);
      setFeedback({ 
        type: 'error', 
        message: 'Баримтын жагсаалт ачаалахад тодорхойгүй алдаа гарлаа.' 
      });
      setDocuments([]);
    }
  };

  // Enhanced blog fetching with error handling
  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('fetchBlogs: Database error:', error);
        let errorMessage = 'Мэдээний жагсаалт татахад алдаа гарлаа.';
        if (error.message.includes('permission')) {
          errorMessage = 'Мэдээ харах эрх байхгүй байна.';
        }
        setFeedback({ type: 'error', message: errorMessage });
        setBlogs([]);
        return;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error('fetchBlogs: Unexpected error:', error);
      setFeedback({ type: 'error', message: 'Мэдээний жагсаалт ачаалахад алдаа гарлаа.' });
      setBlogs([]);
    }
  };

  // Enhanced banner fetching with error handling
  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('fetchBanners: Database error:', error);
        let errorMessage = 'Баннерын жагсаалт татахад алдаа гарлаа.';
        if (error.message.includes('permission')) {
          errorMessage = 'Баннер харах эрх байхгүй байна.';
        }
        setFeedback({ type: 'error', message: errorMessage });
        setBanners([]);
        return;
      }

      setBanners(data || []);
    } catch (error) {
      console.error('fetchBanners: Unexpected error:', error);
      setFeedback({ type: 'error', message: 'Баннерын жагсаалт ачаалахад алдаа гарлаа.' });
      setBanners([]);
    }
  };

  // Enhanced file selection with comprehensive validation and user feedback
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setUploadError(''); // Clear any previous errors
    setFeedback({ type: '', message: '' }); // Clear feedback
    
    if (!file) {
      return;
    }
    
    try {
      // Comprehensive file validation with detailed error messages
      
      // 1. File type validation
      if (file.type !== 'application/pdf') {
        const fileTypeDisplay = file.type || 'тодорхойгүй төрөл';
        const errorMsg = `Зөвхөн PDF файл байршуулах боломжтой. Сонгосон файлын төрөл: ${fileTypeDisplay}`;
        setUploadError(errorMsg);
        setFeedback({ type: 'error', message: errorMsg });
        event.target.value = ''; // Clear the input
        return;
      }
      
      // 2. File size validation (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
        const errorMsg = `Файлын хэмжээ ${maxSizeMB}MB-аас их байж болохгүй. Сонгосон файлын хэмжээ: ${fileSizeMB}MB`;
        setUploadError(errorMsg);
        setFeedback({ type: 'error', message: errorMsg });
        event.target.value = ''; // Clear the input
        return;
      }
      
      // 3. Minimum file size validation (at least 1KB)
      const minSize = 1024; // 1KB
      if (file.size < minSize) {
        const errorMsg = 'Файл хэт жижиг байна. Хүчинтэй PDF файл сонгоно уу.';
        setUploadError(errorMsg);
        setFeedback({ type: 'error', message: errorMsg });
        event.target.value = ''; // Clear the input
        return;
      }
      
      // 4. File name validation
      if (!file.name || file.name.trim() === '') {
        const errorMsg = 'Файлын нэр байхгүй байна.';
        setUploadError(errorMsg);
        setFeedback({ type: 'error', message: errorMsg });
        event.target.value = ''; // Clear the input
        return;
      }
      
      if (file.name.length > 255) {
        const errorMsg = `Файлын нэр хэт урт байна. ${file.name.length} тэмдэгт байна, харин 255-аас бага байх ёстой.`;
        setUploadError(errorMsg);
        setFeedback({ type: 'error', message: errorMsg });
        event.target.value = ''; // Clear the input
        return;
      }
      
      // 5. File name character validation
      const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
      if (invalidChars.test(file.name)) {
        const errorMsg = 'Файлын нэрэнд зөвшөөрөгдөөгүй тэмдэгт байна. Өөр файл сонгоно уу.';
        setUploadError(errorMsg);
        setFeedback({ type: 'error', message: errorMsg });
        event.target.value = ''; // Clear the input
        return;
      }
      
      // 6. Check if file extension is .pdf
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        const errorMsg = 'Файлын өргөтгөл .pdf байх ёстой.';
        setUploadError(errorMsg);
        setFeedback({ type: 'error', message: errorMsg });
        event.target.value = ''; // Clear the input
        return;
      }
      
      // File passed all validations
      setSelectedFile(file);
      
      // Show success feedback with file information
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
      const successMsg = `PDF файл амжилттай сонгогдлоо: ${file.name} (${fileSizeMB}MB)`;
      setFeedback({ type: 'success', message: successMsg });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
      }, 3000);
      
      console.log('File selected successfully:', {
        name: file.name,
        size: fileSizeMB + 'MB',
        type: file.type,
        lastModified: new Date(file.lastModified).toISOString()
      });
      
    } catch (error) {
      console.error('Error in handleFileSelect:', error);
      const errorMsg = 'Файл сонгохад алдаа гарлаа. Дахин оролдоно уу.';
      setUploadError(errorMsg);
      setFeedback({ type: 'error', message: errorMsg });
      event.target.value = ''; // Clear the input
    }
  };

  // Optimized helper to check if a category is a leaf (has no children) using memoized lookup
  const isLeafCategory = useCallback((catId) => {
    // Input validation
    if (!catId) {
      console.warn('isLeafCategory: No category ID provided');
      return false;
    }
    
    try {
      // Check if category exists using memoized lookup map
      const category = categoryLookupMap.get(catId);
      if (!category) {
        console.warn(`isLeafCategory: Category with ID ${catId} not found`);
        return false;
      }
      
      // Get children using memoized children lookup map
      const children = childrenLookupMap.get(catId) || [];
      const isLeaf = children.length === 0;
      
      console.log(`isLeafCategory: Category ${catId} (${category.name_mn || 'unnamed'}) is ${isLeaf ? 'leaf' : 'non-leaf'} with ${children.length} children`);
      
      return isLeaf;
    } catch (error) {
      console.error('isLeafCategory: Error checking leaf status for category', catId, error);
      return false;
    }
  }, [categoryLookupMap, childrenLookupMap]);

  // Pre-upload validation and confirmation
  const validateAndConfirmUpload = () => {
    setUploadError('');
    setFeedback({ type: '', message: '' });
    
    // Enhanced form validation with detailed error messages
    if (!formData.title || formData.title.trim() === '') {
      setUploadError('Гарчиг (title) талбарыг заавал бөглөнө үү.');
      return false;
    }
    
    if (!selectedFile) {
      setUploadError('PDF файл сонгоно уу.');
      return false;
    }
    
    // Validate file type
    if (selectedFile.type !== 'application/pdf') {
      setUploadError('Зөвхөн PDF файл байршуулах боломжтой.');
      return false;
    }
    
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (selectedFile.size > maxSize) {
      setUploadError('Файлын хэмжээ 50MB-аас их байж болохгүй.');
      return false;
    }
    
    const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
    
    // Enhanced category validation with comprehensive error handling
    const validation = validateCategorySelection(selectedId);
    if (!validation.valid) {
      console.error('Upload validation failed:', validation);
      setUploadError(validation.message);
      return false;
    }
    
    const selectedCat = validation.category;
    
    // Additional path validation to ensure category path exists and is valid
    const pathValidation = validateCategoryPath(selectedCat.path);
    if (!pathValidation.valid) {
      console.error('Path validation failed:', pathValidation);
      setUploadError(`Ангилалын зам буруу: ${pathValidation.message}`);
      return false;
    }

    // Show confirmation dialog
    setShowUploadConfirmation(true);
    return true;
  };

  const uploadDocument = async () => {
    setUploading(true);
    setShowUploadConfirmation(false);
    
    try {
      const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
      const validation = validateCategorySelection(selectedId);
      const selectedCat = validation.category;

      // Show confirmation with selected category path before upload
      const categoryPath = getFullCategoryPath(selectedCat.path);
      console.log(`Uploading document to category: ${categoryPath}`);
      
      // Upload file to Supabase Storage
      const safeFileName = `${Date.now()}-${sanitizeFilename(selectedFile.name)}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(safeFileName, selectedFile);

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`Файл хадгалахад алдаа гарлаа: ${uploadError.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(safeFileName);

      // Save document record with enhanced error handling
      const { error: insertError } = await supabase
        .from('documents')
        .insert({
          title: formData.title.trim(),
          filename: safeFileName,
          file_url: publicUrl,
          page_path: selectedCat.path,
          category: selectedCat.path,
          created_by: user.id,
        });

      if (insertError) {
        console.error('Database insert error:', insertError);
        // Clean up uploaded file if database insert fails
        await supabase.storage.from('documents').remove([safeFileName]);
        throw new Error(`Баримт мэдээлэл хадгалахад алдаа гарлаа: ${insertError.message}`);
      }

      // Reset form and refresh data
      setFormData({ title: "", pagePath: "", category: "" });
      setSelectedFile(null);
      setSelectedMainCategory('');
      setSelectedSubCategory('');
      setSelectedSubSubCategory('');
      setOpenDialog(false);
      fetchDocuments();
      setFeedback({ 
        type: 'success', 
        message: `Баримт амжилттай байршлаа. Ангилал: ${categoryPath}` 
      });
      
    } catch (error) {
      console.error('Error uploading document:', error);
      const errorMessage = error.message || 'Баримт байршуулахад алдаа гарлаа.';
      setUploadError(errorMessage);
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setUploading(false);
    }
  };

  // Enhanced document deletion with comprehensive error handling and user feedback
  const deleteDocument = async (id) => {
    if (!id) {
      setFeedback({ type: 'error', message: 'Баримтын ID байхгүй байна.' });
      return;
    }

    // Enhanced confirmation dialog with document information
    try {
      // Get document info for confirmation
      const { data: docInfo } = await supabase
        .from('documents')
        .select('title, filename, created_at')
        .eq('id', id)
        .single();

      const documentTitle = docInfo?.title || 'Тодорхойгүй баримт';
      const confirmMessage = `Энэ баримтыг устгахдаа итгэлтэй байна уу?\n\nБаримт: ${documentTitle}\nФайл: ${docInfo?.filename || 'Тодорхойгүй'}\nБайршуулсан: ${docInfo?.created_at ? format(new Date(docInfo.created_at), 'yyyy-MM-dd HH:mm') : 'Тодорхойгүй'}\n\nЭнэ үйлдлийг буцаах боломжгүй.`;
      
      if (!confirm(confirmMessage)) {
        return;
      }

      // Show deletion progress
      setFeedback({ type: 'info', message: `"${documentTitle}" баримтыг устгаж байна...` });

      // Get the document to find the file path
      const { data: doc, error: fetchError } = await supabase
        .from('documents')
        .select('filename, title')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching document for deletion:', fetchError);
        if (fetchError.code === 'PGRST116') {
          setFeedback({ type: 'error', message: 'Устгах баримт олдсонгүй.' });
        } else {
          setFeedback({ type: 'error', message: 'Баримтын мэдээлэл татахад алдаа гарлаа.' });
        }
        return;
      }

      if (!doc) {
        setFeedback({ type: 'error', message: 'Устгах баримт олдсонгүй.' });
        return;
      }

      let storageDeleteSuccess = true;
      let storageErrorMessage = '';

      // Delete from storage if filename exists
      if (doc.filename) {
        const { error: storageError } = await supabase.storage
          .from('documents')
          .remove([doc.filename]);

        if (storageError) {
          console.error('Error deleting from storage:', storageError);
          storageDeleteSuccess = false;
          
          if (storageError.message.includes('not found')) {
            storageErrorMessage = 'Файл хадгалах сангаас олдсонгүй (аль хэдийн устсан байж болно).';
          } else if (storageError.message.includes('permission')) {
            storageErrorMessage = 'Файл устгах эрх байхгүй.';
          } else {
            storageErrorMessage = `Файл устгахад алдаа: ${storageError.message}`;
          }
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (dbError) {
        console.error('Error deleting from database:', dbError);
        
        let errorMessage = 'Баримт устгахад алдаа гарлаа.';
        if (dbError.code === 'PGRST116') {
          errorMessage = 'Устгах баримт олдсонгүй.';
        } else if (dbError.message.includes('permission')) {
          errorMessage = 'Баримт устгах эрх байхгүй.';
        } else if (dbError.message.includes('foreign key')) {
          errorMessage = 'Энэ баримтыг устгах боломжгүй. Бусад системд ашиглагдаж байна.';
        }
        
        setFeedback({ type: 'error', message: errorMessage });
        return;
      }

      // Refresh document list
      await fetchDocuments();

      // Show success message with warnings if storage deletion failed
      if (storageDeleteSuccess) {
        setFeedback({ 
          type: 'success', 
          message: `"${doc.title || 'Баримт'}" амжилттай устгагдлаа.` 
        });
      } else {
        setFeedback({ 
          type: 'warning', 
          message: `"${doc.title || 'Баримт'}" мэдээллийн сангаас устгагдсан боловч файл устгахад алдаа гарлаа: ${storageErrorMessage}` 
        });
      }

      // Auto-clear success/warning message after 5 seconds
      setTimeout(() => {
        setFeedback(prev => 
          (prev.type === 'success' || prev.type === 'warning') 
            ? { type: '', message: '' } 
            : prev
        );
      }, 5000);

    } catch (error) {
      console.error('Error in deleteDocument:', error);
      
      let errorMessage = 'Баримт устгахад тодорхойгүй алдаа гарлаа.';
      if (error.message.includes('network') || error.message.includes('connection')) {
        errorMessage = 'Сүлжээний холболтод алдаа гарлаа. Интернет холболтоо шалгана уу.';
      }
      
      setFeedback({ type: 'error', message: errorMessage });
    }
  };

  // Enhanced document update function that handles both file replacement and metadata-only updates
  const updateDocument = async (documentId) => {
    setUploadError('');
    setFeedback({ type: '', message: '' });
    
    // Enhanced validation for document updates
    if (!formData.title || formData.title.trim() === '') {
      setUploadError('Гарчиг (title) талбарыг заавал бөглөнө үү.');
      return;
    }
    
    // Validate file if one is selected
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setUploadError('Зөвхөн PDF файл байршуулах боломжтой.');
        return;
      }
      
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (selectedFile.size > maxSize) {
        setUploadError('Файлын хэмжээ 50MB-аас их байж болохгүй.');
        return;
      }
    }
    
    setUploading(true);
    
    try {
      const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
      
      // Enhanced category validation
      const validation = validateCategorySelection(selectedId);
      if (!validation.valid) {
        console.error('Update validation failed:', validation);
        setUploadError(validation.message);
        setUploading(false);
        return;
      }
      
      const selectedCat = validation.category;
      
      // Additional path validation
      const pathValidation = validateCategoryPath(selectedCat.path);
      if (!pathValidation.valid) {
        console.error('Path validation failed:', pathValidation);
        setUploadError(`Ангилалын зам буруу: ${pathValidation.message}`);
        setUploading(false);
        return;
      }

      let updateData = {
        title: formData.title.trim(),
        page_path: selectedCat.path,
        category: selectedCat.path,
        updated_at: new Date().toISOString()
      };

      // Handle file replacement if a new file is selected
      if (selectedFile) {
        console.log('updateDocument: Replacing file for document:', documentId);
        
        // Get the old document to find the file path
        const { data: oldDoc } = await supabase
          .from('documents')
          .select('filename')
          .eq('id', documentId)
          .single();

        // Upload new file
        const safeFileName = `${Date.now()}-${sanitizeFilename(selectedFile.name)}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(safeFileName, selectedFile);

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw new Error(`Файл хадгалахад алдаа гарлаа: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(safeFileName);

        // Add file-related fields to update data
        updateData.filename = safeFileName;
        updateData.file_url = publicUrl;

        // Delete old file from storage after successful upload
        if (oldDoc && oldDoc.filename) {
          await supabase.storage
            .from('documents')
            .remove([oldDoc.filename]);
        }
      } else {
        console.log('updateDocument: Updating metadata only for document:', documentId);
      }

      // Update document record
      const { error: updateError } = await supabase
        .from('documents')
        .update(updateData)
        .eq('id', documentId);

      if (updateError) {
        console.error('Database update error:', updateError);
        
        // Clean up uploaded file if database update fails and we uploaded a new file
        if (selectedFile && updateData.filename) {
          await supabase.storage.from('documents').remove([updateData.filename]);
        }
        
        throw new Error(`Баримт мэдээлэл шинэчлэхэд алдаа гарлаа: ${updateError.message}`);
      }

      // Show confirmation with selected category path
      const categoryPath = getFullCategoryPath(selectedCat.path);
      console.log(`Document updated in category: ${categoryPath}`);

      // Reset form and refresh
      setFormData({ title: "", pagePath: "", category: "" });
      setSelectedFile(null);
      setSelectedMainCategory('');
      setSelectedSubCategory('');
      setSelectedSubSubCategory('');
      setEditingDocument(null);
      setOpenDialog(false);
      fetchDocuments();
      
      const successMessage = selectedFile 
        ? `Баримт амжилттай солигдлоо. Ангилал: ${categoryPath}` 
        : `Баримтын мэдээлэл амжилттай шинэчлэгдлээ. Ангилал: ${categoryPath}`;
      
      setFeedback({ 
        type: 'success', 
        message: successMessage
      });
      
    } catch (error) {
      console.error('Error updating document:', error);
      const errorMessage = error.message || 'Баримт шинэчлэхэд алдаа гарлаа.';
      setUploadError(errorMessage);
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setUploading(false);
    }
  };

  // Legacy function kept for backward compatibility
  const replaceDocument = async (documentId) => {
    console.warn('replaceDocument: This function is deprecated, use updateDocument instead');
    return updateDocument(documentId);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // Enhanced network connectivity check
  const checkNetworkConnectivity = async () => {
    try {
      const response = await fetch('/api/health', { 
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      return response.ok;
    } catch (error) {
      console.warn('Network connectivity check failed:', error);
      return false;
    }
  };

  // Enhanced storage bucket check with better error handling
  const ensureStorageBucket = async () => {
    try {
      setFeedback({ type: 'info', message: 'Файл хадгалах сангийн холболт шалгаж байна...' });
      
      // Try to list files in the bucket to check if it exists
      const { data, error } = await supabase.storage
        .from('documents')
        .list('', { limit: 1 });
      
      if (error) {
        console.error('Storage bucket check error:', error);
        
        if (error.message.includes('not found') || error.message.includes('does not exist')) {
          setFeedback({ 
            type: 'warning', 
            message: 'Файл хадгалах санг олдсонгүй. Системийн админтай холбогдоно уу.' 
          });
        } else if (error.message.includes('permission') || error.message.includes('access')) {
          setFeedback({ 
            type: 'warning', 
            message: 'Файл хадгалах сангад хандах эрх байхгүй. Системийн админтай холбогдоно уу.' 
          });
        } else {
          setFeedback({ 
            type: 'warning', 
            message: 'Файл хадгалах сангийн холболтод алдаа гарлаа.' 
          });
        }
      } else {
        console.log('Storage bucket is accessible');
        setFeedback({ 
          type: 'success', 
          message: 'Файл хадгалах санг амжилттай шалгалаа.' 
        });
        
        // Auto-clear success message
        setTimeout(() => {
          setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking storage bucket:', error);
      
      // Check if it's a network issue
      const isOnline = await checkNetworkConnectivity();
      if (!isOnline) {
        setFeedback({ 
          type: 'error', 
          message: 'Интернет холболт алдагдсан байна. Холболтоо шалгана уу.' 
        });
      } else {
        setFeedback({ 
          type: 'warning', 
          message: 'Файл хадгалах сангийн холболт шалгахад алдаа гарлаа.' 
        });
      }
    }
  };

  // Check storage bucket on component mount
  useEffect(() => {
    if (isAdmin) {
      ensureStorageBucket();
    }
  }, [isAdmin]);

  // Add online/offline event listeners for better UX
  useEffect(() => {
    const handleOnline = () => {
      setFeedback({ 
        type: 'success', 
        message: 'Интернет холболт сэргэлээ. Мэдээлэл шинэчлэж байна...' 
      });
      
      // Refresh data when coming back online
      if (isAdmin) {
        fetchData();
      }
    };

    const handleOffline = () => {
      setFeedback({ 
        type: 'error', 
        message: 'Интернет холболт тасарлаа. Зарим функц ажиллахгүй байж болно.' 
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isAdmin]);

  // Build category tree function - defined before fetchCategories to avoid hoisting issues
  function buildCategoryTree(categories) {
    // Input validation
    if (!Array.isArray(categories)) {
      console.warn('buildCategoryTree: categories is not an array, returning empty tree');
      return [];
    }

    // Filter out invalid categories and log warnings
    const validCategories = categories.filter(cat => {
      if (!cat || typeof cat !== 'object') {
        console.warn('buildCategoryTree: Invalid category object found:', cat);
        return false;
      }
      if (!cat.id) {
        console.warn('buildCategoryTree: Category missing id field:', cat);
        return false;
      }
      return true;
    });

    if (validCategories.length === 0) {
      console.warn('buildCategoryTree: No valid categories found');
      return [];
    }

    // Create category map and detect circular references
    const map = {};
    const visited = new Set();
    const recursionStack = new Set();

    // Initialize map with all categories
    validCategories.forEach(cat => {
      map[cat.id] = { ...cat, children: [] };
    });

    // Function to detect circular references using DFS
    function hasCircularReference(categoryId, path = new Set()) {
      if (path.has(categoryId)) {
        return true; // Circular reference detected
      }
      
      const category = map[categoryId];
      if (!category || !category.parent_id) {
        return false; // No parent or reached root
      }

      path.add(categoryId);
      const result = hasCircularReference(category.parent_id, path);
      path.delete(categoryId);
      return result;
    }

    // Build tree structure with error handling
    const tree = [];
    const orphanedCategories = [];

    validCategories.forEach(cat => {
      // Check for circular references
      if (hasCircularReference(cat.id)) {
        console.warn(`buildCategoryTree: Circular reference detected for category ${cat.id} (${cat.name_mn || 'unnamed'}), skipping`);
        return;
      }

      if (cat.parent_id) {
        // Check if parent exists
        if (map[cat.parent_id]) {
          map[cat.parent_id].children.push(map[cat.id]);
        } else {
          console.warn(`buildCategoryTree: Parent category ${cat.parent_id} not found for category ${cat.id} (${cat.name_mn || 'unnamed'}), treating as root`);
          orphanedCategories.push(map[cat.id]);
        }
      } else {
        tree.push(map[cat.id]);
      }
    });

    // Add orphaned categories to root level
    tree.push(...orphanedCategories);

    // Enhanced recursive sorting function with error handling
    function sortTree(nodes) {
      if (!Array.isArray(nodes)) {
        console.warn('sortTree: nodes is not an array:', nodes);
        return;
      }

      try {
        // Sort by order_num, handling null/undefined values
        nodes.sort((a, b) => {
          const orderA = typeof a.order_num === 'number' ? a.order_num : 0;
          const orderB = typeof b.order_num === 'number' ? b.order_num : 0;
          
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          
          // Secondary sort by name_mn for consistent ordering
          const nameA = a.name_mn || '';
          const nameB = b.name_mn || '';
          return nameA.localeCompare(nameB, 'mn');
        });

        // Recursively sort children
        nodes.forEach(node => {
          if (node && Array.isArray(node.children)) {
            sortTree(node.children);
          }
        });
      } catch (error) {
        console.error('sortTree: Error sorting categories:', error);
      }
    }

    // Sort the tree
    sortTree(tree);

    // Log tree statistics for debugging
    const totalCategories = validCategories.length;
    const rootCategories = tree.length;
    const orphanedCount = orphanedCategories.length;
    
    console.log(`buildCategoryTree: Built tree with ${totalCategories} total categories, ${rootCategories} root categories, ${orphanedCount} orphaned categories`);

    return tree;
  }

  // Enhanced function to fetch categories with comprehensive error handling, retry logic, and caching
  const fetchCategories = useCallback(async (retryAttempt = 0, forceRefresh = false) => {
    setCategoriesLoading(true);
    setCategoryError('');
    
    try {
      // Check cache first (unless force refresh is requested)
      if (!forceRefresh && categoryCache.current.isValid && categoryCache.current.data) {
        const now = Date.now();
        const cacheAge = now - (categoryCache.current.timestamp || 0);
        
        if (cacheAge < CACHE_DURATION) {
          console.log(`Using cached categories (age: ${Math.round(cacheAge / 1000)}s)`);
          setCategories(categoryCache.current.data);
          setCategoryTree(categoryCache.current.tree || []);
          setCategoriesLoading(false);
          
          setFeedback({ 
            type: 'success', 
            message: `${categoryCache.current.data.length} ангилал кэшээс ачаалагдлаа.` 
          });
          
          setTimeout(() => {
            setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
          }, 2000);
          
          return;
        }
      }
      
      // Show loading feedback for user
      if (retryAttempt === 0) {
        setFeedback({ 
          type: 'info', 
          message: 'Ангилалын мэдээлэл ачаалж байна...' 
        });
      }

      const { data, error } = await supabase.from('categories').select('*');
      
      if (error) {
        console.error('fetchCategories: Database error:', error);
        
        // Provide specific error messages based on error type
        let errorMessage = 'Ангилал татахад алдаа гарлаа.';
        if (error.code === 'PGRST116') {
          errorMessage = 'Ангилалын хүснэгт олдсонгүй. Системийн админтай холбогдоно уу.';
        } else if (error.code === '42P01') {
          errorMessage = 'Ангилалын хүснэгт байхгүй байна. Системийн админтай холбогдоно уу.';
        } else if (error.message.includes('permission')) {
          errorMessage = 'Ангилал харах эрх байхгүй байна. Системийн админтай холбогдоно уу.';
        } else if (error.message.includes('network') || error.message.includes('connection')) {
          errorMessage = 'Сүлжээний холболтод алдаа гарлаа. Интернет холболтоо шалгана уу.';
        }
        
        throw new Error(errorMessage);
      }

      if (!data) {
        console.warn('fetchCategories: No category data received');
        setCategories([]);
        setCategoryTree([]);
        setFeedback({ 
          type: 'warning', 
          message: 'Ангилалын мэдээлэл байхгүй байна. Системийн админтай холбогдоно уу.' 
        });
        return;
      }

      if (data.length === 0) {
        console.warn('fetchCategories: Empty category data received');
        setCategories([]);
        setCategoryTree([]);
        setFeedback({ 
          type: 'warning', 
          message: 'Ангилал байхгүй байна. Эхлээд ангилал үүсгэх шаардлагатай.' 
        });
        return;
      }

      // Validate category data structure
      const invalidCategories = data.filter(cat => 
        !cat || 
        typeof cat !== 'object' || 
        !cat.id || 
        (!cat.name_mn && !cat.name_en) || 
        !cat.path
      );

      if (invalidCategories.length > 0) {
        console.warn('fetchCategories: Found invalid categories:', invalidCategories);
        setFeedback({ 
          type: 'warning', 
          message: `${invalidCategories.length} ангилалд мэдээлэл дутуу байна. Зарим ангилал харагдахгүй байж болно.` 
        });
      }

      // Detect circular references before building tree
      const circularRefs = detectCircularReferences(data);
      if (circularRefs.length > 0) {
        console.warn('fetchCategories: Circular references detected:', circularRefs);
        setFeedback({ 
          type: 'warning', 
          message: `Ангилалын бүтцэд алдаа илэрлээ. ${circularRefs.length} ангилалд эргэлтийн холбоос байна. Системийн админтай холбогдоно уу.` 
        });
      }

      // Detect orphaned categories (categories with non-existent parents)
      const categoryIds = new Set(data.map(cat => cat.id));
      const orphanedCategories = data.filter(cat => 
        cat.parent_id && !categoryIds.has(cat.parent_id)
      );

      if (orphanedCategories.length > 0) {
        console.warn('fetchCategories: Found orphaned categories:', orphanedCategories);
        setFeedback({ 
          type: 'info', 
          message: `${orphanedCategories.length} ангилалын эцэг ангилал олдсонгүй. Эдгээр ангилал үндсэн түвшинд харагдана.` 
        });
      }

      // Update state and cache
      setCategories(data);
      const tree = buildCategoryTree(data);
      setCategoryTree(tree);
      setCategoryRetryCount(0); // Reset retry count on success
      
      // Update cache with fresh data
      const now = Date.now();
      categoryCache.current = {
        data: data,
        tree: tree,
        timestamp: now,
        isValid: true
      };
      
      console.log(`Categories cached at ${new Date(now).toISOString()}`);
      
      console.log(`fetchCategories: Successfully loaded ${data.length} categories`);
      
      // Clear loading feedback and show success message
      if (retryAttempt === 0) {
        setFeedback({ 
          type: 'success', 
          message: `${data.length} ангилал амжилттай ачаалагдлаа.` 
        });
        
        // Auto-clear success message after 3 seconds
        setTimeout(() => {
          setFeedback(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
        }, 3000);
      }
      
    } catch (error) {
      console.error('fetchCategories: Unexpected error:', error);
      
      const maxRetries = 3;
      if (retryAttempt < maxRetries) {
        console.log(`fetchCategories: Retrying... (${retryAttempt + 1}/${maxRetries})`);
        setCategoryRetryCount(retryAttempt + 1);
        
        // Show retry feedback to user
        setFeedback({ 
          type: 'info', 
          message: `Ангилал ачаалахад алдаа гарлаа. Дахин оролдож байна... (${retryAttempt + 1}/${maxRetries})` 
        });
        
        // Exponential backoff: wait 1s, 2s, 4s
        const delay = Math.pow(2, retryAttempt) * 1000;
        setTimeout(() => {
          fetchCategories(retryAttempt + 1);
        }, delay);
        
        return;
      }
      
      // All retries failed - provide comprehensive error information
      const errorMessage = error.message || 'Ангилал татахад алдаа гарлаа.';
      setCategoryError(errorMessage);
      setFeedback({ 
        type: 'error', 
        message: `${errorMessage} ${maxRetries} удаа оролдсон боловч амжилтгүй боллоо. Хуудсыг дахин ачаалах эсвэл системийн админтай холбогдоно уу.` 
      });
      setCategories([]);
      setCategoryTree([]);
      setCategoryRetryCount(0);
      
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Cleanup effect for cache and state management
  useEffect(() => {
    return () => {
      // Clear cache on component unmount
      categoryCache.current = {
        data: null,
        tree: null,
        timestamp: null,
        isValid: false
      };
      console.log('Category cache cleared on component unmount');
    };
  }, []);



  function renderCategoryOptions(tree, level = 0) {
    // Debug: log the tree structure and node paths
    if (level === 0) {
      console.log('Category tree for dropdown:', tree);
    }
    // Robust mapping for all possible path variants
    const pathDisplayOverrides = {
      '/about/goal': 'Эрхэм зорилго',
      '/about/goal/': 'Эрхэм зорилго',
      '/about/structure': 'Бүтэц',
      '/about/structure/': 'Бүтэц',
      '/about/activity': 'Чиг үүрэг',
      '/about/activity/': 'Чиг үүрэг',
      '/about/strategy': 'Стратегийн зорилго, зорилт',
      '/about/strategy/': 'Стратегийн зорилго, зорилт',
      '/about/management': 'Тэргүүлэх чиглэл',
      '/about/management/': 'Тэргүүлэх чиглэл',
      '/about': 'Байгууллагын танилцуулга',
      '/about/': 'Байгууллагын танилцуулга',
      '/service/arrangement': 'Үйлчилгээний төрөл',
      '/service/arrangement/': 'Үйлчилгээний төрөл',
      '/service/wedding': 'Гэрлэх ёслолын үйлчилгээ',
      '/service/wedding/': 'Гэрлэх ёслолын үйлчилгээ',
      '/service/booking': 'Гэрлэх ёслолын захиалга өгөхдөө',
      '/service/booking/': 'Гэрлэх ёслолын захиалга өгөхдөө',
      '/service/shop': 'Худалдаа үйлчилгээ',
      '/service/shop/': 'Худалдаа үйлчилгээ',
      '/service/photovideo': 'Сургалт танилцуулга',
      '/service/photovideo/': 'Сургалт танилцуулга',
      '/service/rent': 'Үйлчилгээний төлбөр',
      '/service/rent/': 'Үйлчилгээний төлбөр',
      '/transparency/report': 'Тайлан',
      '/transparency/report/': 'Тайлан',
      '/transparency/company/report': 'Тайлан',
      '/transparency/company/report/': 'Тайлан',
      '/transparency/company/1': 'Хууль, дүрэм, журам',
      '/transparency/company/1/': 'Хууль, дүрэм, журам',
      '/transparency/law': 'Хууль, эрх зүй',
      '/transparency/law/': 'Хууль, эрх зүй',
    };
    return tree.flatMap(node => {
      let displayName = node.name_mn;
      const cleanPath = (node.path || '').replace(/\/+$/, '');
      if (pathDisplayOverrides[cleanPath]) displayName = pathDisplayOverrides[cleanPath];
      else if (PAGE_PATH_DISPLAY_NAMES[cleanPath]) displayName = PAGE_PATH_DISPLAY_NAMES[cleanPath];
      return [
        <MenuItem key={node.id} value={node.path}>
          {`${'— '.repeat(level)}${displayName}`}
        </MenuItem>,
        ...renderCategoryOptions(node.children, level + 1)
      ];
    });
  }

  // Helper function to get the full hierarchy path of a category for debugging and display
  function getCategoryHierarchyPath(categoryId) {
    if (!categoryId) {
      return { path: [], names: [], error: 'No category ID provided' };
    }

    if (!Array.isArray(categories)) {
      return { path: [], names: [], error: 'Categories not loaded' };
    }

    try {
      const path = [];
      const names = [];
      let currentId = categoryId;
      const visited = new Set(); // Prevent infinite loops

      while (currentId && !visited.has(currentId)) {
        visited.add(currentId);
        const category = getCategoryById(currentId);
        
        if (!category) {
          console.warn(`getCategoryHierarchyPath: Category ${currentId} not found`);
          break;
        }

        path.unshift(category.id);
        names.unshift(category.name_mn || category.name_en || 'Нэргүй');
        currentId = category.parent_id;
      }

      return { 
        path, 
        names, 
        fullPath: names.join(' -> '),
        depth: path.length
      };
    } catch (error) {
      console.error('getCategoryHierarchyPath: Error building hierarchy path:', error);
      return { path: [], names: [], error: error.message };
    }
  }

  // Cache invalidation function for manual refresh
  const invalidateCache = useCallback(() => {
    categoryCache.current = {
      data: null,
      tree: null,
      timestamp: null,
      isValid: false
    };
    console.log('Category cache manually invalidated');
  }, []);

  // Force refresh categories (bypassing cache)
  const refreshCategories = useCallback(() => {
    invalidateCache();
    fetchCategories(0, true);
  }, [fetchCategories, invalidateCache]);

  // Performance monitoring for category operations
  const performanceMonitor = useRef({
    categoryFetchTime: 0,
    treeBuildTime: 0,
    renderTime: 0,
    lastUpdate: null
  });

  // Memoized performance stats for debugging
  const performanceStats = useMemo(() => {
    const stats = performanceMonitor.current;
    return {
      totalTime: stats.categoryFetchTime + stats.treeBuildTime + stats.renderTime,
      breakdown: {
        fetch: stats.categoryFetchTime,
        build: stats.treeBuildTime,
        render: stats.renderTime
      },
      lastUpdate: stats.lastUpdate,
      cacheHitRate: categoryCache.current.isValid ? 'Cache Hit' : 'Cache Miss'
    };
  }, [categories, memoizedCategoryTree]);

  // Optimized validation function to check category selection with detailed error messages
  const validateCategorySelection = useCallback((selectedId) => {
    console.log('validateCategorySelection: Validating category selection:', selectedId);
    
    // Check if category ID is provided
    if (!selectedId) {
      console.warn('validateCategorySelection: No category selected');
      return { 
        valid: false, 
        message: 'Ангилал сонгоно уу.',
        errorCode: 'NO_SELECTION'
      };
    }

    // Validate ID format
    if (typeof selectedId !== 'string' && typeof selectedId !== 'number') {
      console.warn('validateCategorySelection: Invalid category ID format:', typeof selectedId);
      return { 
        valid: false, 
        message: 'Буруу ангилалын ID форматтай байна.',
        errorCode: 'INVALID_ID_FORMAT'
      };
    }

    // Check if categories are loaded
    if (!Array.isArray(categories) || categories.length === 0) {
      console.warn('validateCategorySelection: Categories not loaded or empty');
      return { 
        valid: false, 
        message: 'Ангилалын мэдээлэл ачаалагдаагүй байна. Хуудсыг дахин ачаалана уу.',
        errorCode: 'CATEGORIES_NOT_LOADED'
      };
    }

    // Get the selected category
    const selectedCategory = getCategoryById(selectedId);
    if (!selectedCategory) {
      console.warn('validateCategorySelection: Category not found:', selectedId);
      return { 
        valid: false, 
        message: 'Сонгосон ангилал олдсонгүй. Өөр ангилал сонгоно уу.',
        errorCode: 'CATEGORY_NOT_FOUND'
      };
    }

    // Validate category has required fields
    if (!selectedCategory.name_mn && !selectedCategory.name_en) {
      console.warn('validateCategorySelection: Category missing name fields:', selectedCategory);
      return { 
        valid: false, 
        message: 'Сонгосон ангилалын нэр байхгүй байна.',
        errorCode: 'CATEGORY_MISSING_NAME'
      };
    }

    if (!selectedCategory.path) {
      console.warn('validateCategorySelection: Category missing path:', selectedCategory);
      return { 
        valid: false, 
        message: 'Сонгосон ангилалын зам (path) байхгүй байна.',
        errorCode: 'CATEGORY_MISSING_PATH'
      };
    }

    // Check if category is active
    if (selectedCategory.is_active === false) {
      console.warn('validateCategorySelection: Category is inactive:', selectedCategory);
      return { 
        valid: false, 
        message: 'Сонгосон ангилал идэвхгүй байна. Өөр ангилал сонгоно уу.',
        errorCode: 'CATEGORY_INACTIVE'
      };
    }

    // Check if category is a leaf (has no children)
    const leafCheck = isLeafCategory(selectedId);
    if (!leafCheck) {
      const children = getChildren(selectedId);
      const childCount = Array.isArray(children) ? children.length : 0;
      console.warn(`validateCategorySelection: Category is not a leaf, has ${childCount} children:`, selectedCategory);
      
      let message = 'Та хамгийн доод түвшний ангиллыг сонгоно уу.';
      if (childCount > 0) {
        message += ` Сонгосон ангилалд ${childCount} дэд ангилал байна.`;
      }
      
      return { 
        valid: false, 
        message,
        errorCode: 'NOT_LEAF_CATEGORY',
        childCount
      };
    }

    // All validations passed
    console.log('validateCategorySelection: Category validation successful:', {
      id: selectedCategory.id,
      name: selectedCategory.name_mn,
      path: selectedCategory.path
    });

    return { 
      valid: true, 
      category: selectedCategory,
      message: `Ангилал амжилттай сонгогдлоо: ${selectedCategory.name_mn || selectedCategory.name_en || 'Нэргүй'}`
    };
  }, [categoryLookupMap, isLeafCategory, getCategoryById, getChildren]);



  // Enhanced function to validate category path and ensure it exists in the system
  function validateCategoryPath(categoryPath) {
    console.log('validateCategoryPath: Validating category path:', categoryPath);
    
    // Check if path is provided
    if (!categoryPath) {
      console.warn('validateCategoryPath: No category path provided');
      return { 
        valid: false, 
        message: 'Ангилалын зам байхгүй байна.',
        errorCode: 'NO_PATH'
      };
    }

    // Validate path format
    if (typeof categoryPath !== 'string') {
      console.warn('validateCategoryPath: Invalid path format:', typeof categoryPath);
      return { 
        valid: false, 
        message: 'Ангилалын замын формат буруу байна.',
        errorCode: 'INVALID_PATH_FORMAT'
      };
    }

    // Check if path starts with '/'
    if (!categoryPath.startsWith('/')) {
      console.warn('validateCategoryPath: Path does not start with /:', categoryPath);
      return { 
        valid: false, 
        message: 'Ангилалын зам "/" тэмдгээр эхлэх ёстой.',
        errorCode: 'INVALID_PATH_START'
      };
    }

    // Check if categories are loaded
    if (!Array.isArray(categories) || categories.length === 0) {
      console.warn('validateCategoryPath: Categories not loaded');
      return { 
        valid: false, 
        message: 'Ангилалын мэдээлэл ачаалагдаагүй байна.',
        errorCode: 'CATEGORIES_NOT_LOADED'
      };
    }

    // Find category by path
    const category = categories.find(cat => {
      if (!cat || typeof cat !== 'object') {
        return false;
      }
      return cat.path === categoryPath;
    });

    if (!category) {
      console.warn('validateCategoryPath: Category not found for path:', categoryPath);
      return { 
        valid: false, 
        message: `Ангилалын зам "${categoryPath}" олдсонгүй.`,
        errorCode: 'PATH_NOT_FOUND'
      };
    }

    // Check if category is active
    if (category.is_active === false) {
      console.warn('validateCategoryPath: Category is inactive:', category);
      return { 
        valid: false, 
        message: 'Сонгосон ангилал идэвхгүй байна.',
        errorCode: 'CATEGORY_INACTIVE'
      };
    }

    // Validate category has required fields
    if (!category.name_mn && !category.name_en) {
      console.warn('validateCategoryPath: Category missing name:', category);
      return { 
        valid: false, 
        message: 'Ангилалын нэр байхгүй байна.',
        errorCode: 'CATEGORY_MISSING_NAME'
      };
    }

    console.log('validateCategoryPath: Path validation successful:', {
      path: categoryPath,
      id: category.id,
      name: category.name_mn
    });

    return { 
      valid: true, 
      category,
      message: `Ангилалын зам амжилттай баталгаажлаа: ${category.name_mn || category.name_en || 'Нэргүй'}`
    };
  }

  // Function to populate category selections from a document's category path
  function populateCategorySelectionsFromPath(categoryPath) {
    console.log('populateCategorySelectionsFromPath: Starting with path:', categoryPath);
    
    // Clear existing selections first
    setSelectedMainCategory('');
    setSelectedSubCategory('');
    setSelectedSubSubCategory('');
    
    if (!categoryPath || !Array.isArray(categories) || categories.length === 0) {
      console.warn('populateCategorySelectionsFromPath: Invalid input or categories not loaded');
      return;
    }

    try {
      // Find the category by path (handle both category and page_path)
      let category = categories.find(cat => cat && cat.path === categoryPath);
      
      // If not found by exact path, try to handle legacy paths
      if (!category) {
        console.warn('populateCategorySelectionsFromPath: Category not found for exact path, trying legacy handling:', categoryPath);
        
        // Try to find by similar paths (with/without trailing slash)
        const cleanPath = categoryPath.replace(/\/+$/, '');
        const pathWithSlash = cleanPath + '/';
        
        category = categories.find(cat => {
          if (!cat || !cat.path) return false;
          const catPath = cat.path.replace(/\/+$/, '');
          return catPath === cleanPath || cat.path === pathWithSlash;
        });
        
        // If still not found, try to find by partial path matching
        if (!category) {
          console.warn('populateCategorySelectionsFromPath: Trying partial path matching for legacy document');
          category = categories.find(cat => {
            if (!cat || !cat.path) return false;
            return cat.path.includes(cleanPath) || cleanPath.includes(cat.path.replace(/\/+$/, ''));
          });
        }
      }

      if (!category) {
        console.warn('populateCategorySelectionsFromPath: Category not found for path:', categoryPath);
        // Set feedback for user about legacy document
        setFeedback({ 
          type: 'warning', 
          message: `Энэ баримтын ангилал (${categoryPath}) одоогийн системд олдсонгүй. Шинэ ангилал сонгоно уу.` 
        });
        return;
      }

      console.log('populateCategorySelectionsFromPath: Found category:', category);

      // Build the hierarchy path to determine selections
      const hierarchy = getCategoryHierarchyPath(category.id);
      if (!hierarchy.path || hierarchy.path.length === 0) {
        console.warn('populateCategorySelectionsFromPath: Could not build hierarchy for category:', category.id);
        // Fallback: if it's a root category, just select it as main
        if (!category.parent_id) {
          setSelectedMainCategory(category.id);
          console.log('populateCategorySelectionsFromPath: Set as root category:', category.id);
        }
        return;
      }

      // Set selections based on hierarchy depth
      if (hierarchy.path.length >= 1) {
        setSelectedMainCategory(hierarchy.path[0]);
        console.log('populateCategorySelectionsFromPath: Set main category:', hierarchy.path[0]);
      }
      if (hierarchy.path.length >= 2) {
        setSelectedSubCategory(hierarchy.path[1]);
        console.log('populateCategorySelectionsFromPath: Set sub category:', hierarchy.path[1]);
      }
      if (hierarchy.path.length >= 3) {
        setSelectedSubSubCategory(hierarchy.path[2]);
        console.log('populateCategorySelectionsFromPath: Set sub-sub category:', hierarchy.path[2]);
      }

      console.log('populateCategorySelectionsFromPath: Successfully populated selections:', {
        main: hierarchy.path[0],
        sub: hierarchy.path[1],
        subSub: hierarchy.path[2],
        fullPath: hierarchy.fullPath
      });

      // Clear any previous feedback about legacy documents
      if (feedback.type === 'warning' && feedback.message.includes('олдсонгүй')) {
        setFeedback({ type: '', message: '' });
      }

    } catch (error) {
      console.error('populateCategorySelectionsFromPath: Error populating selections:', error);
      setFeedback({ 
        type: 'error', 
        message: 'Ангилал сонгохад алдаа гарлаа. Шинэ ангилал сонгоно уу.' 
      });
    }
  }

  // Enhanced function to handle legacy document category paths
  function handleLegacyDocumentPath(document) {
    console.log('handleLegacyDocumentPath: Processing document:', document.id);
    
    // Priority order: category field first, then page_path as fallback
    const pathToUse = document.category || document.page_path;
    
    if (!pathToUse) {
      console.warn('handleLegacyDocumentPath: Document has no category or page_path:', document.id);
      setFeedback({ 
        type: 'warning', 
        message: 'Энэ баримтад ангилалын мэдээлэл байхгүй байна. Шинэ ангилал сонгоно уу.' 
      });
      return;
    }

    // Check if the path exists in current category system
    const pathValidation = validateCategoryPath(pathToUse);
    
    if (pathValidation.valid) {
      // Path is valid, populate normally
      populateCategorySelectionsFromPath(pathToUse);
    } else {
      console.warn('handleLegacyDocumentPath: Legacy path detected:', pathToUse);
      
      // Try to find a similar or related category
      const suggestedCategory = findSimilarCategory(pathToUse);
      
      if (suggestedCategory) {
        setFeedback({ 
          type: 'info', 
          message: `Баримтын хуучин ангилал "${pathToUse}" олдсонгүй. Ижил төстэй ангилал "${suggestedCategory.name_mn}" санал болгож байна.` 
        });
        populateCategorySelectionsFromPath(suggestedCategory.path);
      } else {
        setFeedback({ 
          type: 'warning', 
          message: `Баримтын хуучин ангилал "${pathToUse}" одоогийн системд байхгүй. Шинэ ангилал сонгоно уу.` 
        });
      }
    }
  }

  // Helper function to find similar categories for legacy documents
  function findSimilarCategory(legacyPath) {
    if (!legacyPath || !Array.isArray(categories) || categories.length === 0) {
      return null;
    }

    try {
      const cleanLegacyPath = legacyPath.replace(/\/+$/, '').toLowerCase();
      
      // Try to find categories with similar path segments
      const pathSegments = cleanLegacyPath.split('/').filter(Boolean);
      
      for (const category of categories) {
        if (!category || !category.path) continue;
        
        const categoryPath = category.path.replace(/\/+$/, '').toLowerCase();
        const categorySegments = categoryPath.split('/').filter(Boolean);
        
        // Check if any segments match
        const matchingSegments = pathSegments.filter(segment => 
          categorySegments.some(catSegment => 
            catSegment.includes(segment) || segment.includes(catSegment)
          )
        );
        
        // If more than half of the segments match, consider it similar
        if (matchingSegments.length > 0 && matchingSegments.length >= Math.min(pathSegments.length, categorySegments.length) / 2) {
          console.log('findSimilarCategory: Found similar category:', category.path, 'for legacy path:', legacyPath);
          return category;
        }
      }
      
      // If no similar path found, try to match by common keywords
      const commonMappings = {
        'about': ['about', 'танилцуулга'],
        'service': ['service', 'үйлчилгээ'],
        'transparency': ['transparency', 'ил тод'],
        'law': ['law', 'хууль'],
        'report': ['report', 'тайлан'],
        'structure': ['structure', 'бүтэц'],
        'goal': ['goal', 'зорилго'],
        'activity': ['activity', 'үйл ажиллагаа']
      };
      
      for (const [key, keywords] of Object.entries(commonMappings)) {
        if (keywords.some(keyword => cleanLegacyPath.includes(keyword))) {
          const matchingCategory = categories.find(cat => 
            cat && cat.path && keywords.some(keyword => 
              cat.path.toLowerCase().includes(keyword)
            )
          );
          
          if (matchingCategory) {
            console.log('findSimilarCategory: Found category by keyword matching:', matchingCategory.path);
            return matchingCategory;
          }
        }
      }
      
    } catch (error) {
      console.error('findSimilarCategory: Error finding similar category:', error);
    }
    
    return null;
  }

  // Function to detect and prevent circular references in category hierarchy
  function detectCircularReferences(categories) {
    if (!Array.isArray(categories)) {
      return [];
    }

    const circularRefs = [];
    const visited = new Set();

    function hasCircularPath(categoryId, path = new Set()) {
      if (path.has(categoryId)) {
        return true; // Circular reference found
      }

      const category = categories.find(cat => cat && cat.id === categoryId);
      if (!category || !category.parent_id) {
        return false; // No parent or reached root
      }

      path.add(categoryId);
      const result = hasCircularPath(category.parent_id, path);
      path.delete(categoryId);
      return result;
    }

    categories.forEach(cat => {
      if (cat && cat.id && !visited.has(cat.id)) {
        if (hasCircularPath(cat.id)) {
          circularRefs.push(cat);
        }
        visited.add(cat.id);
      }
    });

    if (circularRefs.length > 0) {
      console.warn('detectCircularReferences: Found circular references in categories:', circularRefs);
    }

    return circularRefs;
  }

  // Enhanced effect to update formData and clear upload errors when category selection changes
  useEffect(() => {
    let selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
    const selectedCat = getCategoryById(selectedId);
    
    if (selectedCat) {
      setFormData(f => ({ 
        ...f, 
        pagePath: selectedCat.path,
        category: selectedCat.path  // Set category to the same path as page_path
      }));
      
      // Clear upload error when a valid category is selected
      const validation = validateCategorySelection(selectedId);
      if (validation.valid && uploadError) {
        setUploadError('');
      }
    } else {
      // Clear form data when no category is selected
      setFormData(f => ({ 
        ...f, 
        pagePath: '',
        category: ''
      }));
    }
  }, [selectedMainCategory, selectedSubCategory, selectedSubSubCategory, uploadError]);

  // Helper function to get validation status for UI feedback
  const getCategoryValidationStatus = () => {
    const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
    if (!selectedId) {
      return { status: 'none', message: 'Ангилал сонгоогүй' };
    }
    
    const validation = validateCategorySelection(selectedId);
    if (validation.valid) {
      return { status: 'valid', message: 'Хүчинтэй ангилал', category: validation.category };
    } else {
      return { status: 'invalid', message: validation.message, errorCode: validation.errorCode };
    }
  };

  // Helper function to get category selection guidance
  const getCategorySelectionGuidance = () => {
    if (!selectedMainCategory) {
      return 'Эхлээд үндсэн ангилал сонгоно уу';
    }
    
    const mainChildren = getChildren(selectedMainCategory);
    if (mainChildren.length === 0) {
      // Main category is a leaf
      return 'Үндсэн ангилал сонгогдлоо';
    }
    
    if (!selectedSubCategory) {
      return `Дэд ангилал сонгоно уу (${mainChildren.length} сонголт байна)`;
    }
    
    const subChildren = getChildren(selectedSubCategory);
    if (subChildren.length === 0) {
      // Sub category is a leaf
      return 'Дэд ангилал сонгогдлоо';
    }
    
    if (!selectedSubSubCategory) {
      return `Дэд дэд ангилал сонгоно уу (${subChildren.length} сонголт байна)`;
    }
    
    return 'Ангилал бүрэн сонгогдлоо';
  };

  // Helper function to get frontend page path for display
  const getFrontendPagePath = (categoryPath) => {
    return getPagePathForCategory(categoryPath) || 'Хуудас байхгүй';
  };

  // Enhanced helper to get full category path as a hierarchical string (e.g., 'Бидний тухай -> Бүтэц зохион байгуулалт')
  function getFullCategoryPath(categoryPath, pagePath = null) {
    // If category is null/empty, automatically use page_path as fallback
    const pathToUse = categoryPath || pagePath;
    
    // Handle null, undefined, or empty paths
    if (!pathToUse || typeof pathToUse !== 'string') {
      return 'Ангилал байхгүй';
    }

    // Validate categories are loaded
    if (!Array.isArray(categories) || categories.length === 0) {
      console.warn('getFullCategoryPath: Categories not loaded, using fallback display');
      return getPathDisplayFallback(pathToUse);
    }

    try {
      // Find the category by path
      const category = categories.find(cat => cat && cat.path === pathToUse);
      
      if (!category) {
        console.warn(`getFullCategoryPath: Category not found for path: ${pathToUse}, using fallback`);
        return getPathDisplayFallback(pathToUse);
      }

      // Build hierarchical path using category names
      const hierarchyPath = buildCategoryHierarchyPath(category.id);
      
      if (hierarchyPath && hierarchyPath.length > 0) {
        return hierarchyPath.join(' -> ');
      }

      // Fallback to category name if hierarchy building fails
      return category.name_mn || category.name_en || getPathDisplayFallback(pathToUse);
      
    } catch (error) {
      console.error('getFullCategoryPath: Error building category path:', error);
      return getPathDisplayFallback(pathToUse);
    }
  }

  // Helper function to build category hierarchy path with proper Mongolian names
  function buildCategoryHierarchyPath(categoryId) {
    if (!categoryId || !Array.isArray(categories)) {
      return [];
    }

    try {
      const pathNames = [];
      let currentId = categoryId;
      const visited = new Set(); // Prevent infinite loops
      const maxDepth = 10; // Safety limit
      let depth = 0;

      while (currentId && !visited.has(currentId) && depth < maxDepth) {
        visited.add(currentId);
        depth++;
        
        const category = categories.find(cat => cat && cat.id === currentId);
        
        if (!category) {
          console.warn(`buildCategoryHierarchyPath: Category ${currentId} not found`);
          break;
        }

        // Use Mongolian name, fallback to English name, then to 'Нэргүй'
        const displayName = category.name_mn || category.name_en || 'Нэргүй';
        pathNames.unshift(displayName);
        
        currentId = category.parent_id;
      }

      return pathNames;
    } catch (error) {
      console.error('buildCategoryHierarchyPath: Error building hierarchy:', error);
      return [];
    }
  }

  // Fallback function for path display when categories are not available
  function getPathDisplayFallback(pathToUse) {
    try {
      // Handle empty or invalid paths
      if (!pathToUse || typeof pathToUse !== 'string') {
        return 'Ангилал байхгүй';
      }

      // Clean the path by removing trailing slashes
      const cleanPath = pathToUse.replace(/\/+$/, '');
      
      // First try exact match in PAGE_PATH_DISPLAY_NAMES
      if (PAGE_PATH_DISPLAY_NAMES[cleanPath]) {
        return PAGE_PATH_DISPLAY_NAMES[cleanPath];
      }

      // Try with trailing slash as well
      if (PAGE_PATH_DISPLAY_NAMES[cleanPath + '/']) {
        return PAGE_PATH_DISPLAY_NAMES[cleanPath + '/'];
      }

      // Build hierarchical path from URL segments using PAGE_PATH_DISPLAY_NAMES
      const pathParts = cleanPath.split('/').filter(Boolean);
      const result = [];
      let currentPath = '';
      
      for (let i = 0; i < pathParts.length; i++) {
        currentPath += '/' + pathParts[i];
        
        // Try both with and without trailing slash
        if (PAGE_PATH_DISPLAY_NAMES[currentPath]) {
          result.push(PAGE_PATH_DISPLAY_NAMES[currentPath]);
        } else if (PAGE_PATH_DISPLAY_NAMES[currentPath + '/']) {
          result.push(PAGE_PATH_DISPLAY_NAMES[currentPath + '/']);
        } else {
          // Clean up path segment for display
          const cleanSegment = pathParts[i]
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => {
              if (word.length === 0) return '';
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .filter(word => word.length > 0)
            .join(' ');
          
          if (cleanSegment) {
            result.push(cleanSegment);
          }
        }
      }
      
      return result.length > 0 ? result.join(' -> ') : 'Ангилал байхгүй';
    } catch (error) {
      console.error('getPathDisplayFallback: Error building fallback path:', error);
      return 'Ангилал байхгүй';
    }
  }

  // Mongolian alphabet for sorting
  const MONGOLIAN_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ'.split('');
  function mongolianSort(a, b) {
    // Compare by first letter in Mongolian alphabet, fallback to localeCompare
    const getIndex = (str) => {
      const upper = (str[0] || '').toUpperCase();
      const idx = MONGOLIAN_ALPHABET.indexOf(upper);
      return idx === -1 ? 100 : idx;
    };
    const idxA = getIndex(a.title);
    const idxB = getIndex(b.title);
    if (idxA !== idxB) return idxA - idxB;
    return (a.title || '').localeCompare(b.title || '', 'mn');
  }

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newOrder);
    // Refetch documents with new sort order
    fetchDocuments();
  };



  // Enhanced loading state with detailed feedback
  if (loading) {
    return (
      <MainLayout>
        <Container sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" color="text.secondary">
              Админ панел ачаалж байна...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Хэрэглэгчийн эрх шалгаж, мэдээлэл ачаалж байна
            </Typography>
            {feedback.message && (
              <Alert severity={feedback.type} sx={{ mt: 2, maxWidth: 400 }}>
                {feedback.message}
              </Alert>
            )}
          </Box>
        </Container>
      </MainLayout>
    );
  }

  // Enhanced unauthorized access handling
  if (!isAdmin) {
    return (
      <MainLayout>
        <Container sx={{ mt: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Хандах эрхгүй
              </Typography>
              <Typography variant="body2">
                Энэ хуудсанд хандахын тулд админ эрх шаардлагатай. 
                Хэрэв та админ бол системийн админтай холбогдоно уу.
              </Typography>
            </Alert>
            
            {feedback.message && (
              <Alert severity={feedback.type} sx={{ mb: 2 }}>
                {feedback.message}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                onClick={() => router.push('/')}
                startIcon={<Iconify icon="eva:home-fill" />}
              >
                Нүүр хуудас
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => router.push('/auth/supabase/login')}
                startIcon={<Iconify icon="eva:log-in-fill" />}
              >
                Дахин нэвтрэх
              </Button>
            </Box>
          </Box>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Enhanced Feedback System with Detailed Information */}
        {feedback.message && (
          <Alert 
            severity={feedback.type} 
            sx={{ mb: 2 }} 
            onClose={() => setFeedback({ type: '', message: '' })}
            action={
              feedback.type === 'error' && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    color="inherit" 
                    size="small" 
                    onClick={() => window.location.reload()}
                    startIcon={<Iconify icon="eva:refresh-fill" />}
                  >
                    Хуудас ачаалах
                  </Button>
                  {!navigator.onLine && (
                    <Button 
                      color="inherit" 
                      size="small" 
                      onClick={() => checkNetworkConnectivity()}
                      startIcon={<Iconify icon="eva:wifi-fill" />}
                    >
                      Холболт шалгах
                    </Button>
                  )}
                </Box>
              )
            }
          >
            <Box>
              <Typography variant="body2">
                {feedback.message}
              </Typography>
              
              {/* Additional system information for errors */}
              {feedback.type === 'error' && (
                <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" color="text.secondary">
                    Системийн мэдээлэл: {new Date().toLocaleString('mn-MN')} | 
                    Холболт: {navigator.onLine ? 'Холбогдсон' : 'Тасарсан'} | 
                    Хэрэглэгч: {user?.email || 'Тодорхойгүй'}
                  </Typography>
                </Box>
              )}
            </Box>
          </Alert>
        )}

        {/* System Status Indicator */}
        {!navigator.onLine && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Iconify icon="eva:wifi-off-fill" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Интернет холболт байхгүй байна. Зарим функц ажиллахгүй байж болно.
              </Typography>
            </Box>
          </Alert>
        )}

        {/* Category System Status */}
        {!categoriesLoading && !categoryError && categories.length === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Ангилалын систем бэлэн биш байна
            </Typography>
            <Typography variant="body2">
              Баримт байршуулахын тулд эхлээд ангилал үүсгэх шаардлагатай. 
              Системийн админтай холбогдоно уу.
            </Typography>
          </Alert>
        )}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Supabase Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Тавтай морилно уу, {user?.email}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleLogout}>
            Гарах
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Баримтууд</Typography>
                <Typography variant="h4">{documents.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Мэдээ</Typography>
                <Typography variant="h4">{blogs.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Баннер</Typography>
                <Typography variant="h4">{banners.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Баримтууд" />
            <Tab label="Мэдээний нийтлэлүүд" />
            <Tab label="Баннерууд" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">PDF баримтууд</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={toggleSortOrder}
                  startIcon={<Iconify icon={sortOrder === 'newest' ? 'eva:arrow-down-fill' : 'eva:arrow-up-fill'} />}
                >
                  {sortOrder === 'newest' ? 'Шинээс хуучин' : 'Хуучинаас шинэ'}
                </Button>

                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => {
                    // Clear all form data and selections for new upload
                    setEditingDocument(null);
                    setFormData({ title: "", pagePath: "", category: "" });
                    setSelectedFile(null);
                    setSelectedMainCategory('');
                    setSelectedSubCategory('');
                    setSelectedSubSubCategory('');
                    setUploadError('');
                    setOpenDialog(true);
                  }}
                >
                  Баримт байршуулах
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Гарчиг</TableCell>
                    <TableCell>Ангилалын зам</TableCell>
                    <TableCell>Хуудасны зам</TableCell>
                    <TableCell>Байршуулсан</TableCell>
                    <TableCell>Үйлдэл</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {doc.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {getFullCategoryPath(doc.category, doc.page_path)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {doc.page_path || 'Хуудас байхгүй'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {format(new Date(doc.created_at), 'yyyy-MM-dd HH:mm')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          href={doc.file_url}
                          target="_blank"
                          size="small"
                          title="PDF харах"
                        >
                          <Iconify icon="eva:eye-fill" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            console.log('Edit button clicked for document:', doc.id, doc.title);
                            
                            // Set editing document and form data
                            setEditingDocument(doc);
                            setFormData({
                              title: doc.title,
                              pagePath: doc.page_path,
                              category: doc.category || "",
                            });
                            
                            // Clear any previous errors and feedback
                            setUploadError('');
                            setFeedback({ type: '', message: '' });
                            
                            // Handle legacy document category population with enhanced logic
                            handleLegacyDocumentPath(doc);
                            
                            setOpenDialog(true);
                          }}
                          size="small"
                          title="PDF солих"
                        >
                          <Iconify icon="eva:edit-fill" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteDocument(doc.id)}
                          size="small"
                          color="error"
                          title="PDF устгах"
                        >
                          <Iconify icon="eva:trash-2-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Мэдээний нийтлэлүүд</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Гарчиг</TableCell>
                    <TableCell>Төлөв</TableCell>
                    <TableCell>Төрөл</TableCell>
                    <TableCell>Байршуулсан</TableCell>
                    <TableCell>Үйлдэл</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={blog.is_published ? 'Хуулсан' : 'Драфт'}
                          color={blog.is_published ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {blog.type === 0 ? 'Мэдээ' : 'Мэдээлэл'}
                      </TableCell>
                      <TableCell>
                        {format(new Date(blog.created_at), 'yyyy-MM-dd HH:mm')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => router.push(`/news/update?id=${blog.id}`)}
                          size="small"
                        >
                          <Iconify icon="eva:edit-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Баннерууд</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>URL</TableCell>
                    <TableCell>Төлөв</TableCell>
                    <TableCell>Байршуулсан</TableCell>
                    <TableCell>Үйлдэл</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {banners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>{banner.url}</TableCell>
                      <TableCell>
                        <Chip
                          label={banner.is_active ? 'Хөвөл' : 'Хуудасгүй'}
                          color={banner.is_active ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {format(new Date(banner.created_at), 'yyyy-MM-dd HH:mm')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          href={banner.url}
                          target="_blank"
                          size="small"
                        >
                          <Iconify icon="eva:eye-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Enhanced Upload/Replace Document Dialog with Comprehensive Error Handling */}
        <Dialog 
          open={openDialog} 
          onClose={() => {
            // Enhanced dialog close with confirmation if user has made changes
            const hasChanges = formData.title || selectedFile || selectedMainCategory || selectedSubCategory || selectedSubSubCategory;
            
            if (hasChanges && !confirm('Өөрчлөлтүүд хадгалагдахгүй. Хаахдаа итгэлтэй байна уу?')) {
              return;
            }
            
            setOpenDialog(false);
            setEditingDocument(null);
            setFormData({ title: "", pagePath: "", category: "" });
            setSelectedFile(null);
            setSelectedMainCategory('');
            setSelectedSubCategory('');
            setSelectedSubSubCategory('');
            setUploadError('');
            setFeedback({ type: '', message: '' });
            setShowUploadConfirmation(false);
          }} 
          maxWidth="sm" 
          fullWidth
          disableEscapeKeyDown={uploading} // Prevent closing during upload
        >
          <DialogTitle>
            {editingDocument ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 1 }} />
                PDF солих: {editingDocument.title}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="eva:cloud-upload-fill" sx={{ mr: 1 }} />
                Баримт байршуулах
              </Box>
            )}
          </DialogTitle>
          <DialogContent>
            {/* Current Document Information for Editing */}
            {editingDocument && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'info.lighter', borderRadius: 1, border: '1px solid', borderColor: 'info.light' }}>
                <Typography variant="subtitle2" color="info.main" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Iconify icon="eva:info-fill" sx={{ mr: 1 }} />
                  Одоогийн баримтын мэдээлэл:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Файл:</strong> {editingDocument.filename}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Одоогийн ангилал:</strong> {getFullCategoryPath(editingDocument.category, editingDocument.page_path)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Хуудасны зам:</strong> {editingDocument.page_path || 'Байхгүй'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Байршуулсан:</strong> {format(new Date(editingDocument.created_at), 'yyyy-MM-dd HH:mm')}
                </Typography>
                
                {/* Legacy document warning */}
                {editingDocument.category !== editingDocument.page_path && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      Энэ баримт хуучин системээс байна. Ангилалын мэдээлэл шинэчлэгдэх болно.
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}

            <TextField
              fullWidth
              label="Гарчиг"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
              helperText={editingDocument ? "Гарчгийг өөрчлөх бол шинэ гарчиг оруулна уу" : "Баримтын гарчгийг оруулна уу"}
            />
            {/* Enhanced Category Selection with Comprehensive Error Handling */}
            {categoryError && (
              <Alert 
                severity="error" 
                sx={{ mb: 2 }}
                action={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      color="inherit" 
                      size="small" 
                      onClick={() => fetchCategories()}
                      disabled={categoriesLoading}
                      startIcon={categoriesLoading ? <CircularProgress size={16} /> : <Iconify icon="eva:refresh-fill" />}
                    >
                      {categoriesLoading ? 'Ачаалж байна...' : 'Дахин оролдох'}
                    </Button>
                    <Button 
                      color="inherit" 
                      size="small" 
                      onClick={() => window.location.reload()}
                    >
                      Хуудас ачаалах
                    </Button>
                  </Box>
                }
              >
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Ангилал ачаалахад алдаа гарлаа
                </Typography>
                <Typography variant="body2">
                  {categoryError}
                </Typography>
                {categoryRetryCount > 0 && (
                  <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                    Оролдлого: {categoryRetryCount}/3
                  </Typography>
                )}
              </Alert>
            )}

            {/* Category Loading State */}
            {categoriesLoading && !categoryError && (
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'info.lighter', borderRadius: 1, mb: 2 }}>
                <CircularProgress size={20} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="info.main">
                    Ангилалын мэдээлэл ачаалж байна...
                  </Typography>
                  {categoryRetryCount > 0 && (
                    <Typography variant="caption" color="text.secondary">
                      Дахин оролдож байна ({categoryRetryCount}/3)
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {/* Category System Status */}
            {!categoriesLoading && !categoryError && categories.length === 0 && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Ангилал байхгүй байна
                </Typography>
                <Typography variant="body2">
                  Баримт байршуулахын тулд эхлээд ангилал үүсгэх шаардлагатай. 
                  Системийн админтай холбогдоно уу.
                </Typography>
              </Alert>
            )}
            
            {/* Enhanced Category Selection Instructions and Validation Summary */}
            {!categoriesLoading && !categoryError && categories.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Баримт байршуулахын тулд хамгийн доод түвшний ангиллыг сонгоно уу.
                </Typography>
                
                {/* Real-time validation feedback */}
                {(() => {
                  const validationStatus = getCategoryValidationStatus();
                  
                  if (validationStatus.status === 'none') {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Iconify icon="eva:info-fill" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Эхлээд ангилал сонгоно уу
                        </Typography>
                      </Box>
                    );
                  } else if (validationStatus.status === 'valid') {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'success.lighter', borderRadius: 1 }}>
                        <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main', mr: 1 }} />
                        <Typography variant="body2" color="success.main">
                          ✓ Хүчинтэй ангилал сонгогдлоо
                        </Typography>
                      </Box>
                    );
                  } else {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'warning.lighter', borderRadius: 1 }}>
                        <Iconify icon="eva:alert-triangle-fill" sx={{ color: 'warning.main', mr: 1 }} />
                        <Typography variant="body2" color="warning.main">
                          {validationStatus.message}
                        </Typography>
                      </Box>
                    );
                  }
                })()}
              </Box>
            )}

            {/* Optimized Main Category Dropdown with Memoization */}
            <MainCategoryDropdown
              selectedMainCategory={selectedMainCategory}
              categoriesLoading={categoriesLoading}
              categoryError={categoryError}
              categories={categories}
              uploadError={uploadError}
              onMainCategoryChange={handleMainCategoryChange}
              getChildren={getChildren}
              getCategoryById={getCategoryById}
              setFeedback={setFeedback}
              setUploadError={setUploadError}
            />
            
            {/* Enhanced guidance and error display */}
            {selectedMainCategory && !uploadError && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                <Iconify icon="eva:info-fill" sx={{ fontSize: 14, mr: 0.5 }} />
                {getCategorySelectionGuidance()}
              </Typography>
            )}
            
            {uploadError && uploadError.includes('ангилал') && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                <Iconify icon="eva:alert-triangle-fill" sx={{ fontSize: 14, mr: 0.5 }} />
                {uploadError}
              </Typography>
            )}

            {/* Optimized Subcategory Dropdown with Memoization */}
            <SubCategoryDropdown
              selectedMainCategory={selectedMainCategory}
              selectedSubCategory={selectedSubCategory}
              onSubCategoryChange={handleSubCategoryChange}
              getChildren={getChildren}
              getCategoryById={getCategoryById}
            />
            {selectedSubCategory && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                {getCategorySelectionGuidance()}
              </Typography>
            )}

            {/* Optimized Sub-subcategory Dropdown with Memoization */}
            <SubSubCategoryDropdown
              selectedSubCategory={selectedSubCategory}
              selectedSubSubCategory={selectedSubSubCategory}
              onSubSubCategoryChange={handleSubSubCategoryChange}
              getChildren={getChildren}
            />
            {selectedSubSubCategory && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                {getCategorySelectionGuidance()}
              </Typography>
            )}

            {/* Sub-subcategory Dropdown - Shows when subcategory is selected and has children */}
            {selectedSubCategory && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="subSubCategory-label">Дэд дэд ангилал</InputLabel>
                <Select
                  labelId="subSubCategory-label"
                  id="subSubCategory"
                  value={selectedSubSubCategory}
                  label="Дэд дэд ангилал"
                  disabled={categoriesLoading || categoryError}
                  onChange={(e) => setSelectedSubSubCategory(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Дэд дэд ангилал сонгоно уу</em>
                  </MenuItem>
                  {(() => {
                    const children = getChildren(selectedSubCategory);
                    if (children.length === 0) {
                      return (
                        <MenuItem disabled>
                          <em>Дэд дэд ангилал байхгүй</em>
                        </MenuItem>
                      );
                    }
                    return children.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name_mn || cat.name_en || 'Нэргүй ангилал'}
                      </MenuItem>
                    ));
                  })()}
                </Select>
              </FormControl>
            )}

            {/* Category Selection Feedback */}
            {(selectedMainCategory || selectedSubCategory || selectedSubSubCategory) && (
              <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Сонгосон ангилал: {(() => {
                    const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                    const hierarchy = getCategoryHierarchyPath(selectedId);
                    return hierarchy.fullPath || 'Тодорхойгүй';
                  })()}
                </Typography>
                {(() => {
                  const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                  const validation = validateCategorySelection(selectedId);
                  if (!validation.valid) {
                    return (
                      <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                        <Iconify icon="eva:alert-circle-fill" sx={{ mr: 0.5, fontSize: 16 }} />
                        {validation.message}
                      </Typography>
                    );
                  } else {
                    return (
                      <Typography variant="body2" color="success.main" sx={{ mt: 0.5 }}>
                        <Iconify icon="eva:checkmark-circle-fill" sx={{ mr: 0.5, fontSize: 16 }} />
                        Зөв ангилал сонгогдлоо
                      </Typography>
                    );
                  }
                })()}
              </Box>
            )}
            {/* File Selection Section */}
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {editingDocument ? 'Шинэ PDF файл сонгох (заавал биш):' : 'PDF файл сонгох:'}
              </Typography>
              
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{ marginTop: 8 }}
              />
              
              {selectedFile && (
                <Box sx={{ mt: 1, p: 1, bgcolor: 'success.lighter', borderRadius: 1 }}>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Iconify icon="eva:checkmark-circle-fill" sx={{ mr: 1 }} />
                    Шинэ файл сонгогдлоо: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                </Box>
              )}
              
              {editingDocument && !selectedFile && (
                <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Iconify icon="eva:file-text-fill" sx={{ mr: 1 }} />
                    Одоогийн файл хэвээр үлдэнэ: {editingDocument.filename}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    Файл солихыг хүсвэл дээрээс шинэ PDF файл сонгоно уу
                  </Typography>
                </Box>
              )}
              
              {editingDocument && !selectedFile && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    Зөвхөн ангилал болон гарчиг өөрчлөх бол файл сонгох шаардлагагүй.
                  </Typography>
                </Alert>
              )}
            </Box>
            {/* Enhanced Category Path Confirmation Display */}
            {formData.pagePath && (
              <Box sx={{ mt: 2, mb: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.300' }}>
                <Typography variant="subtitle2" color="primary.main" sx={{ mb: 1 }}>
                  📁 Сонгосон ангилал:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  {(() => {
                    const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                    const validation = validateCategorySelection(selectedId);
                    
                    if (validation.valid) {
                      return getFullCategoryPath(validation.category.path);
                    }
                    return 'Ангилал сонгогдоогүй';
                  })()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Зам: {formData.pagePath}
                </Typography>
                {(() => {
                  const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                  const validation = validateCategorySelection(selectedId);
                  
                  if (validation.valid) {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main', mr: 1 }} />
                        <Typography variant="body2" color="success.main">
                          Хүчинтэй ангилал - байршуулахад бэлэн
                        </Typography>
                      </Box>
                    );
                  } else {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Iconify icon="eva:alert-circle-fill" sx={{ color: 'warning.main', mr: 1 }} />
                        <Typography variant="body2" color="warning.main">
                          {validation.message}
                        </Typography>
                      </Box>
                    );
                  }
                })()}
              </Box>
            )}
            
            {/* Enhanced Upload Error Display */}
            {uploadError && (
              <Alert 
                severity="error" 
                sx={{ mt: 2, mb: 1 }}
                icon={<Iconify icon="eva:alert-triangle-fill" />}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Байршуулахад алдаа гарлаа:
                </Typography>
                <Typography variant="body2">
                  {uploadError}
                </Typography>
              </Alert>
            )}
            
            {/* Category Selection Validation Feedback */}
            {(() => {
              const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
              if (!selectedId) return null;
              
              const validation = validateCategorySelection(selectedId);
              if (validation.valid) return null;
              
              return (
                <Alert 
                  severity="warning" 
                  sx={{ mt: 2, mb: 1 }}
                  icon={<Iconify icon="eva:info-fill" />}
                >
                  <Typography variant="body2">
                    {validation.message}
                  </Typography>
                  {validation.errorCode === 'NOT_LEAF_CATEGORY' && validation.childCount > 0 && (
                    <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                      Энэ ангилалд {validation.childCount} дэд ангилал байна. Та дэд ангиллын аль нэгийг сонгоно уу.
                    </Typography>
                  )}
                </Alert>
              );
            })()}

          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenDialog(false);
              setEditingDocument(null);
              setFormData({ title: "", pagePath: "", category: "" });
              setSelectedFile(null);
              // Clear category selections
              setSelectedMainCategory('');
              setSelectedSubCategory('');
              setSelectedSubSubCategory('');
            }}>
              Болих
            </Button>
            <Button
              onClick={editingDocument ? () => updateDocument(editingDocument.id) : validateAndConfirmUpload}
              variant="contained"
              disabled={(() => {
                if (uploading || categoriesLoading) return true;
                
                // Enhanced validation for editing documents
                if (editingDocument) {
                  // Check title
                  if (!formData.title || formData.title.trim() === '') return true;
                  
                  // Check if category selection is valid
                  const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                  const validation = validateCategorySelection(selectedId);
                  if (!validation.valid) return true;
                  
                  // Additional path validation
                  const pathValidation = validateCategoryPath(validation.category.path);
                  return !pathValidation.valid;
                }
                
                // Enhanced validation for new uploads
                if (!selectedFile || !formData.title || formData.title.trim() === '') return true;
                
                // Validate file type and size
                if (selectedFile && selectedFile.type !== 'application/pdf') return true;
                const maxSize = 50 * 1024 * 1024; // 50MB
                if (selectedFile && selectedFile.size > maxSize) return true;
                
                // Check if category selection is valid
                const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                const validation = validateCategorySelection(selectedId);
                if (!validation.valid) return true;
                
                // Additional path validation
                const pathValidation = validateCategoryPath(validation.category.path);
                return !pathValidation.valid;
              })()}
              startIcon={(() => {
                if (uploading) return <CircularProgress size={20} />;
                if (editingDocument) return <Iconify icon="eva:save-fill" />;
                return <Iconify icon="eva:cloud-upload-fill" />;
              })()}
            >
              {(() => {
                if (uploading) return 'Боловсруулж байна...';
                if (editingDocument) {
                  if (selectedFile) {
                    return 'Файл солиж хадгалах';
                  } else {
                    return 'Мэдээлэл шинэчлэх';
                  }
                }
                
                // Show specific validation messages for new uploads
                if (!selectedFile) return 'Файл сонгоно уу';
                if (!formData.title || formData.title.trim() === '') return 'Гарчиг оруулна уу';
                
                const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                const validation = validateCategorySelection(selectedId);
                if (!validation.valid) return 'Ангилал сонгоно уу';
                
                return 'Баримт байршуулах';
              })()}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Upload Confirmation Dialog */}
        <Dialog 
          open={showUploadConfirmation} 
          onClose={() => setShowUploadConfirmation(false)}
          maxWidth="sm" 
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main', mr: 1 }} />
            Байршуулахыг баталгаажуулах
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Дараах мэдээлэлтэй баримт байршуулахыг хүсэж байна уу?
            </Typography>
            
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                📄 Баримтын мэдээлэл:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Гарчиг:</strong> {formData.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Файл:</strong> {selectedFile?.name} ({selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0} MB)
              </Typography>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                📁 Ангилалын мэдээлэл:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Ангилал:</strong> {(() => {
                  const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                  const validation = validateCategorySelection(selectedId);
                  return validation.valid ? getFullCategoryPath(validation.category.path) : 'Тодорхойгүй';
                })()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Зам:</strong> {formData.pagePath}
              </Typography>
            </Box>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Баримт амжилттай байршуулсны дараа хэрэглэгчид вэбсайт дээр харагдах болно.
              </Typography>
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setShowUploadConfirmation(false)}
              disabled={uploading}
            >
              Болих
            </Button>
            <Button
              onClick={uploadDocument}
              variant="contained"
              disabled={uploading}
              startIcon={uploading ? <CircularProgress size={20} /> : <Iconify icon="eva:cloud-upload-fill" />}
            >
              {uploading ? 'Байршуулж байна...' : 'Тийм, байршуулах'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Enhanced Upload Confirmation Dialog */}
        <Dialog 
          open={showUploadConfirmation} 
          onClose={() => !uploading && setShowUploadConfirmation(false)}
          maxWidth="sm" 
          fullWidth
          disableEscapeKeyDown={uploading}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 1, color: 'success.main' }} />
              {editingDocument ? 'Баримт солих баталгаажуулалт' : 'Баримт байршуулах баталгаажуулалт'}
            </Box>
          </DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Дараах мэдээлэлтэй баримт {editingDocument ? 'солигдох' : 'байршуулагдах'} болно:
              </Typography>
            </Alert>
            
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Гарчиг:</strong> {formData.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Файл:</strong> {selectedFile ? selectedFile.name : (editingDocument ? 'Файл солигдохгүй' : 'Файл сонгогдоогүй')}
              </Typography>
              {selectedFile && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Файлын хэмжээ:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              )}
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Ангилал:</strong> {(() => {
                  const selectedId = selectedSubSubCategory || selectedSubCategory || selectedMainCategory;
                  const validation = validateCategorySelection(selectedId);
                  return validation.valid ? getFullCategoryPath(validation.category.path) : 'Ангилал сонгогдоогүй';
                })()}
              </Typography>
              <Typography variant="body2">
                <strong>Хуудасны зам:</strong> {formData.pagePath || 'Тодорхойгүй'}
              </Typography>
            </Box>

            {editingDocument && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  {selectedFile 
                    ? 'Хуучин файл устгагдаж, шинэ файл байршуулагдана.' 
                    : 'Зөвхөн баримтын мэдээлэл (гарчиг, ангилал) шинэчлэгдэнэ.'}
                </Typography>
              </Alert>
            )}

            {uploading && (
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
                <CircularProgress size={24} sx={{ mr: 2 }} />
                <Typography variant="body2" color="info.main">
                  {editingDocument ? 'Баримт солиж байна...' : 'Баримт байршуулж байна...'}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setShowUploadConfirmation(false)} 
              disabled={uploading}
              color="inherit"
            >
              Цуцлах
            </Button>
            <Button 
              onClick={editingDocument ? () => updateDocument(editingDocument.id) : uploadDocument}
              disabled={uploading}
              variant="contained"
              startIcon={uploading ? <CircularProgress size={16} /> : <Iconify icon="eva:checkmark-fill" />}
            >
              {uploading 
                ? (editingDocument ? 'Солиж байна...' : 'Байршуулж байна...') 
                : (editingDocument ? 'Солих' : 'Байршуулах')
              }
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
} 