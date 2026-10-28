# Veille TCF Cameroun et compréhension écrite — 28 octobre 2026

## Sources et constat

- France Éducation international : https://www.france-education-international.fr/test/tcf-canada
- Exemples publiés par FEI : https://www.france-education-international.fr/test/exemples-epreuves-tcf
- Institut français du Cameroun : https://www.ifcameroun.com/
- Plateforme d’inscription de l’IFC : https://ifc-polelangue.tlscontact.com/

Format vérifié sur la présentation officielle : compréhension écrite, 39 QCM, quatre propositions et une bonne réponse, 60 minutes, difficulté progressive. Les exemples officiels sont référencés par lien ; leurs textes ne sont pas recopiés dans la banque.

Premier passage réel du collecteur : HTTP 200 pour la fonction ; IFC HTTP 503, TLScontact HTTP 403, FEI accessible. Aucune prochaine date d’examen n’a été confirmée. Des résultats de recherche tiers affichaient des informations divergentes et des documents anciens : ils ne servent pas de source de publication de sessions.

## Contrôle des questions

Les six questions originales préexistantes ont été relues : informations explicites, distinction obligatoire/facultatif, exceptions d’horaires, idée principale et interprétation. Aucun changement de corrigé n’était nécessaire. Elles sont conservées dans le parcours de découverte.

66 questions originales supplémentaires couvrent messages, annonces, conditions, documents professionnels, opinions, inférences et argumentation. Une ambiguïté dans un distracteur de la question `c2-memoire` a été corrigée pendant la relecture. Les réponses reposent sur le document fourni et chaque question comporte une explication. Les niveaux A1–C2 sont pédagogiques et indicatifs ; une validation par des formateurs reste nécessaire pour étalonner la difficulté et enrichir la diversité des textes, notamment aux niveaux avancés.

Les séries mensuelles utilisent 4 questions A1, 6 A2, 9 B1, 10 B2, 6 C1 et 4 C2, soit 39. Cette répartition n’est pas présentée comme un quota officiel. Le tirage dépend de la version de banque, du mois et de la combinaison ; les propositions sont mélangées avec mise à jour du corrigé. Chaque série contient des documents distincts, mais les différentes séries partagent une banque de 72 questions.

Il n’existe ici aucune archive de sujets réellement passés par année ou par mois. Choisir une année passée produit une combinaison d’entraînement de la banque actuelle, sans lui attribuer une provenance d’examen historique.

## Publication et suivi

Les annonces automatiques reprennent un titre et un lien vers la source officielle, sans résumé inventé. Les dates de publication absentes restent inconnues. Les sessions automatiques nécessitent des données structurées explicites ; une annonce d’inscription datée ne suffit pas. Les cartes de session signalent une vérification de plus de 48 h. Aucune disponibilité de places n’est déduite de l’existence d’une date.

Les administrateurs peuvent ajouter les sessions confirmées auprès des centres et retirer une annonce. La collecte ne rétablit pas un contenu retiré. Les données publiques ont des politiques RLS séparées pour les visiteurs et les membres ; seules les publications affichables sont lisibles anonymement. Le jeton privé du collecteur reste dans Vault et n’est jamais exposé dans la page.

Le job est actif quotidiennement à 07:00 Africa/Douala. Les pages et les exercices sont implémentés dans l’application Formation du dépôt ; leur déploiement web reste distinct de l’activation du collecteur Supabase.

## Extension aux quatre épreuves

Le catalogue `/entrainement/series/` coordonne les sélections mensuelles des quatre rubriques. Les recherches, banques et interfaces CO/CE/EO/EE ont été réparties entre quatre sous-agents explicitement demandés par l’utilisateur. L’intégration, les contrôles navigateur, le suivi des sources et le schéma Supabase ont été effectués par l’orchestrateur. Les pages et leurs paramètres sont décrits dans le README de Formation ; chaque rubrique possède son document de sources propre.
