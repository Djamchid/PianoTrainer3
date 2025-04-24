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
  "twinkle": {
    displayName: "Ah! vous dirai-je maman",
    notes: [
      ["C4", 0, 1], ["C4", 1, 1], ["G4", 2, 1], ["G4", 3, 1],
      ["A4", 4, 1], ["A4", 5, 1], ["G4", 6, 2],
      ["F4", 8, 1], ["F4", 9, 1], ["E4", 10, 1], ["E4", 11, 1],
      ["D4", 12, 1], ["D4", 13, 1], ["C4", 14, 2]
    ]
  },
  "mary": {
    displayName: "Mary avait un agneau",
    notes: [
      ["E4", 0, 1], ["D4", 1, 1], ["C4", 2, 1], ["D4", 3, 1],
      ["E4", 4, 1], ["E4", 5, 1], ["E4", 6, 2],
      ["D4", 8, 1], ["D4", 9, 1], ["D4", 10, 2],
      ["E4", 12, 1], ["G4", 13, 1], ["G4", 14, 2]
    ]
  },
  "jingle": {
    displayName: "Vive le vent",
    notes: [
      ["E4", 0, 1], ["E4", 1, 1], ["E4", 2, 2],
      ["E4", 4, 1], ["E4", 5, 1], ["E4", 6, 2],
      ["E4", 8, 1], ["G4", 9, 1], ["C4", 10, 1], ["D4", 11, 1],
      ["E4", 12, 4]
    ]
  },
  "birthday": {
    displayName: "Joyeux Anniversaire",
    notes: [
      ["C4", 0, 0.5], ["C4", 0.5, 0.5], ["D4", 1, 1], ["C4", 2, 1], ["F4", 3, 1], ["E4", 4, 2],
      ["C4", 6, 0.5], ["C4", 6.5, 0.5], ["D4", 7, 1], ["C4", 8, 1], ["G4", 9, 1], ["F4", 10, 2]
    ]
  }
};

// For backward compatibility - extract just the notes data like the original structure
const songs = {};
for (const [songKey, songData] of Object.entries(songsData)) {
  songs[songData.displayName] = songData.notes;
}
