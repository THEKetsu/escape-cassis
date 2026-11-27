/* Fichier généré à partir de contenu.js : ne pas modifier à la main. */
window.GAME = {
  "id": "cassis-ccoi-2026-b",
  "title": "L'Inconnu de Cassis",
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
    "tagline": "7 équipes. 5 lieux. Une identité à retrouver.",
    "credits": "Créé par Quentin BENDER & Solène PACE",
    "storyPhoto": "images/visuels/port-falaise.jpg",
    "story": "<p>Il y a plusieurs années, un homme a parcouru Cassis à la recherche d'un secret.</p><p>Il voulait retrouver une saveur d'antan, liée aux souvenirs du Sud, puis la réinventer.</p><p>Au cours de son passage, il aurait laissé derrière lui des messages, des indices et des fragments.</p><p><b>Puis il a disparu.</b></p><p>Aujourd'hui, de nouvelles traces viennent d'être retrouvées. Votre mission consiste à les suivre.</p><p><b>5 lieux vous attendent.</b> Certaines découvertes vous permettront d'avancer. D'autres pourront sembler inutiles.</p><p class=\"keep\">CONSERVEZ TOUT CE QUE VOUS TROUVEZ.</p><p class=\"quote\">Retenez une chose : un secret n'est jamais confié à une seule personne.</p>",
    "rules": [
      {
        "title": "RESTEZ EN ÉQUIPE",
        "text": "Votre équipe doit rester ensemble pendant tout le parcours."
      },
      {
        "title": "UN SEUL TÉLÉPHONE",
        "text": "Utilisez un seul appareil pour suivre la mission."
      },
      {
        "title": "OBSERVEZ AUTOUR DE VOUS",
        "text": "La majorité des réponses se trouvent directement sur le terrain."
      },
      {
        "title": "SUIVEZ VOTRE PARCOURS",
        "text": "Ne rejoignez jamais un lieu qui ne vous a pas été indiqué."
      },
      {
        "title": "GARDEZ VOS RÉPONSES POUR VOUS",
        "text": "Les autres équipes suivent des parcours différents."
      },
      {
        "title": "UTILISEZ LES INDICES SI NÉCESSAIRE",
        "text": "Ne restez pas bloqués inutilement."
      },
      {
        "title": "CONSERVEZ TOUT CE QUE VOUS RECEVEZ",
        "text": "Une carte ou une enveloppe peut avoir de l'importance plus tard."
      }
    ],
    "emergency": {
      "name": "Solène",
      "phone": "+33751617623",
      "label": "07 51 61 76 23"
    },
    "rulesNote": "Un souci ou un blocage ? Écrivez à l'organisation avec le bouton de tchat, ou appelez Solène au <a href=\"tel:+33751617623\"><b>07 51 61 76 23</b></a>.",
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
        "4": "C",
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
        "4": "C",
        "5": "B"
      }
    },
    "E6": {
      "name": "Équipe 6",
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
    "E7": {
      "name": "Équipe 7",
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
      "photo": "images/visuels/place-baragnon.jpg",
      "lat": 43.21427,
      "lng": 5.5396,
      "where": "la Place Baragnon",
      "lastSuccess": {
        "title": "✅ DESTINATION IDENTIFIÉE",
        "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE PÉTANQUE</p>"
      },
      "A": [
        {
          "type": "number",
          "title": "Mission {{zone}} — La clé de pierre",
          "photo": "images/visuels/place-baragnon.jpg",
          "text": "<p>Votre mission commence sur la <b>Place Baragnon</b>.</p><p>Quelque part autour de vous, un monument conserve une information essentielle.</p><p>Observez attentivement la place et retrouvez le monument portant une date gravée en chiffres romains. Lorsque vous l'avez trouvée, convertissez cette date en chiffres arabes.</p><p><b>Quelle année avez-vous trouvée ?</b></p>",
          "wrong": "Ce n'est pas la bonne année.<br>Observez bien les monuments présents sur la place. Vous cherchez une date gravée en chiffres romains.<br>Réessayez.",
          "hints": [
            "Vous cherchez un monument en pierre sur la Place Baragnon.",
            "Approchez-vous de la fontaine Baragnon.<br>Une date y est gravée.",
            "Rappel : M = 1000, D = 500, C = 100, L = 50, X = 10, V = 5, I = 1."
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "wrong": "La clé n'est pas correcte.<br>Reprenez les quatre chiffres de l'année trouvée et additionnez-les : 1 + 9 + 1 + 1",
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "wrong": "Votre clé est bien 12. Pour chaque lettre du message, comptez 12 lettres en arrière dans l'alphabet.<br>Essayez de nouveau.",
          "hints": [
            "Commencez par le premier mot : <b>BADF</b><br>Avec une clé de 12 : B → P",
            "Le premier mot décrypté est : <b>PORT</b>",
            "Le message complet comporte trois mots :<p class=\"big-code\">_ _ _ _ &nbsp; _ _ &nbsp; _ _ _ _ _ _</p>"
          ],
          "after": {
            "final": {
              "text": "<p>Un dernier message a été intercepté.</p><p class=\"big-code\">FQDDMUZ PQ BQFMZCGQ</p><p>Il a été chiffré à l'aide d'un <b>code César</b>, avec la même clé.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
              "wrong": "Votre clé est bien 12. Pour chaque lettre du message, comptez 12 lettres en arrière dans l'alphabet.<br>Essayez de nouveau.",
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
            "title": "✅ DESTINATION IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">PORT DE CASSIS</p><p>Votre prochaine destination est le <b>Port de Cassis</b>.<br>Rendez-vous sur place pour poursuivre votre mission.</p>",
            "photo": "images/visuels/port-falaise.jpg",
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
          "photo": "images/visuels/place-baragnon.jpg",
          "text": "<p>Sur la <b>Place Baragnon</b> se trouve un lieu consacré à la mémoire de Cassis.</p><p>Retrouvez-le.</p><p>Observez ensuite les trois mots inscrits au-dessus de son entrée. Gardez uniquement la première lettre de chaque mot.</p><p><b>Quelles initiales obtenez-vous ?</b></p>",
          "wrong": "Ce ne sont pas les bonnes initiales.<br>Cherchez le lieu qui conserve la mémoire de Cassis et observez attentivement l'inscription située au-dessus de l'entrée.",
          "hints": [
            "Vous cherchez le Musée de Cassis.",
            "L'inscription au-dessus de l'entrée est composée de trois mots :<br><b>MUSÉE DE CASSIS</b>"
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "wrong": "La clé n'est pas correcte.<br>Rappelez-vous :<br>M = 13<br>D = 4<br>C = 3<br>Effectuez ensuite : 13 − 4 − 3",
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "wrong": "Votre clé est bien 6. Pour chaque lettre du message, reculez de 6 positions dans l'alphabet.<br>Essayez de nouveau.",
          "hints": [
            "Commencez par la première lettre :<br>Y → S",
            "Le message complet comporte deux mots :<p class=\"big-code\">_ _ _ _ _ &nbsp; _ _ _ _ _ _</p>"
          ],
          "after": {
            "final": {
              "text": "<p>Un dernier message a été intercepté :</p><p class=\"big-code\">ZKXXGOT JK VKZGTWAK</p><p>Il a été chiffré à l'aide d'un <b>code César</b>, avec la même clé.</p><p>Décryptez maintenant le message.</p><p><b>Quelle destination obtenez-vous ?</b></p>",
              "wrong": "Votre clé est bien 6. Pour chaque lettre du message, reculez de 6 positions dans l'alphabet.<br>Essayez de nouveau.",
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
            "title": "✅ DESTINATION IDENTIFIÉE",
            "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">SAINT-MICHEL</p><p>Votre prochaine destination est :<br><b>L'ÉGLISE SAINT-MICHEL</b></p><p>Rendez-vous sur place pour poursuivre votre mission.</p>",
            "photo": "images/visuels/eglise-saint-michel.jpg",
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
      "photo": "images/visuels/port-falaise.jpg",
      "lat": 43.21447,
      "lng": 5.5387,
      "where": "le Port de Cassis",
      "lastSuccess": {
        "title": "✅ DESTINATION IDENTIFIÉE",
        "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE PÉTANQUE</p>"
      },
      "A": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Le bon point de vue",
          "photo": "images/fond-port.jpg",
          "text": "<p>Sur le port se trouve quelqu'un qui veille sur Cassis sans jamais quitter sa place.</p><p>Il est de pierre et se tient face au paysage.</p><p><b>Retrouvez Calendal.</b></p><p>Lorsque vous pensez l'avoir trouvé, poursuivez la mission.</p>",
          "button": "J'ai trouvé Calendal"
        },
        {
          "type": "image-choice",
          "title": "Observation",
          "text": "<p><b>ÉTAPE VALIDÉE</b> : Calendal est identifié.</p><p>Maintenant, changez de point de vue.</p><p>Placez-vous <b>dans le même sens que Calendal</b> et regardez <b>là où il regarde</b>.</p><p>Parmi les 4 propositions visuelles, une seule correspond exactement à ce qu'il a devant lui.</p><p><b>Laquelle est correcte ?</b></p>",
          "options": [
            {
              "img": "images/port-photo-a.jpg",
              "label": "A"
            },
            {
              "img": "images/port-photo-b.jpg",
              "label": "B"
            },
            {
              "img": "images/port-photo-c.jpg",
              "label": "C"
            },
            {
              "img": "images/port-photo-d.jpg",
              "label": "D"
            }
          ],
          "wrong": "Ne vous fiez pas à votre mémoire.<br>Placez-vous réellement dans le même sens que Calendal, regardez là où il regarde et comparez avec les propositions.<br>Réessayez.",
          "hints": [
            "Vous cherchez une statue en pierre située sur la promenade du port.",
            "Il s'agit de Calendal.",
            "Ne vous placez pas face à lui.<br>Placez-vous comme lui, en regardant dans la même direction.",
            "Regardez là où il regarde : la bonne proposition montre exactement ce qu'il a devant lui.<br>Une seule proposition correspond à la réalité."
          ],
          "success": {
            "title": "✅ ÉTAPE VALIDÉE",
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
          "wrong": "Cherchez une boutique de parfums du vieux Cassis.<br>Son nom contient le mot : <b>EAU</b>",
          "after": {
            "final": {
              "text": "<p>Votre prochaine destination est la <b>dernière</b> de votre parcours.</p><p>Sur le port, on s'y retrouve pour jouer en lançant des boules.</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
              "wrong": "Cherchez un lieu du port où l'on joue avec des boules.<br>Son nom contient le mot : <b>PÉTANQUE</b>",
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
            "photo": "images/visuels/boutique-facade-1.jpg",
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
          "photo": "images/fond-phare.jpg",
          "text": "<p>Sur le port de Cassis se trouve un tribunal un peu particulier.</p><p>On n'y jugeait ni vols, ni crimes, ni délits.</p><p><b>Votre première mission est de retrouver ce bâtiment.</b></p><p>Lorsque vous pensez l'avoir identifié, observez attentivement sa façade et ses alentours.</p>",
          "button": "Nous pensons être au bon endroit"
        },
        {
          "type": "multi",
          "title": "Les trois témoins",
          "photo": "images/visuels/prudhomie.jpg",
          "text": "<p><b>✅ ÉTAPE VALIDÉE</b> : le lieu est identifié.</p><p>Trois noms vous sont proposés :</p><p class=\"big-code\">SAINT-PIERRE<br>FRÉDÉRIC MISTRAL<br>SAINT-MICHEL</p><p>Deux d'entre eux sont directement liés au lieu devant vous. Le troisième ne l'est pas.</p><p>Observez attentivement le bâtiment et les éléments visibles autour de vous.</p><p><b>Quels sont les deux noms liés à ce lieu ?</b></p>",
          "options": [
            "SAINT-PIERRE",
            "FRÉDÉRIC MISTRAL",
            "SAINT-MICHEL"
          ],
          "count": 2,
          "wrong": "Ne cherchez pas une réponse sur Internet.<br>Tout ce dont vous avez besoin se trouve devant vous.<br>Observez la façade, la niche et les inscriptions visibles autour du bâtiment.<br>Réessayez.",
          "hints": [
            "Commencez par observer attentivement la façade du bâtiment.",
            "L'un des personnages est traditionnellement associé aux pêcheurs.",
            "Regardez aussi les plaques ou inscriptions présentes près du bâtiment."
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "wrong": "Reprenez la liste initiale :<br>Saint-Pierre, Frédéric Mistral, Saint-Michel<br>Vous avez déjà identifié les deux premiers.<br>Quel nom reste-t-il ?",
          "after": {
            "final": {
              "text": "<p>Vous avez identifié les deux témoins : <b>Saint-Pierre</b>, le patron des pêcheurs, et <b>Frédéric Mistral</b>, le poète de la Provence.</p><p>Le troisième nom, Saint-Michel, vous l'avez déjà rencontré : votre parcours touche à sa fin.</p><p>Il vous reste à rejoindre l'endroit du port où l'on se retrouve pour un jeu provençal né en 1907 tout près d'ici, à La Ciotat, et que l'on joue « les pieds tanqués ».</p><p><b>Quel lieu devez-vous rejoindre ?</b></p>",
              "wrong": "« Pieds tanqués » : c'est l'origine du nom de ce jeu de boules.<br>Où y joue-t-on sur le port ?",
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
            "photo": "images/visuels/eglise-saint-michel.jpg",
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
      "photo": "images/visuels/eglise-saint-michel.jpg",
      "lat": 43.21583,
      "lng": 5.53789,
      "where": "l'église Saint-Michel",
      "lastSuccess": {
        "title": "✅ DESTINATION IDENTIFIÉE",
        "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE PÉTANQUE</p>"
      },
      "A": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Le chemin architectural",
          "photo": "images/visuels/eglise-saint-michel.jpg",
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
          "wrong": "Regardez de nouveau la façade.<br>Commencez par l'axe principal de l'église, du bas vers le haut.<br>Le clocher est un élément latéral : il vient en dernier.<br>Réessayez.",
          "hints": [
            "Commencez tout en bas de la façade.",
            "Le portail est le premier élément.",
            "Suivez ensuite la façade vers le haut :<br>portail → baies → oculus → croix",
            "Le clocher / l'horloge constitue le dernier repère."
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
                2,
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
                3,
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
                    2,
                    0,
                    "R"
                  ],
                  [
                    4,
                    2,
                    "D"
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
          "wrong": "Vérifiez votre chemin.<br>Si le Zip est correctement résolu, les lettres doivent former un lieu de Cassis.",
          "after": {
            "final": {
              "text": "<p>Lorsque le chemin est terminé, lisez les lettres dans l'ordre où vous les avez rencontrées.</p><p>Elles forment le nom de votre <b>dernière</b> destination.</p><p><b>Quelle destination avez-vous trouvée ?</b></p>",
              "wrong": "Vérifiez votre chemin.<br>Si le Zip est correctement résolu, les lettres forment le lieu de la finale.",
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
          "photo": "images/visuels/eglise-saint-michel.jpg",
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
          "wrong": "Ne cherchez pas l'ordre dans la grille.<br>Il se trouve directement sur l'église devant vous.<br>Observez la façade du bas vers le haut.",
          "hints": [
            "Rangez-les dans l'ordre où on les rencontre en parcourant la façade <b>du bas vers le haut</b>. Le clocher, sur le côté, vient en dernier.",
            "Commencez par le portail."
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
                4,
                "D"
              ],
              [
                1,
                0,
                "D"
              ],
              [
                3,
                0,
                "D"
              ],
              [
                3,
                2,
                "D"
              ],
              [
                4,
                2,
                "D"
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
          "wrong": "Vérifiez que votre parcours passe bien par les 49 cases et que vous avez relevé les lettres dans le bon ordre.",
          "success": {
            "title": "✅ DESTINATION IDENTIFIÉE",
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
      "photo": "images/visuels/boutique-facade-1.jpg",
      "badge": "Boutique",
      "lat": 43.21505,
      "lng": 5.53638,
      "where": "La boutique & musée : L'Eau de Cassis, rue Saint-Clair",
      "lastSuccess": {
        "title": "✅ FRAGMENT RÉCUPÉRÉ",
        "text": "<p>Votre enveloppe contient :</p><div class=\"env-list\"><div class=\"env-item\"><span>📍</span><div><b>Votre prochaine destination</b></div></div><div class=\"env-item keep\"><span>🃏</span><div><b>Une carte mystère</b></div></div></div><p class=\"mission-alert\">GARDEZ CETTE CARTE PRÉCIEUSEMENT.</p><p>Elle pourrait vous servir à tout moment.<br>Ne la montrez pas aux autres équipes.</p>",
        "button": "CONTINUER"
      },
      "A": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Une nouvelle trace",
          "photo": "images/visuels/ruelle-bougainvilliers.jpg",
          "text": "<p>Votre parcours vous conduit vers une étape différente.</p><p>Ici, aucun chiffre à décoder.<br>Aucune façade à analyser.</p><p>Pour continuer, vous allez devoir faire confiance à un autre sens : <b>votre odorat.</b></p><p>Dirigez-vous vers un endroit qui suscite les sens, rue Saint-Clair.</p><p>Lorsque vous arrivez sur place, entrez dans la boutique et indiquez simplement votre numéro d'équipe : <b>équipe {{numero}}</b>.</p>",
          "button": "NOUS SOMMES ARRIVÉS"
        },
        {
          "type": "info",
          "title": "Épreuve olfactive",
          "photo": "images/visuels/boutique-interieur.jpg",
          "text": "<p>Un parfum va vous être présenté.</p><p>Ne cherchez pas son nom.<br>Ne cherchez pas à deviner sa destination.</p><p>Concentrez-vous uniquement sur ce que vous percevez.</p><p>Votre objectif : <b>identifier au moins 2 notes olfactives.</b></p><p>Discutez entre vous, comparez vos ressentis et saisissez les notes que vous pensez reconnaître.</p>",
          "button": "SAISIR NOS RÉPONSES"
        },
        {
          "type": "text",
          "title": "Vos réponses",
          "text": "<p><b>Quelles notes avez-vous reconnues ?</b></p><p>Entrez-les <b>une par une</b> : il vous en faut deux.</p>",
          "oneByOne": true,
          "atLeast": 2,
          "wrong": "<p>Vous n'avez pas encore identifié suffisamment de notes correctes.</p><p>Reprenez le parfum.<br>Concentrez-vous sur les premières sensations, puis sur ce qui reste après quelques secondes.</p><p>Échangez entre vous et réessayez.</p>",
          "gh": [
            [
              "53ff32eaedcb23cc"
            ],
            [
              "490b2e7be8a26cf6",
              "c0f639eb9205b9cf"
            ],
            [
              "3da519297da94ede",
              "e53004c101dbbe9e"
            ],
            [
              "52f12fa690113188",
              "05351632422bebd4",
              "227f4e760f565999"
            ]
          ]
        },
        {
          "type": "info",
          "title": "✅ ÉPREUVE VALIDÉE",
          "photo": "images/visuels/boutique-facade-2.jpg",
          "text": "<p>Vous avez correctement identifié au moins deux notes du parfum.</p><div class=\"envelope-tag\">✉️ Enveloppe à remettre<b>{{equipe}}</b></div><p><b>Présentez maintenant cet écran à la personne de la boutique.</b><br>Elle vous remettra l'enveloppe de votre équipe.</p>",
          "button": "ENVELOPPE RÉCUPÉRÉE",
          "success": {
            "title": "✅ NOUVELLE TRACE RÉCUPÉRÉE",
            "text": "<p>Votre enveloppe contient deux éléments.</p><p>L'un vous permettra de poursuivre votre parcours.<br>L'autre pourrait sembler inutile pour l'instant.</p><p class=\"mission-alert\">CONSERVEZ TOUT.</p><p>Vous comprendrez peut-être plus tard pourquoi cet élément vous a été confié.</p>",
            "button": "POURSUIVRE LA MISSION"
          }
        }
      ],
      "B": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Une nouvelle trace",
          "photo": "images/visuels/ruelle-bougainvilliers.jpg",
          "text": "<p>Votre parcours vous conduit vers une étape différente.</p><p>Ici, aucun chiffre à décoder.<br>Aucune façade à analyser.</p><p>Pour continuer, vous allez devoir faire confiance à un autre sens : <b>votre odorat.</b></p><p>Dirigez-vous vers un endroit qui suscite les sens, rue Saint-Clair.</p><p>Lorsque vous arrivez sur place, entrez dans la boutique et indiquez simplement votre numéro d'équipe : <b>équipe {{numero}}</b>.</p>",
          "button": "NOUS SOMMES ARRIVÉS"
        },
        {
          "type": "info",
          "title": "Épreuve olfactive",
          "photo": "images/visuels/boutique-interieur.jpg",
          "text": "<p>Un parfum va vous être présenté.</p><p>Ne cherchez pas son nom.<br>Ne cherchez pas à deviner sa destination.</p><p>Concentrez-vous uniquement sur ce que vous percevez.</p><p>Votre objectif : <b>identifier au moins 2 notes olfactives.</b></p><p>Discutez entre vous, comparez vos ressentis et saisissez les notes que vous pensez reconnaître.</p>",
          "button": "SAISIR NOS RÉPONSES"
        },
        {
          "type": "text",
          "title": "Vos réponses",
          "text": "<p><b>Quelles notes avez-vous reconnues ?</b></p><p>Entrez-les <b>une par une</b> : il vous en faut deux.</p>",
          "oneByOne": true,
          "atLeast": 2,
          "wrong": "<p>Vous n'avez pas encore identifié suffisamment de notes correctes.</p><p>Reprenez le parfum.<br>Concentrez-vous sur les premières sensations, puis sur ce qui reste après quelques secondes.</p><p>Échangez entre vous et réessayez.</p>",
          "gh": [
            [
              "059bf97d9c02615b",
              "a73794cb72dbdc1f"
            ],
            [
              "5550cd104f71f4ce"
            ],
            [
              "633daec3f269fcdd"
            ],
            [
              "6490083dba1398e2",
              "ed3be39fd45f7f8d"
            ],
            [
              "dee3dcea90cdee06",
              "58edbe9e6467a795"
            ]
          ]
        },
        {
          "type": "info",
          "title": "✅ ÉPREUVE VALIDÉE",
          "photo": "images/visuels/boutique-facade-2.jpg",
          "text": "<p>Vous avez correctement identifié au moins deux notes du parfum.</p><div class=\"envelope-tag\">✉️ Enveloppe à remettre<b>{{equipe}}</b></div><p><b>Présentez maintenant cet écran à la personne de la boutique.</b><br>Elle vous remettra l'enveloppe de votre équipe.</p>",
          "button": "ENVELOPPE RÉCUPÉRÉE",
          "success": {
            "title": "✅ NOUVELLE TRACE RÉCUPÉRÉE",
            "text": "<p>Votre enveloppe contient deux éléments.</p><p>L'un vous permettra de poursuivre votre parcours.<br>L'autre pourrait sembler inutile pour l'instant.</p><p class=\"mission-alert\">CONSERVEZ TOUT.</p><p>Vous comprendrez peut-être plus tard pourquoi cet élément vous a été confié.</p>",
            "button": "POURSUIVRE LA MISSION"
          }
        }
      ],
      "C": [
        {
          "type": "info",
          "title": "Mission {{zone}} — Une nouvelle trace",
          "photo": "images/visuels/ruelle-bougainvilliers.jpg",
          "text": "<p>Votre parcours vous conduit vers une étape différente.</p><p>Ici, aucun chiffre à décoder.<br>Aucune façade à analyser.</p><p>Pour continuer, vous allez devoir faire confiance à un autre sens : <b>votre odorat.</b></p><p>Dirigez-vous vers un endroit qui suscite les sens, rue Saint-Clair.</p><p>Lorsque vous arrivez sur place, entrez dans la boutique et indiquez simplement votre numéro d'équipe : <b>équipe {{numero}}</b>.</p>",
          "button": "NOUS SOMMES ARRIVÉS"
        },
        {
          "type": "info",
          "title": "Épreuve olfactive",
          "photo": "images/visuels/boutique-interieur.jpg",
          "text": "<p>Un parfum va vous être présenté.</p><p>Ne cherchez pas son nom.<br>Ne cherchez pas à deviner sa destination.</p><p>Concentrez-vous uniquement sur ce que vous percevez.</p><p>Votre objectif : <b>identifier au moins 2 notes olfactives.</b></p><p>Discutez entre vous, comparez vos ressentis et saisissez les notes que vous pensez reconnaître.</p>",
          "button": "SAISIR NOS RÉPONSES"
        },
        {
          "type": "text",
          "title": "Vos réponses",
          "text": "<p><b>Quelles notes avez-vous reconnues ?</b></p><p>Entrez-les <b>une par une</b> : il vous en faut deux.</p>",
          "oneByOne": true,
          "atLeast": 2,
          "wrong": "<p>Vous n'avez pas encore identifié suffisamment de notes correctes.</p><p>Reprenez le parfum.<br>Concentrez-vous sur les premières sensations, puis sur ce qui reste après quelques secondes.</p><p>Échangez entre vous et réessayez.</p>",
          "gh": [
            [
              "1563f9722f7586fd",
              "c8d4b08d1703cf3a"
            ],
            [
              "011d6d2c97ee4444"
            ],
            [
              "198d61738535f575"
            ],
            [
              "1c86c483b27a7db2",
              "1c86c483b27a7db2"
            ]
          ]
        },
        {
          "type": "info",
          "title": "✅ ÉPREUVE VALIDÉE",
          "photo": "images/visuels/boutique-facade-2.jpg",
          "text": "<p>Vous avez correctement identifié au moins deux notes du parfum.</p><div class=\"envelope-tag\">✉️ Enveloppe à remettre<b>{{equipe}}</b></div><p><b>Présentez maintenant cet écran à la personne de la boutique.</b><br>Elle vous remettra l'enveloppe de votre équipe.</p>",
          "button": "ENVELOPPE RÉCUPÉRÉE",
          "success": {
            "title": "✅ NOUVELLE TRACE RÉCUPÉRÉE",
            "text": "<p>Votre enveloppe contient deux éléments.</p><p>L'un vous permettra de poursuivre votre parcours.<br>L'autre pourrait sembler inutile pour l'instant.</p><p class=\"mission-alert\">CONSERVEZ TOUT.</p><p>Vous comprendrez peut-être plus tard pourquoi cet élément vous a été confié.</p>",
            "button": "POURSUIVRE LA MISSION"
          }
        }
      ]
    },
    "5": {
      "name": "Maison de l'Europe",
      "photo": "images/visuels/maison-de-leurope.jpg",
      "lat": 43.21466,
      "lng": 5.53876,
      "where": "la Maison de l'Europe",
      "lastSuccess": {
        "title": "✅ DESTINATION IDENTIFIÉE",
        "text": "<p>Vous avez trouvé :</p><p class=\"big-code\">TERRAIN DE PÉTANQUE</p>"
      },
      "A": [
        {
          "type": "text",
          "title": "Mission {{zone}} — Le message du blason",
          "photo": "images/visuels/maison-de-leurope.jpg",
          "text": "<p>Vous approchez de la fin de votre parcours.</p><p>Votre prochaine destination est cachée juste devant vous.</p><p>Observez attentivement les <b>armoiries</b> situées au-dessus de l'entrée.</p><p><b>Quels éléments y reconnaissez-vous ?</b></p>",
          "wrong": "Ne cherchez pas une inscription.<br>Regardez directement les symboles représentés sur les armoiries.<br>Réessayez.",
          "hints": [
            "Vous devez identifier trois éléments.",
            "Deux d'entre eux sont identiques.",
            "L'un des éléments est le bâton recourbé que porte un évêque. Les deux autres vivent dans la mer."
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "wrong": "Vérifiez d'abord que vous avez retiré exactement :<br>1 × CROSSE<br>2 × POISSON<br>Ensuite, utilisez toutes les lettres restantes.",
          "hints": [
            "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
            "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
            "Ce sont les armes de la ville : le mot commence par <b>CA…</b>"
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "photo": "images/visuels/maison-de-leurope.jpg",
          "text": "<p>La fin approche.</p><p>Mais avant de rejoindre votre destination finale, vous allez devoir utiliser les <b>armoiries</b> de la Maison de l'Europe.</p><p>Observez-les attentivement.</p><p><b>Quels trois éléments voyez-vous ?</b></p>",
          "wrong": "Regardez les symboles représentés au-dessus de l'entrée.<br>Deux sont identiques.",
          "hints": [
            "Vous cherchez un objet associé à l'autorité religieuse.",
            "Les deux autres éléments sont des animaux marins."
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
          "wrong": "Vérifiez d'abord que vous avez retiré exactement :<br>1 × CROSSE<br>2 × POISSON<br>Ensuite, utilisez toutes les lettres restantes.",
          "hints": [
            "Commencez par barrer les lettres de :<br><b>C R O S S E</b>",
            "Retirez ensuite deux fois :<br><b>P O I S S O N</b>",
            "Les lettres restantes commencent par former :<br><b>CA…</b>"
          ],
          "success": {
            "title": "✅ INDICE DÉCRYPTÉ",
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
    "where": "les terrains de pétanque, quai Saint-Pierre",
    "lat": 43.21361,
    "lng": 5.5383,
    "steps": [
      {
        "type": "info",
        "title": "PARCOURS TERMINÉ",
        "photo": "images/visuels/petanque-port.jpg",
        "text": "<p class=\"lead\">Vous avez validé vos 5 lieux.</p><p><b>Mais votre mission n'est pas terminée.</b></p><p>Conservez tout ce que vous avez récupéré et rejoignez immédiatement :</p><div class=\"destination\"><b>Terrains de pétanque</b><small>quai Saint-Pierre</small></div><p>À votre arrivée, attendez les instructions du Maître du jeu.</p><p class=\"mission-alert\">Ne partagez encore aucun élément avec les autres équipes.</p>",
        "button": "REJOINDRE LE POINT FINAL"
      },
      {
        "type": "text",
        "title": "Arrivée au point final",
        "photo": "images/visuels/petanque-golden.jpg",
        "text": "<p>Vous êtes arrivés ?</p><p>Demandez le <b>code d'arrivée</b> au Maître du jeu et saisissez-le : il arrête votre chrono.</p>",
        "h": [
          "8a25b67e1a15945d"
        ]
      }
    ],
    "finale": {
      "type": "text",
      "introTitle": "MISSION FINALE",
      "intro": "<p>Vous avez parcouru Cassis séparément.</p><p>Vous avez tous récupéré un fragment.</p><p>Il est maintenant temps de comprendre pourquoi.</p><p class=\"keep\">RÉUNISSEZ VOS 7 CARTES.</p><p>À partir de maintenant :</p><p class=\"keep\">VOUS N'ÊTES PLUS 7 ÉQUIPES.<br>VOUS N'ÊTES PLUS QU'UN SEUL GROUPE.</p>",
      "button": "COMMENCER LA FINALE",
      "title": "Le dernier secret",
      "text": "<p>Réunissez les 7 cartes mystères et assemblez leurs fragments, tous ensemble.</p><p><b>Qui est l'homme que vous suiviez depuis le début ?</b></p>",
      "wrong": "Ce n'est pas son nom.<br>Réunissez bien les 7 cartes et assemblez tous les fragments.",
      "revealPhoto": "images/visuels/monsieur-praline.jpg",
      "reveal": "<h1 class=\"display\">MISSION ACCOMPLIE</h1><i class=\"rule\"></i><p>Vous avez retrouvé son identité.</p><p>L'homme que vous suiviez depuis le début.<br>Celui qui cherchait à retrouver une saveur d'antan pour la réinventer.</p><div class=\"destination\"><b>{{reponse}}</b></div><p>Votre mission était de retrouver son secret.</p><p>Il ne vous reste plus qu'à…</p><div class=\"destination\"><b>LE GOÛTER</b></div><p class=\"end\">L'INCONNU DE CASSIS — TERMINÉ</p>",
      "h": [
        "79146382da27476f",
        "b7dcaaec1387b479",
        "93470e28885cc516"
      ]
    }
  },
  "version": "2026.11.27-1532",
  "answerBook": {
    "salt": "hmSyMHW5QkYSCtkaVU4gmQ==",
    "iv": "o0gmymm1f3HIFzEh",
    "data": "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"
  }
};
