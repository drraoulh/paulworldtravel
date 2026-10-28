# Expression écrite : sources, création et vérifications

Consultation : **28 octobre 2026**. Banque : `ee-2026-10-28-v1`.

## Sources primaires consultées en ligne

- [Présentation du TCF Canada — France Éducation international](https://www.france-education-international.fr/test/tcf-canada). Format : trois tâches pendant une durée globale de 60 minutes. Longueurs : tâche 1, 60–120 mots ; tâche 2, 120–150 mots ; tâche 3, 120–180 mots. Le nombre de mots et les capacités attendues sont repris comme paramètres, pas comme sujets copiés.
- [Exemples d’épreuves — France Éducation international](https://www.france-education-international.fr/test/exemples-epreuves-tcf). Ressource officielle reliée depuis la page d’entraînement. Les genres de consignes ont guidé la création : un message pour un destinataire défini, un récit commenté et une comparaison argumentée de deux opinions.
- [Manuel du candidat — France Éducation international](https://www.france-education-international.fr/document/manuelcandidattoutes20dc3a9clinaisonsi). Le résultat indexé consulté correspond à la version P, avril 2026 ; il confirme les types de tâches et les longueurs. Les textes candidats doivent répondre à la consigne et rester cohérents, avec un registre adapté et une reformulation.

Les recherches ont aussi remonté des banques commerciales et des compilations tierces ; elles n’ont pas été recopiées ni transformées en corpus. Les sources sont utilisées pour le format, les genres de tâches et les critères, et non pour attribuer une provenance officielle aux exercices.

## Banque créée

36 sujets entièrement originaux, 12 par tâche. Les thèmes couvrent vie quotidienne, voyage, logement, travail, culture, apprentissage, solidarité, mobilité, consommation et organisation collective. Chaque tâche 3 dispose de **deux documents originaux** présentant des raisonnements différents et nuancés ; aucun document n’est extrait d’un article en ligne. Aucune image n’est requise par ces consignes textuelles, donc aucune illustration décorative ou image tierce n’a été ajoutée.

Pour chaque mois et année, trois combinaisons reproductibles sélectionnent chacune un sujet de chaque type. Dans un même mois, les trois variantes utilisent des sujets différents pour chaque tâche. La banque étant partagée, un sujet peut revenir d’un mois à l’autre. L’année ou le mois sélectionné sert de programme pédagogique : ce n’est **pas** une date de session d’examen ni une archive d’annales réelles.

## Interface et limites

Route : `/entrainement/expression-ecrite/series/?mois=2026-11&serie=2`. Les paramètres invalides reviennent au mois courant au Cameroun et à la série 1.

Les candidats peuvent écrire les trois textes en mode guidé ou avec un chronomètre global de 60 minutes. Un délai absolu conserve le temps écoulé après fermeture ou actualisation. Les brouillons, le mode et le délai restent dans le navigateur, par combinaison et par version de banque. Aucun texte n’est envoyé automatiquement à un serveur. L’export au format texte et l’effacement du brouillon sont disponibles. Si le stockage est bloqué, la page le signale.

Le compteur pédagogique conserve ensemble les mots avec apostrophe ou trait d’union et ignore la ponctuation isolée. Il contrôle les plages de longueur sans prétendre noter la langue. Les plans et la grille de relecture aident à revoir la réponse ; plusieurs réponses sont possibles. Aucune note sur 20, aucun NCLC et aucune correction automatique ne sont inventés. Le lien vers le parcours IA existant l’ouvre séparément et ne transfère pas les nouveaux sujets ou les brouillons.

## Vérifications

`node --experimental-strip-types --test tests/writing-series.test.mjs` : quatre tests. Banque unique et complète, documents de tâche 3, longueurs, sources connues, 108 combinaisons sur trois ans, absence de répétition entre variantes d’un mois, reproductibilité, sélecteurs invalides, comptage, minuterie absolue et validation des brouillons restaurés.

Le parcours navigateur et le build final sont confiés à l’orchestrateur pour éviter de lancer plusieurs builds concurrents dans le même répertoire.
