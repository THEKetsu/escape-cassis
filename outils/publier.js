#!/usr/bin/env node
/*
 * Équivalent en ligne de commande du bouton « Télécharger game.js » de outils.html.
 * Usage : node outils/publier.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const E = require('../js/core/index.js');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'contenu.js'), 'utf8'), sandbox);
const game = sandbox.window.GAME_SOURCE;

const { errors, warnings } = E.validate(game);
warnings.forEach((w) => console.warn('⚠️ ', w));
if (errors.length) {
  errors.forEach((e) => console.error('❌', e));
  process.exit(1);
}

E.publishedFile(game).then((file) => {
  fs.writeFileSync(path.join(root, 'game.js'), file);
  fs.writeFileSync(path.join(root, 'supabase-equipes.sql'), E.secretsSql(game));
  console.log('🔑 supabase-equipes.sql généré (clés d\'équipe) : à exécuter dans Supabase seulement si vous changez une équipe ou sa clé.');
  console.log('✅ game.js généré : vous pouvez l\'envoyer sur GitHub (jamais contenu.js).');
});
