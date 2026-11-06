import type { SVGProps } from 'react';
export type IconName = 'home' | 'book' | 'chart' | 'headphones' | 'pen' | 'mic' | 'award' | 'sparkles' | 'search' | 'menu' | 'close' | 'arrow' | 'clock' | 'check' | 'users' | 'wallet' | 'shield' | 'mail';
const paths: Record<IconName, string> = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  book: 'M12 5v16m0-16C9 3 5 3 2 5v14c3-2 7-2 10 2 3-4 7-4 10-2V5c-3-2-7-2-10 0Z',
  chart: 'M4 3v18h17M8 16v-4m5 4V8m5 8V5',
  headphones: 'M4 14v-3a8 8 0 0 1 16 0v3M4 12H3v7h4v-7Zm16 0h1v7h-4v-7Z',
  pen: 'm16 3 5 5-12 12-6 1 1-6Zm-2 2 5 5',
  mic: 'M9 6a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0Zm-4 5a7 7 0 0 0 14 0m-7 7v4m-4 0h8',
  award: 'M16 15 18 22l-6-3-6 3 2-7M19 9a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4',
  search: 'M21 21l-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  menu: 'M4 6h16M4 12h16M4 18h16', close: 'm6 6 12 12M6 18 18 6',
  arrow: 'M4 12h16m-6-6 6 6-6 6', clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  check: 'm5 12 4 4L19 6',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  mail: 'M3 6h18v12H3Zm0 0 9 7 9-7',
  wallet: 'M3 7a2 2 0 0 1 2-2h14v4M3 7v11a2 2 0 0 0 2 2h16V9H5a2 2 0 0 1-2-2Zm14 7h.01',
};
export default function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}
