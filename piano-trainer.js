// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// UI elements
const songSelect = document.getElementById('songSelect');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const tempoSlider = document.getElementById('tempoSlider');
const tempoValue = document.getElementById('tempoValue');
const loopCheckbox = document.getElementById('loopCheckbox');
const lyricsCheckbox = document.getElementById('lyricsCheckbox');

// Configuration
const width = canvas.width;
const height = canvas.height;
const keyboardStartY = 425;
const keyboardHeight = 70;
const playLineY = keyboardStartY; // Ligne rouge à la hauteur du haut des touches
const whiteKeyWidth = 30;
const blackKeyWidth = 20;
const noteWidth = 25;      // Width for rectangular notes
const startOffsetBeats = 4; // Préparation de 4 temps avant la première note

// State
let animationId = null;
let notes = [];
let lyrics = []; // Tableau pour stocker les paroles
let pianoKeys = [];
let currentSongKey = null;
let currentSongName = "";
let startTime = 0;
let tempo = parseInt(tempoSlider.value);
let loopEnabled = loopCheckbox.checked;
let lyricsEnabled = true; // Activé par défaut
let totalSongBeats = 0; // Pour suivre la longueur totale de la chanson

// Audio state variables - référence aux variables définies dans piano-sound.js
let soundEnabled = true; // Par défaut, le son est activé

// Convert English note name to French
function translateNote(englishNote) {
  // Extract note and octave (e.g., "C4" -> "C" and "4")
  const noteRegex = /([A-G]#?)(\d+)/;
  const match = englishNote.match(noteRegex);
  
  if (match) {
    const noteName = match[1];
    const octave = match[2];
    return `${noteTranslation[noteName]}${octave}`;
  }
  
  return englishNote; // Return original if no match
}

// Setup piano keyboard
function setupPianoKeys() {
  pianoKeys = [];
  const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackNotePositions = [0, 1, 3, 4, 5]; // after C, D, F, G, A
  
  // Create 3 octaves of keys
  for (let octave = 3; octave <= 5; octave++) {
    // White keys
    for (let i = 0; i < whiteNotes.length; i++) {
      const x = ((octave - 3) * 7 + i) * whiteKeyWidth;
      pianoKeys.push({
        englishNote: `${whiteNotes[i]}${octave}`,
        note: translateNote(`${whiteNotes[i]}${octave}`),
        x: x,
        width: whiteKeyWidth,
        height: keyboardHeight,
        isBlack: false
      });
    }
    
    // Black keys
    for (let i = 0; i < blackNotePositions.length; i++) {
      const whiteKeyPosition = (octave - 3) * 7 + blackNotePositions[i];
      const x = whiteKeyPosition * whiteKeyWidth + (whiteKeyWidth - blackKeyWidth/2);
      const noteName = `${whiteNotes[blackNotePositions[i]]}#${octave}`;
      pianoKeys.push({
        englishNote: noteName,
        note: translateNote(noteName),
        x: x,
        width: blackKeyWidth,
        height: keyboardHeight * 0.65,
        isBlack: true
      });
    }
  }
}

// Fonction pour initialiser le menu des chansons
function initSongMenu() {
  console.log("Initializing song menu...");
  console.log("songsData keys:", Object.keys(songsData));
  
  // Vider le sélecteur (sauf l'option par défaut)
  while (songSelect.options.length > 1) {
    songSelect.remove(1);
  }
  
  // Ajouter chaque chanson du fichier songs.js au menu
  for (const [songKey, songData] of Object.entries(songsData)) {
    const option = document.createElement('option');
    option.value = songKey;
    option.textContent = songData.displayName;
    songSelect.appendChild(option);
    console.log(`Added song: ${songData.displayName}`);
  }
}

// Convert beats to pixels
function beatsToPixels(beats) {
  return beats * 80; // 80 pixels per beat
}

// Create notes and lyrics for a song
function createNotesForSong(songKey) {
  const songData = songsData[songKey];
  if (!songData) return { notes: [], lyrics: [] };
  
  const notesWithPositions = songData.notes.map((noteData, index) => {
    const [englishNoteName, startBeat, duration] = noteData;
    
    // Find key position
    const key = pianoKeys.find(k => k.englishNote === englishNoteName);
    const x = key ? key.x + key.width/2 : width/2;
    const isBlack = key ? key.isBlack : false;
    
    return {
      id: index,
      englishNote: englishNoteName,
      note: key ? key.note : translateNote(englishNoteName),
      x: x,
      startBeat: startBeat, // Gardons le startBeat original
      duration: duration,
      isBlack: isBlack,
      played: false
    };
  });
  
  // Créer les paroles avec positions si elles existent
  const lyricsWithPositions = songData.lyrics ? songData.lyrics.map((lyricData, index) => {
    const [text, startBeat, duration] = lyricData;
    
    // On lie chaque parole à la note correspondante si possible
    const relatedNote = notesWithPositions.find(n => 
      Math.abs(n.startBeat - startBeat) < 0.1 && 
      Math.abs(n.duration - duration) < 0.1
    );
    
    const x = relatedNote ? relatedNote.x : width/2;
    
    return {
      id: index,
      text: text,
      x: x,
      startBeat: startBeat,
      duration: duration
    };
  }) : [];
  
  // Calculer la longueur totale de la chanson
  if (notesWithPositions.length > 0) {
    const lastNote = notesWithPositions[notesWithPositions.length - 1];
    totalSongBeats = lastNote.startBeat + lastNote.duration;
  } else {
    totalSongBeats = 0;
  }
  
  return { 
    notes: notesWithPositions,
    lyrics: lyricsWithPositions
  };
}

// Draw background elements
function drawBackground() {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  
  // Draw staff lines
  const staffLineCount = 5;
  const staffLineSpacing = 10;
  const staffY = playLineY - (staffLineCount * staffLineSpacing) / 2 - 50;
  
  ctx.strokeStyle = "#BBBBBB";
  ctx.lineWidth = 1;
  
  for (let i = 0; i < staffLineCount; i++) {
    const y = staffY + i * staffLineSpacing;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  // Draw play line
  ctx.strokeStyle = "#FF0000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, playLineY);
  ctx.lineTo(width, playLineY);
  ctx.stroke();
  
  // Play line label
  ctx.fillStyle = "#FF0000";
  ctx.font = "14px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Jouez les notes quand elles atteignent cette ligne ►", 10, playLineY - 10);
  
  // Draw song title if any
  if (currentSongKey) {
    ctx.fillStyle = "#333333";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`En cours : ${currentSongName}`, width/2, 30);
    ctx.font = "14px Arial";
    ctx.fillText(`Tempo : ${tempo} BPM`, width/2, 55);
    
    if (loopEnabled) {
      ctx.fillText("Lecture en boucle activée", width/2, 75);
    }
    
    if (lyricsEnabled) {
      ctx.fillText("Paroles activées", width/2, 95);
    }
  }
}

