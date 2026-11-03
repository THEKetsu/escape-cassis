# Plan B : si quelque chose ne marche pas le jour J

À imprimer et à garder sur soi. Le jeu fonctionne sans réseau : la progression reste sur le téléphone et se renvoie dès que le réseau revient. Le dashboard est un confort, pas une condition pour jouer.

## La veille
- Ouvrir le dashboard (`admin.html`) : un projet Supabase gratuit est mis en pause après 7 jours sans activité (sur supabase.com, bouton « Restore »).
- Vérifier que le site publié est à jour (dernier `game.js`) et que les QR codes sont imprimés.
- Cliquer sur « Effacer toutes les données » (dashboard) pour repartir d'une base vide après les tests.
- Charger les téléphones d'organisation et prévoir des batteries externes : le GPS vide vite les batteries.

## Pendant le jeu

| Problème | Que faire |
|---|---|
| Une équipe n'a plus de réseau | Rien : elle continue à jouer, le dashboard la montre « Sans signal » et se met à jour au retour du réseau. |
| Le dashboard n'affiche plus rien | Bouton ↻. Si l'erreur persiste : projet Supabase en pause ou réseau de l'organisation coupé. Les équipes continuent de jouer ; relever les arrivées à la main. |
| Un téléphone est resté sur une ancienne partie | Après « Effacer toutes les données », les téléphones connectés repartent de zéro en moins de 10 s. Un téléphone qui ne l'a pas fait (hors réseau, ancienne version de la page) : lien **réinitialiser** en bas de l'accueil ou de l'écran d'énigme, avec le code organisation. |
| Un téléphone est mort ou cassé | Un autre membre de l'équipe scanne le **même QR code d'équipe** et choisit « Reprendre la partie » : l'état est repris depuis le serveur. Une seule personne joue ensuite. |
| Une équipe est bloquée | La voir sur le dashboard (« Bloquée ? »), lui écrire par le tchat, puis lui donner le **code organisation** (bouton 🔑 en bas de l'écran de l'étape) : l'étape est passée avec une pénalité. |
| Le GPS ne valide pas la position | Taper le **code de secours** sous « Le GPS ne marche pas ? » (voir 🔑 Réponses). |
| Un QR code d'étape est abîmé ou introuvable | Le code est écrit sous le QR : la saisie manuelle fonctionne. |
| Mauvaise réponse acceptée ou bonne réponse refusée | Donner le code organisation pour passer l'étape, puis corriger `contenu.js`, relancer `node outils/publier.js` et republier : les téléphones prennent le nouveau `game.js` au rechargement. |
| Deux équipes sur la même zone | Normal si elles ont des variantes différentes (A et B). Sinon, demander à l'une d'attendre quelques minutes. |
| Tout tombe (site, réseau) | Rendez-vous au point final, classement à la main : les téléphones gardent le temps de chaque équipe. |

## Après le jeu
- Dashboard → **📊 Export** : le bilan en CSV (classement, durée, indices et erreurs par étape). À faire **avant** « Effacer toutes les données ».

## À compléter avant le jour J
- Numéro de téléphone de l'organisation (aussi dans `rules` de `contenu.js`, affiché sur l'accueil des joueurs) : `______________`
- Point de rendez-vous de départ et heure : `______________`
- Point de rendez-vous final : `______________`
