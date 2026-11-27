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
      "reveal": "<h1 class=\"display\">MISSION ACCOMPLIE</h1><p>Vous avez retrouvé son identité.</p><p>L'homme que vous suiviez depuis le début.<br>Celui qui cherchait à retrouver une saveur d'antan pour la réinventer.</p><p class=\"name\">{{reponse}}</p><p>Votre mission était de retrouver son secret.</p><p>Il ne vous reste plus qu'à…</p><p class=\"name\">LE GOÛTER.</p><div class=\"gift\">🎁</div><p class=\"end\">L'INCONNU DE CASSIS — TERMINÉ</p>",
      "h": [
        "79146382da27476f",
        "b7dcaaec1387b479",
        "93470e28885cc516"
      ]
    }
  },
  "version": "2026.11.27-1206",
  "answerBook": {
    "salt": "38y8A4LvuSCSwsfr22WYfQ==",
    "iv": "f9dTFFXZ6JCN3F6j",
    "data": "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"
  }
};
