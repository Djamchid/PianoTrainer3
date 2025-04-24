// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// UI elements
const twinkleBtn = document.getElementById('twinkleBtn');
const maryBtn = document.getElementById('maryBtn');
const jingleBtn = document.getElementById('jingleBtn');
const birthdayBtn = document.getElementById('birthdayBtn');
const stopBtn = document.getElementById('stopBtn');
const tempoSlider = document.getElementById('tempoSlider');
const tempoValue = document.getElementById('tempoValue');
const loopCheckbox = document.getElementById('loopCheckbox');

// Configuration
const width = canvas.width;
const height = canvas.height;
const keyboardStartY = 425;
const keyboardHeight = 70;
const playLineY = keyboardStartY; // Ligne rouge à la hauteur du haut des touches
const whiteKeyWidth = 30;
const blackKeyWidth = 20;
const noteWidth = 25;      // Width for rectangular notes
const startOffsetBeats = 4; // Notes start 4 beats before their actual start time

// State
let animationId = null;
let notes = [];
let pianoKeys = [];
let currentSong = null;
let currentSongName = "";
let startTime = 0;
let tempo = parseInt(tempoSlider.value);
let loopEnabled = loopCheckbox.checked;

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

// Convert beats to pixels
function beatsToPixels(beats) {
  return beats * 80; // 80 pixels per beat
}

// Create notes for a song
function createNotesForSong(songName) {
  const songData = songs[songName];
  if (!songData) return [];
  
  return songData.map((noteData, index) => {
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
      startBeat: startBeat,
      duration: duration,
      isBlack: isBlack,
      played: false
    };
  });
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
  if (currentSong) {
    ctx.fillStyle = "#333333";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`En cours : ${currentSongName}`, width/2, 30);
    ctx.font = "14px Arial";
    ctx.fillText(`Tempo : ${tempo} BPM`, width/2, 55);
    
    if (loopEnabled) {
      ctx.fillText("Lecture en boucle activée", width/2, 75);
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
  const currentBeat = (elapsedTime / 1000) * beatsPerSecond - startOffsetBeats; // Adjust current beat to account for offset
  
  // Get total song length in beats
  const lastNote = notes[notes.length - 1];
  const songLengthInBeats = lastNote ? lastNote.startBeat + lastNote.duration : 0;
  
  // Handle looping
  let effectiveBeat = currentBeat;
  if (loopEnabled && currentBeat > songLengthInBeats + 4) {
    // Reset for next loop
    startTime = timestamp - ((startOffsetBeats / beatsPerSecond) * 1000); // Adjust startTime for offset
    effectiveBeat = -startOffsetBeats; // Start at negative beat to show notes from top
  } else if (!loopEnabled && currentBeat > songLengthInBeats + 4) {
    stopAnimation();
    return;
  }
  
  // Draw background and keyboard
  drawBackground();
  drawKeyboard();
  
  // Draw notes
  notes.forEach(note => {
    // Calculate y position based on beat
    const beatDistance = note.startBeat - effectiveBeat;
    const y = playLineY - beatsToPixels(beatDistance);
    
    // Only draw notes that are on screen
    if (y > -100 && y < height + 50) {
      // Determine note status
      const isAtPlayLine = Math.abs(y - playLineY) < 15;
      const hasPassedPlayLine = y > playLineY;
      
      // Set color based on status
      if (isAtPlayLine) {
        ctx.fillStyle = "#4CAF50"; // Green at play line
      } else if (hasPassedPlayLine) {
        ctx.fillStyle = "#AAAAAA"; // Gray after passing
      } else {
        ctx.fillStyle = note.isBlack ? "#555555" : "#3498db"; // Dark/Blue before
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
  
  // Debug info
  ctx.fillStyle = "#333333";
  ctx.font = "12px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Mesure : ${Math.max(0, effectiveBeat).toFixed(1)}`, 10, 95);
  
  // Continue animation
  animationId = requestAnimationFrame(animate);
}

// Start playing a song
function startSong(songName) {
  // Stop any current animation
  stopAnimation();
  
  // Remove active class from all buttons
  document.querySelectorAll('.song-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Set current song and create notes
  currentSong = songName;
  currentSongName = songName;
  notes = createNotesForSong(songName);
  
  // Add active class to selected button
  const activeBtnId = {
    "Ah! vous dirai-je maman": "twinkleBtn",
    "Mary avait un agneau": "maryBtn",
    "Vive le vent": "jingleBtn",
    "Joyeux Anniversaire": "birthdayBtn"
  }[songName];
  if (activeBtnId) document.getElementById(activeBtnId).classList.add('active');
  
  // Disable tempo slider and enable stop button
  tempoSlider.disabled = true;
  stopBtn.disabled = false;
  
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
  
  // Reset state
  currentSong = null;
  
  // Reset UI
  document.querySelectorAll('.song-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  tempoSlider.disabled = false;
  stopBtn.disabled = true;
  
  // Redraw canvas to clear notes
  drawBackground();
  drawKeyboard();
}

// Initialize
function init() {
  setupPianoKeys();
  drawBackground();
  drawKeyboard();
  
  // Event listeners
  twinkleBtn.addEventListener('click', () => startSong("Ah! vous dirai-je maman"));
  maryBtn.addEventListener('click', () => startSong("Mary avait un agneau"));
  jingleBtn.addEventListener('click', () => startSong("Vive le vent"));
  birthdayBtn.addEventListener('click', () => startSong("Joyeux Anniversaire"));
  stopBtn.addEventListener('click', stopAnimation);
  
  tempoSlider.addEventListener('input', () => {
    tempo = parseInt(tempoSlider.value);
    tempoValue.textContent = tempo;
  });
  
  loopCheckbox.addEventListener('change', () => {
    loopEnabled = loopCheckbox.checked;
  });
}

// Start the app
init();