// Draw piano keyboard
function drawKeyboard() {
  // Draw white keys first
  pianoKeys.forEach(key => {
    if (!key.isBlack) {
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      
      ctx.fillRect(key.x, keyboardStartY, key.width, key.height);
      ctx.strokeRect(key.x, keyboardStartY, key.width, key.height);
      
      // Key label
      ctx.fillStyle = "#333333";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(key.note, key.x + key.width/2, keyboardStartY + key.height - 5);
    }
  });
  
  // Draw black keys on top
  pianoKeys.forEach(key => {
    if (key.isBlack) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(key.x, keyboardStartY, key.width, key.height);
      
      // Key label
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "8px Arial";
      ctx.textAlign = "center";
      ctx.fillText(key.note, key.x + key.width/2, keyboardStartY + key.height - 5);
    }
  });
}

// Animation loop
function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsedTime = timestamp - startTime;
  
  // Calculate current beat based on tempo
  const beatsPerSecond = tempo / 60;
  const currentBeat = (elapsedTime / 1000) * beatsPerSecond;
  
  // Handle looping
  let effectiveBeat = currentBeat;
  
  if (loopEnabled && currentBeat > totalSongBeats + 4) {
    // Réinitialiser pour la boucle suivante
    startTime = timestamp;
    effectiveBeat = -startOffsetBeats; // Commencer à une valeur négative pour la préparation
    // Assurer qu'aucun son ne continue à jouer lors de la boucle
    if (typeof stopAllSounds === 'function') {
      stopAllSounds();
    }
  } else if (!loopEnabled && currentBeat > totalSongBeats + 4) {
    stopAnimation();
    return;
  }
  
  // Draw background and keyboard
  drawBackground();
  drawKeyboard();
  
  // Draw notes
  notes.forEach(note => {
    // Ajouter l'offset de préparation pour le calcul de la position
    const adjustedStartBeat = note.startBeat + startOffsetBeats;
    
    // Calculate y position based on beat - using the adjusted start beat
    const beatDistance = adjustedStartBeat - effectiveBeat;
    const y = playLineY - beatsToPixels(beatDistance);
    
    // Only draw notes that are on screen
    if (y > -100 && y < height + 50) {
      // Determine note status
      const isAtPlayLine = Math.abs(y - playLineY) < 15;
      const hasPassedPlayLine = y > playLineY;
      
      // Set color based on status
      if (isAtPlayLine) {
        ctx.fillStyle = "#4CAF50"; // Green at play line
        
        // Play note when it reaches the play line
        // On vérifie si la note n'a pas encore été jouée
        if (!note.played && isAtPlayLine && typeof playNote === 'function') {
          note.played = true;
          // Convertir la durée en beats à la durée en secondes
          const durationInSeconds = note.duration / beatsPerSecond;
          playNote(note.englishNote, durationInSeconds);
        }
      } else if (hasPassedPlayLine) {
        ctx.fillStyle = "#AAAAAA"; // Gray after passing
      } else {
        ctx.fillStyle = note.isBlack ? "#555555" : "#3498db"; // Dark/Blue before
        // Réinitialiser l'état played quand la note revient (en cas de boucle)
        if (beatDistance > 2) {
          note.played = false;
        }
      }
      
      // Calculate note height based on duration
      const noteHeight = Math.max(30, beatsToPixels(note.duration));
      
      // Draw rectangular note
      ctx.fillRect(note.x - noteWidth/2, y - noteHeight/2, noteWidth, noteHeight);
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.strokeRect(note.x - noteWidth/2, y - noteHeight/2, noteWidth, noteHeight);
      
      // Draw note name
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(note.note, note.x, y + 4);
    }
  });
  
  // Dessiner les paroles si activées
  if (lyricsEnabled && lyrics.length > 0) {
    lyrics.forEach(lyric => {
      // Ajouter l'offset de préparation pour le calcul de la position
      const adjustedStartBeat = lyric.startBeat + startOffsetBeats;
      
      // Calculer la position y basée sur le temps
      const beatDistance = adjustedStartBeat - effectiveBeat;
      const y = playLineY - beatsToPixels(beatDistance);
      
      // Ne dessiner que les paroles visibles à l'écran
      if (y > -100 && y < height + 50) {
        // Déterminer le statut de la parole
        const isAtPlayLine = Math.abs(y - playLineY) < 15;
        const hasPassedPlayLine = y > playLineY;
        
        // Définir la couleur selon le statut
        if (isAtPlayLine) {
          ctx.fillStyle = "#4CAF50"; // Vert à la ligne de jeu
        } else if (hasPassedPlayLine) {
          ctx.fillStyle = "#AAAAAA"; // Gris après le passage
        } else {
          ctx.fillStyle = "#E67E22"; // Orange avant
        }
        
        // Calculer la hauteur du texte
        const textHeight = Math.max(30, beatsToPixels(lyric.duration));
        
        // Dessiner le texte des paroles
        if (lyric.text) {
          // Position décalée pour éviter de chevaucher les notes
          const textX = lyric.x + 40; // Décalage à droite des notes
          
          // Fond pour le texte pour plus de lisibilité
          if (lyric.text.trim() !== "") {
            const textWidth = ctx.measureText(lyric.text).width;
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.fillRect(textX - 5, y - 15, textWidth + 10, 30);
            
            // Dessiner le texte
            ctx.fillStyle = isAtPlayLine ? "#4CAF50" : (hasPassedPlayLine ? "#777777" : "#E67E22");
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "left";
            ctx.fillText(lyric.text, textX, y + 5);
          }
        }
      }
    });
  }
  
  // Debug info - afficher la mesure correcte comme un nombre entier
  ctx.fillStyle = "#333333";
  ctx.font = "12px Arial";
  ctx.textAlign = "left";
  const measureValue = Math.max(0, Math.floor(effectiveBeat + startOffsetBeats));
  ctx.fillText(`Mesure : ${measureValue}`, 10, 115);
  
  // Continue animation
  animationId = requestAnimationFrame(animate);
}

