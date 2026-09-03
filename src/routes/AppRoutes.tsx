import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingState } from '@/components/common/LoadingState';
import { PublicLayout } from '@/layouts/PublicLayout';
import { CustomerLayout } from '@/layouts/CustomerLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';

// Public Pages
const HomePage = lazy(() => import('@/pages/public/HomePage').then((m) => ({ default: m.HomePage })));
const PropertiesPage = lazy(() => import('@/pages/public/PropertiesPage').then((m) => ({ default: m.PropertiesPage })));
const PropertyDetailsPage = lazy(() => import('@/pages/public/PropertyDetailsPage').then((m) => ({ default: m.PropertyDetailsPage })));
const AboutPage = lazy(() => import('@/pages/public/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/public/ContactPage').then((m) => ({ default: m.ContactPage })));

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));

// Customer Pages
const CustomerDashboard = lazy(() => import('@/pages/customer/CustomerDashboard').then((m) => ({ default: m.CustomerDashboard })));
const FavoritesPage = lazy(() => import('@/pages/customer/FavoritesPage').then((m) => ({ default: m.FavoritesPage })));
const CustomerInquiriesPage = lazy(() => import('@/pages/customer/InquiriesPage').then((m) => ({ default: m.InquiriesPage })));
const RequirementsPage = lazy(() => import('@/pages/customer/RequirementsPage').then((m) => ({ default: m.RequirementsPage })));
const ProfilePage = lazy(() => import('@/pages/customer/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const CustomerSettingsPage = lazy(() => import('@/pages/customer/SettingsPage').then((m) => ({ default: m.SettingsPage })));

// Admin Pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminPropertiesPage = lazy(() => import('@/pages/admin/PropertiesListPage').then((m) => ({ default: m.PropertiesListPage })));
const AddPropertyPage = lazy(() => import('@/pages/admin/AddPropertyPage').then((m) => ({ default: m.AddPropertyPage })));
const AdminPropertyDetailPage = lazy(() => import('@/pages/admin/PropertyDetailPage').then((m) => ({ default: m.PropertyDetailPage })));
const AdminUsersPage = lazy(() => import('@/pages/admin/UsersPage').then((m) => ({ default: m.UsersPage })));
const AdminUserDetailPage = lazy(() => import('@/pages/admin/UserDetailPage').then((m) => ({ default: m.UserDetailPage })));
const AdminInquiriesPage = lazy(() => import('@/pages/admin/InquiriesPage').then((m) => ({ default: m.InquiriesPage })));
const AdminActivityPage = lazy(() => import('@/pages/admin/ActivityPage').then((m) => ({ default: m.ActivityPage })));
const AdminAnalyticsPage = lazy(() => import('@/pages/admin/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })));
const AdminSettingsPage = lazy(() => import('@/pages/admin/SettingsPage').then((m) => ({ default: m.SettingsPage })));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingState />}>{children}</Suspense>;
}

export function AppRoutes() {
  return (
    <SuspenseWrapper>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Auth Routes (no layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Customer Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <CustomerLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/customer" element={<Navigate to="/customer/dashboard" replace />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/favorites" element={<FavoritesPage />} />
          <Route path="/customer/inquiries" element={<CustomerInquiriesPage />} />
          <Route path="/customer/requirements" element={<RequirementsPage />} />
          <Route path="/customer/profile" element={<ProfilePage />} />
          <Route path="/customer/settings" element={<CustomerSettingsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['ADMIN']}>
                <AdminLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/properties" element={<AdminPropertiesPage />} />
          <Route path="/admin/properties/new" element={<AddPropertyPage />} />
          <Route path="/admin/properties/:id" element={<AdminPropertyDetailPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/:id" element={<AdminUserDetailPage />} />
          <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
          <Route path="/admin/activity" element={<AdminActivityPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SuspenseWrapper>
  );
}
