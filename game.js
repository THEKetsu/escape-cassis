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
    "rules": "<ul><li>Restez ensemble et respectez la circulation : traversez aux passages piétons.</li><li>Ne touchez pas, ne déplacez rien : tout se résout en observant.</li><li>Un souci ou un blocage ? Écrivez à l'organisation avec le bouton 💬, ou appelez le <b>[N° DE L'ORGANISATION]</b>.</li></ul>",
    "credits": "Créé par Quentin BENDER & Solène PACE",
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
      "name": "Place Baragnon",
      "lat": 43.21427,
      "lng": 5.5396,
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
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Mission 1 — Le message du musée",
          "text": "<p>Sur la <b>Place Baragnon</b> se trouve un lieu consacré à la mémoire de Cassis.</p><p>Retrouvez-le.</p><p>Observez ensuite les trois mots inscrits au-dessus de son entrée. Gardez uniquement la première lettre de chaque mot.</p><p><b>Quelles initiales obtenez-vous ?</b></p>",
          "wrong": "❌ Ce ne sont pas les bonnes initiales.<br>Cherchez le lieu qui conserve la mémoire de Cassis et observez attentivement l'inscription située au-dessus de l'entrée.",
          "hints": [
            "Vous cherchez le Musée de Cassis.",
            "L'inscription au-dessus de l'entrée est composée de trois mots :<br><b>MUSÉE DE CASSIS</b>",
            "Gardez uniquement la première lettre de chaque mot.<br>Vous obtenez :<p class=\"big-code\">M – D – C</p>"
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
          "text": "<p>Un nouveau message a été intercepté :</p><p class=\"big-code\">YGOTZ SOINKR</p><p>Il a été chiffré à l'aide d'un <b>code César</b> : chaque lettre du message original a été décalée.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
          "wrong": "❌ MESSAGE NON DÉCRYPTÉ<br>Votre clé est bien 6. Pour chaque lettre du message, reculez de 6 positions dans l'alphabet.<br>Essayez de nouveau.",
          "hints": [
            "Commencez par la première lettre :<br>Y → S",
            "Le premier mot décrypté est : <b>SAINT</b>",
            "Le message complet comporte deux mots :<p class=\"big-code\">_ _ _ _ _ &nbsp; _ _ _ _ _ _</p>"
          ],
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
      "A": [
        {
          "type": "info",
          "title": "Mission 2 — Le bon point de vue",
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
          "text": "<p>Votre prochaine destination se trouve dans le vieux Cassis.</p><p>Autrefois, les habitants s'y rendaient pour faire cuire leur pain.</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
          "wrong": "❌ DESTINATION INCORRECTE<br>Cherchez un ancien lieu collectif lié à la cuisson du pain.<br>Son nom contient le mot : <b>FOUR</b>",
          "success": {
            "title": "✅ DESTINATION IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">FOUR BANAL</p><p>Rendez-vous au <b>Four Banal</b> pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "97487b5e42ae8708",
            "3e96a4ee6377f85d",
            "fce3ff48e0219f1a"
          ]
        }
      ],
      "B": [
        {
          "type": "info",
          "title": "Mission 2 — Les trois témoins",
          "text": "<p>Sur le port de Cassis se trouve un tribunal un peu particulier.</p><p>On n'y jugeait ni vols, ni crimes, ni délits.</p><p><b>Votre première mission est de retrouver ce bâtiment.</b></p><p>Lorsque vous pensez l'avoir identifié, observez attentivement sa façade et ses alentours.</p>",
          "button": "J'ai trouvé le tribunal"
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
            "Regardez aussi les plaques ou inscriptions présentes près du bâtiment.",
            "Les deux personnages que vous cherchez sont :<br><b>SAINT-PIERRE</b><br>et<br><b>FRÉDÉRIC MISTRAL</b>"
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
          "text": "<p>Il reste maintenant un seul nom :</p><p class=\"big-code\">SAINT-MICHEL</p><p>Ce nom n'était pas là par hasard.<br>Il correspond à votre prochaine destination.</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
          "wrong": "❌ DESTINATION NON IDENTIFIÉE<br>Reprenez la liste initiale :<br>Saint-Pierre, Frédéric Mistral, Saint-Michel<br>Vous avez déjà identifié les deux premiers.<br>Quel nom reste-t-il ?",
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
      "A": [
        {
          "type": "info",
          "title": "Mission 3 — Le chemin architectural",
          "text": "<p>Vous êtes devant l'<b>église Saint-Michel</b>.</p><p>Votre prochaine destination est cachée dans son architecture.</p><p>Observez attentivement la façade. Vous devez retrouver cinq éléments :</p><ul><li>PORTAIL</li><li>BAIES JUMELLES</li><li>OCULUS</li><li>CROIX</li><li>CLOCHER / HORLOGE</li></ul><p>Une fois les cinq éléments identifiés, déterminez dans quel ordre ils se lisent sur le bâtiment.</p>",
          "button": "J'ai observé la façade"
        },
        {
          "type": "order",
          "title": "Trouver l'ordre",
          "text": "<p>Vous avez devant vous cinq repères architecturaux.</p><p><b>Quel est leur ordre correct ?</b></p>",
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
              ".....A.",
              "N..B...",
              "....F..",
              ".A....O",
              "....R..",
              ".L.....",
              "...U..."
            ]
          },
          "hints": [
            "Votre objectif n'est pas seulement de relier les cinq repères.<br>Toutes les cases doivent être utilisées.",
            "Avant de tracer une longue ligne, vérifiez que vous ne créez pas une zone impossible à rejoindre plus tard.",
            "Les murs sont là pour vous aider autant que pour vous bloquer.<br>Observez les passages où vous n'aurez qu'une seule possibilité.",
            "Vous devez arriver au clocher / horloge seulement après avoir parcouru les quatre autres repères."
          ],
          "success": {
            "title": "✅ CHEMIN TERMINÉ",
            "text": "<p>Votre chemin passe par les 49 cases.</p><p>Lisez les lettres dans l'ordre où vous les avez rencontrées : elles forment votre prochaine destination.</p>"
          }
        },
        {
          "type": "text",
          "title": "Destination révélée",
          "text": "<p>Lorsque le chemin est terminé, lisez les lettres dans l'ordre où vous les avez rencontrées.</p><p>Elles forment le nom de votre prochaine destination.</p><p><b>Quelle destination avez-vous trouvée ?</b></p>",
          "wrong": "❌ DESTINATION INCORRECTE<br>Vérifiez votre chemin.<br>Si le Zip est correctement résolu, les lettres doivent former un lieu de Cassis.",
          "success": {
            "title": "✅ PARCOURS TERMINÉ",
            "text": "<p>Votre chemin a révélé :</p><p class=\"big-code\">FOUR BANAL</p><p>Rendez-vous au <b>Four Banal</b> pour poursuivre votre mission.</p>",
            "button": "Continuer la mission"
          },
          "h": [
            "97487b5e42ae8708",
            "3e96a4ee6377f85d",
            "fce3ff48e0219f1a"
          ]
        }
      ],
      "B": [
        {
          "type": "info",
          "title": "Mission 3 — Le second chemin",
          "text": "<p>Vous êtes devant l'<b>église Saint-Michel</b>.</p><p>Votre prochaine destination est elle aussi dissimulée dans son architecture.</p><p>Observez attentivement la façade et identifiez les cinq éléments suivants :</p><ul><li>PORTAIL</li><li>BAIES JUMELLES</li><li>OCULUS</li><li>CROIX</li><li>CLOCHER / HORLOGE</li></ul><p>Votre première mission est de déterminer leur ordre.</p>",
          "button": "J'ai observé la façade"
        },
        {
          "type": "order",
          "title": "Trouver l'ordre",
          "text": "<p>Replacez les cinq éléments dans l'ordre correct.</p>",
          "options": [
            "OCULUS",
            "CLOCHER / HORLOGE",
            "PORTAIL",
            "CROIX",
            "BAIES JUMELLES"
          ],
          "wrong": "❌ ORDRE INCORRECT<br>Ne cherchez pas l'ordre dans la grille.<br>Il se trouve directement sur l'église devant vous.<br>Observez la façade du bas vers le haut.",
          "hints": [
            "Commencez par le portail.",
            "Poursuivez avec les baies.",
            "L'oculus se trouve au-dessus.",
            "Le clocher est le dernier repère."
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
          ],
          "success": {
            "title": "✅ CHEMIN TERMINÉ",
            "text": "<p>Votre chemin passe par les 49 cases.</p><p>Lisez les lettres dans l'ordre où vous les avez rencontrées : elles forment votre prochaine destination.</p>"
          }
        },
        {
          "type": "text",
          "title": "Destination révélée",
          "text": "<p>Votre chemin est terminé.</p><p>Lisez maintenant les lettres dans l'ordre où vous les avez rencontrées.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
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
      "name": "Four Banal",
      "lat": 43.21478,
      "lng": 5.53776,
      "A": [
        {
          "type": "info",
          "title": "Mission 4 — Le métier oublié",
          "text": "<p>Vous avez retrouvé le <b>Four Banal</b>.</p><p>Autrefois, ce lieu ne pouvait fonctionner sans le savoir-faire d'une personne bien précise.</p><p>Elle préparait le four, surveillait sa chauffe et veillait au bon déroulement des cuissons.</p><p>Votre mission est simple : <b>retrouvez le nom de ce métier.</b></p><p>Cette fois, inutile de chercher la réponse sur votre téléphone.</p><p><b>Entrez dans le Four Banal et trouvez quelqu'un capable de vous renseigner.</b></p>",
          "button": "J'ai trouvé la réponse"
        },
        {
          "type": "text",
          "title": "Saisir la réponse",
          "text": "<p><b>Quel était le métier de la personne chargée de faire fonctionner le four et de surveiller les cuissons ?</b></p>",
          "wrong": "❌ CE N'EST PAS LE BON MÉTIER<br>Ne cherchez pas à deviner.<br>La réponse se trouve auprès de la personne présente dans le Four Banal.<br>Posez-lui directement la question.<br>Réessayez.",
          "hints": [
            "Ce métier est directement lié au fonctionnement du four.",
            "Le nom du métier commence comme le mot :<br><b>FOUR</b>",
            "La réponse est :<br><b>FOURNIER</b>"
          ],
          "h": [
            "8d09a9c838f22c29",
            "bcb29a7a5d0848e5"
          ]
        },
        {
          "type": "info",
          "title": "✅ MÉTIER IDENTIFIÉ",
          "text": "<p>Vous avez retrouvé celui qui faisait vivre le four.</p><p class=\"big-code\">FOURNIER</p><p>Mais votre mission dans ce lieu n'est pas tout à fait terminée.</p><p><b>Montrez cet écran à la personne présente dans le Four Banal.</b><br>Elle vous remettra l'enveloppe correspondant à votre équipe.</p>",
          "button": "J'ai récupéré mon enveloppe",
          "success": {
            "title": "✅ ENVELOPPE RÉCUPÉRÉE",
            "text": "<p>Ouvrez maintenant votre enveloppe.</p><p>Vous y trouverez :</p><ul><li>votre <b>prochaine destination</b></li><li>une <b>carte mystère</b></li></ul><p>Lisez votre prochaine destination et poursuivez votre parcours.</p><p><b>⚠️ GARDEZ VOTRE CARTE MYSTÈRE PRÉCIEUSEMENT.</b><br>Elle pourrait vous servir à tout moment. Ne la perdez pas et conservez-la avec votre équipe jusqu'à la fin du jeu.</p>",
            "button": "Continuer la mission"
          }
        }
      ],
      "B": [
        {
          "type": "info",
          "title": "Mission 4 — Un nom trompeur",
          "text": "<p>Aujourd'hui, quelque chose de <i>banal</i> est quelque chose d'ordinaire.</p><p>Pourtant, ce n'est pas pour cette raison que ce lieu porte le nom de :</p><p class=\"big-code\">FOUR BANAL</p><p>Votre mission est de découvrir ce que signifiait réellement le mot « banal » dans ce contexte.</p><p>Cette fois encore, la réponse ne se trouve pas sur votre téléphone.</p><p><b>Entrez dans le Four Banal et interrogez une personne sur place.</b></p>",
          "button": "J'ai obtenu une explication"
        },
        {
          "type": "qcm",
          "title": "Validation",
          "text": "<p><b>Pourquoi appelait-on ce lieu un Four Banal ?</b></p>",
          "options": [
            "Parce que le pain qui y était cuit était considéré comme ordinaire.",
            "Parce que le four appartenait collectivement à tous les habitants.",
            "Parce qu'il relevait du droit de ban et que les habitants devaient utiliser ce four.",
            "Parce qu'il n'était utilisé que certains jours de la semaine."
          ],
          "wrong": "❌ CE N'EST PAS LA BONNE EXPLICATION<br>Le mot « banal » n'avait pas le même sens qu'aujourd'hui.<br>Interrogez de nouveau la personne présente et demandez-lui ce qu'était le droit de ban.<br>Réessayez.",
          "hints": [
            "Le mot « banal » est lié à une ancienne règle ou autorité.",
            "Cherchez le sens de l'expression :<br><b>DROIT DE BAN</b>",
            "La bonne réponse est celle qui explique que les habitants devaient utiliser ce four dans le cadre du droit de ban."
          ],
          "h": [
            "4810d41dc3a9a389"
          ]
        },
        {
          "type": "info",
          "title": "✅ SIGNIFICATION RETROUVÉE",
          "text": "<p>Vous avez compris l'origine du nom :</p><p class=\"big-code\">FOUR BANAL</p><p>Le terme « banal » était lié au <b>droit de ban</b>.</p><p>Votre mission dans ce lieu n'est cependant pas terminée.</p><p><b>Montrez cet écran à la personne présente dans le Four Banal.</b><br>Elle vous remettra l'enveloppe correspondant à votre équipe.</p>",
          "button": "J'ai récupéré mon enveloppe",
          "success": {
            "title": "✅ ENVELOPPE RÉCUPÉRÉE",
            "text": "<p>Ouvrez votre enveloppe.</p><p>Elle contient deux éléments importants :</p><ol><li><b>Votre prochaine destination.</b><br>Suivez l'indication présente dans l'enveloppe pour poursuivre votre parcours.</li><li><b>Une carte mystère.</b><br>Cette carte ne vous sera peut-être pas utile immédiatement.</li></ol><p><b>⚠️ GARDEZ-LA PRÉCIEUSEMENT.</b><br>Elle pourrait vous servir à tout moment. Ne la perdez pas et conservez-la avec votre équipe jusqu'à la fin du jeu.</p>",
            "button": "Continuer la mission"
          }
        }
      ]
    },
    "5": {
      "name": "Maison de l'Europe",
      "lat": 43.215,
      "lng": 5.5383,
      "A": [
        {
          "type": "text",
          "title": "Mission 5 — Le message du blason",
          "text": "<p>Vous approchez de la fin de votre parcours.</p><p>Votre prochaine destination est cachée juste devant vous.</p><p>Observez attentivement les <b>armoiries</b> situées au-dessus de l'entrée.</p><p><b>Quels éléments y reconnaissez-vous ?</b></p>",
          "match": "contains",
          "wrong": "❌ OBSERVATION INCORRECTE<br>Ne cherchez pas une inscription.<br>Regardez directement les symboles représentés sur les armoiries.<br>Réessayez.",
          "hints": [
            "Vous devez identifier trois éléments.",
            "Deux d'entre eux sont identiques.",
            "Les armoiries représentent :<br><b>UNE CROSSE ET DEUX POISSONS</b>"
          ],
          "success": {
            "title": "✅ BLASON IDENTIFIÉ",
            "text": "<p>Le blason vient de vous donner la clé.</p>"
          },
          "h": [
            "1f3bc479c12191c9",
            "1f3bc479c12191c9",
            "dd076bf53300efbd",
            "128fb3e43f08a4d6",
            "fc4e2084893f6102",
            "ff2dee767bdb43d4",
            "696e10e6a1dfa536",
            "16ca96a293531053",
            "242a4b2533743e93",
            "217fcb14bfff6eab"
          ]
        },
        {
          "type": "text",
          "title": "La réserve de lettres",
          "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">E R R U T L E D P O O S N O B S E I O A S O R S S N C E O S S I P N I</p><p>Une fois toutes les lettres du blason retirées, il vous restera <b>15 lettres</b>.<br>Réorganisez-les : elles forment le nom de votre prochaine destination.</p>",
          "wrong": "❌ ANAGRAMME INCORRECTE<br>Vérifiez d'abord que vous avez retiré exactement :<br>1 × CROSSE<br>2 × POISSON<br>Ensuite, utilisez toutes les lettres restantes.",
          "hints": [
            "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
            "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
            "Les lettres restantes commencent par former :<br><b>TERRAIN…</b>"
          ],
          "success": {
            "title": "✅ DESTINATION IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE BOULES</p><p>Votre parcours touche à sa fin.</p><p>Rendez-vous au <b>terrain de boules</b> sur le port.</p><p>Conservez avec vous tout ce que vous avez récupéré pendant la mission. Vous pourriez encore en avoir besoin.</p>",
            "button": "Rejoindre le point final"
          },
          "h": [
            "0127ee232eadacb1",
            "1babb03ef46e0021",
            "27f846c4240e328d",
            "1679a87d24243bc2",
            "fd9e34f23440ca52",
            "cab91489a859b505",
            "cab91489a859b505"
          ]
        }
      ],
      "B": [
        {
          "type": "text",
          "title": "Mission 5 — Le blason à double fond",
          "text": "<p>La fin approche.</p><p>Mais avant de rejoindre votre destination finale, vous allez devoir utiliser les <b>armoiries</b> de la Maison de l'Europe.</p><p>Observez-les attentivement.</p><p><b>Quels trois éléments voyez-vous ?</b></p>",
          "match": "contains",
          "wrong": "❌ OBSERVATION INCORRECTE<br>Regardez les symboles représentés au-dessus de l'entrée.<br>Deux sont identiques.",
          "hints": [
            "Vous cherchez un objet associé à l'autorité religieuse.",
            "Les deux autres éléments sont des animaux marins.",
            "La réponse est :<br><b>UNE CROSSE ET DEUX POISSONS</b>"
          ],
          "success": {
            "title": "✅ BLASON IDENTIFIÉ",
            "text": "<p>Le blason va servir à une première élimination de lettres.</p>"
          },
          "h": [
            "1f3bc479c12191c9",
            "1f3bc479c12191c9",
            "dd076bf53300efbd",
            "128fb3e43f08a4d6",
            "fc4e2084893f6102",
            "ff2dee767bdb43d4",
            "696e10e6a1dfa536",
            "16ca96a293531053",
            "242a4b2533743e93",
            "217fcb14bfff6eab"
          ]
        },
        {
          "type": "text",
          "title": "Première élimination",
          "text": "<p>Trois groupes de lettres vous sont présentés.<br>Dans chacun d'eux, retirez les lettres correspondant à l'élément indiqué.</p><p><b>Groupe 1 — CROSSE</b></p><p class=\"big-code\">S P C R O E S</p><p>Retirez les lettres de CROSSE : quelle lettre reste-t-il ?</p><p><b>Groupe 2 — POISSON</b></p><p class=\"big-code\">O P S O I O N S</p><p>Retirez les lettres de POISSON : quelle lettre reste-t-il ?</p><p><b>Groupe 3 — POISSON</b></p><p class=\"big-code\">P T O I S R O S N</p><p>Retirez les lettres de POISSON : quelles lettres restent-elles ?</p><p><b>Quel mot obtenez-vous en mettant dans l'ordre les lettres qui restent (groupe 1, puis 2, puis 3) ?</b><br><small>Dans le groupe 3, les deux lettres restantes s'enchaînent dans le sens qui donne un mot.</small></p>",
          "wrong": "❌ CE N'EST PAS LE BON MOT<br>Reprenez chaque groupe : retirez exactement les lettres de CROSSE, puis de POISSON, puis encore de POISSON.<br>Gardez les lettres qui restent, groupe après groupe.",
          "hints": [
            "Groupe 1 : il reste la lettre <b>P</b>.",
            "Groupe 2 : il reste la lettre <b>O</b>.",
            "Groupe 3 : il reste <b>R</b> et <b>T</b>."
          ],
          "success": {
            "title": "✅ PREMIÈRE CLÉ TROUVÉE",
            "text": "<p>Vous avez obtenu :</p><p class=\"big-code\">PORT</p><p>Ce mot est maintenant votre nouvelle clé.</p>"
          },
          "h": [
            "2806ba3f9393a056"
          ]
        },
        {
          "type": "text",
          "title": "La clé",
          "text": "<p>Dans la réserve suivante, retirez <b>une fois chacune</b> des lettres :</p><p class=\"big-code\">P – O – R – T</p><p>Réserve :</p><p class=\"big-code\">D R S E R R L T P I E O A B U O E T N</p><p>Une fois ces quatre lettres retirées, réorganisez toutes les lettres restantes.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
          "wrong": "❌ ANAGRAMME INCORRECTE<br>Votre clé est :<br><b>PORT</b><br>Retirez donc exactement : P + O + R + T<br>Puis utilisez toutes les lettres restantes.",
          "hints": [
            "Après avoir retiré PORT, il vous reste <b>15 lettres</b>.",
            "Votre destination se trouve justement sur le port.",
            "Les lettres restantes commencent par former :<br><b>TERRAIN…</b>"
          ],
          "success": {
            "title": "✅ DESTINATION IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE BOULES</p><p>Rendez-vous maintenant au <b>terrain de boules</b> sur le port.</p><p>Votre mission individuelle s'arrête ici.<br>Mais le jeu, lui, n'est pas encore terminé.</p><p>Gardez avec vous votre <b>carte mystère</b> récupérée au Four Banal.<br><b>ELLE VA BIENTÔT VOUS SERVIR.</b></p>",
            "button": "Rejoindre la finale"
          },
          "h": [
            "0127ee232eadacb1",
            "1babb03ef46e0021",
            "27f846c4240e328d",
            "1679a87d24243bc2",
            "fd9e34f23440ca52",
            "cab91489a859b505",
            "cab91489a859b505"
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
  },
  "answerBook": {
    "salt": "lEvuzAs15VtMCTd8JGH0FA==",
    "iv": "P2yV6c1kmbtsq1ZJ",
    "data": "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"
  }
};
