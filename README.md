# Les Secrets de Cassis : moteur de jeu de piste

Web app gratuite et sans installation : **un téléphone par équipe**, chaque équipe scanne son QR code et suit son propre circuit.
Le dashboard montre en direct où en est chaque équipe.

| Fichier | Rôle |
|---|---|
| `contenu.js` | **Le contenu du jeu** : équipes, circuits, énigmes, réponses en clair. ⚠️ Ne jamais le publier. |
| `game.js` | Copie publiable de `contenu.js` (réponses remplacées par des empreintes). Générée automatiquement. |
| `config.js` | Adresse publique du jeu + clés Supabase (publiques). |
| `index.html` | Le jeu (joueurs). |
| `admin.html` | Le dashboard organisation. |
| `outils.html` | Préparation : vérification, simulation des circuits, génération de `game.js`, QR codes à imprimer. |
| `images/` | Plans, photos, schémas des énigmes. |

---

## 1. Tester sur son ordinateur (5 min)

1. Double-cliquez sur `index.html` : le jeu s'ouvre et lit directement `contenu.js`.
2. Pour jouer une équipe, ajoutez `?equipe=E1` à la fin de l'adresse dans le navigateur.
3. Pour recommencer : ajoutez `?reset` à l'adresse.
4. Ouvrez `outils.html` : vérification du contenu, tableau de répartition des équipes, QR codes.

Les réponses des énigmes de démo sont indiquées en rouge « [DÉMO : …] ».

## 2. Écrire ses énigmes

Tout se passe dans `contenu.js`, documenté en tête de fichier. Pour chaque zone, deux variantes `A` et `B`, chacune étant une suite d'étapes :

```js
{
  type: 'text',                       // info | text | number | qcm | image-choice | qr | gps
  title: 'Le gardien ailé',
  text: '<p>L\'archange qui terrasse le dragon…</p>',
  images: ['images/plan-1.jpg', 'images/plan-2.jpg'],
  answers: ['SAINT MICHEL', 'EGLISE SAINT MICHEL'],
  match: 'contains',                  // facultatif : accepte la réponse au milieu d'une phrase
  hints: ['Indice 1', 'Indice 2', 'Indice 3'],
  success: { text: '<p>Ouvrez l\'enveloppe n°2 !</p>' },
}
```

- **Réponses** : majuscules, accents, tirets, apostrophes et espaces sont ignorés ; « St » vaut « Saint ».
  Donc `answers: ['SAINT MICHEL']` accepte « Saint-Michel », « saint michel », « St Michel »…