// Start playing a song
function startSong() {
  const songKey = songSelect.value;
  
  if (!songKey) {
    alert('Veuillez sélectionner une chanson');
    return;
  }
  
  // Initialize audio context on first play (nécessaire pour les navigateurs modernes)
  if (typeof initAudio === 'function') {
    if (!window.audioContext) {
      if (!initAudio()) {
        alert("Impossible d'initialiser l'audio. Vérifiez que votre navigateur prend en charge l'API Web Audio.");
      }
    }
  
    // Resume audio context if suspended (nécessaire pour Chrome)
    if (window.audioContext && window.audioContext.state === 'suspended') {
      window.audioContext.resume();
    }
  }
  
  // Stop any current animation
  stopAnimation();
  
  // Set current song key and name
  currentSongKey = songKey;
  currentSongName = songsData[songKey].displayName;
  
  // Créer les notes et les paroles
  const songElements = createNotesForSong(songKey);
  notes = songElements.notes;
  lyrics = songElements.lyrics;
  
  // Réinitialiser l'état de lecture pour toutes les notes
  notes.forEach(note => note.played = false);
  
  // Disable UI controls during playback
  songSelect.disabled = true;
  tempoSlider.disabled = true;
  stopBtn.disabled = false;
  playBtn.disabled = true;
  
  // Start animation
  startTime = 0;
  animationId = requestAnimationFrame(animate);
}

