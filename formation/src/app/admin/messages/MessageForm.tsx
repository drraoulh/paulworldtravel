'use client';

import { useState } from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import { adminButton, adminSecondary, fieldClass } from '@/components/admin/ui';
import { sendGroupEmail } from './actions';

type Preset = { id: string; name: string; audience: string; subject: string; message: string; label: string; href: string };

/** Ready-made messages the team sends often; « Message libre » starts empty. */
const PRESETS: Preset[] = [
  {
    id: 'examen',
    name: 'Examen blanc',
    audience: 'tous',
    subject: 'Votre examen blanc TCF Canada est disponible',
    message: 'Bonjour {prénom},\n\nL’examen blanc est disponible sur votre plateforme de préparation : les quatre épreuves du TCF Canada dans les conditions réelles, avec les durées officielles, puis un bilan pour savoir quoi travailler en priorité.\n\nC’est le meilleur moyen de savoir où vous en êtes avant le jour de l’examen. Prévoyez un moment au calme, avec des écouteurs et un micro.\n\nBonne préparation,\nL’équipe Paul World Travel',
    label: 'Passer mon examen blanc',
    href: '/examen-blanc/',
  },
  {
    id: 'nouveautes',
    name: 'Nouvelles séries',
    audience: 'tous',
    subject: 'Nouvelles séries d’entraînement sur votre plateforme',
    message: 'Bonjour {prénom},\n\nDe nouvelles séries de compréhension orale et écrite sont en ligne, avec 39 questions chacune, comme à l’examen.\n\nÀ bientôt sur la plateforme,\nL’équipe Paul World Travel',
    label: 'Voir les séries',
    href: '/epreuve/comprehension-orale/series/',
  },
  { id: 'libre', name: 'Message libre', audience: 'tous', subject: '', message: 'Bonjour {prénom},\n\n', label: '', href: '' },
];

export default function MessageForm({ counts }: { counts: Record<string, { label: string; n: number }> }) {
  const [preset, setPreset] = useState(PRESETS[0]);
  return (
    <form key={preset.id} action={sendGroupEmail} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-bold text-night">1. Le modèle</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.id} type="button" onClick={() => setPreset(p)} aria-pressed={preset.id === p.id}
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${preset.id === p.id ? 'border-ocean bg-ocean text-white' : 'border-rule bg-white text-night hover:border-ocean'}`}>
              {p.name}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold text-night">2. Les destinataires</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {Object.entries(counts).map(([id, c]) => (
            <label key={id} className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-rule bg-white p-3 has-[:checked]:border-ocean has-[:checked]:bg-blue-50">
              <input type="radio" name="audience" value={id} defaultChecked={id === preset.audience} className="mt-1" />
              <span><span className="block text-sm font-bold text-night">{c.label}</span><span className="text-xs text-slate">{c.n} personne{c.n > 1 ? 's' : ''}</span></span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-bold text-night">3. Le message</legend>
        <label className="block text-xs font-semibold">Objet<input name="subject" required maxLength={150} defaultValue={preset.subject} className={`mt-1 ${fieldClass}`} /></label>
        <label className="block text-xs font-semibold">Message<textarea name="message" required rows={10} maxLength={5000} defaultValue={preset.message} className={`mt-1 ${fieldClass}`} /></label>
        <p className="text-xs text-slate">{'{prénom}'} est remplacé par le prénom de chaque apprenant. Chacun reçoit son propre email : personne ne voit les autres adresses.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs font-semibold">Texte du bouton (facultatif)<input name="button_label" maxLength={60} defaultValue={preset.label} className={`mt-1 ${fieldClass}`} /></label>
          <label className="block text-xs font-semibold">Lien du bouton<input name="button_href" maxLength={300} defaultValue={preset.href} placeholder="/examen-blanc/" className={`mt-1 ${fieldClass}`} /></label>
        </div>
      </fieldset>

      <div className="rounded-xl border-2 border-rule bg-paper/50 p-4">
        <label className="flex items-start gap-3 text-sm text-night"><input type="checkbox" name="confirm" className="mt-1" />J’ai relu le message et je confirme l’envoi aux destinataires choisis.</label>
        <div className="mt-4 flex flex-wrap gap-3">
          <SubmitButton name="mode" value="test" className={adminSecondary} pending="Envoi du test…">M’envoyer un test</SubmitButton>
          <SubmitButton name="mode" value="send" className={adminButton} pending="Envoi en cours, ne fermez pas la page…">Envoyer à tous les destinataires</SubmitButton>
        </div>
      </div>
    </form>
  );
}
