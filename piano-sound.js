// Audio variables and functions for the piano trainer
let audioContext = null;
let oscillators = {};
window.soundEnabled = true; // On utilise window pour le partager avec piano-trainer.js

// Initialiser le contexte audio
function initAudio() {
  try {
    // Créer un nouveau contexte audio
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    window.audioContext = audioContext; // Rendre disponible globalement
    
    // Vérifier si le contexte est en état suspendu (politique des navigateurs)
    if (audioContext.state === 'suspended') {
      // Ajouter un gestionnaire d'événements sur tout le document pour démarrer l'audio
      const resumeAudio = function() {
        console.log("Tentative de reprise du contexte audio...");
        audioContext.resume().then(() => {
          console.log("AudioContext resumed successfully - state:", audioContext.state);
        }).catch(error => {
          console.error("Failed to resume AudioContext:", error);
        });
        
        // Nettoyer après la première interaction
        document.removeEventListener('click', resumeAudio);
        document.removeEventListener('touchstart', resumeAudio);
        document.removeEventListener('keydown', resumeAudio);
      };
      
      // Ajouter plusieurs écouteurs pour augmenter les chances de réussite
      document.addEventListener('click', resumeAudio);
      document.addEventListener('touchstart', resumeAudio);
      document.addEventListener('keydown', resumeAudio);
      
      // Informer l'utilisateur
      console.log("Audio context is suspended. Click anywhere on the page to enable audio.");
    }
    
    console.log("Audio Context initialized successfully, state:", audioContext.state);
    return true;
  } catch (e) {
    console.error("Failed to initialize Audio Context:", e);
    alert("Votre navigateur ne semble pas prendre en charge l'API Web Audio nécessaire pour le son.");
    return false;
  }
}

// Convertir un nom de note en fréquence
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

// Jouer une note
function playNote(englishNote, duration) {
  if (!audioContext || !window.soundEnabled) return;
  
  try {
    const freq = noteToFrequency(englishNote);
    console.log(`Jouant la note ${englishNote} à ${freq}Hz pour ${duration}s`);
    
    // Créer oscillateur
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Utiliser une forme d'onde plus riche pour un son plus audible
    oscillator.type = 'square'; // 'square' est plus audible que 'triangle'
    oscillator.frequency.value = freq;
    
    // Augmenter le volume
    gainNode.gain.setValueAtTime(0.9, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
    
    // Ajouter un test de son pour déboguer
    console.log(`Note ${englishNote} jouée!`);
    
    // Stocker l'oscillateur pour pouvoir l'arrêter si nécessaire
    oscillators[englishNote] = oscillator;
    
    // Supprimer la référence après la fin du son
    oscillator.onended = () => {
      delete oscillators[englishNote];
      console.log(`Note ${englishNote} terminée`);
    };
  } catch (e) {
    console.error(`Erreur lors de la lecture de la note ${englishNote}:`, e);
  }
}

// Arrêter tous les sons
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

// Tester l'audio
function testAudio() {
  if (!audioContext) {
    initAudio();
  }
  
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Jouer un bip de test
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'square';
  oscillator.frequency.value = 440; // La 440Hz, facilement audible
  
  gainNode.gain.value = 0.5;
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5); // Son court de 0.5 seconde
  
  console.log("Test audio exécuté");
  alert("Un son de test devrait être audible maintenant. L'avez-vous entendu?");
}

// Ajouter les éléments d'interface pour l'audio
function initAudioInterface() {
  // Ajouter le bouton pour activer/désactiver le son
  addSoundToggleButton();
  
  // Ajouter le bouton de test audio
  addTestAudioButton();
  
  // Ajouter un message d'avertissement
  setupAudioWarning();
}

// Ajouter un bouton pour activer/désactiver le son
function addSoundToggleButton() {
  // Créer le conteneur pour le toggle son
  const soundToggle = document.createElement('div');
  soundToggle.className = 'loop-toggle';
  
  // Créer la case à cocher
  const soundCheckbox = document.createElement('input');
  soundCheckbox.type = 'checkbox';
  soundCheckbox.id = 'soundCheckbox';
  soundCheckbox.checked = window.soundEnabled;
  
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
    window.soundEnabled = soundCheckbox.checked;
    if (!window.soundEnabled) {
      stopAllSounds();
    }
  });
}

// Ajouter un bouton pour tester l'audio
function addTestAudioButton() {
  const testButton = document.createElement('button');
  testButton.textContent = "Tester l'audio";
  testButton.className = 'control-btn';
  testButton.style.backgroundColor = '#9b59b6';
  testButton.style.marginTop = '10px';
  testButton.addEventListener('click', testAudio);
  
  // Insérer après les contrôles
  const controls = document.querySelector('.controls');
  controls.parentNode.insertBefore(testButton, controls.nextSibling);
}

// Ajouter un message d'avertissement pour l'audio
function setupAudioWarning() {
  // Ajouter un message visible sur l'interface utilisateur
  const warningDiv = document.createElement('div');
  warningDiv.style.backgroundColor = '#ffe6e6';
  warningDiv.style.color = '#990000';
  warningDiv.style.padding = '10px';
  warningDiv.style.marginBottom = '15px';
  warningDiv.style.borderRadius = '5px';
  warningDiv.style.textAlign = 'center';
  warningDiv.style.width = '100%';
  warningDiv.style.maxWidth = '700px';
  warningDiv.innerHTML = 'Pour activer le son, cliquez d\'abord n\'importe où sur la page puis appuyez sur "Jouer". Vérifiez également que le son de votre appareil est activé.';
  
  // Insérer au début du document
  document.body.insertBefore(warningDiv, document.body.firstChild);
}

// Rendre les fonctions disponibles globalement
window.initAudio = initAudio;
window.playNote = playNote;
window.stopAllSounds = stopAllSounds;
window.testAudio = testAudio;
window.initAudioInterface = initAudioInterface;
