/* Fichier généré à partir de contenu.js : ne pas modifier à la main. */
window.GAME = {
  "id": "cassis-ccoi-2026-b",
  "title": "Les Secrets de Cassis",
  "settings": {
    "salt": "cassis-ccoi-2026-x7Qp",
    "hintPenalties": [
      60,
      120,
      180
    ],
    "skipPenalty": 600,
    "stuckMinutes": 12,
    "teamPicker": false,
    "showLeaderboard": true,
    "liveLocation": true,
    "intro": "<p>Cassis cache ses secrets dans ses ruelles. Parcourez les zones dans l'ordre que le jeu vous indique, résolvez les énigmes et rejoignez le point final le plus vite possible.</p>",
    "finalMessage": "<p>Rejoignez le groupe pour l'énigme finale commune !</p>",
    "masterHash": "c6106b91c2340efa"
  },
  "teams": {
    "E1": {
      "name": "Équipe 1",
      "circuit": [
        1,
        2,
        3,
        4,
        5
      ],
      "variant": "A"
    },
    "E2": {
      "name": "Équipe 2",
      "circuit": [
        2,
        3,
        4,
        5,
        1
      ],
      "variant": "A"
    },
    "E3": {
      "name": "Équipe 3",
      "circuit": [
        3,
        4,
        5,
        1,
        2
      ],
      "variant": "A"
    },
    "E4": {
      "name": "Équipe 4",
      "circuit": [
        4,
        5,
        1,
        2,
        3
      ],
      "variant": "A"
    },
    "E5": {
      "name": "Équipe 5",
      "circuit": [
        5,
        1,
        2,
        3,
        4
      ],
      "variant": "A"
    },
    "E6": {
      "name": "Équipe 6",
      "circuit": [
        1,
        5,
        4,
        3,
        2
      ],
      "variant": "B"
    },
    "E7": {
      "name": "Équipe 7",
      "circuit": [
        3,
        2,
        1,
        5,
        4
      ],
      "variant": "B"
    },
    "E8": {
      "name": "Équipe 8",
      "circuit": [
        5,
        4,
        3,
        2,
        1
      ],
      "variant": "B"
    }
  },
  "zones": {
    "1": {
      "name": "Le Port",
      "lat": 43.21395,
      "lng": 5.53606,
      "A": [
        {
          "type": "number",
          "title": "Mission 1 — La clé de pierre",
          "text": "<p>Votre mission commence sur la <b>Place Baragnon</b>.</p><p>Quelque part autour de vous, un monument conserve une information essentielle.</p><p>Observez attentivement la place et retrouvez le monument portant une date gravée en chiffres romains. Lorsque vous l'avez trouvée, convertissez cette date en chiffres arabes.</p><p><b>Quelle année avez-vous trouvée ?</b></p>",
          "wrong": "❌ Ce n'est pas la bonne année.<br>Observez bien les monuments présents sur la place. Vous cherchez une date gravée en chiffres romains.<br>Réessayez.",
          "hints": [
            "Vous cherchez un monument en pierre sur la Place Baragnon.",
            "Approchez-vous de la fontaine Baragnon.<br>Une date y est gravée.",
            "Rappel : M = 1000, D = 500, C = 100, L = 50, X = 10, V = 5, I = 1."
          ],
          "success": {
            "title": "✅ DATE IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">1911</p><p>Mais cette date n'est pas votre destination.<br>Elle cache une clé.</p>"
          },
          "h": [
            "69dc82a50df57076"
          ]
        },
        {
          "type": "number",
          "title": "La clé",
          "text": "<p>Additionnez les quatre chiffres de l'année :</p><p class=\"big-code\">1 + 9 + 1 + 1 = ?</p><p>Entrez votre résultat.</p>",
          "wrong": "❌ La clé n'est pas correcte.<br>Reprenez les quatre chiffres de l'année trouvée et additionnez-les : 1 + 9 + 1 + 1",
          "success": {
            "title": "✅ CLÉ TROUVÉE",
            "text": "<p>Votre clé est :</p><p class=\"big-code\">12</p>"
          },
          "h": [
            "880b2e4ec3b20ca0"
          ]
        },
        {
          "type": "text",
          "title": "Le message crypté",
          "text": "<p>Un message a été intercepté.</p><p class=\"big-code\">BADF PQ OMEEUE</p><p>Il a été chiffré à l'aide d'un <b>code César</b> : chaque lettre du message original a été décalée.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
          "wrong": "❌ MESSAGE NON DÉCRYPTÉ<br>Votre clé est bien 12. Pour chaque lettre du message, comptez 12 lettres en arrière dans l'alphabet.<br>Essayez de nouveau.",
          "hints": [
            "Commencez par le premier mot : <b>BADF</b><br>Avec une clé de 12 : B → P",
            "Le premier mot décrypté est : <b>PORT</b>",
            "Le message complet comporte trois mots :<p class=\"big-code\">_ _ _ _ &nbsp; _ _ &nbsp; _ _ _ _ _ _</p>"
          ],
          "success": {
            "title": "✅ MESSAGE DÉCRYPTÉ",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">PORT DE CASSIS</p><p>Votre prochaine destination est le <b>Port de Cassis</b>.<br>Rendez-vous sur place pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "8d24517e0969ae5b",
            "60301863596af296",
            "2806ba3f9393a056"
          ]
        },
        {
          "type": "image-choice",
          "title": "Les portes du quai",
          "text": "<p>Face aux bateaux, observez les façades. Une seule de ces formes de porte est présente sur la maison bleue.</p><p class=\"demo\">[DÉMO : choisissez l'arc en plein cintre]</p>",
          "options": [
            {
              "img": "images/porte-arc.svg",
              "label": "Plein cintre"
            },
            {
              "img": "images/porte-rect.svg",
              "label": "Linteau droit"
            },
            {
              "img": "images/porte-ogive.svg",
              "label": "Ogive"
            }
          ],
          "hints": [
            "Cherchez une porte dont le haut est un demi-cercle parfait."
          ],
          "h": [
            "10234a9fc712259c"
          ]
        },
        {
          "type": "number",
          "title": "Amarrage",
          "text": "<p>Comptez les bittes d'amarrage entre la fontaine et le bout du quai.</p><p class=\"demo\">[DÉMO : 12]</p>",
          "hints": [
            "Ce sont les gros plots en métal où l'on attache les cordages.",
            "Il y en a entre 10 et 15."
          ],
          "success": {
            "text": "<p>Ouvrez l'<b>enveloppe n°1</b> remise au départ : elle vous sera utile pour la finale.</p>"
          },
          "h": [
            "880b2e4ec3b20ca0"
          ]
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Anagramme",
          "text": "<p>Remettez ces lettres dans l'ordre pour trouver votre prochaine destination :</p><p class=\"big-code\">T R O P</p>",
          "hints": [
            "C'est là que les bateaux se reposent.",
            "Le mot commence par P."
          ],
          "success": {
            "text": "<p>Direction <b>le port</b> !</p>"
          },
          "h": [
            "2806ba3f9393a056",
            "1bf224fd1f2e80b8"
          ]
        },
        {
          "type": "qcm",
          "title": "Le bateau du pays",
          "text": "<p>Parmi les barques amarrées, un type de bateau traditionnel provençal domine. Lequel ?</p>",
          "options": [
            "La gondole",
            "Le pointu",
            "Le drakkar",
            "La jonque"
          ],
          "hints": [
            "Sa proue et sa poupe sont effilées.",
            "Son nom évoque sa forme…"
          ],
          "h": [
            "0ab333bab73b5768"
          ]
        },
        {
          "type": "number",
          "title": "La date gravée",
          "text": "<p>Une date est gravée sur la façade de la capitainerie. Laquelle ?</p><p class=\"demo\">[DÉMO : 1890]</p>",
          "hints": [
            "Levez les yeux, au-dessus de la porte."
          ],
          "success": {
            "text": "<p>Ouvrez l'<b>enveloppe n°1</b>.</p>"
          },
          "h": [
            "b19c88906db81239"
          ]
        }
      ]
    },
    "2": {
      "name": "Église Saint-Michel",
      "lat": 43.21583,
      "lng": 5.53789,
      "A": [
        {
          "type": "text",
          "title": "Le gardien ailé",
          "text": "<p>L'archange qui terrasse le dragon veille sur votre prochaine étape. Où devez-vous aller ?</p>",
          "match": "contains",
          "hints": [
            "C'est un édifice religieux.",
            "Il porte le nom du chef des archanges."
          ],
          "success": {
            "text": "<p>Rendez-vous devant l'<b>église Saint-Michel</b>.</p>"
          },
          "h": [
            "662a402ef8d1b1c9",
            "8d105d6c41d2ab40"
          ]
        },
        {
          "type": "text",
          "title": "Jeu des différences",
          "text": "<p>Le plan n°1 est celui d'origine. Sur le plan n°2, un élément de la façade a disparu. Lequel ? Comparez avec la vraie façade !</p>",
          "images": [
            "images/facade-a.svg",
            "images/facade-b.svg"
          ],
          "hints": [
            "Regardez en haut, au centre.",
            "C'est une fenêtre ronde."
          ],
          "h": [
            "c68bc7dcd8bcf848",
            "420b1e3a8d9001df",
            "89042cc0374e5604"
          ]
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Les nombres parlent",
          "text": "<p>Chaque nombre est une lettre :</p><p class=\"big-code\">5 · 7 · 12 · 9 · 19 · 5</p>",
          "match": "contains",
          "hints": [
            "1 = A, 2 = B…",
            "Le 5 est un E."
          ],
          "success": {
            "text": "<p>Direction l'<b>église Saint-Michel</b> !</p>"
          },
          "h": [
            "5383263578a876cb",
            "662a402ef8d1b1c9"
          ]
        },
        {
          "type": "tap",
          "title": "Œil de lynx",
          "text": "<p>Sur ce relevé, un élément de la façade a été effacé. <b>Touchez l'endroit où il devrait se trouver.</b></p>",
          "image": "images/facade-b.svg",
          "target": {
            "x": 50,
            "y": 42,
            "r": 10
          },
          "hints": [
            "Il est au centre, au-dessus de la porte."
          ]
        },
        {
          "type": "number",
          "title": "L'escalier",
          "text": "<p>Combien de marches faut-il gravir pour atteindre la porte principale ?</p><p class=\"demo\">[DÉMO : 7]</p>",
          "hints": [
            "Comptez depuis le niveau de la rue."
          ],
          "h": [
            "6d8982026a62f21b",
            "381d465254912b8b"
          ]
        }
      ]
    },
    "3": {
      "name": "Le Four Banal",
      "lat": 43.21478,
      "lng": 5.53776,
      "A": [
        {
          "type": "text",
          "title": "Qui suis-je ?",
          "text": "<p>Autrefois, je cuisais le pain de tout le village et chacun payait sa part au seigneur. Qui suis-je ?</p>",
          "match": "contains",
          "hints": [
            "Le mot « banal » désignait ce qui appartenait au seigneur.",
            "On y enfournait le pain."
          ],
          "success": {
            "text": "<p>Rendez-vous au <b>Four Banal</b>.</p>"
          },
          "h": [
            "97487b5e42ae8708",
            "fce3ff48e0219f1a"
          ]
        },
        {
          "type": "text",
          "title": "Le gardien du four",
          "text": "<p><b>Entrez dans le Four Banal et interrogez la personne présente.</b> Elle vous confiera un mot de passe si vous lui dites « Le pain est cuit ».</p><p class=\"demo\">[DÉMO : FOURNIL]</p>",
          "hints": [
            "Il faut parler à la personne à l'intérieur !"
          ],
          "h": [
            "9c9b0442e107c6ca"
          ]
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Miroir, mon beau miroir",
          "text": "<p>Ce message se lit dans un miroir :</p><p class=\"big-code mirror\">FOUR BANAL</p><p>Où devez-vous aller ?</p>",
          "match": "contains",
          "hints": [
            "Utilisez l'écran éteint d'un téléphone comme miroir."
          ],
          "success": {
            "text": "<p>Rendez-vous au <b>Four Banal</b>.</p>"
          },
          "h": [
            "97487b5e42ae8708"
          ]
        },
        {
          "type": "info",
          "title": "Rencontre",
          "text": "<p><b>Entrez dans le Four Banal et demandez à la personne présente de vous raconter une tradition cassidenne.</b> Revenez ensuite à l'application.</p>",
          "button": "C'est fait, on a la réponse"
        },
        {
          "type": "text",
          "title": "La tradition",
          "text": "<p>Quelle fête la personne vous a-t-elle décrite ?</p><p class=\"demo\">[DÉMO : VENDANGES]</p>",
          "match": "contains",
          "hints": [
            "Elle est liée au vin de Cassis."
          ],
          "h": [
            "232cbdd91bc529e0",
            "f4b21de3a5104c2b"
          ]
        }
      ]
    },
    "4": {
      "name": "Place Baragnon",
      "lat": 43.21427,
      "lng": 5.5396,
      "A": [
        {
          "type": "text",
          "title": "Le télégraphe",
          "text": "<p>Un message vous parvient en morse :</p><p class=\"big-code\">-... .- .-. .- --. -. --- -.</p>",
          "match": "contains",
          "hints": [
            "Les lettres sont séparées par des espaces.",
            "B = -...  A = .-  R = .-.",
            "G = --.  N = -.  O = ---"
          ],
          "success": {
            "text": "<p>Rendez-vous <b>place Baragnon</b>.</p>"
          },
          "h": [
            "0a792bcc53efb9ff",
            "090f7dbba7c29d30"
          ]
        },
        {
          "type": "qr",
          "title": "Le code caché",
          "text": "<p>Un QR code est caché près de la fontaine. Scannez-le avec l'appareil photo du téléphone, ou tapez le code écrit dessous.</p><p class=\"demo\">[DÉMO : FONTAINE]</p>",
          "hints": [
            "Il est à hauteur de genou."
          ],
          "h": [
            "34663b9c47226365"
          ]
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Acrostiche",
          "text": "<p><b>B</b>ateaux <b>A</b>marrés, <b>R</b>ames <b>A</b>lignées, <b>G</b>oélands <b>N</b>ichant, <b>O</b>ndes <b>N</b>onchalantes.</p><p>Où vous attend la suite ?</p>",
          "match": "contains",
          "hints": [
            "Regardez les lettres en gras."
          ],
          "success": {
            "text": "<p>Rendez-vous <b>place Baragnon</b>.</p>"
          },
          "h": [
            "0a792bcc53efb9ff",
            "090f7dbba7c29d30"
          ]
        },
        {
          "type": "qr",
          "title": "À l'ombre",
          "text": "<p>Un QR code est caché au pied du plus grand arbre de la place. Scannez-le ou tapez le code écrit dessous.</p><p class=\"demo\">[DÉMO : PLATANE]</p>",
          "hints": [
            "Le tronc est tacheté."
          ],
          "h": [
            "1ef18f258173dd36"
          ]
        }
      ]
    },
    "5": {
      "name": "Plage de la Grande Mer",
      "lat": 43.21281,
      "lng": 5.53782,
      "A": [
        {
          "type": "gps",
          "title": "Les pieds dans le sable",
          "text": "<p>Rejoignez la plage de la Grande Mer. Une fois sur place, vérifiez votre position.</p>",
          "lat": 43.2131,
          "lng": 5.5357,
          "radius": 60,
          "hints": [
            "C'est la grande plage juste à côté du port."
          ],
          "h": [
            "33fbe6860abfed1b"
          ]
        },
        {
          "type": "text",
          "title": "Une lettre sur deux",
          "text": "<p class=\"big-code\">CXAXLXAXNXQXUXEXS</p>",
          "hints": [
            "Ignorez certaines lettres.",
            "Supprimez tous les X."
          ],
          "success": {
            "text": "<p>Ouvrez l'<b>enveloppe n°5</b>.</p>"
          },
          "h": [
            "1d40026ebc290771",
            "c6106b91c2340efa"
          ]
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Le grand bleu",
          "text": "<p>On la dit « grande », elle borde la ville et la plage voisine porte son nom. Où allez-vous ?</p>",
          "match": "contains",
          "hints": [
            "C'est une plage.",
            "Grande… ?"
          ],
          "success": {
            "text": "<p>Rendez-vous sur la <b>plage de la Grande Mer</b>.</p>"
          },
          "h": [
            "b5a22189b9b238bf"
          ]
        },
        {
          "type": "number",
          "title": "Le compte est bon",
          "text": "<p>Additionnez les numéros des trois postes de secours visibles depuis la plage.</p><p class=\"demo\">[DÉMO : 6]</p>",
          "hints": [
            "Les numéros sont peints sur les cabanes."
          ],
          "success": {
            "text": "<p>Ouvrez l'<b>enveloppe n°5</b>.</p>"
          },
          "h": [
            "a03f6d2f77062b5c",
            "b7eaec8d9cb6c8bc"
          ]
        }
      ]
    }
  },
  "final": {
    "name": "Rendez-vous final",
    "steps": [
      {
        "type": "info",
        "title": "Toutes les zones sont terminées !",
        "text": "<p>Rejoignez l'organisatrice au point de rendez-vous final : <b>[lieu à définir]</b>.</p>",
        "button": "Nous y sommes"
      },
      {
        "type": "text",
        "title": "Code d'arrivée",
        "text": "<p>Demandez le code d'arrivée à l'organisatrice et saisissez-le pour arrêter le chrono.</p><p class=\"demo\">[DÉMO : ARRIVEE]</p>",
        "success": {
          "text": "<p>Chrono arrêté ! Place à l'énigme finale commune…</p>"
        },
        "h": [
          "ca45fb88dcefb3b4"
        ]
      }
    ]
  }
};
