import { epreuves, totalMinutes } from '@/content/tcf';

// The exam drawn to scale: each band is as wide as the épreuve is long.
const tones = ['bg-sky', 'bg-ocean', 'bg-container', 'bg-maple'];

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`;
}

export default function ExamTimeline() {
  return (
    <figure>
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="heading text-lg text-white">L’examen, à l’échelle</span>
        <span className="text-blue-200">{epreuves.length} épreuves, {formatDuration(totalMinutes)} au total</span>
      </figcaption>
      <div className="flex h-4 overflow-hidden rounded-full" aria-hidden="true">
        {epreuves.map((e, i) => (
          <div key={e.id} className={`${tones[i]} border-r-2 border-night last:border-r-0`} style={{ width: `${(e.minutes / totalMinutes) * 100}%` }} />
        ))}
      </div>
      <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {epreuves.map((e, i) => (
          <li key={e.id} className="flex gap-3">
            <span className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${tones[i]}`} aria-hidden="true" />
            <span>
              <span className="block font-semibold text-white">{e.name}</span>
              <span className="block text-sm text-blue-200">{e.minutes} min, {e.format.split(' ')[0]} {e.id === 'co' || e.id === 'ce' ? 'questions' : 'tâches'}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
