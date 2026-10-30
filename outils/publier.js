#!/usr/bin/env node
/*
 * Équivalent en ligne de commande du bouton « Télécharger game.js » de outils.html.
 * Usage : node outils/publier.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const E = require('../js/engine.js');

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
  console.log('✅ game.js généré : vous pouvez l\'envoyer sur GitHub (jamais contenu.js).');
});
