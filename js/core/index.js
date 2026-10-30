/*
 * Moteur du jeu : point d'entrée Node (tests, outils/publier.js).
 * Dans le navigateur, les modules de js/core/ sont chargés un par un par les pages HTML
 * et s'ajoutent à window.Engine.
 */
module.exports = Object.assign({},
  require('./text.js'),
  require('./path.js'),
  require('./time.js'),
  require('./geo.js'),
  require('./scoring.js'),
  require('./validate.js'),
  require('./publish.js'));
