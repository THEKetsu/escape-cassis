/*
 * Configuration technique (publique : rien de secret ici).
 * Le contenu du jeu (équipes, circuits, énigmes) est dans contenu.js.
 */
window.CONFIG = {
  // Adresse publique du jeu une fois publié sur GitHub Pages (sert à générer les QR codes)
  publicUrl: 'https://theketsu.github.io/escape-cassis/',

  // Dashboard en direct : Supabase (gratuit). Laisser vide pour jouer sans dashboard.
  // Project Settings > API Keys : "Project URL" et clé "publishable" (ou "anon" legacy).
  supabase: {
    url: 'https://glhrvkwmlvzawkrgwbtu.supabase.co',
    key: 'sb_publishable_TXdp_Afs-bmaJV2w_9oC1Q_r1_XoOzD',
    // Email du compte organisateur créé dans Supabase (Authentication > Users) : son mot de passe est le code d'accès du dashboard
    adminEmail: ''
  },
};
