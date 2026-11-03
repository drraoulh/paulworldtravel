import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { requireStaff } from '@/lib/staff';
import AdminShell from '@/components/admin/AdminShell';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Administration | Paul World Travel', robots: { index: false, follow: false } };
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { isAdmin, user } = await requireStaff('/admin/');
  return <AdminShell isAdmin={isAdmin} email={user.email ?? ''}>{children}</AdminShell>;
}
