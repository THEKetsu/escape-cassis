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
          "type": "info",
          "title": "Le Zip",
          "text": "<p>Vous devez tracer <b>un seul chemin continu</b>.</p><p>Votre chemin doit :</p><ul><li>se déplacer uniquement horizontalement ou verticalement</li><li>passer par les <b>49 cases</b>, chacune exactement une fois</li><li>ne jamais revenir sur une case déjà utilisée</li><li>respecter les murs</li><li>traverser les cinq pictogrammes dans cet ordre :<br><b>PORTAIL → BAIES → OCULUS → CROIX → CLOCHER</b></li></ul><p>Pendant votre parcours, <b>relevez toutes les lettres rencontrées</b>.</p>",
          "images": [
            "images/Zone_3A_Zip_DIFFICILE.png"
          ],
          "button": "J'ai terminé le chemin",
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
          "type": "info",
          "title": "Le Zip",
          "text": "<p>Vous devez tracer <b>un seul chemin continu</b>.</p><p>Votre chemin doit :</p><ul><li>se déplacer uniquement horizontalement ou verticalement</li><li>passer par les <b>49 cases</b>, chacune exactement une fois</li><li>ne jamais revenir sur une case déjà utilisée</li><li>respecter les murs</li><li>traverser les cinq pictogrammes dans cet ordre :<br><b>PORTAIL → BAIES → OCULUS → CROIX → CLOCHER</b></li></ul><p>Pendant votre parcours, <b>relevez toutes les lettres rencontrées</b>.</p>",
          "images": [
            "images/Zone_3B_Zip_DIFFICILE.png"
          ],
          "button": "J'ai terminé le chemin",
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
  },
  "answerBook": {
    "salt": "7r9DjBLe4xUyUPo+ah6i/w==",
    "iv": "BdW07po+nFzZM6OX",
    "data": "QrRGnLwetdM26bEacva+owM/5IhBJ+xZiTwVkZjv02qKKfgmUv7gqNQaZIvI+O18SsM+pDexZpbyIYmCduc0OPb3muHOQsXlRrR3ctejmRC3jbRNSFaH3cr3ozpM7OfEs/kLLhXCBxRnxUZtjz6YXEx/Lx1P5twivrmzjbeRYHdUv6MdLKrkHsO2x/ADJ/gyuSwvU+AJc31tvSdJutloLJauKQXMveiMLiekfzELxpjE7mrt+khHY+rtI47i4lqJBpk9mAMS4n1LaplZwtbBbjOb7bISuWkzOJf0do2s8J1g1mK5YD1vszsjbyUIGhI/24g8k0pRrTKdCM7khKRla/8vSi4rU1fFMjXaNNlATkE+XU4bH9Z2dnqAR6wrHdSlae7zxea+lvXXGRZFJ/M/g3sQRvAwYb+0kJOw330MEqRqp9G2PB0/2eXLa+zR7As8WjuzGHIPLHNGnnt8nj8rnKY4TtBP4lFdf3YJa2ppwzBJbAC8183rXibwoOz+QgF3Lgn9AnHV9CHYePDBFmYB3At1q23PYtFfB2SnAiUkvpp4WnPDrQKYW8N0vcj/7U8ltqAj4yNw/Fcfknm7DgqEyUgbztA4kE0rcqjEpp1INBlFeIXrSauQVDpBkML4DGOSCihog/O1yYvyKbhYJQtpUACjPlu11JbgkWptmP40rB8KIAioKl562oai4j22fLyY7MnEvObspJ0/4IqpTrMV6YwT88CWH3+X1c0uAnNQJDSNiAD1B1fSeFMCNccndmenX+ZdAQlrl7TUXwY9WRaf5hYRVOHMWSYSro6Zb+V7pE3/dEWbwD+Y91Aa3M3P5/GNg+N4fzcg5KPLXmWOI78Me2p5BVt9qDoCWfLdbIknq25LIgWwY2PL+S2IspXus5l12lGczfmygSNQk+fWkcnJ1xlzek3nuZ21/1AdabApWsmUXIvcBoEsSFFv1WTPXE688gtA06CbX51qfXmUyEYn9pNwfQkHWXvosXzW0kBlaqix5ToF+LE/DzA2O7imzjDykydAbx6UNqxX99WzYTnMfBr1AddfLLynwu0pE/ncR8OwEwU3yd4jv95rbGMpTAJSPq8TeGumuYbzPtBtI5/2UinXiTohEbiRFJpcGW8Y7HJBr8fJl7WRdv/5bLRGeET8ia/WCUVPwDqAHDCVVlI0uxkmZbsaQeofPos+vdDx/VT+cFDj6Fzo8OI9EwvXu6hXOw9RivB0bIMmZSoDyn33uYZ/R/0VPlMCk98vSZI1k8xz8VJG6FE2g5Wpbfo/PvFWdB49oWCz+gzuPM1dS/lcPHPjU/+VZkKOSYiKzDavR6BgfEZBDnrfqM600l7KlQ=="
  }
};