// Stop animation
function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  // Stop all sounds
  if (typeof stopAllSounds === 'function') {
    stopAllSounds();
  }
  
  // Reset state
  currentSongKey = null;
  
  // Reset UI
  songSelect.disabled = false;
  tempoSlider.disabled = false;
  stopBtn.disabled = true;
  playBtn.disabled = false;
  
  // Redraw canvas to clear notes
  drawBackground();
  drawKeyboard();
}

// Add toggle button for lyrics
function addLyricsToggle() {
  // Créer le conteneur pour le toggle paroles
  const lyricsToggle = document.createElement('div');
  lyricsToggle.className = 'loop-toggle';
  
  // Créer la case à cocher
  const lyricsCheckbox = document.createElement('input');
  lyricsCheckbox.type = 'checkbox';
  lyricsCheckbox.id = 'lyricsCheckbox';
  lyricsCheckbox.checked = lyricsEnabled;
  
  // Créer le label
  const lyricsLabel = document.createElement('label');
  lyricsLabel.htmlFor = 'lyricsCheckbox';
  lyricsLabel.textContent = 'Afficher les paroles';
  
  // Assembler les éléments
  lyricsToggle.appendChild(lyricsCheckbox);
  lyricsToggle.appendChild(lyricsLabel);
  
  // Insérer après le loop toggle existant
  const soundToggle = document.querySelector('.loop-toggle:nth-child(2)');
  if (soundToggle) {
    soundToggle.parentNode.insertBefore(lyricsToggle, soundToggle.nextSibling);
  } else {
    const loopToggle = document.querySelector('.loop-toggle');
    loopToggle.parentNode.insertBefore(lyricsToggle, loopToggle.nextSibling);
  }
  
  // Ajouter l'écouteur d'événement
  lyricsCheckbox.addEventListener('change', () => {
    lyricsEnabled = lyricsCheckbox.checked;
  });
}

// Initialize
function init() {
  console.log("Initializing application...");
  
  // Ensure we have all required elements
  if (!songSelect) {
    console.error("Element with ID 'songSelect' not found!");
  }
  if (!playBtn) {
    console.error("Element with ID 'playBtn' not found!");
  }
  if (!stopBtn) {
    console.error("Element with ID 'stopBtn' not found!");
  }
  
  setupPianoKeys();
  
  // Verify songsData is available
  if (typeof songsData === 'undefined') {
    console.error("songsData is not defined! Make sure songs.js is loaded before piano-trainer.js.");
  } else {
    initSongMenu();
  }
  
  drawBackground();
  drawKeyboard();
  
  // Event listeners
  playBtn.addEventListener('click', startSong);
  stopBtn.addEventListener('click', stopAnimation);
  
  tempoSlider.addEventListener('input', () => {
    tempo = parseInt(tempoSlider.value);
    tempoValue.textContent = tempo;
  });
  
  loopCheckbox.addEventListener('change', () => {
    loopEnabled = loopCheckbox.checked;
  });
  
  // Ajouter le toggle pour les paroles
  addLyricsToggle();
  
  // Initialize audio if available
  if (typeof initAudioInterface === 'function') {
    initAudioInterface();
  }
  
  console.log("Application initialized.");
}

// Make sure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', init);