- **Interaction humaine** : une étape `info` (« Entrez dans le Four Banal et interrogez la personne présente », bouton « C'est fait »), suivie d'une étape `text` où l'équipe saisit ce qu'elle a appris. On peut aussi tout mettre dans une seule étape `text`.
- **Révéler la prochaine destination** : la 1re étape de chaque zone est l'énigme qui y mène. Comme elle appartient à la zone d'arrivée, cela fonctionne quel que soit l'ordre du circuit.
- **Images** : déposez-les dans `images/` (JPG/PNG, idéalement < 500 Ko, 1200 px de large suffisent). Sur le téléphone, un appui sur une image l'agrandit.
- **QR checkpoint** : étape `qr`, avec le code dans `answers`. Les QR codes à imprimer sont générés dans `outils.html` (section 5). Le code est aussi imprimé dessous, pour pouvoir le saisir à la main.
- **GPS** : étape `gps` avec `lat`, `lng` (clic droit sur Google Maps → copier les coordonnées) et `radius` en mètres. Ajoutez toujours un code de secours dans `answers` : le GPS est parfois imprécis dans les ruelles.

### Circuits et variantes

```js
teams: {
  E1: { name: 'Équipe 1', circuit: [1, 2, 3, 4, 5], variant: 'A' },
  E6: { name: 'Équipe 6', circuit: [1, 5, 4, 3, 2], variant: 'B' },
  E7: { name: 'Équipe 7', circuit: [3, 2, 1, 5, 4], variant: { 3: 'A', 2: 'B', 1: 'B', 5: 'B', 4: 'B' } },
}
```

La répartition fournie (5 équipes dans un sens en A, 3 dans l'autre en B) garantit au plus 2 équipes par zone, avec des variantes différentes.
**Numérotez les zones dans l'ordre d'une boucle à pied** pour que chaque trajet soit court.
Le jour J, avec 6 ou 7 équipes, il suffit de ne pas distribuer les QR codes en trop : rien à modifier.

### Réglages (`settings`)

| Réglage | Défaut | Rôle |
|---|---|---|
| `hintPenalties` | `[60, 120, 180]` | Pénalité (s) des indices 1, 2, 3 |
| `masterCode` | `CALANQUE` | Code organisation : fait passer une étape bloquée (bouton 🔑 en bas de chaque écran) |
| `skipPenalty` | `600` | Pénalité (s) quand le code organisation est utilisé |
| `adminCode` | `ccoi2026` | Code d'accès au dashboard |
| `stuckMinutes` | `12` | Seuil d'alerte « bloquée ? » sur le dashboard |
| `salt` | — | Changez-le une fois (n'importe quel texte) |

**Classement** = temps entre « Démarrer » et la dernière étape validée (le code d'arrivée donné par l'organisation) + pénalités.

## 3. Activer le dashboard (Supabase, gratuit, 10 min)

1. Créez un compte sur [supabase.com](https://supabase.com) (« Continue with GitHub »), puis **New project** (région Europe, mot de passe au choix).
2. **SQL Editor** → New query → collez le contenu de `supabase.sql` → **Run**.
3. **Project Settings → API Keys** : copiez la **Project URL** et la clé **publishable** (ou la clé `anon`) dans `config.js`.
4. Ouvrez `admin.html` : le dashboard se met à jour toutes les 10 s.

> ⚠️ Un projet Supabase gratuit est mis en pause après 7 jours sans activité. **La veille du jeu**, ouvrez le dashboard (ou le projet sur supabase.com, bouton « Restore » si besoin).

Le jeu fonctionne même sans réseau : la progression reste sur le téléphone et se resynchronise dès que le réseau revient.
Si un téléphone tombe en panne, un autre membre de l'équipe scanne le même QR code et clique sur « Reprendre la partie ».

## 4. Publier sur GitHub Pages (gratuit)

1. **Générez `game.js`** : `outils.html` → section 3 → « Télécharger game.js », et remplacez l'ancien fichier.
   (Ou en ligne de commande : `node outils/publier.js`.)
2. Sur GitHub, créez un dépôt **public** nommé `escape-cassis`.
3. Envoyez **tous les fichiers sauf `contenu.js`** : bouton « Add file → Upload files », ou `git push` (le `.gitignore` exclut `contenu.js`).
4. Dans le dépôt : **Settings → Pages → Branch : main / (root) → Save**. Une ou deux minutes plus tard, le jeu est en ligne sur
   `https://VOTRE-PSEUDO.github.io/escape-cassis/`.
5. Renseignez cette adresse dans `publicUrl` (`config.js`), renvoyez `config.js`, puis imprimez les QR codes depuis `outils.html`.

**À chaque modification de `contenu.js`** : regénérez `game.js` et renvoyez-le.

Le dashboard publié s'ouvre sur `https://VOTRE-PSEUDO.github.io/escape-cassis/admin.html`. Il affiche une alerte rouge si `contenu.js` a été publié par erreur.

> Les empreintes rendent les réponses illisibles au premier coup d'œil, mais le texte des énigmes reste dans `game.js`.
> Un participant très motivé pourrait lire les énigmes à venir dans le code source. Pour un événement d'équipe, c'est un risque acceptable.

## 5. Check-list du jour J

- [ ] La veille : réveiller le projet Supabase, effacer les données de test (bouton en bas du dashboard).
- [ ] Faire le parcours complet avec un téléphone (au moins une équipe A et une équipe B).
- [ ] Imprimer les QR codes des équipes (+ 1 jeu de secours) et cacher les QR checkpoints.
- [ ] Au briefing : un capitaine par équipe scanne son QR code, saisit un nom d'équipe et attend le top départ pour « Démarrer ».
- [ ] Batterie : demander aux capitaines de partir chargés (2 h d'écran allumé, GPS…).
- [ ] Garder le dashboard ouvert sur votre téléphone, avec le code organisation sous la main.

## Développement

- Tests du moteur : `node --test test/engine.test.js`
- Aucune dépendance, aucun build : HTML + JavaScript natif.
