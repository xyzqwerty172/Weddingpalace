import SupabaseAdminDashboardView from "src/sections/admin/supabase-admin-dashboard-view";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function SupabaseAdminPage() {
  return <SupabaseAdminDashboardView />;
} 