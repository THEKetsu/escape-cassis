// Vérifie que les pages HTML ne pointent que vers des fichiers qui existent et que chaque JS a une syntaxe valide.
// Lancer : node --test test/pages.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.join(__dirname, '..');
const PAGES = ['index.html', 'admin.html', 'outils.html'];
// contenu.js est ignoré par git et absent du site publié ; il est injecté à part (document.write) ou chargé en local.
const OPTIONAL = new Set(['contenu.js']);

function localRefs(html) {
  const refs = [];
  for (const m of html.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
    if (!/^(https?:)?\/\//.test(m[1])) refs.push(m[1]);
  }
  return refs;
}

for (const page of PAGES) {
  test(`${page} : fichiers référencés présents`, () => {
    const refs = localRefs(fs.readFileSync(path.join(root, page), 'utf8'));
    assert.ok(refs.length > 0);
    for (const ref of refs) {
      if (OPTIONAL.has(ref)) continue;
      assert.ok(fs.existsSync(path.join(root, ref)), `${page} référence ${ref} qui n'existe pas`);
    }
  });

  test(`${page} : syntaxe des scripts`, () => {
    const refs = localRefs(fs.readFileSync(path.join(root, page), 'utf8')).filter((r) => r.endsWith('.js') && !OPTIONAL.has(r));
    for (const ref of refs) execFileSync(process.execPath, ['--check', path.join(root, ref)]);
  });
}

test('aucun fichier JS ou CSS du dépôt ne reste hors des pages', () => {
  const used = new Set();
  for (const page of PAGES) for (const r of localRefs(fs.readFileSync(path.join(root, page), 'utf8'))) used.add(r);
  const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = `${dir}/${e.name}`;
    return e.isDirectory() ? walk(rel) : [rel];
  });
  // js/core/index.js ne sert qu'à Node (tests et publier.js)
  const orphans = [...walk('js'), ...walk('css')].filter((f) => !used.has(f) && f !== 'js/core/index.js');
  assert.deepStrictEqual(orphans, []);
});
