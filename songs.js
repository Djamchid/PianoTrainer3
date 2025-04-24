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
    ]
  },
  
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
      ["G4", 20, 0.5], ["A4", 20.5, 0.5], ["G4", 21, 0.5], ["F4", 21.5, 0.5], ["E4", 22, 1], ["C4", 23, 1]
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
    ]
  }
};

// For backward compatibility - extract just the notes data like the original structure
const songs = {};
for (const [songKey, songData] of Object.entries(songsData)) {
  songs[songData.displayName] = songData.notes;
}
