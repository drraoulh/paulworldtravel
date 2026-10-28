# Compréhension orale : sources et supports

Travail du 28 octobre 2026 pour l’application Formation.

## Format vérifié

La présentation de France Éducation international indique une compréhension orale TCF Canada de 39 QCM, quatre choix et une réponse juste, en 35 minutes. Les exemples publiés présentent des consignes liées à une image, des échanges quotidiens et des documents sonores dont il faut comprendre une information, une intention ou une idée.

- Présentation officielle : https://www.france-education-international.fr/test/tcf-canada
- Exemples officiels : https://www.france-education-international.fr/test/exemples-epreuves-tcf
- Sources consultées le 28 octobre 2026, index web officiel. Aucune transcription ou image FEI n’est reproduite.

## Banque originale et combinaisons

51 scripts, questions, choix et explications originaux. Aux niveaux avancés, les échanges ciblent les réserves implicites, malentendus, intentions, repositionnements dans une discussion et conditions d’un accord. Les propositions ont été relues pour qu’une seule réponde à la question posée.

Chaque programme mensuel dispose de trois combinaisons reproductibles de 39 documents distincts : 4 A1, 6 A2, 9 B1, 10 B2, 6 C1, 4 C2. Les niveaux sont indicatifs et cette répartition n’est pas une répartition officielle. Les différentes combinaisons partagent la même banque ; choisir un mois ou une année passée ne transforme pas les exercices en annales de cette période.

## Audio et attribution

51 MP3 statiques sont produits à partir des scripts originaux par Piper 1.8.0, avec la voix française `fr_FR-siwis-medium` (mono, 22 050 Hz à la source), puis encodés en MP3 par FFmpeg. Le moteur et le modèle ne sont pas distribués dans l’application ; seuls les fichiers produits le sont. La génération se fait hors ligne après téléchargement du modèle, sans envoyer les scripts à un service de synthèse.

- Modèle Rhasspy/Piper : https://huggingface.co/rhasspy/piper-voices/tree/main/fr/fr_FR/siwis/medium
- Fiche du modèle : https://huggingface.co/rhasspy/piper-voices/blob/main/fr/fr_FR/siwis/medium/MODEL_CARD
- Le modèle décrit sa base SIWIS comme CC BY 4.0 : https://creativecommons.org/licenses/by/4.0/
- Attribution du jeu de données : Yamagishi, Junichi ; Honnet, Pierre-Edouard ; Garner, Philip ; Lazaridis, Alexandros. (2017). *The SIWIS French Speech Synthesis Database, 2016* [dataset]. University of Edinburgh, Centre for Speech Technology Research. DOI : https://doi.org/10.7488/ds/1705 ; notice : https://datashare.ed.ac.uk/handle/10283/2353
- Transformations : nouveaux scripts originaux, synthèse vocale et encodage MP3. Les enregistrements du jeu de données ne sont pas repris tels quels.

`formation/public/audio/co/manifest.json` conserve durée et empreintes SHA-256 de chaque MP3 et de sa transcription. Les tests détectent un audio absent ou une désynchronisation après modification du script.

Limites pédagogiques clairement affichées : une seule voix synthétique française, y compris pour les dialogues ; pas de diversité d’accents, de comédiens ou d’intonations comparable à l’examen réel. La durée globale est 35 minutes, mais les documents restent des entraînements et n’imitent pas un enchaînement audio officiel.

## Image

L’illustration `formation/public/images/co/library-return.png` a été générée spécifiquement pour une consigne A1 : une cliente remet un livre à un bibliothécaire. Elle ne provient ni d’une épreuve FEI ni d’une image trouvée sans licence. L’original généré est conservé séparément dans l’espace de travail.

## Parcours et contrôles

Route `/entrainement/comprehension-orale/`, paramètres `?mois=YYYY-MM&serie=1..3` compatibles avec le catalogue central. Les paramètres invalides reviennent au mois courant Africa/Douala et à la série 1.

Mode guidé : plusieurs écoutes, correction et transcription après réponse. Mode chronométré : une écoute, pas de retour en arrière, 35 minutes calculées sur une échéance absolue, bilan et transcriptions à la fin. Le lecteur signale un fichier indisponible au lieu de présenter un faux succès. Le bilan reste un nombre de bonnes réponses, sans conversion TCF/NCLC. Un seul bilan local par combinaison peut être effacé.

Vérifications : tests Node de la banque, 108 combinaisons, validité des réponses, présence des médias, durées et empreintes ; compilation TypeScript. Aucun changement des dépendances de l’application n’est nécessaire pour lire les MP3.
