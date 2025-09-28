import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client with error handling
let supabase = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false // Disable session persistence to avoid connection issues
      }
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