'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import FloatingTutor from '@/components/ai/FloatingTutor';
import ProgressSync from '@/components/parcours/progressSync';
export default function SiteFrame({ children, lessons }: { children: ReactNode; lessons: { title: string; module: string; href: string }[] }) {
  const pathname = usePathname();
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return <>{children}</>;
  return <><Header lessons={lessons} /><Sidebar /><div className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0 lg:pl-60 print:pb-0 print:pl-0"><main id="main-content" className="min-w-0 flex-1">{children}</main><Footer /></div><FloatingTutor /><BottomNav /><ProgressSync /></>;
}
