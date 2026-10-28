# tcf.paulworldtravel.com — plan de la plateforme de préparation au TCF Canada

Version de travail, à valider ensemble avant de coder.

## 1. Objectif

Préparer les candidats au TCF Canada (immigration, citoyenneté) : cours, entraînements par épreuve, tests blancs chronométrés, corrections et suivi de progression jusqu'au niveau NCLC visé.

Paiement hors site (agence, Mobile Money, WhatsApp). Le site gère l'inscription ; un administrateur active ensuite l'accès du candidat.

## 2. Les 4 épreuves à couvrir

| Épreuve | Format officiel | Ce que fait la plateforme |
| --- | --- | --- |
| Compréhension orale | 39 QCM, 35 min | Audio + QCM, correction automatique, score sur 699 |
| Compréhension écrite | 39 QCM, 60 min | Textes + QCM, correction automatique, score sur 699 |
| Expression écrite | 3 tâches, 60 min | Rédaction dans le navigateur avec compteur de mots, corrigée par un formateur (note sur 20) |
| Expression orale | 3 tâches, 12 min | Enregistrement audio dans le navigateur, corrigé par un formateur (note sur 20) |

Chaque résultat est converti en niveau NCLC (table officielle à vérifier sur le site de France Éducation international avant la mise en ligne).

Contenu : toutes les questions sont créées par l'équipe. On ne reprend pas de sujets officiels, qui sont confidentiels et protégés.

## 3. Rôles

- **Visiteur** : voit l'offre, fait un mini test de niveau gratuit, s'inscrit.
- **Candidat** : accède aux cours et entraînements selon sa formule, passe des tests blancs, envoie ses productions écrites et orales, suit ses scores.
- **Formateur** : corrige les expressions écrites et orales, laisse des commentaires.
- **Administrateur** : valide les paiements et active les comptes, gère les formules, les sessions et le contenu (questions, audios, textes).

## 4. Pages

Public
- `/` accueil : présentation du TCF Canada, formules et prix, témoignages, appel à l'inscription
- `/test-de-niveau` mini test gratuit (10 à 15 questions CO/CE) avec niveau estimé
- `/formules` détail des formules (durée, contenu, prix, paiement à l'agence)
- `/tcf-canada` guide de l'examen : épreuves, scores, NCLC, inscription à l'examen officiel
- `/inscription`, `/connexion`

Espace candidat
- `/tableau-de-bord` progression par épreuve, dernier score, NCLC estimé, prochaines étapes
- `/cours` leçons par épreuve (vidéo, PDF, fiches)
- `/entrainement/[epreuve]` séries courtes, correction immédiate
- `/test-blanc` examen complet chronométré, dans les conditions réelles
- `/mes-productions` productions écrites et orales envoyées, avec leur correction
- `/compte` profil, formule, date de fin d'accès

Espace formateur et admin
- `/admin/candidats` liste, statut (en attente de paiement / actif / expiré), activation manuelle
- `/admin/corrections` file des productions à corriger
- `/admin/contenu` banque de questions, audios, textes, sujets
- `/admin/formules` formules et durées

## 5. Données (première version)

- `profiles` : candidat (nom, téléphone, pays, niveau visé, rôle)
- `plans` : formule (nom, durée en jours, épreuves incluses, prix affiché)
- `enrollments` : candidat × formule, statut, date de début et de fin, activée par
- `questions` : épreuve, niveau (A1 à C2), consigne, média (audio/texte/image), choix, bonne réponse, explication
- `tests` : test blanc ou série (liste ordonnée de questions, durée)
- `attempts` : passage d'un test (début, fin, score, NCLC)
- `answers` : réponse à chaque question
- `submissions` : production écrite ou orale (texte ou fichier audio), statut, note sur 20, commentaire du formateur

## 6. Technique proposée

- Next.js (même base que le site actuel, même charte « bleu logistique » avec un accent propre au TCF).
- Supabase : comptes (email ou téléphone), base de données, stockage des audios, règles d'accès par rôle.
- Hébergement Vercel, projet séparé, domaine `tcf.paulworldtravel.com`.
- Emails (inscription, accès activé, correction disponible) via Brevo, comme le site principal.
- Code dans un dossier `tcf/` de ce dépôt, ou dans un dépôt séparé (à décider).

## 7. Étapes

1. **Vitrine + inscription** : accueil, guide TCF, formules, test de niveau gratuit, inscription, activation manuelle par l'admin.
2. **Entraînement CO/CE** : banque de questions, séries, tests blancs chronométrés, scores et NCLC.
3. **Expression écrite et orale** : rédaction, enregistrement audio, file de correction formateur.
4. **Cours et suivi** : leçons, tableau de bord détaillé, rappels par email.

## 8. Questions ouvertes

- Formules et prix (ex. 1 mois / 3 mois, toutes épreuves ou à la carte) ?
- Cours en ligne uniquement, ou aussi en présentiel à Douala avec des sessions et dates ?
- Qui produit les questions et les audios au départ ? Combien de tests blancs au lancement ?
- Correction des expressions : formateurs seulement, ou pré-correction automatique par IA validée ensuite par un formateur ?
- Le nom de domaine `paulworldtravel.com` est-il déjà acheté, et chez qui ?
