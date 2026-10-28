import { modules, type Module } from '@/content/parcours';

export type Section = 'presentation' | 'methodologie' | 'series' | 'sujets' | 'simulateur' | 'tableau-de-bord';

export interface EpreuveConfig {
  slug: string;
  module: Module;
  /** Comprehension tests have numbered series; expression tests have subjects and an AI simulator. */
  kind: 'comprehension' | 'expression';
  sections: { key: Section; label: string; href: string }[];
}

const base = (slug: string) => `/epreuve/${slug}`;

export const epreuveConfigs: EpreuveConfig[] = modules.map((m) => {
  const kind = m.id === 'co' || m.id === 'ce' ? 'comprehension' : 'expression';
  const b = base(m.slug);
  const sections: EpreuveConfig['sections'] = [
    { key: 'presentation', label: 'Présentation', href: `${b}/` },
    { key: 'methodologie', label: 'Méthodologie et astuces', href: `${b}/methodologie/` },
    ...(kind === 'comprehension'
      ? [{ key: 'series' as const, label: 'Séries d’entraînement', href: `${b}/series/` }]
      : [
          { key: 'sujets' as const, label: 'Sujets et corrigés', href: `${b}/sujets/` },
          { key: 'simulateur' as const, label: 'Simulateur IA', href: `${b}/simulateur/` },
        ]),
    { key: 'tableau-de-bord', label: 'Tableau de bord', href: `${b}/tableau-de-bord/` },
  ];
  return { slug: m.slug, module: m, kind, sections };
});

export const getEpreuve = (slug: string) => epreuveConfigs.find((e) => e.slug === slug);
export const epreuveById = (id: Module['id']) => epreuveConfigs.find((e) => e.module.id === id)!;
export const comprehensionConfigs = epreuveConfigs.filter((e) => e.kind === 'comprehension');
export const expressionConfigs = epreuveConfigs.filter((e) => e.kind === 'expression');
