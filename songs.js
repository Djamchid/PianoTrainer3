// Translation map for note names (English to French)
const noteTranslation = {
  "C": "Do",
  "D": "Ré",
  "E": "Mi",
  "F": "Fa",
  "G": "Sol",
  "A": "La",
  "B": "Si",
  "C#": "Do#",
  "D#": "Ré#",
  "F#": "Fa#",
  "G#": "Sol#",
  "A#": "La#"
};

// Object containing song data and display names
const songsData = {
  "gamme_do": {
    displayName: "Gamme de Do (Montante et Descendante)",
    notes: [
      // Montante
      ["C4", 0, 1], ["D4", 1, 1], ["E4", 2, 1], ["F4", 3, 1],
      ["G4", 4, 1], ["A4", 5, 1], ["B4", 6, 1], ["C5", 7, 1],
      // Pause
      ["C5", 8, 0.5],
      // Descendante
      ["C5", 8.5, 1], ["B4", 9.5, 1], ["A4", 10.5, 1], ["G4", 11.5, 1],
      ["F4", 12.5, 1], ["E4", 13.5, 1], ["D4", 14.5, 1], ["C4", 15.5, 1]
    ],
    lyrics: [
      // Montante
      ["Do", 0, 1], ["Ré", 1, 1], ["Mi", 2, 1], ["Fa", 3, 1],
      ["Sol", 4, 1], ["La", 5, 1], ["Si", 6, 1], ["Do", 7, 1],
      // Pause
      ["", 8, 0.5],
      // Descendante
      ["Do", 8.5, 1], ["Si", 9.5, 1], ["La", 10.5, 1], ["Sol", 11.5, 1],
      ["Fa", 12.5, 1], ["Mi", 13.5, 1], ["Ré", 14.5, 1], ["Do", 15.5, 1]
    ],
    // Doigtés standards pour gamme de Do majeur - main droite
    // Format: [numéro de doigt, temps de début, durée, main ('right' par défaut)]
    fingerings: [
      // Montante - main droite
      [1, 0, 1, "right"], [2, 1, 1, "right"], [3, 2, 1, "right"], [1, 3, 1, "right"],
      [2, 4, 1, "right"], [3, 5, 1, "right"], [4, 6, 1, "right"], [5, 7, 1, "right"],
      // Pause
      [5, 8, 0.5, "right"],
      // Descendante - main droite
      [5, 8.5, 1, "right"], [4, 9.5, 1, "right"], [3, 10.5, 1, "right"], [2, 11.5, 1, "right"],
      [1, 12.5, 1, "right"], [3, 13.5, 1, "right"], [2, 14.5, 1, "right"], [1, 15.5, 1, "right"]
    ]
  },
// Modification pour ajouter les doigtés de la main gauche à Frère Jacques
// Cette modification doit être ajoutée au fichier songs.js

// Remplacer l'objet Frère Jacques existant par celui-ci :
  "frere_jacques": {
    displayName: "Frère Jacques",
    notes: [
      // Frère Jacques
      ["C4", 0, 1], ["D4", 1, 1], ["E4", 2, 1], ["C4", 3, 1],
      // Dormez-vous?
      ["C4", 4, 1], ["D4", 5, 1], ["E4", 6, 1], ["C4", 7, 1],
      // Sonnez les matines
      ["E4", 8, 1], ["F4", 9, 1], ["G4", 10, 2],
      // Sonnez les matines
      ["E4", 12, 1], ["F4", 13, 1], ["G4", 14, 2],
      // Din, dan, don
      ["G4", 16, 0.5], ["A4", 16.5, 0.5], ["G4", 17, 0.5], ["F4", 17.5, 0.5], ["E4", 18, 1], ["C4", 19, 1],
      // Din, dan, don
      ["G4", 20, 0.5], ["A4", 20.5, 0.5], ["G4", 21, 0.5], ["F4", 21.5, 0.5], ["E4", 22, 1], ["C4", 23, 1],
      
      // Notes de la main gauche (basse)
      ["C3", 0, 1], ["C3", 4, 1], ["C3", 8, 1], ["C3", 12, 1], ["C3", 16, 1], ["C3", 20, 1],
      ["G2", 1, 1], ["G2", 5, 1], ["G2", 9, 1], ["G2", 13, 1], ["G2", 17, 1], ["G2", 21, 1], 
      ["C3", 2, 1], ["C3", 6, 1], ["C3", 10, 1], ["C3", 14, 1], ["C3", 18, 1], ["C3", 22, 1],
      ["G2", 3, 1], ["G2", 7, 1], ["G2", 11, 1], ["G2", 15, 1], ["G2", 19, 1], ["G2", 23, 1]
    ],
    lyrics: [
      // Frère Jacques
      ["Frè", 0, 1], ["re", 1, 1], ["Jac", 2, 1], ["ques", 3, 1],
      // Dormez-vous?
      ["Dor", 4, 1], ["mez", 5, 1], ["vous", 6, 1], ["?", 7, 1],
      // Sonnez les matines
      ["Son", 8, 1], ["nez", 9, 1], ["ma-ti-nes", 10, 2],
      // Sonnez les matines
      ["Son", 12, 1], ["nez", 13, 1], ["ma-ti-nes", 14, 2],
      // Din, dan, don
      ["Din", 16, 0.5], ["dan", 16.5, 0.5], ["din", 17, 0.5], ["don", 17.5, 0.5], ["din", 18, 1], ["don", 19, 1],
      // Din, dan, don
      ["Din", 20, 0.5], ["dan", 20.5, 0.5], ["din", 21, 0.5], ["don", 21.5, 0.5], ["din", 22, 1], ["don", 23, 1]
    ],
    fingerings: [
      // Main droite
      // Frère Jacques
      [1, 0, 1, "right"], [2, 1, 1, "right"], [3, 2, 1, "right"], [1, 3, 1, "right"],
      // Dormez-vous?
      [1, 4, 1, "right"], [2, 5, 1, "right"], [3, 6, 1, "right"], [1, 7, 1, "right"],
      // Sonnez les matines
      [3, 8, 1, "right"], [4, 9, 1, "right"], [5, 10, 2, "right"],
      // Sonnez les matines
      [3, 12, 1, "right"], [4, 13, 1, "right"], [5, 14, 2, "right"],
      // Din, dan, don
      [5, 16, 0.5, "right"], [3, 16.5, 0.5, "right"], [5, 17, 0.5, "right"], [4, 17.5, 0.5, "right"], 
      [3, 18, 1, "right"], [1, 19, 1, "right"],
      // Din, dan, don
      [5, 20, 0.5, "right"], [3, 20.5, 0.5, "right"], [5, 21, 0.5, "right"], [4, 21.5, 0.5, "right"], 
      [3, 22, 1, "right"], [1, 23, 1, "right"],
      
      // Ajout des doigtés de la main gauche
      // Premier vers - Frère Jacques
      [5, 0, 1, "left"], [1, 1, 1, "left"], [5, 2, 1, "left"], [1, 3, 1, "left"],
      // Deuxième vers - Dormez-vous?
      [5, 4, 1, "left"], [1, 5, 1, "left"], [5, 6, 1, "left"], [1, 7, 1, "left"],
      // Troisième vers - Sonnez les matines
      [5, 8, 1, "left"], [1, 9, 1, "left"], [5, 10, 1, "left"], [1, 11, 1, "left"],
      // Quatrième vers - Sonnez les matines (répétition)
      [5, 12, 1, "left"], [1, 13, 1, "left"], [5, 14, 1, "left"], [1, 15, 1, "left"],
      // Cinquième vers - Din, dan, don
      [5, 16, 1, "left"], [1, 17, 1, "left"], [5, 18, 1, "left"], [1, 19, 1, "left"],
      // Sixième vers - Din, dan, don (répétition)
      [5, 20, 1, "left"], [1, 21, 1, "left"], [5, 22, 1, "left"], [1, 23, 1, "left"]
    ]
  },
  
  "au_clair_de_la_lune": {
    displayName: "Au Clair de la Lune",
    notes: [
      // Au clair de la lune
      ["C4", 0, 1], ["C4", 1, 1], ["C4", 2, 1], ["D4", 3, 1], ["E4", 4, 2], ["D4", 6, 2],
      // Mon ami Pierrot
      ["C4", 8, 1], ["E4", 9, 1], ["E4", 10, 1], ["D4", 11, 1], ["C4", 12, 4],
      // Prête-moi ta plume
      ["C4", 16, 1], ["C4", 17, 1], ["C4", 18, 1], ["D4", 19, 1], ["E4", 20, 2], ["D4", 22, 2],
      // Pour écrire un mot
      ["C4", 24, 1], ["E4", 25, 1], ["E4", 26, 1], ["D4", 27, 1], ["C4", 28, 4]
    ],
    lyrics: [
      // Au clair de la lune
      ["Au", 0, 1], ["clair", 1, 1], ["de", 2, 1], ["la", 3, 1], ["lu", 4, 1], ["ne", 5, 1], ["", 6, 2],
      // Mon ami Pierrot
      ["Mon", 8, 1], ["a", 9, 1], ["mi", 10, 1], ["Pier", 11, 1], ["rot", 12, 4],
      // Prête-moi ta plume
      ["Prê", 16, 1], ["te", 17, 1], ["moi", 18, 1], ["ta", 19, 1], ["plu", 20, 1], ["me", 21, 1], ["", 22, 2],
      // Pour écrire un mot
      ["Pour", 24, 1], ["é", 25, 1], ["crire", 26, 1], ["un", 27, 1], ["mot", 28, 4]
    ],
    fingerings: [
      // Au clair de la lune - main droite
      [1, 0, 1, "right"], [1, 1, 1, "right"], [1, 2, 1, "right"], [2, 3, 1, "right"], 
      [3, 4, 2, "right"], [2, 6, 2, "right"],
      // Mon ami Pierrot
      [1, 8, 1, "right"], [3, 9, 1, "right"], [3, 10, 1, "right"], [2, 11, 1, "right"], 
      [1, 12, 4, "right"],
      // Prête-moi ta plume
      [1, 16, 1, "right"], [1, 17, 1, "right"], [1, 18, 1, "right"], [2, 19, 1, "right"], 
      [3, 20, 2, "right"], [2, 22, 2, "right"],
      // Pour écrire un mot
      [1, 24, 1, "right"], [3, 25, 1, "right"], [3, 26, 1, "right"], [2, 27, 1, "right"], 
      [1, 28, 4, "right"]
    ]
  },
  
  "a_la_claire_fontaine": {
    displayName: "À la Claire Fontaine",
    notes: [
      // À la claire fontaine
      ["C4", 0, 1], ["E4", 1, 1], ["G4", 2, 1], ["G4", 3, 1], ["E4", 4, 1], ["G4", 5, 2],
      // M'en allant promener
      ["G4", 7, 1], ["A4", 8, 1], ["G4", 9, 1], ["E4", 10, 1], ["D4", 11, 1], ["C4", 12, 2],
      // J'ai trouvé l'eau si belle
      ["C4", 14, 1], ["E4", 15, 1], ["G4", 16, 1], ["G4", 17, 1], ["E4", 18, 1], ["G4", 19, 2],
      // Que je m'y suis baigné
      ["G4", 21, 1], ["A4", 22, 1], ["G4", 23, 1], ["E4", 24, 1], ["D4", 25, 1], ["C4", 26, 2]
    ],
    lyrics: [
      // À la claire fontaine
      ["À", 0, 1], ["la", 1, 1], ["claire", 2, 1], ["fon", 3, 1], ["tai", 4, 1], ["ne", 5, 2],
      // M'en allant promener
      ["M'en", 7, 1], ["al", 8, 1], ["lant", 9, 1], ["pro", 10, 1], ["me", 11, 1], ["ner", 12, 2],
      // J'ai trouvé l'eau si belle
      ["J'ai", 14, 1], ["trou", 15, 1], ["vé", 16, 1], ["l'eau", 17, 1], ["si", 18, 1], ["belle", 19, 2],
      // Que je m'y suis baigné
      ["Que", 21, 1], ["je", 22, 1], ["m'y", 23, 1], ["suis", 24, 1], ["bai", 25, 1], ["gné", 26, 2]
    ],
    fingerings: [
      // À la claire fontaine - main droite
      [1, 0, 1, "right"], [3, 1, 1, "right"], [5, 2, 1, "right"], [5, 3, 1, "right"], 
      [3, 4, 1, "right"], [5, 5, 2, "right"],
      // M'en allant promener
      [5, 7, 1, "right"], [4, 8, 1, "right"], [5, 9, 1, "right"], [3, 10, 1, "right"], 
      [2, 11, 1, "right"], [1, 12, 2, "right"],
      // J'ai trouvé l'eau si belle
      [1, 14, 1, "right"], [3, 15, 1, "right"], [5, 16, 1, "right"], [5, 17, 1, "right"], 
      [3, 18, 1, "right"], [5, 19, 2, "right"],
      // Que je m'y suis baigné
      [5, 21, 1, "right"], [4, 22, 1, "right"], [5, 23, 1, "right"], [3, 24, 1, "right"], 
      [2, 25, 1, "right"], [1, 26, 2, "right"]
    ]
  },
  
  "sur_le_pont": {
    displayName: "Sur le Pont d'Avignon",
    notes: [
      // Sur le pont d'Avignon
      ["C4", 0, 1], ["D4", 1, 1], ["E4", 2, 1], ["C4", 3, 1], ["E4", 4, 2],
      // L'on y danse, l'on y danse
      ["E4", 6, 1], ["F4", 7, 1], ["G4", 8, 2], ["E4", 10, 1], ["F4", 11, 1], ["G4", 12, 2],
      // Sur le pont d'Avignon
      ["G4", 14, 0.5], ["A4", 14.5, 0.5], ["G4", 15, 0.5], ["F4", 15.5, 0.5], ["E4", 16, 1], ["C4", 17, 1],
      // L'on y danse tous en rond
      ["C4", 18, 1], ["G4", 19, 1], ["G4", 20, 1], ["E4", 21, 1], ["C4", 22, 2]
    ],
    lyrics: [
      // Sur le pont d'Avignon
      ["Sur", 0, 1], ["le", 1, 1], ["pont", 2, 1], ["d'A", 3, 1], ["vi-gnon", 4, 2],
      // L'on y danse, l'on y danse
      ["L'on", 6, 1], ["y", 7, 1], ["dan", 8, 1], ["se", 9, 1], ["l'on", 10, 1], ["y", 11, 1], ["dan-se", 12, 2],
      // Sur le pont d'Avignon
      ["Sur", 14, 0.5], ["le", 14.5, 0.5], ["pont", 15, 0.5], ["d'A", 15.5, 0.5], ["vi", 16, 1], ["gnon", 17, 1],
      // L'on y danse tous en rond
      ["L'on", 18, 1], ["y", 19, 1], ["danse", 20, 1], ["en", 21, 1], ["rond", 22, 2]
    ],
    fingerings: [
      // Sur le pont d'Avignon - main droite
      [1, 0, 1, "right"], [2, 1, 1, "right"], [3, 2, 1, "right"], [1, 3, 1, "right"], 
      [3, 4, 2, "right"],
      // L'on y danse, l'on y danse
      [3, 6, 1, "right"], [4, 7, 1, "right"], [5, 8, 2, "right"], [3, 10, 1, "right"], 
      [4, 11, 1, "right"], [5, 12, 2, "right"],
      // Sur le pont d'Avignon
      [5, 14, 0.5, "right"], [4, 14.5, 0.5, "right"], [5, 15, 0.5, "right"], [4, 15.5, 0.5, "right"], 
      [3, 16, 1, "right"], [1, 17, 1, "right"],
      // L'on y danse tous en rond
      [1, 18, 1, "right"], [5, 19, 1, "right"], [5, 20, 1, "right"], [3, 21, 1, "right"], 
      [1, 22, 2, "right"]
    ]
  },
  
  "dodo_lenfant_do": {
    displayName: "Dodo, l'Enfant Do",
    notes: [
      // Dodo, l'enfant do
      ["C4", 0, 1], ["D4", 1, 1], ["E4", 2, 1], ["C4", 3, 2],
      // L'enfant dormira bien vite
      ["E4", 5, 1], ["F4", 6, 1], ["G4", 7, 2], ["E4", 9, 1], ["C4", 10, 2],
      // Dodo, l'enfant do
      ["G4", 12, 1], ["F4", 13, 1], ["E4", 14, 1], ["D4", 15, 2],
      // L'enfant dormira bientôt
      ["C4", 17, 1], ["D4", 18, 1], ["E4", 19, 1], ["C4", 20, 3]
    ],
    lyrics: [
      // Dodo, l'enfant do
      ["Do", 0, 1], ["do,", 1, 1], ["l'en", 2, 1], ["fant do", 3, 2],
      // L'enfant dormira bien vite
      ["L'en", 5, 1], ["fant", 6, 1], ["dor-mi-ra", 7, 2], ["bien", 9, 1], ["vite", 10, 2],
      // Dodo, l'enfant do
      ["Do", 12, 1], ["do,", 13, 1], ["l'en", 14, 1], ["fant do", 15, 2],
      // L'enfant dormira bientôt
      ["L'en", 17, 1], ["fant", 18, 1], ["dor", 19, 1], ["mi-ra bien-tôt", 20, 3]
    ],
    fingerings: [
      // Dodo, l'enfant do - main droite
      [1, 0, 1, "right"], [2, 1, 1, "right"], [3, 2, 1, "right"], [1, 3, 2, "right"],
      // L'enfant dormira bien vite
      [3, 5, 1, "right"], [4, 6, 1, "right"], [5, 7, 2, "right"], [3, 9, 1, "right"], 
      [1, 10, 2, "right"],
      // Dodo, l'enfant do
      [5, 12, 1, "right"], [4, 13, 1, "right"], [3, 14, 1, "right"], [2, 15, 2, "right"],
      // L'enfant dormira bientôt
      [1, 17, 1, "right"], [2, 18, 1, "right"], [3, 19, 1, "right"], [1, 20, 3, "right"]
    ]
  },
  
  "une_souris_verte": {
    displayName: "Une Souris Verte",
    notes: [
      // Une souris verte
      ["G4", 0, 1], ["A4", 1, 0.5], ["G4", 1.5, 0.5], ["F4", 2, 1], ["G4", 3, 1],
      // Qui courait dans l'herbe
      ["G4", 4, 1], ["A4", 5, 0.5], ["G4", 5.5, 0.5], ["F4", 6, 1], ["G4", 7, 1],
      // Je l'attrape par la queue
      ["G4", 8, 1], ["C5", 9, 1], ["B4", 10, 1], ["A4", 11, 1], ["G4", 12, 1],
      // Je la montre à ces messieurs
      ["G4", 13, 1], ["C5", 14, 1], ["B4", 15, 1], ["A4", 16, 1], ["G4", 17, 1]
    ],
    lyrics: [
      // Une souris verte
      ["U", 0, 1], ["ne sou", 1, 0.5], ["ris", 1.5, 0.5], ["ver", 2, 1], ["te", 3, 1],
      // Qui courait dans l'herbe
      ["Qui", 4, 1], ["cou", 5, 0.5], ["rait", 5.5, 0.5], ["dans", 6, 1], ["l'herbe", 7, 1],
      // Je l'attrape par la queue
      ["Je", 8, 1], ["l'at", 9, 1], ["trape", 10, 1], ["par", 11, 1], ["la queue", 12, 1],
      // Je la montre à ces messieurs
      ["Je", 13, 1], ["la", 14, 1], ["mon", 15, 1], ["tre à", 16, 1], ["ces messieurs", 17, 1]
    ],
    fingerings: [
      // Une souris verte - main droite
      [5, 0, 1, "right"], [4, 1, 0.5, "right"], [5, 1.5, 0.5, "right"], [4, 2, 1, "right"], 
      [5, 3, 1, "right"],
      // Qui courait dans l'herbe 
      [5, 4, 1, "right"], [4, 5, 0.5, "right"], [5, 5.5, 0.5, "right"], [4, 6, 1, "right"], 
      [5, 7, 1, "right"],
      // Je l'attrape par la queue
      [5, 8, 1, "right"], [1, 9, 1, "right"], [2, 10, 1, "right"], [3, 11, 1, "right"], 
      [5, 12, 1, "right"],
      // Je la montre à ces messieurs
      [5, 13, 1, "right"], [1, 14, 1, "right"], [2, 15, 1, "right"], [3, 16, 1, "right"], 
      [5, 17, 1, "right"]
    ]
  },
  
  "fais_dodo": {
    displayName: "Fais Dodo, Colas Mon P'tit Frère",
    notes: [
      // Fais dodo, Colas mon p'tit frère
      ["G4", 0, 1], ["E4", 1, 1], ["G4", 2, 1], ["E4", 3, 1], ["G4", 4, 1], ["A4", 5, 1], ["G4", 6, 2],
      // Fais dodo, t'auras du lolo
      ["G4", 8, 1], ["E4", 9, 1], ["G4", 10, 1], ["E4", 11, 1], ["G4", 12, 1], ["F4", 13, 1], ["E4", 14, 2],
      // Maman est en haut
      ["C4", 16, 1], ["D4", 17, 1], ["E4", 18, 1], ["F4", 19, 1], ["G4", 20, 2],
      // Qui fait du gâteau
      ["G4", 22, 1], ["A4", 23, 1], ["G4", 24, 1], ["F4", 25, 1], ["E4", 26, 2]
    ],
    lyrics: [
      // Fais dodo, Colas mon p'tit frère
      ["Fais", 0, 1], ["do", 1, 1], ["do,", 2, 1], ["Co", 3, 1], ["las", 4, 1], ["mon", 5, 1], ["p'tit frère", 6, 2],
      // Fais dodo, t'auras du lolo
      ["Fais", 8, 1], ["do", 9, 1], ["do,", 10, 1], ["t'au", 11, 1], ["ras", 12, 1], ["du", 13, 1], ["lo-lo", 14, 2],
      // Maman est en haut
      ["Ma", 16, 1], ["man", 17, 1], ["est", 18, 1], ["en", 19, 1], ["haut", 20, 2],
      // Qui fait du gâteau
      ["Qui", 22, 1], ["fait", 23, 1], ["du", 24, 1], ["gâ", 25, 1], ["teau", 26, 2]
    ],
    fingerings: [
      // Fais dodo - main droite
      [5, 0, 1, "right"], [3, 1, 1, "right"], [5, 2, 1, "right"], [3, 3, 1, "right"], 
      [5, 4, 1, "right"], [4, 5, 1, "right"], [5, 6, 2, "right"],
      // Fais dodo, t'auras du lolo
      [5, 8, 1, "right"], [3, 9, 1, "right"], [5, 10, 1, "right"], [3, 11, 1, "right"], 
      [5, 12, 1, "right"], [4, 13, 1, "right"], [3, 14, 2, "right"],
      // Maman est en haut
      [1, 16, 1, "right"], [2, 17, 1, "right"], [3, 18, 1, "right"], [4, 19, 1, "right"], 
      [5, 20, 2, "right"],
      // Qui fait du gâteau
      [5, 22, 1, "right"], [4, 23, 1, "right"], [5, 24, 1, "right"], [4, 25, 1, "right"], 
      [3, 26, 2, "right"]
    ]
  },
    
  "alouette": {
    displayName: "Alouette, Gentille Alouette",
    notes: [
      // Alouette, gentille alouette
      ["G4", 0, 1], ["G4", 1, 0.5], ["E4", 1.5, 0.5], ["G4", 2, 1], ["G4", 3, 0.5], ["E4", 3.5, 0.5], ["G4", 4, 1],
      // Alouette, je te plumerai
      ["A4", 5, 1], ["G4", 6, 0.5], ["F4", 6.5, 0.5], ["E4", 7, 1], ["D4", 8, 1], ["E4", 9, 2],
      // Je te plumerai la tête
      ["G4", 11, 0.5], ["G4", 11.5, 0.5], ["G4", 12, 0.5], ["G4", 12.5, 0.5], ["E4", 13, 1], ["G4", 14, 1],
      // Et la tête, et la tête
      ["G4", 15, 0.5], ["G4", 15.5, 0.5], ["G4", 16, 0.5], ["G4", 16.5, 0.5], ["E4", 17, 1], ["G4", 18, 1]
    ],
    lyrics: [
      // Alouette, gentille alouette
      ["A", 0, 1], ["lou", 1, 0.5], ["ette", 1.5, 0.5], ["gen", 2, 1], ["til", 3, 0.5], ["le", 3.5, 0.5], ["alouette", 4, 1],
      // Alouette, je te plumerai
      ["A", 5, 1], ["lou", 6, 0.5], ["et", 6.5, 0.5], ["te", 7, 1], ["je", 8, 1], ["te plumerai", 9, 2],
      // Je te plumerai la tête
      ["Je", 11, 0.5], ["te", 11.5, 0.5], ["plu", 12, 0.5], ["me", 12.5, 0.5], ["rai", 13, 1], ["la tête", 14, 1],
      // Et la tête, et la tête
      ["Et", 15, 0.5], ["la", 15.5, 0.5], ["tê", 16, 0.5], ["te", 16.5, 0.5], ["et", 17, 1], ["la tête", 18, 1]
    ]
  },
  
  "il_etait_un_petit_navire": {
    displayName: "Il Était un Petit Navire",
    notes: [
      // Il était un petit navire
      ["C4", 0, 1], ["E4", 1, 1], ["G4", 2, 1], ["G4", 3, 0.5], ["A4", 3.5, 0.5], ["G4", 4, 1], ["E4", 5, 1],
      // Qui n'avait ja-ja-jamais navigué
      ["C4", 6, 1], ["E4", 7, 1], ["G4", 8, 0.5], ["G4", 8.5, 0.5], ["A4", 9, 0.5], ["G4", 9.5, 0.5], ["E4", 10, 0.5], ["D4", 10.5, 0.5], ["C4", 11, 1],
      // Ohé! Ohé!
      ["C4", 12, 0.5], ["G4", 12.5, 1], ["C4", 13.5, 0.5], ["G4", 14, 1]
    ],
    lyrics: [
      // Il était un petit navire
      ["Il", 0, 1], ["é", 1, 1], ["tait", 2, 1], ["un", 3, 0.5], ["pe", 3.5, 0.5], ["tit", 4, 1], ["navire", 5, 1],
      // Qui n'avait ja-ja-jamais navigué
      ["Qui", 6, 1], ["n'a", 7, 1], ["vait", 8, 0.5], ["ja", 8.5, 0.5], ["ja", 9, 0.5], ["ja", 9.5, 0.5], ["mais", 10, 0.5], ["na", 10.5, 0.5], ["vigué", 11, 1],
      // Ohé! Ohé!
      ["O", 12, 0.5], ["hé!", 12.5, 1], ["O", 13.5, 0.5], ["hé!", 14, 1]
    ]
  },
  
  "savez_vous_planter_choux": {
    displayName: "Savez-vous Planter les Choux",
    notes: [
      // Savez-vous planter les choux
      ["C4", 0, 1], ["E4", 1, 1], ["G4", 2, 1], ["C4", 3, 1], ["E4", 4, 1], ["G4", 5, 2],
      // À la mode, à la mode
      ["A4", 7, 1], ["G4", 8, 1], ["F4", 9, 1], ["E4", 10, 1], ["D4", 11, 1], ["C4", 12, 2],
      // Savez-vous planter les choux
      ["C4", 14, 1], ["E4", 15, 1], ["G4", 16, 1], ["C4", 17, 1], ["E4", 18, 1], ["G4", 19, 2],
      // À la mode de chez nous
      ["A4", 21, 1], ["G4", 22, 1], ["F4", 23, 1], ["E4", 24, 1], ["D4", 25, 1], ["C4", 26, 2]
    ],
    lyrics: [
      // Savez-vous planter les choux
      ["Sa", 0, 1], ["vez", 1, 1], ["vous", 2, 1], ["plan", 3, 1], ["ter", 4, 1], ["les choux", 5, 2],
      // À la mode, à la mode
      ["À", 7, 1], ["la", 8, 1], ["mo", 9, 1], ["de,", 10, 1], ["à", 11, 1], ["la mode", 12, 2],
      // Savez-vous planter les choux
      ["Sa", 14, 1], ["vez", 15, 1], ["vous", 16, 1], ["plan", 17, 1], ["ter", 18, 1], ["les choux", 19, 2],
      // À la mode de chez nous
      ["À", 21, 1], ["la", 22, 1], ["mode", 23, 1], ["de", 24, 1], ["chez", 25, 1], ["nous", 26, 2]
    ]
  },
  
  "ainsi_font_font_font": {
    displayName: "Ainsi Font Font Font",
    notes: [
      // Ainsi font, font, font
      ["C4", 0, 1], ["D4", 1, 1], ["E4", 2, 1], ["C4", 3, 1],
      // Les petites marionnettes
      ["E4", 4, 1], ["F4", 5, 1], ["G4", 6, 2], ["E4", 8, 1], ["F4", 9, 1], ["G4", 10, 2],
      // Ainsi font, font, font
      ["G4", 12, 0.5], ["A4", 12.5, 0.5], ["G4", 13, 0.5], ["F4", 13.5, 0.5], ["E4", 14, 1], ["C4", 15, 1],
      // Trois p'tits tours et puis s'en vont
      ["C4", 16, 0.5], ["D4", 16.5, 0.5], ["E4", 17, 0.5], ["F4", 17.5, 0.5], ["G4", 18, 1], ["C4", 19, 2]
    ],
    lyrics: [
      // Ainsi font, font, font
      ["Ain", 0, 1], ["si", 1, 1], ["font", 2, 1], ["font font", 3, 1],
      // Les petites marionnettes
      ["Les", 4, 1], ["pe", 5, 1], ["ti", 6, 1], ["tes", 7, 1], ["ma", 8, 1], ["rion", 9, 1], ["nettes", 10, 2],
      // Ainsi font, font, font
      ["Ain", 12, 0.5], ["si", 12.5, 0.5], ["font", 13, 0.5], ["font", 13.5, 0.5], ["font", 14, 1], ["", 15, 1],
      // Trois p'tits tours et puis s'en vont
      ["Trois", 16, 0.5], ["p'tits", 16.5, 0.5], ["tours", 17, 0.5], ["et", 17.5, 0.5], ["puis", 18, 1], ["s'en vont", 19, 2]
    ]
  },
  
  "dans_la_foret_lointaine": {
    displayName: "Dans la Forêt Lointaine",
    notes: [
      // Dans la forêt lointaine
      ["C4", 0, 1], ["E4", 1, 1], ["G4", 2, 2], ["F4", 4, 1], ["A4", 5, 1], ["G4", 6, 2],
      // On entend le coucou
      ["G4", 8, 1], ["C5", 9, 1], ["B4", 10, 1], ["A4", 11, 1], ["G4", 12, 2],
      // Du haut de son grand chêne
      ["E4", 14, 1], ["G4", 15, 1], ["C5", 16, 2], ["A4", 18, 1], ["G4", 19, 1], ["F4", 20, 2],
      // Il répond au hibou
      ["E4", 22, 1], ["D4", 23, 1], ["C4", 24, 1], ["B3", 25, 1], ["C4", 26, 2]
    ],
    lyrics: [
      // Dans la forêt lointaine
      ["Dans", 0, 1], ["la", 1, 1], ["fo", 2, 1], ["rêt", 3, 1], ["loin", 4, 1], ["tai", 5, 1], ["ne", 6, 2],
      // On entend le coucou
      ["On", 8, 1], ["en", 9, 1], ["tend", 10, 1], ["le", 11, 1], ["cou-cou", 12, 2],
      // Du haut de son grand chêne
      ["Du", 14, 1], ["haut", 15, 1], ["de", 16, 1], ["son", 17, 1], ["grand", 18, 1], ["chê", 19, 1], ["ne", 20, 2],
      // Il répond au hibou
      ["Il", 22, 1], ["ré", 23, 1], ["pond", 24, 1], ["au", 25, 1], ["hi-bou", 26, 2]
    ]
  },
  
  "ah_les_crocodiles": {
    displayName: "Ah! Les Crocodiles",
    notes: [
      // Un crocodile, s'en allant à la guerre
      ["C4", 0, 1], ["D4", 1, 1], ["E4", 2, 1], ["F4", 3, 1], ["E4", 4, 1], ["D4", 5, 1], ["C4", 6, 2],
      // Disait au revoir à ses petits enfants
      ["E4", 8, 1], ["F4", 9, 1], ["G4", 10, 1], ["A4", 11, 1], ["G4", 12, 1], ["F4", 13, 1], ["E4", 14, 2],
      // Traînant ses pieds, ses pieds dans la poussière
      ["C4", 16, 1], ["D4", 17, 1], ["E4", 18, 1], ["F4", 19, 1], ["E4", 20, 1], ["D4", 21, 1], ["C4", 22, 2],
      // Il s'en allait combattre les éléphants
      ["C4", 24, 1], ["F4", 25, 1], ["E4", 26, 1], ["D4", 27, 1], ["C4", 28, 1], ["G4", 29, 1], ["C4", 30, 2]
    ],
    lyrics: [
      // Un crocodile, s'en allant à la guerre
      ["Un", 0, 1], ["cro", 1, 1], ["co", 2, 1], ["dile", 3, 1], ["s'en", 4, 1], ["al", 5, 1], ["lant", 6, 2],
      // Disait au revoir à ses petits enfants
      ["Di", 8, 1], ["sait", 9, 1], ["au", 10, 1], ["re", 11, 1], ["voir", 12, 1], ["à", 13, 1], ["ses enfants", 14, 2],
      // Traînant ses pieds, ses pieds dans la poussière
      ["Traî", 16, 1], ["nant", 17, 1], ["ses", 18, 1], ["pieds", 19, 1], ["dans", 20, 1], ["la", 21, 1], ["poussière", 22, 2],
      // Il s'en allait combattre les éléphants
      ["Il", 24, 1], ["s'en", 25, 1], ["al", 26, 1], ["lait", 27, 1], ["com", 28, 1], ["battre", 29, 1], ["les éléphants", 30, 2]
    ]
  }
};

// For backward compatibility - extract just the notes data like the original structure
const songs = {};
for (const [songKey, songData] of Object.entries(songsData)) {
  songs[songData.displayName] = songData.notes;
}
