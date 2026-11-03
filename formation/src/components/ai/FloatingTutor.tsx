'use client';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@/components/academy/Icon';
const Tutor = dynamic(() => import('@/app/entrainement/tuteur/Tutor'), { loading: () => <p role="status" className="p-6 text-sm text-slate">Ouverture de votre tuteur…</p> });
export default function FloatingTutor() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(false);
  const panel = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => { panel.current?.close(); setVisible(false); trigger.current?.focus(); };
  if (pathname.startsWith('/admin') || pathname.startsWith('/entrainement/tuteur')) return null;
  return <div className="print:hidden">
    <dialog id="academy-tutor-panel" ref={panel} onClose={() => setVisible(false)} aria-labelledby="floating-tutor-title" className="tutor-panel fixed bottom-24 left-auto right-3 z-50 m-0 w-[min(410px,calc(100vw-24px))] max-w-none overflow-hidden rounded-2xl border border-rule bg-white p-0 shadow-2xl sm:right-6" onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); close(); } }}>
      <div className="flex items-center gap-3 border-b border-rule bg-ocean px-5 py-4 text-white"><span className="rounded-xl bg-white/15 p-2"><Icon name="sparkles" /></span><div className="flex-1"><h2 id="floating-tutor-title" className="text-sm font-bold">Votre tuteur IA</h2><p className="text-xs text-blue-100">Un coup de pouce pour apprendre</p></div><button onClick={close} aria-label="Fermer le tuteur IA" className="rounded-lg p-2 hover:bg-white/15"><Icon name="close" /></button></div>
      <div className="max-h-[min(70dvh,600px)] overflow-y-auto p-3">{opened && <Tutor compact next={pathname} />}</div>
    </dialog>
    <button ref={trigger} onClick={() => { setOpened(true); if (panel.current?.open) close(); else { panel.current?.show(); setVisible(true); } }} aria-haspopup="dialog" aria-controls="academy-tutor-panel" aria-expanded={visible} aria-label="Ouvrir le tuteur IA" className="fixed bottom-5 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-ocean px-4 sm:px-5 font-bold text-white shadow-[0_6px_24px_#0056d24d] transition-transform hover:-translate-y-1 hover:bg-night sm:right-6"><Icon name="sparkles" /><span className="hidden text-sm sm:inline">Besoin d’aide ?</span></button>
  </div>;
}
