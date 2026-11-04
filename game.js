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
      "where": "le Port de Cassis, près de la statue de Calendal",
      "lastSuccess": {
        "title": "✅ ÉNIGME RÉSOLUE",
        "text": "<p>Vous venez de terminer votre 5e zone.</p><p>Toutes les étapes de votre parcours sont maintenant validées.</p><p>Rejoignez le <b>terrain de pétanque</b> sur le port.</p><p><b>Gardez votre carte mystère avec vous</b> : vous allez bientôt en avoir besoin.</p>",
        "button": "Rejoindre le point final"
      },
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
          "title": "Mission 3 — Le chemin architectural",
          "text": "<p>Vous êtes devant l'<b>église Saint-Michel</b>.</p><p>Votre prochaine destination est cachée dans son architecture.</p><p>Observez attentivement la façade : plusieurs éléments de l'architecture vont vous servir.</p><p>Une fois que vous les avez repérés, déterminez dans quel ordre ils se lisent sur le bâtiment.</p>",
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
            "title": "✅ CHEMIN VALIDÉ",
            "text": "<p>Votre chemin passe par les 49 cases.</p><p>Lisez les lettres rencontrées, dans l'ordre : elles forment un lieu de Cassis.</p>"
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
          "text": "<p>Vous êtes devant l'<b>église Saint-Michel</b>.</p><p>Votre prochaine destination est elle aussi dissimulée dans son architecture.</p><p>Observez attentivement la façade : plusieurs éléments de l'architecture vont, ici aussi, vous servir.</p><p>Votre première mission est de déterminer leur ordre.</p>",
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
            "title": "✅ CHEMIN VALIDÉ",
            "text": "<p>Votre chemin passe par les 49 cases.</p><p>Lisez les lettres rencontrées, dans l'ordre : elles forment un lieu de Cassis.</p>"
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
      "where": "le Four Banal",
      "lastSuccess": {
        "title": "✅ ENVELOPPE RÉCUPÉRÉE",
        "text": "<p>Ouvrez maintenant votre enveloppe.</p><div class=\"env-list\"><div class=\"env-item\"><span>🏁</span><div><b>Parcours terminé</b><p>Vous avez traversé les 5 zones. Rendez-vous aux <b>terrains de pétanque</b>.</p></div></div><div class=\"env-item\"><span>🃏</span><div><b>Une carte mystère</b><p>Elle servira à la finale.</p></div></div></div><p class=\"env-warn\">⚠️ GARDEZ VOTRE CARTE MYSTÈRE PRÉCIEUSEMENT<small>Ne la perdez pas : conservez-la avec votre équipe jusqu'à la fin du jeu.</small></p>",
        "button": "Rejoindre le point final"
      },
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
            "Le nom du métier commence comme le mot :<br><b>FOUR</b>"
          ],
          "h": [
            "8d09a9c838f22c29",
            "bcb29a7a5d0848e5"
          ]
        },
        {
          "type": "info",
          "title": "✅ MÉTIER IDENTIFIÉ",
          "text": "<p>Vous avez retrouvé celui qui faisait vivre le four.</p><p class=\"big-code\">FOURNIER</p><p>Mais votre mission dans ce lieu n'est pas tout à fait terminée.</p><div class=\"envelope-tag\">✉️ Enveloppe à remettre<b>{{equipe}}</b></div><p><b>Montrez cet écran à la personne présente dans le Four Banal.</b><br>Elle vous remettra l'enveloppe correspondant à votre équipe.</p>",
          "button": "J'ai récupéré mon enveloppe",
          "success": {
            "title": "✅ ENVELOPPE RÉCUPÉRÉE",
            "text": "<p>Ouvrez maintenant votre enveloppe.</p><div class=\"env-list\"><div class=\"env-item\"><span>📍</span><div><b>Votre prochaine destination</b><p>Elle est écrite dans l'enveloppe : lisez-la et poursuivez votre parcours.</p></div></div><div class=\"env-item\"><span>🃏</span><div><b>Une carte mystère</b><p>Elle servira à la finale.</p></div></div></div><p class=\"env-warn\">⚠️ GARDEZ VOTRE CARTE MYSTÈRE PRÉCIEUSEMENT<small>Ne la perdez pas : conservez-la avec votre équipe jusqu'à la fin du jeu.</small></p>",
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
          "text": "<p>Vous avez compris l'origine du nom :</p><p class=\"big-code\">FOUR BANAL</p><p>Le terme « banal » était lié au <b>droit de ban</b>.</p><p>Votre mission dans ce lieu n'est cependant pas terminée.</p><div class=\"envelope-tag\">✉️ Enveloppe à remettre<b>{{equipe}}</b></div><p><b>Montrez cet écran à la personne présente dans le Four Banal.</b><br>Elle vous remettra l'enveloppe correspondant à votre équipe.</p>",
          "button": "J'ai récupéré mon enveloppe",
          "success": {
            "title": "✅ ENVELOPPE RÉCUPÉRÉE",
            "text": "<p>Ouvrez maintenant votre enveloppe.</p><div class=\"env-list\"><div class=\"env-item\"><span>📍</span><div><b>Votre prochaine destination</b><p>Elle est écrite dans l'enveloppe : lisez-la et poursuivez votre parcours.</p></div></div><div class=\"env-item\"><span>🃏</span><div><b>Une carte mystère</b><p>Elle servira à la finale.</p></div></div></div><p class=\"env-warn\">⚠️ GARDEZ VOTRE CARTE MYSTÈRE PRÉCIEUSEMENT<small>Ne la perdez pas : conservez-la avec votre équipe jusqu'à la fin du jeu.</small></p>",
            "button": "Continuer la mission"
          }
        }
      ]
    },
    "5": {
      "name": "Maison de l'Europe",
      "lat": 43.215,
      "lng": 5.5383,
      "where": "la Maison de l'Europe",
      "lastSuccess": {
        "title": "✅ DESTINATION IDENTIFIÉE",
        "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE PÉTANQUE</p><p>Votre parcours touche à sa fin : rendez-vous aux <b>terrains de pétanque</b>.</p><p>Conservez avec vous tout ce que vous avez récupéré pendant la mission, et surtout <b>votre carte mystère</b>.</p>",
        "button": "Rejoindre le point final"
      },
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
            "c92a5de4226f7916",
            "dd076bf53300efbd",
            "a433001ecd9a56e7",
            "f332e1f2f163bb4f",
            "60fc63353f787250",
            "d097553eee3e3c0a",
            "18806ea798eeb8f5",
            "3346f472cf4e5b33",
            "43bbabd3dd8a58a4",
            "16ca96a293531053",
            "c87f9000f2d44205",
            "f05984127301ae99",
            "e8c31fb424a38851",
            "0fac31af65dc527b",
            "61d0dfb768b20dc9",
            "9b5614ff3300c838",
            "296f8e4648500484",
            "696e10e6a1dfa536",
            "d9c3339cd330fded",
            "acebbf5ac9e9d08b",
            "9c14b483852d677f",
            "82914a4ba7590c91",
            "5293be13ed96becd",
            "7556078fa0461949",
            "af717ef109d262ae",
            "ff2dee767bdb43d4",
            "e4efeb7e400ddee0",
            "8188ebeed1daac1a",
            "6aa1e0ad7f393fe5",
            "2da40ff500d3d0fd",
            "8f2f275f171e201e",
            "a6166937610c08d2",
            "478e93546fc756a4",
            "3f908f149f721892",
            "d52ab03b3b847941",
            "d98be8667eb77700",
            "63a61d10d499a673",
            "5917c3e5e2873c57",
            "475d3e8cafe2b49f",
            "995c6fe7826ed914",
            "0780376127dd1798",
            "8b6f7df04bed5b48",
            "0723360fe5f39b1f",
            "6dc196ae866d0343",
            "f385f4ceb4da65fe",
            "3023fa6021d6e958",
            "f05ef9b4a2ba1d45",
            "fc4e2084893f6102",
            "fc630bbd493b3ab5",
            "128fb3e43f08a4d6",
            "d75360fb110ba3fd",
            "163a0570374f448e",
            "a673d423e7ed9a45",
            "d383da262f414572",
            "0d6a95710087d697",
            "242a4b2533743e93",
            "33a66f360e063310",
            "217fcb14bfff6eab",
            "f9d58dc4fda8cb34",
            "cb179959a76ccd7e",
            "21aa21a9d7639102",
            "d4b075277c140e18",
            "9d0881b12468cbd7"
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
          "last": {
            "text": "<p>Dans la réserve suivante, retirez <b>exactement</b> toutes les lettres nécessaires pour écrire :</p><p class=\"big-code\">CROSSE<br>POISSON<br>POISSON</p><p>Voici votre réserve :</p><p class=\"big-code\">R S O O Q N T D E P N O R P U S R C A O S T O I A I E E N S N E E P S S I</p><p>Une fois toutes les lettres du blason retirées, il vous restera certaines lettres.<br>Réorganisez-les : elles forment le nom de votre destination finale.</p>",
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
              "0127ee232eadacb1",
              "27f846c4240e328d",
              "1babb03ef46e0021"
            ]
          },
          "h": [
            "53ff32eaedcb23cc"
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
            "c92a5de4226f7916",
            "dd076bf53300efbd",
            "a433001ecd9a56e7",
            "f332e1f2f163bb4f",
            "60fc63353f787250",
            "d097553eee3e3c0a",
            "18806ea798eeb8f5",
            "3346f472cf4e5b33",
            "43bbabd3dd8a58a4",
            "16ca96a293531053",
            "c87f9000f2d44205",
            "f05984127301ae99",
            "e8c31fb424a38851",
            "0fac31af65dc527b",
            "61d0dfb768b20dc9",
            "9b5614ff3300c838",
            "296f8e4648500484",
            "696e10e6a1dfa536",
            "d9c3339cd330fded",
            "acebbf5ac9e9d08b",
            "9c14b483852d677f",
            "82914a4ba7590c91",
            "5293be13ed96becd",
            "7556078fa0461949",
            "af717ef109d262ae",
            "ff2dee767bdb43d4",
            "e4efeb7e400ddee0",
            "8188ebeed1daac1a",
            "6aa1e0ad7f393fe5",
            "2da40ff500d3d0fd",
            "8f2f275f171e201e",
            "a6166937610c08d2",
            "478e93546fc756a4",
            "3f908f149f721892",
            "d52ab03b3b847941",
            "d98be8667eb77700",
            "63a61d10d499a673",
            "5917c3e5e2873c57",
            "475d3e8cafe2b49f",
            "995c6fe7826ed914",
            "0780376127dd1798",
            "8b6f7df04bed5b48",
            "0723360fe5f39b1f",
            "6dc196ae866d0343",
            "f385f4ceb4da65fe",
            "3023fa6021d6e958",
            "f05ef9b4a2ba1d45",
            "fc4e2084893f6102",
            "fc630bbd493b3ab5",
            "128fb3e43f08a4d6",
            "d75360fb110ba3fd",
            "163a0570374f448e",
            "a673d423e7ed9a45",
            "d383da262f414572",
            "0d6a95710087d697",
            "242a4b2533743e93",
            "33a66f360e063310",
            "217fcb14bfff6eab",
            "f9d58dc4fda8cb34",
            "cb179959a76ccd7e",
            "21aa21a9d7639102",
            "d4b075277c140e18",
            "9d0881b12468cbd7"
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
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">PORT</p><p>Ce mot est maintenant votre nouvelle clé.</p>"
          },
          "h": [
            "2806ba3f9393a056"
          ]
        },
        {
          "type": "text",
          "title": "La clé",
          "text": "<p>Dans la réserve suivante, retirez <b>une fois chacune</b> des lettres :</p><p class=\"big-code\">P – O – R – T</p><p>Réserve :</p><p class=\"big-code\">S S O R S C I A T P</p><p>Une fois ces quatre lettres retirées, réorganisez toutes les lettres restantes.</p><p><b>Quel mot obtenez-vous ?</b></p>",
          "wrong": "❌ ANAGRAMME INCORRECTE<br>Votre clé est :<br><b>PORT</b><br>Retirez donc exactement : P + O + R + T<br>Puis utilisez toutes les lettres restantes.",
          "hints": [
            "Après avoir retiré PORT, utilisez <b>toutes</b> les lettres qui restent.",
            "Les armoiries que vous avez observées sont celles de la ville.",
            "Le mot commence par <b>CA…</b>"
          ],
          "success": {
            "title": "✅ MESSAGE DU BLASON DÉCRYPTÉ",
            "text": "<p>Vous avez trouvé le mot :</p><p class=\"big-code\">CASSIS</p><p>Votre passage à la Maison de l'Europe est validé.</p>",
            "routing": true
          },
          "last": {
            "text": "<p>Dans la réserve suivante, retirez <b>une fois chacune</b> des lettres :</p><p class=\"big-code\">P – O – R – T</p><p>Réserve :</p><p class=\"big-code\">N P T I T E P A Q R R E D R U N E A O E T</p><p>Une fois ces quatre lettres retirées, réorganisez toutes les lettres restantes.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
            "hints": [
              "Après avoir retiré PORT, utilisez <b>toutes</b> les lettres qui restent.",
              "Votre destination se trouve justement sur le port.",
              "Les lettres restantes commencent par former :<br><b>TERRAIN…</b>"
            ],
            "h": [
              "cab91489a859b505",
              "cab91489a859b505",
              "881b27a5045117bf",
              "a02e581f895d2ac1",
              "76698bf284309631",
              "32c38040debd5e7c",
              "0127ee232eadacb1",
              "27f846c4240e328d",
              "1babb03ef46e0021"
            ]
          },
          "h": [
            "53ff32eaedcb23cc"
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
  "version": "2026.11.04-1146",
  "answerBook": {
    "salt": "EN9QAZCLPRygZDpeiKOXXA==",
    "iv": "1ChaKvBBkbA7kA5N",
    "data": "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"
  }
};
