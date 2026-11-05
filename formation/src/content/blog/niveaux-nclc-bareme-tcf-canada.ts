import type { Article } from './types';

export const niveauxNclc: Article = {
  slug: 'niveaux-nclc-bareme-tcf-canada',
  title: 'Comprendre les niveaux NCLC et le barème du TCF Canada',
  description: 'Comment vos scores sur 699 et vos notes sur 20 deviennent des niveaux NCLC, le tableau officiel d’IRCC, les minimums par programme et les erreurs de lecture à éviter.',
  category: 'L’examen',
  published: '2026-11-05',
  image: { src: '/images/study.jpg', alt: 'Un cahier de révision ouvert sur un bureau' },
  lead: 'Sur votre attestation, vous lisez des scores et des notes. Dans votre dossier d’immigration, IRCC ne regarde que des niveaux NCLC. Voici comment passer de l’un à l’autre, et pourquoi votre compétence la plus faible compte plus que toutes les autres.',
  blocks: [
    { type: 'h2', id: 'nclc-definition', text: 'Qu’est-ce que le NCLC ?' },
    { type: 'p', text: 'Les **Niveaux de compétence linguistique canadiens** (NCLC) sont l’échelle de référence du gouvernement canadien pour le français ; leur équivalent pour l’anglais s’appelle les Canadian Language Benchmarks (CLB). L’échelle va de 1 à 12, mais pour le TCF Canada, IRCC publie les correspondances du NCLC 4 au NCLC 10 et plus.' },
    { type: 'p', text: 'Le NCLC n’est pas une note que vous recevez du centre d’examen : c’est IRCC qui convertit chacun de vos quatre résultats à l’aide d’un tableau officiel. Vous obtenez donc **quatre NCLC**, un par compétence : compréhension de l’oral, compréhension de l’écrit, expression orale et expression écrite.' },

    { type: 'h2', id: 'tableau-officiel', text: 'Le tableau de correspondance officiel' },
    { type: 'p', text: 'Voici le tableau publié par IRCC pour le TCF Canada. Les compréhensions sont notées sur 699, les expressions sur 20.' },
    {
      type: 'table',
      caption: 'Correspondance TCF Canada et NCLC, d’après canada.ca',
      head: ['NCLC', 'Compréhension de l’oral', 'Compréhension de l’écrit', 'Expression écrite', 'Expression orale'],
      rows: [
        ['10 et plus', '549 à 699', '549 à 699', '16 à 20', '16 à 20'],
        ['9', '523 à 548', '524 à 548', '14 à 15', '14 à 15'],
        ['8', '503 à 522', '499 à 523', '12 à 13', '12 à 13'],
        ['7', '458 à 502', '453 à 498', '10 à 11', '10 à 11'],
        ['6', '398 à 457', '406 à 452', '7 à 9', '7 à 9'],
        ['5', '369 à 397', '375 à 405', '6', '6'],
        ['4', '331 à 368', '342 à 374', '4 à 5', '4 à 5'],
      ],
    },
    { type: 'p', text: 'Remarquez que les seuils ne sont pas identiques à l’oral et à l’écrit : le NCLC 7 commence à **458** en compréhension orale, mais à **453** en compréhension écrite. Pour les expressions, le NCLC 7 correspond à une note de **10 sur 20**. Le tableau est repris sur notre page [Niveaux NCLC](/niveaux-nclc/), et le [calculateur NCLC](/calculateur-nclc/) fait la conversion à partir de vos quatre résultats.' },
    { type: 'callout', tone: 'warning', text: 'IRCC peut modifier ce tableau. Avant de remplir votre profil, vérifiez toujours la version en vigueur sur la [page officielle des résultats d’examen linguistique](https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html).' },

    { type: 'h2', id: 'cecr', text: 'NCLC et niveaux A1 à C2' },
    { type: 'p', text: 'Votre attestation TCF indique aussi un niveau du Cadre européen commun de référence (CECR). Pour les compréhensions, le TCF découpe son échelle de 100 à 699 en tranches de 100 points : A1 de 100 à 199, A2 de 200 à 299, B1 de 300 à 399, B2 de 400 à 499, C1 de 500 à 599 et C2 de 600 à 699.' },
    { type: 'p', text: 'Les deux échelles ne se superposent pas exactement. Un score de 460 en compréhension orale est un **B2** pour le CECR et un **NCLC 7** pour IRCC ; un score de 420 est aussi un B2, mais seulement un NCLC 6. Ne vous fiez donc pas au niveau CECR pour savoir si vous atteignez votre objectif d’immigration : seul le tableau d’IRCC fait foi.' },

    { type: 'h2', id: 'maillon-faible', text: 'Pourquoi la compétence la plus faible décide' },
    { type: 'p', text: 'Les exigences des programmes s’expriment presque toujours ainsi : « NCLC 7 **dans chacune des quatre compétences** ». Un NCLC 9 en compréhension orale ne compense pas un NCLC 6 en expression écrite. Si une seule compétence est sous le seuil, le profil ne remplit pas la condition.' },
    { type: 'example', title: 'Exemple de lecture', text: 'Compréhension orale : 512 → NCLC 8\nCompréhension écrite : 470 → NCLC 7\nExpression écrite : 9 sur 20 → NCLC 6\nExpression orale : 12 sur 20 → NCLC 8\n\nRésultat : le minimum de NCLC 7 dans les quatre compétences n’est pas atteint, à cause de l’expression écrite. Gagner un seul point sur 20 à l’écrit (10 sur 20) suffirait.' },
    { type: 'p', text: 'C’est la principale leçon du barème : identifiez votre maillon faible et concentrez votre préparation sur lui. Un point de plus en expression peut changer de NCLC, alors qu’il faut souvent plusieurs dizaines de points de plus en compréhension.' },

    { type: 'h2', id: 'minimums', text: 'Les minimums selon les programmes' },
    { type: 'p', text: 'Les exigences dépendent du programme. Voici les principales, d’après les pages d’IRCC consultées en novembre 2026 :' },
    {
      type: 'table',
      head: ['Programme', 'Niveau minimum en français (première langue officielle)'],
      rows: [
        ['Travailleurs qualifiés (fédéral)', 'NCLC 7 dans les quatre compétences'],
        ['Catégorie de l’expérience canadienne', 'NCLC 7 pour un emploi FEER 0 ou 1 ; NCLC 5 pour un emploi FEER 2 ou 3'],
        ['Métiers spécialisés (fédéral)', 'NCLC 5 à l’oral (expression et compréhension), NCLC 4 à l’écrit'],
        ['Citoyenneté', 'NCLC 4 en expression orale et en compréhension de l’oral'],
      ],
    },
    { type: 'p', text: 'Ces minimums servent à être **admissible**. Pour être invité dans Entrée express, il faut ensuite un bon score au Système de classement global : chaque niveau NCLC supplémentaire rapporte des points, et un NCLC 7 ou plus dans les quatre compétences en français ouvre droit à des points supplémentaires (25 ou 50 selon votre anglais) ainsi qu’aux rondes d’invitations réservées aux francophones.' },

    { type: 'h2', id: 'fixer-objectif', text: 'Fixer son objectif et suivre sa progression' },
    { type: 'ol', items: [
      'Notez le minimum exigé par votre programme, puis le niveau qui rendrait votre profil compétitif. Beaucoup de candidats visent le NCLC 7 partout, puis plus haut si leur score SCG l’exige.',
      'Traduisez cet objectif en scores : par exemple NCLC 7 = au moins 458 en compréhension orale, 453 en compréhension écrite et 10 sur 20 dans chaque expression.',
      'Mesurez-vous régulièrement : les séries chronométrées de la plateforme donnent un score indicatif, et les simulateurs d’expression une note sur 20 lue dans le même tableau officiel.',
      'Gardez une marge. Le jour J, le stress et les sujets inconnus font souvent perdre quelques points.',
    ] },
    { type: 'p', text: 'Pour savoir où vous en êtes aujourd’hui, commencez par le [test de niveau gratuit](/test-de-niveau/), puis lisez notre [guide complet du TCF Canada](/blog/tcf-canada-guide-complet-2026/) pour le format de chaque épreuve.' },
  ],
  sources: [
    { label: 'IRCC : Entrée express, résultats d’examen linguistique (tableau TCF Canada)', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
    { label: 'IRCC : critères du Système de classement global', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/verifier-note/criteries-scg.html' },
    { label: 'IRCC : Programme des travailleurs qualifiés (fédéral)', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/qui-presenter-demande/travailleurs-qualifies-federal.html' },
    { label: 'France Éducation international : TCF Canada', href: 'https://www.france-education-international.fr/test/tcf-canada' },
  ],
  related: ['tcf-canada-guide-complet-2026', 'expression-ecrite-tcf-canada-3-taches', 'tcf-canada-ou-tef-canada'],
};
