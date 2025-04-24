// Ajout de la fonctionnalité audio au piano-trainer.js

// 1. Ajouter ces variables au début du fichier, après les autres déclarations d'état
let audioContext = null;
let oscillators = {};
let soundEnabled = true; // Par défaut, le son est activé

// 2. Ajouter cette fonction pour initialiser l'Audio Context
function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log("Audio Context initialized successfully");
    return true;
  } catch (e) {
    console.error("Failed to initialize Audio Context:", e);
    return false;
  }
}

// 3. Fonction pour convertir un nom de note en fréquence
function noteToFrequency(note) {
  // Extraire le nom de la note et l'octave (par exemple "C4" -> "C" et 4)
  const noteRegex = /([A-G]#?)(\d+)/;
  const match = note.match(noteRegex);
  
  if (!match) return 440; // A4 par défaut
  
  const noteName = match[1];
  const octave = parseInt(match[2]);
  
  // Table de base des notes (C0 à B0)
  const noteToSemitone = {
    'C': 0, 'C#': 1, 
    'D': 2, 'D#': 3, 
    'E': 4, 
    'F': 5, 'F#': 6, 
    'G': 7, 'G#': 8, 
    'A': 9, 'A#': 10, 
    'B': 11
  };
  
  // Calculer le nombre de demi-tons depuis A4 (la référence à 440Hz)
  const A4_OCTAVE = 4;
  const A4_SEMITONE = 9;
  const semitoneFromA4 = 
    (octave - A4_OCTAVE) * 12 + 
    (noteToSemitone[noteName] - A4_SEMITONE);
  
  // Calculer la fréquence: f = 440 * 2^(n/12)
  return 440 * Math.pow(2, semitoneFromA4 / 12);
}

// 4. Fonction pour jouer une note
function playNote(englishNote, duration) {
  if (!audioContext || !soundEnabled) return;
  
  const freq = noteToFrequency(englishNote);
  
  // Créer oscillateur
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'triangle'; // Son de piano simplifié
  oscillator.frequency.value = freq;
  
  // Enveloppe sonore pour simuler un piano
  gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
  
  // Stocker l'oscillateur pour pouvoir l'arrêter si nécessaire
  oscillators[englishNote] = oscillator;
  
  // Supprimer la référence après la fin du son
  oscillator.onended = () => {
    delete oscillators[englishNote];
  };
}

// 5. Fonction pour arrêter tous les sons
function stopAllSounds() {
  if (!audioContext) return;
  
  Object.values(oscillators).forEach(osc => {
    try {
      osc.stop();
    } catch (e) {
      // Ignorer les erreurs si l'oscillateur est déjà arrêté
    }
  });
  
  oscillators = {};
}

// 6. Modifier la fonction animate pour déclencher les notes
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
    effectiveBeat = -startOffsetBeats;
    // Assurer qu'aucun son ne continue à jouer lors de la boucle
    stopAllSounds();
  } else if (!loopEnabled && currentBeat > totalSongBeats + 4) {
    stopAnimation();
    return;
  }
  
  // Draw background and keyboard
  drawBackground();
  drawKeyboard();
  
  // Draw notes and play sounds
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
        if (!note.played && isAtPlayLine) {
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
  
  // Debug info - afficher la mesure correcte comme un nombre entier
  ctx.fillStyle = "#333333";
  ctx.font = "12px Arial";
  ctx.textAlign = "left";
  const measureValue = Math.max(0, Math.floor(effectiveBeat + startOffsetBeats));
  ctx.fillText(`Mesure : ${measureValue}`, 10, 95);
  
  // Continue animation
  animationId = requestAnimationFrame(animate);
}

// 7. Modifier la fonction startSong pour initialiser l'audio si nécessaire
function startSong() {
  const songKey = songSelect.value;
  
  if (!songKey) {
    alert('Veuillez sélectionner une chanson');
    return;
  }
  
  // Initialize audio context on first play (nécessaire pour les navigateurs modernes)
  if (!audioContext) {
    if (!initAudio()) {
      alert("Impossible d'initialiser l'audio. Vérifiez que votre navigateur prend en charge l'API Web Audio.");
    }
  }
  
  // Resume audio context if suspended (nécessaire pour Chrome)
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Stop any current animation
  stopAnimation();
  
  // Set current song key and name
  currentSongKey = songKey;
  currentSongName = songsData[songKey].displayName;
  notes = createNotesForSong(songKey);
  
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

// 8. Modifier la fonction stopAnimation pour arrêter les sons
function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  // Stop all sounds
  stopAllSounds();
  
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

// 9. Ajout d'un bouton pour désactiver/activer le son
function addSoundToggleButton() {
  // Créer le conteneur pour le toggle son
  const soundToggle = document.createElement('div');
  soundToggle.className = 'loop-toggle';
  
  // Créer la case à cocher
  const soundCheckbox = document.createElement('input');
  soundCheckbox.type = 'checkbox';
  soundCheckbox.id = 'soundCheckbox';
  soundCheckbox.checked = soundEnabled;
  
  // Créer le label
  const soundLabel = document.createElement('label');
  soundLabel.htmlFor = 'soundCheckbox';
  soundLabel.textContent = 'Activer le son';
  
  // Assembler les éléments
  soundToggle.appendChild(soundCheckbox);
  soundToggle.appendChild(soundLabel);
  
  // Insérer après le loop toggle existant
  const loopToggle = document.querySelector('.loop-toggle');
  loopToggle.parentNode.insertBefore(soundToggle, loopToggle.nextSibling);
  
  // Ajouter l'écouteur d'événement
  soundCheckbox.addEventListener('change', () => {
    soundEnabled = soundCheckbox.checked;
    if (!soundEnabled) {
      stopAllSounds();
    }
  });
}

// 10. Modifier la fonction init pour ajouter le bouton de son
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
  
  // Ajouter le bouton pour activer/désactiver le son
  addSoundToggleButton();
  
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
  
  console.log("Application initialized.");
}
