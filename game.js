/* Fichier généré à partir de contenu.js : ne pas modifier à la main. */
window.GAME = {
  "id": "cassis-ccoi-2026-b",
  "title": "Les Secrets de Cassis",
  "settings": {
    "salt": "cassis-ccoi-2026-x7Qp",
    "hintPenalties": [
      120,
      240,
      360
    ],
    "skipPenalty": 600,
    "stuckMinutes": 12,
    "teamPicker": false,
    "showLeaderboard": true,
    "liveLocation": true,
    "intro": "<p>Cassis cache ses secrets dans ses ruelles. Parcourez les zones dans l'ordre que le jeu vous indique, résolvez les énigmes et rejoignez le point final le plus vite possible.</p>",
    "rules": "<ul><li>Restez ensemble et respectez la circulation : traversez aux passages piétons.</li><li>Ne touchez pas, ne déplacez rien : tout se résout en observant.</li><li>Un souci ou un blocage ? Écrivez à l'organisation avec le bouton 💬, ou appelez le <a href=\"tel:+33751617623\"><b>07 51 61 76 23</b></a>.</li></ul>",
    "credits": "Créé par Quentin BENDER & Solène PACE",
    "finalMessage": "<p>Rejoignez le groupe pour l'énigme finale commune !</p>",
    "briefing": "<p>Votre équipe va parcourir <b>5 zones</b> de Cassis, une énigme après l'autre.</p><p><b>Restez groupés</b> tout au long du parcours : ne vous dispersez pas et ne vous mélangez pas avec les autres équipes.</p><p>Chaque zone vous mènera à la suivante. Bonne mission !</p>",
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
      "variant": {
        "1": "A",
        "2": "B",
        "3": "A",
        "4": "A",
        "5": "A"
      }
    },
    "E2": {
      "name": "Équipe 2",
      "circuit": [
        1,
        3,
        4,
        5,
        2
      ],
      "variant": {
        "1": "B",
        "2": "A",
        "3": "A",
        "4": "A",
        "5": "A"
      }
    },
    "E3": {
      "name": "Équipe 3",
      "circuit": [
        2,
        3,
        5,
        4,
        1
      ],
      "variant": {
        "1": "A",
        "2": "B",
        "3": "B",
        "4": "B",
        "5": "A"
      }
    },
    "E4": {
      "name": "Équipe 4",
      "circuit": [
        2,
        4,
        3,
        5,
        1
      ],
      "variant": {
        "1": "B",
        "2": "A",
        "3": "B",
        "4": "A",
        "5": "B"
      }
    },
    "E5": {
      "name": "Équipe 5",
      "circuit": [
        3,
        4,
        5,
        1,
        2
      ],
      "variant": {
        "1": "A",
        "2": "B",
        "3": "A",
        "4": "B",
        "5": "B"
      }
    },
    "E6": {
      "name": "Équipe 6",
      "circuit": [
        3,
        5,
        1,
        2,
        4
      ],
      "variant": {
        "1": "A",
        "2": "A",
        "3": "B",
        "4": "A",
        "5": "A"
      }
    },
    "E7": {
      "name": "Équipe 7",
      "circuit": [
        4,
        1,
        2,
        3,
        5
      ],
      "variant": {
        "1": "A",
        "2": "B",
        "3": "B",
        "4": "A",
        "5": "B"
      }
    },
    "E8": {
      "name": "Équipe 8",
      "circuit": [
        5,
        2,
        4,
        1,
        3
      ],
      "variant": {
        "1": "B",
        "2": "A",
        "3": "A",
        "4": "B",
        "5": "A"
      }
    }
  },
  "zones": {
    "1": {
      "name": "Place Baragnon",
      "lat": 43.21427,
      "lng": 5.5396,
      "where": "la Place Baragnon",
      "lastSuccess": {
        "title": "✅ MESSAGE DÉCRYPTÉ",
        "text": "<p>Vous venez de terminer votre 5e et dernière zone.</p><p>Votre parcours individuel est terminé.</p><p>Rendez-vous maintenant au <b>terrain de pétanque</b> sur le port pour la mission finale.</p><p><b>N'oubliez surtout pas votre carte mystère.</b></p>",
        "button": "Rejoindre le point final"
      },
      "A": [
        {
          "type": "number",
          "title": "Mission {{zone}} — La clé de pierre",
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
          "text": "<p>Un message a été intercepté.</p><p class=\"big-code\">BADF PQ OMEEUE</p><p>Il a été chiffré à l'aide d'un <b>code César</b>.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
          "wrong": "❌ MESSAGE NON DÉCRYPTÉ<br>Votre clé est bien 12. Pour chaque lettre du message, comptez 12 lettres en arrière dans l'alphabet.<br>Essayez de nouveau.",
          "hints": [
            "Commencez par le premier mot : <b>BADF</b><br>Avec une clé de 12 : B → P",
            "Le premier mot décrypté est : <b>PORT</b>",
            "Le message complet comporte trois mots :<p class=\"big-code\">_ _ _ _ &nbsp; _ _ &nbsp; _ _ _ _ _ _</p>"
          ],
          "after": {
            "final": {
              "text": "<p>Un dernier message a été intercepté.</p><p class=\"big-code\">FQDDMUZ PQ BQFMZCGQ</p><p>Il a été chiffré à l'aide d'un <b>code César</b>, avec la même clé.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
              "wrong": "❌ MESSAGE NON DÉCRYPTÉ<br>Votre clé est bien 12. Pour chaque lettre du message, comptez 12 lettres en arrière dans l'alphabet.<br>Essayez de nouveau.",
              "hints": [
                "Commencez par le premier mot : <b>FQDDMUZ</b><br>Avec une clé de 12 : F → T",
                "Le premier mot décrypté est : <b>TERRAIN</b>",
                "Le message complet comporte trois mots :<p class=\"big-code\">_ _ _ _ _ _ _ &nbsp; _ _ &nbsp; _ _ _ _ _ _ _ _</p>"
              ],
              "h": [
                "cab91489a859b505",
                "cab91489a859b505",
                "881b27a5045117bf",
                "a02e581f895d2ac1",
                "76698bf284309631",
                "32c38040debd5e7c",
                "581a4dfad764829a",
                "0127ee232eadacb1",
                "27f846c4240e328d",
                "1babb03ef46e0021"
              ]
            }
          },
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
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Mission {{zone}} — Le message du musée",
          "text": "<p>Sur la <b>Place Baragnon</b> se trouve un lieu consacré à la mémoire de Cassis.</p><p>Retrouvez-le.</p><p>Observez ensuite les trois mots inscrits au-dessus de son entrée. Gardez uniquement la première lettre de chaque mot.</p><p><b>Quelles initiales obtenez-vous ?</b></p>",
          "wrong": "❌ Ce ne sont pas les bonnes initiales.<br>Cherchez le lieu qui conserve la mémoire de Cassis et observez attentivement l'inscription située au-dessus de l'entrée.",
          "hints": [
            "Vous cherchez le Musée de Cassis.",
            "L'inscription au-dessus de l'entrée est composée de trois mots :<br><b>MUSÉE DE CASSIS</b>"
          ],
          "success": {
            "title": "✅ INITIALES IDENTIFIÉES",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">M – D – C</p><p>Ces lettres cachent une clé.</p>"
          },
          "h": [
            "3de2bcff16faf9d0"
          ]
        },
        {
          "type": "number",
          "title": "Transformer les lettres",
          "text": "<p>Transformez maintenant chaque lettre selon sa position dans l'alphabet :</p><p>A = 1<br>B = 2<br>C = 3<br>…</p><p>Vous obtenez :<br>M = ?<br>D = ?<br>C = ?</p><p>Puis effectuez l'opération suivante :</p><p class=\"big-code\">M − D − C</p><p><b>Quelle clé obtenez-vous ?</b></p>",
          "wrong": "❌ La clé n'est pas correcte.<br>Rappelez-vous :<br>M = 13<br>D = 4<br>C = 3<br>Effectuez ensuite : 13 − 4 − 3",
          "success": {
            "title": "✅ CLÉ TROUVÉE",
            "text": "<p>Votre clé est :</p><p class=\"big-code\">6</p>"
          },
          "h": [
            "a03f6d2f77062b5c"
          ]
        },
        {
          "type": "text",
          "title": "Le message crypté",
          "text": "<p>Un nouveau message a été intercepté :</p><p class=\"big-code\">YGOTZ SOINKR</p><p>Il a été chiffré à l'aide d'un <b>code César</b>.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
          "wrong": "❌ MESSAGE NON DÉCRYPTÉ<br>Votre clé est bien 6. Pour chaque lettre du message, reculez de 6 positions dans l'alphabet.<br>Essayez de nouveau.",
          "hints": [
            "Commencez par la première lettre :<br>Y → S",
            "Le message complet comporte deux mots :<p class=\"big-code\">_ _ _ _ _ &nbsp; _ _ _ _ _ _</p>"
          ],
          "after": {
            "final": {
              "text": "<p>Un dernier message a été intercepté :</p><p class=\"big-code\">ZKXXGOT JK VKZGTWAK</p><p>Il a été chiffré à l'aide d'un <b>code César</b>, avec la même clé.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
              "wrong": "❌ MESSAGE NON DÉCRYPTÉ<br>Votre clé est bien 6. Pour chaque lettre du message, reculez de 6 positions dans l'alphabet.<br>Essayez de nouveau.",
              "hints": [
                "Commencez par la première lettre :<br>Z → T",
                "Le message complet comporte trois mots :<p class=\"big-code\">_ _ _ _ _ _ _ &nbsp; _ _ &nbsp; _ _ _ _ _ _ _ _</p>"
              ],
              "h": [
                "cab91489a859b505",
                "cab91489a859b505",
                "881b27a5045117bf",
                "a02e581f895d2ac1",
                "76698bf284309631",
                "32c38040debd5e7c",
                "581a4dfad764829a",
                "0127ee232eadacb1",
                "27f846c4240e328d",
                "1babb03ef46e0021"
              ]
            }
          },
          "success": {
            "title": "✅ MESSAGE DÉCRYPTÉ",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">SAINT-MICHEL</p><p>Votre prochaine destination est :<br><b>L'ÉGLISE SAINT-MICHEL</b></p><p>Rendez-vous sur place pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "662a402ef8d1b1c9",
            "82f5225885538351"
          ]
        }
      ]
    },
    "2": {
      "name": "Port de Cassis",
      "lat": 43.21447,
      "lng": 5.5387,
      "where": "le Port de Cassis, près de la statue de Calendal",
      "lastSuccess": {
        "title": "✅ ÉNIGME RÉSOLUE",
        "text": "<p>Vous venez de terminer votre 5e zone.</p><p>Toutes les étapes de votre parcours sont maintenant validées.</p><p>Rejoignez le <b>terrain de pétanque</b> sur le port.</p><p><b>Gardez votre carte mystère avec vous</b> : vous allez bientôt en avoir besoin.</p>",
        "button": "Rejoindre le point final"
      },
      "A": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Le bon point de vue",
          "text": "<p>Sur le port se trouve quelqu'un qui veille sur Cassis sans jamais quitter sa place.</p><p>Il est de pierre et se tient face au paysage.</p><p><b>Retrouvez Calendal.</b></p><p>Lorsque vous pensez l'avoir trouvé, poursuivez la mission.</p>",
          "button": "J'ai trouvé Calendal"
        },
        {
          "type": "image-choice",
          "title": "Observation",
          "text": "<p><b>✅ CALENDAL IDENTIFIÉ</b></p><p>Maintenant, changez de point de vue.</p><p>Placez-vous comme Calendal, dans le même sens que lui.</p><p>Observez attentivement ce qui se trouve :</p><ul><li>devant lui</li><li>derrière lui</li><li>à sa gauche</li><li>à sa droite</li></ul><p>Parmi les 4 propositions visuelles, une seule correspond exactement à ce que vous pouvez observer autour de vous.</p><p><b>Laquelle est correcte ?</b></p>",
          "options": [
            {
              "img": "images/point-de-vue-a.svg",
              "label": "A"
            },
            {
              "img": "images/point-de-vue-b.svg",
              "label": "B"
            },
            {
              "img": "images/point-de-vue-c.svg",
              "label": "C"
            },
            {
              "img": "images/point-de-vue-d.svg",
              "label": "D"
            }
          ],
          "wrong": "❌ MAUVAIS POINT DE VUE<br>Ne vous fiez pas uniquement à votre mémoire.<br>Placez-vous réellement dans le même sens que Calendal et comparez les quatre directions avec les propositions.<br>Réessayez.",
          "hints": [
            "Vous cherchez une statue en pierre située sur la promenade du port.",
            "Il s'agit de Calendal.",
            "Ne vous placez pas face à lui.<br>Placez-vous comme lui, en regardant dans la même direction.",
            "Comparez une par une :<br>devant — derrière — gauche — droite<br>Une seule proposition correspond exactement à la réalité."
          ],
          "success": {
            "title": "✅ POINT DE VUE VALIDÉ",
            "text": "<p>Vous avez correctement observé Cassis depuis la position de Calendal.</p>"
          },
          "h": [
            "ec42678625eb75f3"
          ]
        },
        {
          "type": "text",
          "title": "Destination mystère",
          "text": "<p>Votre prochaine destination se trouve dans le vieux Cassis, rue Saint-Clair.</p><p>Depuis 1851, une maison de parfum y met en flacon les senteurs de la ville. Son nom sonne comme celui d'un parfum… qui porterait le nom de Cassis.</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
          "wrong": "❌ DESTINATION INCORRECTE<br>Cherchez une boutique de parfums du vieux Cassis.<br>Son nom contient le mot : <b>EAU</b>",
          "after": {
            "final": {
              "text": "<p>Votre prochaine destination est la <b>dernière</b> de votre parcours.</p><p>Sur le port, on s'y retrouve pour jouer en lançant des boules.</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
              "wrong": "❌ DESTINATION INCORRECTE<br>Cherchez un lieu du port où l'on joue avec des boules.<br>Son nom contient le mot : <b>PÉTANQUE</b>",
              "h": [
                "cab91489a859b505",
                "cab91489a859b505",
                "881b27a5045117bf",
                "a02e581f895d2ac1",
                "76698bf284309631",
                "32c38040debd5e7c",
                "581a4dfad764829a",
                "0127ee232eadacb1",
                "27f846c4240e328d",
                "1babb03ef46e0021"
              ]
            }
          },
          "success": {
            "title": "✅ DESTINATION IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">L'EAU DE CASSIS</p><p>Rendez-vous à la boutique <b>L'Eau de Cassis</b>, rue Saint-Clair, pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "5ffa8164a6096010",
            "72bc69912977e617",
            "77d177f224ac369c",
            "8da9a3e5b218c30f"
          ]
        }
      ],
      "B": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Les trois témoins",
          "text": "<p>Sur le port de Cassis se trouve un tribunal un peu particulier.</p><p>On n'y jugeait ni vols, ni crimes, ni délits.</p><p><b>Votre première mission est de retrouver ce bâtiment.</b></p><p>Lorsque vous pensez l'avoir identifié, observez attentivement sa façade et ses alentours.</p>",
          "button": "Nous pensons être au bon endroit"
        },
        {
          "type": "multi",
          "title": "Les trois témoins",
          "text": "<p><b>✅ LIEU IDENTIFIÉ</b></p><p>Trois noms vous sont proposés :</p><p class=\"big-code\">SAINT-PIERRE<br>FRÉDÉRIC MISTRAL<br>SAINT-MICHEL</p><p>Deux d'entre eux sont directement liés au lieu devant vous. Le troisième ne l'est pas.</p><p>Observez attentivement le bâtiment et les éléments visibles autour de vous.</p><p><b>Quels sont les deux noms liés à ce lieu ?</b></p>",
          "options": [
            "SAINT-PIERRE",
            "FRÉDÉRIC MISTRAL",
            "SAINT-MICHEL"
          ],
          "count": 2,
          "wrong": "❌ LES DEUX TÉMOINS NE SONT PAS ENCORE IDENTIFIÉS<br>Ne cherchez pas une réponse sur Internet.<br>Tout ce dont vous avez besoin se trouve devant vous.<br>Observez la façade, la niche et les inscriptions visibles autour du bâtiment.<br>Réessayez.",
          "hints": [
            "Commencez par observer attentivement la façade du bâtiment.",
            "L'un des personnages est traditionnellement associé aux pêcheurs.",
            "Regardez aussi les plaques ou inscriptions présentes près du bâtiment."
          ],
          "success": {
            "title": "✅ LES DEUX TÉMOINS SONT IDENTIFIÉS",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">SAINT-PIERRE<br>et<br>FRÉDÉRIC MISTRAL</p>"
          },
          "h": [
            "e9fffc56134747ca"
          ]
        },
        {
          "type": "text",
          "title": "La déduction",
          "text": "<p>Il reste maintenant un seul nom :</p><p class=\"big-code\">SAINT-MICHEL</p><p>Ce nom n'était pas là par hasard.<br>Il vous donne un indice sur votre prochaine destination.</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
          "wrong": "❌ DESTINATION NON IDENTIFIÉE<br>Reprenez la liste initiale :<br>Saint-Pierre, Frédéric Mistral, Saint-Michel<br>Vous avez déjà identifié les deux premiers.<br>Quel nom reste-t-il ?",
          "after": {
            "final": {
              "text": "<p>Vous avez identifié les deux témoins : <b>Saint-Pierre</b>, le patron des pêcheurs, et <b>Frédéric Mistral</b>, le poète de la Provence.</p><p>Le troisième nom, Saint-Michel, vous l'avez déjà rencontré : votre parcours touche à sa fin.</p><p>Il vous reste à rejoindre l'endroit du port où l'on se retrouve pour un jeu provençal né en 1907 tout près d'ici, à La Ciotat, et que l'on joue « les pieds tanqués ».</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
              "wrong": "❌ DESTINATION NON IDENTIFIÉE<br>« Pieds tanqués » : c'est l'origine du nom de ce jeu de boules.<br>Où y joue-t-on sur le port ?",
              "hints": [
                "Ce jeu se joue avec des boules en métal et un cochonnet.",
                "Son nom vient du provençal « pèd tanca » : les pieds joints."
              ],
              "h": [
                "cab91489a859b505",
                "cab91489a859b505",
                "881b27a5045117bf",
                "a02e581f895d2ac1",
                "76698bf284309631",
                "32c38040debd5e7c",
                "581a4dfad764829a",
                "0127ee232eadacb1",
                "27f846c4240e328d",
                "1babb03ef46e0021"
              ]
            }
          },
          "success": {
            "title": "✅ DESTINATION IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">L'ÉGLISE SAINT-MICHEL</p><p>Rendez-vous à l'<b>église Saint-Michel</b> pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "662a402ef8d1b1c9",
            "662a402ef8d1b1c9",
            "662a402ef8d1b1c9",
            "82f5225885538351",
            "82f5225885538351",
            "82f5225885538351",
            "82f5225885538351"
          ]
        }
      ]
    },
    "3": {
      "name": "Église Saint-Michel",
      "lat": 43.21583,
      "lng": 5.53789,
      "where": "l'église Saint-Michel",
      "lastSuccess": {
        "title": "✅ ZIP RÉSOLU",
        "text": "<p>Votre dernière énigme est validée.</p><p>Vous avez désormais terminé les 5 zones.</p><p>Rendez-vous au <b>terrain de pétanque</b> sur le port pour la mission finale.</p><p><b>Prenez votre carte mystère avec vous.</b></p>",
        "button": "Rejoindre le point final"
      },
      "A": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Le chemin architectural",
          "text": "<p>Vous êtes devant l'<b>église Saint-Michel</b>.</p><p>Votre prochaine destination est cachée dans son architecture.</p><p>Observez attentivement la façade : plusieurs éléments de l'architecture vont vous servir.</p><p>Une fois que vous les avez repérés, déterminez dans quel ordre ils se lisent sur le bâtiment.</p>",
          "button": "J'ai observé la façade"
        },
        {
          "type": "order",
          "title": "Trouver l'ordre",
          "text": "<p>Vous avez devant vous cinq repères architecturaux.</p><p><b>Rangez-les dans l'ordre où ils apparaissent sur la façade de l'église, du sol au ciel.</b></p>",
          "options": [
            "OCULUS",
            "CLOCHER / HORLOGE",
            "PORTAIL",
            "CROIX",
            "BAIES JUMELLES"
          ],
          "wrong": "❌ ORDRE INCORRECT<br>Regardez de nouveau la façade.<br>Commencez par l'axe principal de l'église, du bas vers le haut.<br>Le clocher est un élément latéral : il vient en dernier.<br>Réessayez.",
          "hints": [
            "Commencez tout en bas de la façade.",
            "Le portail est le premier élément.",
            "Suivez ensuite la façade vers le haut :<br>portail → baies → oculus → croix",
            "Le clocher / l'horloge constitue le dernier repère."
          ],
          "success": {
            "title": "✅ ORDRE ARCHITECTURAL VALIDÉ",
            "text": "<p>Vous connaissez maintenant l'ordre des repères.</p><p>Utilisez-le pour résoudre la grille.</p>"
          },
          "h": [
            "084b5037ddce5191"
          ]
        },
        {
          "type": "zip",
          "title": "Le Zip",
          "text": "<p>Vous devez tracer <b>un seul chemin continu</b>.</p><p>Votre chemin doit :</p><ul><li>se déplacer uniquement horizontalement ou verticalement</li><li>passer par les <b>49 cases</b>, chacune exactement une fois</li><li>ne jamais revenir sur une case déjà utilisée</li><li>respecter les murs</li><li>traverser les cinq pictogrammes dans cet ordre :<br><b>PORTAIL → BAIES → OCULUS → CROIX → CLOCHER</b></li></ul><p>Faites glisser votre doigt de case en case, <b>en partant du portail</b>. Les <b>lettres rencontrées</b> s'affichent sous la grille.</p>",
          "zip": {
            "size": 7,
            "marks": [
              {
                "at": [
                  3,
                  3
                ],
                "icon": "portail"
              },
              {
                "at": [
                  6,
                  6
                ],
                "icon": "baies"
              },
              {
                "at": [
                  2,
                  2
                ],
                "icon": "oculus"
              },
              {
                "at": [
                  0,
                  0
                ],
                "icon": "croix"
              },
              {
                "at": [
                  6,
                  2
                ],
                "icon": "clocher"
              }
            ],
            "walls": [
              [
                0,
                1,
                "D"
              ],
              [
                0,
                2,
                "D"
              ],
              [
                0,
                4,
                "D"
              ],
              [
                1,
                0,
                "D"
              ],
              [
                1,
                3,
                "D"
              ],
              [
                1,
                5,
                "D"
              ],
              [
                2,
                1,
                "D"
              ],
              [
                3,
                0,
                "D"
              ],
              [
                3,
                5,
                "D"
              ],
              [
                4,
                4,
                "D"
              ],
              [
                5,
                5,
                "D"
              ],
              [
                2,
                4,
                "R"
              ],
              [
                3,
                1,
                "R"
              ],
              [
                4,
                1,
                "R"
              ],
              [
                3,
                2,
                "R"
              ],
              [
                6,
                2,
                "R"
              ],
              [
                4,
                5,
                "R"
              ]
            ],
            "letters": [
              ".S...A.",
              "....C..",
              "S......",
              "....E.A",
              "I.E....",
              ".S...D.",
              "....U.."
            ]
          },
          "after": {
            "final": {
              "zip": {
                "size": 7,
                "marks": [
                  {
                    "at": [
                      1,
                      3
                    ],
                    "icon": "portail"
                  },
                  {
                    "at": [
                      3,
                      0
                    ],
                    "icon": "baies"
                  },
                  {
                    "at": [
                      6,
                      4
                    ],
                    "icon": "oculus"
                  },
                  {
                    "at": [
                      0,
                      4
                    ],
                    "icon": "croix"
                  },
                  {
                    "at": [
                      5,
                      5
                    ],
                    "icon": "clocher"
                  }
                ],
                "walls": [
                  [
                    1,
                    2,
                    "R"
                  ],
                  [
                    1,
                    3,
                    "R"
                  ],
                  [
                    2,
                    2,
                    "R"
                  ],
                  [
                    4,
                    2,
                    "R"
                  ],
                  [
                    2,
                    2,
                    "D"
                  ],
                  [
                    4,
                    5,
                    "R"
                  ],
                  [
                    3,
                    1,
                    "D"
                  ],
                  [
                    2,
                    0,
                    "R"
                  ],
                  [
                    5,
                    4,
                    "R"
                  ],
                  [
                    4,
                    2,
                    "D"
                  ],
                  [
                    0,
                    1,
                    "R"
                  ],
                  [
                    5,
                    0,
                    "R"
                  ],
                  [
                    3,
                    2,
                    "R"
                  ],
                  [
                    5,
                    2,
                    "R"
                  ],
                  [
                    1,
                    6,
                    "D"
                  ],
                  [
                    4,
                    3,
                    "D"
                  ]
                ],
                "letters": [
                  "R....AT",
                  "R.T....",
                  "A.EN..E",
                  "..IQUE.",
                  "..N....",
                  "...E..P",
                  "...D..."
                ]
              }
            }
          },
          "hints": [
            "Votre objectif n'est pas seulement de relier les cinq repères.<br>Toutes les cases doivent être utilisées.",
            "Avant de tracer une longue ligne, vérifiez que vous ne créez pas une zone impossible à rejoindre plus tard.",
            "Les murs sont là pour vous aider autant que pour vous bloquer.<br>Observez les passages où vous n'aurez qu'une seule possibilité.",
            "Vous devez arriver au clocher / horloge seulement après avoir parcouru les quatre autres repères."
          ]
        },
        {
          "type": "text",
          "title": "Destination révélée",
          "text": "<p>Lorsque le chemin est terminé, lisez les lettres dans l'ordre où vous les avez rencontrées.</p><p>Elles forment le nom de votre prochaine destination.</p><p><b>Quelle destination avez-vous trouvée ?</b></p>",
          "wrong": "❌ DESTINATION INCORRECTE<br>Vérifiez votre chemin.<br>Si le Zip est correctement résolu, les lettres doivent former un lieu de Cassis.",
          "after": {
            "final": {
              "text": "<p>Lorsque le chemin est terminé, lisez les lettres dans l'ordre où vous les avez rencontrées.</p><p>Elles forment le nom de votre <b>dernière</b> destination.</p><p><b>Quelle destination avez-vous trouvée ?</b></p>",
              "wrong": "❌ DESTINATION INCORRECTE<br>Vérifiez votre chemin.<br>Si le Zip est correctement résolu, les lettres forment le lieu de la finale.",
              "h": [
                "cab91489a859b505",
                "cab91489a859b505",
                "881b27a5045117bf",
                "a02e581f895d2ac1",
                "76698bf284309631",
                "32c38040debd5e7c",
                "581a4dfad764829a",
                "0127ee232eadacb1",
                "27f846c4240e328d",
                "1babb03ef46e0021"
              ]
            }
          },
          "success": {
            "title": "✅ PARCOURS TERMINÉ",
            "text": "<p>Votre chemin a révélé :</p><p class=\"big-code\">EAU DE CASSIS</p><p>Rendez-vous à la boutique <b>L'Eau de Cassis</b>, rue Saint-Clair, pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "5ffa8164a6096010",
            "72bc69912977e617",
            "77d177f224ac369c",
            "8da9a3e5b218c30f"
          ]
        }
      ],
      "B": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Le second chemin",
          "text": "<p>Vous êtes devant l'<b>église Saint-Michel</b>.</p><p>Votre prochaine destination est elle aussi dissimulée dans son architecture.</p><p>Observez attentivement la façade : plusieurs éléments de l'architecture vont, ici aussi, vous servir.</p><p>Votre première mission est de déterminer leur ordre.</p>",
          "button": "J'ai observé la façade"
        },
        {
          "type": "order",
          "title": "Trouver l'ordre",
          "text": "<p>Vous avez devant vous cinq repères architecturaux.</p><p><b>Rangez-les dans l'ordre où ils apparaissent sur la façade de l'église, du sol au ciel.</b></p>",
          "options": [
            "OCULUS",
            "CLOCHER / HORLOGE",
            "PORTAIL",
            "CROIX",
            "BAIES JUMELLES"
          ],
          "wrong": "❌ ORDRE INCORRECT<br>Ne cherchez pas l'ordre dans la grille.<br>Il se trouve directement sur l'église devant vous.<br>Observez la façade du bas vers le haut.",
          "hints": [
            "Rangez-les dans l'ordre où on les rencontre en parcourant la façade <b>du bas vers le haut</b>. Le clocher, sur le côté, vient en dernier.",
            "Commencez par le portail."
          ],
          "success": {
            "title": "✅ ORDRE ARCHITECTURAL VALIDÉ",
            "text": "<p>Une nouvelle grille vous attend.</p><p>Les règles restent les mêmes.</p>"
          },
          "h": [
            "084b5037ddce5191"
          ]
        },
        {
          "type": "zip",
          "title": "Le Zip",
          "text": "<p>Vous devez tracer <b>un seul chemin continu</b>.</p><p>Votre chemin doit :</p><ul><li>se déplacer uniquement horizontalement ou verticalement</li><li>passer par les <b>49 cases</b>, chacune exactement une fois</li><li>ne jamais revenir sur une case déjà utilisée</li><li>respecter les murs</li><li>traverser les cinq pictogrammes dans cet ordre :<br><b>PORTAIL → BAIES → OCULUS → CROIX → CLOCHER</b></li></ul><p>Faites glisser votre doigt de case en case, <b>en partant du portail</b>. Les <b>lettres rencontrées</b> s'affichent sous la grille.</p>",
          "zip": {
            "size": 7,
            "marks": [
              {
                "at": [
                  1,
                  1
                ],
                "icon": "portail"
              },
              {
                "at": [
                  3,
                  2
                ],
                "icon": "baies"
              },
              {
                "at": [
                  5,
                  2
                ],
                "icon": "oculus"
              },
              {
                "at": [
                  3,
                  6
                ],
                "icon": "croix"
              },
              {
                "at": [
                  0,
                  4
                ],
                "icon": "clocher"
              }
            ],
            "walls": [
              [
                0,
                1,
                "D"
              ],
              [
                0,
                4,
                "D"
              ],
              [
                1,
                0,
                "D"
              ],
              [
                1,
                1,
                "D"
              ],
              [
                3,
                0,
                "D"
              ],
              [
                3,
                1,
                "D"
              ],
              [
                3,
                2,
                "D"
              ],
              [
                3,
                3,
                "D"
              ],
              [
                4,
                2,
                "D"
              ],
              [
                4,
                6,
                "D"
              ],
              [
                5,
                5,
                "D"
              ],
              [
                1,
                1,
                "R"
              ],
              [
                1,
                3,
                "R"
              ],
              [
                6,
                3,
                "R"
              ],
              [
                1,
                5,
                "R"
              ],
              [
                3,
                4,
                "R"
              ]
            ],
            "letters": [
              "M.A...O",
              "...EP..",
              ".I...R.",
              ".S.....",
              ".N..OU.",
              "....L..",
              "D.E...E"
            ]
          },
          "hints": [
            "Commencez par identifier les cases ou passages qui offrent très peu d'options.",
            "Attention aux zones que vous risquez d'enfermer trop tôt.",
            "Les cinq repères donnent l'ordre général, mais toutes les cases doivent être parcourues.",
            "Si votre chemin arrive au clocher alors qu'il reste des cases libres, votre parcours est incorrect."
          ]
        },
        {
          "type": "text",
          "title": "Destination révélée",
          "text": "<p><b>Avec les lettres que vous avez rencontrées, quelle est votre prochaine destination ?</b></p>",
          "wrong": "❌ DESTINATION INCORRECTE<br>Vérifiez que votre parcours passe bien par les 49 cases et que vous avez relevé les lettres dans le bon ordre.",
          "success": {
            "title": "✅ PARCOURS TERMINÉ",
            "text": "<p>Votre chemin a révélé :</p><p class=\"big-code\">MAISON DE L'EUROPE</p><p>Rendez-vous à la <b>Maison de l'Europe</b> pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "deb8859d398c5ad7",
            "deb8859d398c5ad7",
            "deb8859d398c5ad7",
            "51f77dbd615a088b"
          ]
        }
      ]
    },
    "4": {
      "name": "L'Eau de Cassis",
      "lat": 43.21505,
      "lng": 5.53638,
      "where": "la boutique L'Eau de Cassis, rue Saint-Clair",
      "lastSuccess": {
        "title": "✅ MESSAGE RÉCUPÉRÉ",
        "text": "<p>Ouvrez votre enveloppe.</p><div class=\"env-list\"><div class=\"env-item\"><span>🏁</span><div><b>Parcours terminé</b><p>Vous avez traversé les 5 zones. Rendez-vous aux <b>terrains de pétanque</b>.</p></div></div><div class=\"env-item\"><span>🃏</span><div><b>Une carte mystère</b><p>Elle pourrait vous servir à tout moment.</p></div></div></div><p class=\"env-warn\">⚠️ GARDEZ VOTRE CARTE MYSTÈRE PRÉCIEUSEMENT<small>Ne la perdez pas : conservez-la avec votre équipe jusqu'à la fin.</small></p>",
        "button": "Rejoindre le point final"
      },
      "A": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Escale à Séville",
          "text": "<p>Votre prochaine étape ne se résoudra ni avec des chiffres, ni avec des lettres.</p><p>Cette fois, vous allez devoir faire confiance à <b>votre nez</b>.</p><p>Entrez dans la boutique <b>L'Eau de Cassis</b> et dites :</p><p class=\"big-code\">« Bonjour, nous sommes l'équipe {{numero}}. Nous venons pour l'épreuve Week-end à Séville. »</p><p>La personne présente vous fera sentir un parfum.</p><p>Votre mission : <b>identifiez au moins 2 notes olfactives.</b></p><p>Échangez entre vous avant de donner votre réponse.</p>",
          "button": "Nous avons senti le parfum"
        },
        {
          "type": "text",
          "title": "Vos réponses",
          "text": "<p><b>Quelles notes avez-vous reconnues ?</b></p><p>Écrivez-les à la suite, séparées par des virgules (au moins deux).</p>",
          "atLeast": 2,
          "wrong": "❌ PAS ENCORE<br>Vous avez besoin d'identifier au moins deux notes du parfum.<br>Sentez-le de nouveau et échangez avec votre équipe.<br>Pensez aux grandes familles :<br><b>agrumes — fleurs — épices — notes boisées — notes ambrées</b>",
          "hints": [
            "Ce parfum est inspiré de l'Andalousie et des orangers en fleur.",
            "Certaines notes sont très fraîches et citronnées.",
            "Parmi les réponses possibles :<br><b>citron — fleur d'oranger — coriandre</b>"
          ],
          "gh": [
            [
              "96e2cf4cfb19e455"
            ],
            [
              "1563f9722f7586fd",
              "c8d4b08d1703cf3a"
            ],
            [
              "3661597b57f271d3",
              "54e91ce58fd201d7",
              "3661597b57f271d3",
              "54e91ce58fd201d7",
              "f5ed8c0e79275757",
              "91cc8270083861b4"
            ],
            [
              "31041437613707ae"
            ],
            [
              "3da519297da94ede",
              "e53004c101dbbe9e"
            ],
            [
              "53ff32eaedcb23cc"
            ],
            [
              "e450172077d9e48c",
              "f531e26f32dc709a"
            ],
            [
              "d14f3b81a83b00b6"
            ],
            [
              "eba8830f0240ee0a",
              "b89364227db9ab1a"
            ],
            [
              "19c64eaab486946d",
              "e064c256ec3eebc5",
              "c28c1fd2dc891f34"
            ],
            [
              "7b57ea20fc5cf9a3"
            ],
            [
              "1089c43182b3d89e"
            ]
          ]
        },
        {
          "type": "info",
          "title": "✅ SÉVILLE IDENTIFIÉE",
          "text": "<p>Vous avez reconnu au moins deux notes du parfum.</p><div class=\"envelope-tag\">✉️ Enveloppe à remettre<b>{{equipe}}</b></div><p><b>Montrez cet écran à la personne présente en boutique.</b><br>Elle vous remettra l'enveloppe correspondant à votre équipe.</p>",
          "button": "J'ai récupéré mon enveloppe",
          "success": {
            "title": "✅ MESSAGE RÉCUPÉRÉ",
            "text": "<p>Ouvrez votre enveloppe.</p><div class=\"env-list\"><div class=\"env-item\"><span>📍</span><div><b>Votre prochaine destination</b><p>Suivez cette indication pour poursuivre votre parcours.</p></div></div><div class=\"env-item\"><span>🃏</span><div><b>Une carte mystère</b><p>Elle pourrait vous servir à tout moment.</p></div></div></div><p class=\"env-warn\">⚠️ GARDEZ-LA PRÉCIEUSEMENT<small>Ne la perdez pas et conservez-la avec votre équipe jusqu'à la fin.</small></p>",
            "button": "Continuer"
          }
        }
      ],
      "B": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Escale à Rome",
          "text": "<p>Une seconde fragrance protège votre message.</p><p>Entrez dans la boutique <b>L'Eau de Cassis</b> et dites :</p><p class=\"big-code\">« Bonjour, nous sommes l'équipe {{numero}}. Nous venons pour l'épreuve Week-end à Rome. »</p><p>La personne présente vous fera sentir le parfum.</p><p>Votre mission : <b>identifiez au moins 2 notes olfactives.</b></p><p>Échangez entre vous avant de donner votre réponse.</p>",
          "button": "Nous avons senti le parfum"
        },
        {
          "type": "text",
          "title": "Vos réponses",
          "text": "<p><b>Quelles notes avez-vous reconnues ?</b></p><p>Écrivez-les à la suite, séparées par des virgules (au moins deux).</p>",
          "atLeast": 2,
          "wrong": "❌ PAS ENCORE<br>Vous devez reconnaître au moins deux notes du parfum.<br>Sentez-le une nouvelle fois.<br>Demandez-vous si le parfum vous évoque plutôt :<br><b>des fleurs — quelque chose de gourmand — quelque chose de poudré</b>",
          "hints": [
            "Cette fragrance est très florale.",
            "Elle comporte également des notes gourmandes.",
            "Parmi les réponses possibles :<br><b>jasmin — vanille — praline</b>"
          ],
          "gh": [
            [
              "c1c67e328ab0c3f1"
            ],
            [
              "8af715de86b1923a"
            ],
            [
              "790ca6fe6b234a59"
            ],
            [
              "cfdea63dd984a87c"
            ],
            [
              "9f53e2b75105413a"
            ],
            [
              "3da519297da94ede",
              "e53004c101dbbe9e"
            ],
            [
              "7b7c4e117292a0a5"
            ],
            [
              "ae01749a9f3d1b81",
              "ae01749a9f3d1b81"
            ],
            [
              "eba8830f0240ee0a",
              "b89364227db9ab1a"
            ],
            [
              "19c64eaab486946d",
              "e064c256ec3eebc5",
              "c28c1fd2dc891f34"
            ],
            [
              "df7e80eb177765f1"
            ]
          ]
        },
        {
          "type": "info",
          "title": "✅ ROME IDENTIFIÉE",
          "text": "<p>Vous avez reconnu au moins deux notes du parfum.</p><div class=\"envelope-tag\">✉️ Enveloppe à remettre<b>{{equipe}}</b></div><p><b>Montrez cet écran à la personne présente en boutique.</b><br>Elle vous remettra l'enveloppe correspondant à votre équipe.</p>",
          "button": "J'ai récupéré mon enveloppe",
          "success": {
            "title": "✅ MESSAGE RÉCUPÉRÉ",
            "text": "<p>Ouvrez votre enveloppe.</p><div class=\"env-list\"><div class=\"env-item\"><span>📍</span><div><b>Votre prochaine destination</b><p>Suivez cette indication pour poursuivre votre parcours.</p></div></div><div class=\"env-item\"><span>🃏</span><div><b>Une carte mystère</b><p>Elle pourrait vous servir à tout moment.</p></div></div></div><p class=\"env-warn\">⚠️ GARDEZ-LA PRÉCIEUSEMENT<small>Ne la perdez pas et conservez-la avec votre équipe jusqu'à la fin.</small></p>",
            "button": "Continuer"
          }
        }
      ]
    },
    "5": {
      "name": "Maison de l'Europe",
      "lat": 43.21466,
      "lng": 5.53876,
      "where": "la Maison de l'Europe",
      "lastSuccess": {
        "title": "✅ DESTINATION IDENTIFIÉE",
        "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE PÉTANQUE</p><p>Votre parcours touche à sa fin : rendez-vous aux <b>terrains de pétanque</b>.</p><p>Conservez avec vous tout ce que vous avez récupéré pendant la mission, et surtout <b>votre carte mystère</b>.</p>",
        "button": "Rejoindre le point final"
      },
      "A": [
        {
          "type": "text",
          "title": "Mission {{zone}} — Le message du blason",
          "text": "<p>Vous approchez de la fin de votre parcours.</p><p>Votre prochaine destination est cachée juste devant vous.</p><p>Observez attentivement les <b>armoiries</b> situées au-dessus de l'entrée.</p><p><b>Quels éléments y reconnaissez-vous ?</b></p>",
          "wrong": "❌ OBSERVATION INCORRECTE<br>Ne cherchez pas une inscription.<br>Regardez directement les symboles représentés sur les armoiries.<br>Réessayez.",
          "hints": [
            "Vous devez identifier trois éléments.",
            "Deux d'entre eux sont identiques.",
            "L'un des éléments est le bâton recourbé que porte un évêque. Les deux autres vivent dans la mer."
          ],
          "success": {
            "title": "✅ BLASON IDENTIFIÉ",
            "text": "<p>Le blason vient de vous donner la clé.</p>"
          },
          "h": [
            "1f3bc479c12191c9",
            "dd076bf53300efbd",
            "ff2dee767bdb43d4",
            "9b5614ff3300c838",
            "a433001ecd9a56e7",
            "e4efeb7e400ddee0",
            "32621e8772a4774b"
          ],
          "gh": [
            [
              "2f2642068cc6871d",
              "75bb48ca2efca90f",
              "d4b0468c455d9591",
              "74a179cf99a755c4",
              "e4096e52d9f775f0",
              "728a1c1ee767b7ff",
              "8a18f99cb1098350",
              "40bd28b2fb30df89",
              "8c06caa8709eff69"
            ],
            [
              "0005d2c31b26642e",
              "c7f36c1f388d7242",
              "7f758acdae3068bc",
              "e44b920e43103ba8",
              "7f111e858b677ea0",
              "449c18ec67bfe9ea",
              "aa72e06b3bc038c9"
            ]
          ]
        },
        {
          "type": "text",
          "title": "La réserve de lettres",
          "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">S S S P C I C S O S N S I E N S O A S R O O I O S P</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment un mot en rapport avec le blason.</p>",
          "wrong": "❌ ANAGRAMME INCORRECTE<br>Vérifiez d'abord que vous avez retiré exactement :<br>1 × CROSSE<br>2 × POISSON<br>Ensuite, utilisez toutes les lettres restantes.",
          "hints": [
            "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
            "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
            "Ce sont les armes de la ville : le mot commence par <b>CA…</b>"
          ],
          "success": {
            "title": "✅ MESSAGE DU BLASON DÉCRYPTÉ",
            "text": "<p>Vous avez trouvé le mot :</p><p class=\"big-code\">CASSIS</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
            "routing": true
          },
          "after": {
            "1": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">O A S S R S P R N E L A I I O A C E S G S O P P N O C N S O O B N</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>PLACE…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">PLACE BARAGNON</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "090f7dbba7c29d30",
                "9244e998d8be526c",
                "0a792bcc53efb9ff"
              ]
            },
            "2": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">S I O P A E S N E O O P S D R S S T I S S O C S O P I N C O R S</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>PORT…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">PORT DE CASSIS</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "8d24517e0969ae5b",
                "60301863596af296",
                "01d2ee85c4d4dc95",
                "1bf224fd1f2e80b8",
                "2806ba3f9393a056"
              ]
            },
            "3": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">S O S E I E G I S O O C P E T R S I I A N O M S C O S I E L P S H N S N L</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>ÉGLISE…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">ÉGLISE SAINT-MICHEL</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "82f5225885538351",
                "24cc3925d643e9d5",
                "662a402ef8d1b1c9"
              ]
            },
            "4": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">P O S L E S I N S C O S N O A S D E I O S S A S R I S P U O C E</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>L'EAU…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">L'EAU DE CASSIS</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "5ffa8164a6096010",
                "72bc69912977e617",
                "77d177f224ac369c",
                "8da9a3e5b218c30f"
              ]
            },
            "final": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">O N E P P Q O I A C I S S R S A S T T S E N R P O S O E R E O D N E I N U</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre destination finale.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>TERRAIN…</b>"
              ],
              "h": [
                "cab91489a859b505",
                "cab91489a859b505",
                "881b27a5045117bf",
                "a02e581f895d2ac1",
                "76698bf284309631",
                "32c38040debd5e7c",
                "581a4dfad764829a",
                "0127ee232eadacb1",
                "27f846c4240e328d",
                "1babb03ef46e0021"
              ]
            }
          },
          "h": [
            "53ff32eaedcb23cc"
          ]
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Mission {{zone}} — Le blason à double fond",
          "text": "<p>La fin approche.</p><p>Mais avant de rejoindre votre destination finale, vous allez devoir utiliser les <b>armoiries</b> de la Maison de l'Europe.</p><p>Observez-les attentivement.</p><p><b>Quels trois éléments voyez-vous ?</b></p>",
          "wrong": "❌ OBSERVATION INCORRECTE<br>Regardez les symboles représentés au-dessus de l'entrée.<br>Deux sont identiques.",
          "hints": [
            "Vous cherchez un objet associé à l'autorité religieuse.",
            "Les deux autres éléments sont des animaux marins."
          ],
          "success": {
            "title": "✅ BLASON IDENTIFIÉ",
            "text": "<p>Le blason vient de vous donner la clé.</p>"
          },
          "h": [
            "1f3bc479c12191c9",
            "dd076bf53300efbd",
            "ff2dee767bdb43d4",
            "9b5614ff3300c838",
            "a433001ecd9a56e7",
            "e4efeb7e400ddee0",
            "32621e8772a4774b"
          ],
          "gh": [
            [
              "2f2642068cc6871d",
              "75bb48ca2efca90f",
              "d4b0468c455d9591",
              "74a179cf99a755c4",
              "e4096e52d9f775f0",
              "728a1c1ee767b7ff",
              "8a18f99cb1098350",
              "40bd28b2fb30df89",
              "8c06caa8709eff69"
            ],
            [
              "0005d2c31b26642e",
              "c7f36c1f388d7242",
              "7f758acdae3068bc",
              "e44b920e43103ba8",
              "7f111e858b677ea0",
              "449c18ec67bfe9ea",
              "aa72e06b3bc038c9"
            ]
          ]
        },
        {
          "type": "text",
          "title": "La réserve de lettres",
          "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">R O S S I P I S P N C S E S S N O O I O S C S A S O</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de un mot en rapport avec le blason.</p>",
          "wrong": "❌ ANAGRAMME INCORRECTE<br>Vérifiez d'abord que vous avez retiré exactement :<br>1 × CROSSE<br>2 × POISSON<br>Ensuite, utilisez toutes les lettres restantes.",
          "hints": [
            "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
            "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
            "Les lettres restantes commencent par former :<br><b>CA…</b>"
          ],
          "success": {
            "title": "✅ MESSAGE DU BLASON DÉCRYPTÉ",
            "text": "<p>Vous avez trouvé le mot :</p><p class=\"big-code\">CASSIS</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
            "routing": true
          },
          "after": {
            "1": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">G N A S P R O I C A P R N N N E S S A C O I L S O S O S O P O E B</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>PLACE…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">PLACE BARAGNON</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "090f7dbba7c29d30",
                "9244e998d8be526c",
                "0a792bcc53efb9ff"
              ]
            },
            "2": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">P I S P S O T C O O S S E S S D C O E A I N O N R O S R S I S P</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>PORT…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">PORT DE CASSIS</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "8d24517e0969ae5b",
                "60301863596af296",
                "01d2ee85c4d4dc95",
                "1bf224fd1f2e80b8",
                "2806ba3f9393a056"
              ]
            },
            "3": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">L O N E G E S C O S C I S S S N I S E T R I E S O P I I L S O O N P H M A</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>ÉGLISE…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">ÉGLISE SAINT-MICHEL</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "82f5225885538351",
                "24cc3925d643e9d5",
                "662a402ef8d1b1c9"
              ]
            },
            "4": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">A C S S O S O S U O I S E R C A O E E P S N L I N D I S O S P S</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>L'EAU…</b>"
              ],
              "success": {
                "title": "✅ DESTINATION IDENTIFIÉE",
                "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">L'EAU DE CASSIS</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
                "routing": true
              },
              "h": [
                "5ffa8164a6096010",
                "72bc69912977e617",
                "77d177f224ac369c",
                "8da9a3e5b218c30f"
              ]
            },
            "final": {
              "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">O P A P E R N O I R O E O S T E N I P O S S E S T A S S U D Q N N C E R I</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre destination finale.</p>",
              "hints": [
                "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
                "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
                "Les lettres restantes commencent par former :<br><b>TERRAIN…</b>"
              ],
              "h": [
                "cab91489a859b505",
                "cab91489a859b505",
                "881b27a5045117bf",
                "a02e581f895d2ac1",
                "76698bf284309631",
                "32c38040debd5e7c",
                "581a4dfad764829a",
                "0127ee232eadacb1",
                "27f846c4240e328d",
                "1babb03ef46e0021"
              ]
            }
          },
          "h": [
            "53ff32eaedcb23cc"
          ]
        }
      ]
    }
  },
  "final": {
    "name": "Terrains de pétanque",
    "lat": 43.21361,
    "lng": 5.5383,
    "steps": [
      {
        "type": "info",
        "title": "Toutes les zones sont terminées !",
        "text": "<p>Rejoignez l'organisatrice au point de rendez-vous final : <b>les terrains de pétanque</b>.</p>",
        "button": "Nous y sommes"
      },
      {
        "type": "text",
        "title": "Code d'arrivée",
        "text": "<p>Demandez le code d'arrivée à l'organisatrice et saisissez-le pour arrêter le chrono.</p>",
        "success": {
          "text": "<p>Chrono arrêté ! Place à l'énigme finale commune…</p>"
        },
        "h": [
          "8a25b67e1a15945d"
        ]
      }
    ]
  },
  "version": "2026.11.09-0924",
  "answerBook": {
    "salt": "Qu2Ry5ohhq/C3UbqpbptOw==",
    "iv": "7QgO+eNzql2O9up5",
    "data": "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"
  }
};
