import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client with production-ready configuration
let supabase = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Enable session persistence for better UX
        persistSession: true,
        // Store session in localStorage (default)
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // Auto-refresh tokens before they expire
        autoRefreshToken: true,
        // Detect session from URL (for magic links, OAuth)
        detectSessionInUrl: true,
        // Flow type for authentication
        flowType: 'pkce', // More secure than implicit flow
      },
      // Global fetch options
      global: {
        headers: {
          'x-application-name': 'admin-dashboard',
        },
      },
      // Database options
      db: {
        schema: 'public',
      },
      // Realtime options (if needed)
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  } else {
    console.warn('Supabase configuration missing. Running in offline mode.');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

export { supabase }

// Helper function to get authenticated user
export const getCurrentUser = async () => {
  if (!supabase) {
    console.warn('Supabase client not available');
    return null;
  }
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Helper function to check if user is admin
export const isAdmin = async () => {
  if (!supabase) return false;
  
  try {
    const user = await getCurrentUser()
    if (!user) return false
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (error) return false
    return data?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Helper function to sign out
export const signOut = async () => {
  if (!supabase) return { error: new Error('Supabase client not available') };
  
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    console.error('Error signing out:', error);
    return { error }
  }
}

// Helper function to get session
export const getSession = async () => {
  if (!supabase) return { session: null, error: new Error('Supabase client not available') };
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  } catch (error) {
    console.error('Error getting session:', error);
    return { session: null, error }
  }
} 