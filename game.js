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
          "text": "<p>Un message a été intercepté.</p><p class=\"big-code\">BADF PQ OMEEUE</p><p>Il a été chiffré à l'aide d'un <b>code César</b>.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
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
  "version": "2026.11.04-1409",
  "answerBook": {
    "salt": "/3+WQAFMMq+It75PBY3uWA==",
    "iv": "2Raey29i/vX30v+s",
    "data": "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"
  }
};
