// Module de gestion des doigtés pour l'application Piano Trainer
window.fingeringEnabled = true; // Activer les doigtés par défaut

/**
 * Fonction pour déterminer si une note est jouée par la main gauche
 * Cette fonction doit être disponible globalement
 */
function isLeftHandNote(englishNote) {
  // Extraire l'octave de la note
  const octave = parseInt(englishNote.match(/\d+/)[0]);
  // Considérer les notes d'octave 3 et moins comme appartenant à la main gauche
  return octave <= 3;
}

/**
 * Initialise l'interface pour les doigtés
 */
function initFingeringInterface() {
  // Créer le conteneur pour le toggle doigtés
  const fingeringToggle = document.createElement('div');
  fingeringToggle.className = 'loop-toggle';
  
  // Créer la case à cocher
  const fingeringCheckbox = document.createElement('input');
  fingeringCheckbox.type = 'checkbox';
  fingeringCheckbox.id = 'fingeringCheckbox';
  fingeringCheckbox.checked = window.fingeringEnabled;
  
  // Créer le label
  const fingeringLabel = document.createElement('label');
  fingeringLabel.htmlFor = 'fingeringCheckbox';
  fingeringLabel.textContent = 'Afficher les doigtés';
  
  // Assembler les éléments
  fingeringToggle.appendChild(fingeringCheckbox);
  fingeringToggle.appendChild(fingeringLabel);
  
  // Insérer après les autres toggles
  const lyricsToggle = document.querySelector('.loop-toggle:nth-child(3)');
  if (lyricsToggle) {
    lyricsToggle.parentNode.insertBefore(fingeringToggle, lyricsToggle.nextSibling);
  } else {
    const soundToggle = document.querySelector('.loop-toggle:nth-child(2)');
    if (soundToggle) {
      soundToggle.parentNode.insertBefore(fingeringToggle, soundToggle.nextSibling);
    } else {
      const loopToggle = document.querySelector('.loop-toggle');
      loopToggle.parentNode.insertBefore(fingeringToggle, loopToggle.nextSibling);
    }
  }
  
  // Ajouter l'écouteur d'événement
  fingeringCheckbox.addEventListener('change', () => {
    window.fingeringEnabled = fingeringCheckbox.checked;
  });
  
  // Ajouter explication dans les instructions
  const instructionsList = document.querySelector('.instructions ol');
  if (instructionsList) {
    const fingeringInstruction = document.createElement('li');
    fingeringInstruction.textContent = 'Les chiffres sur les notes indiquent quel doigt utiliser (1=pouce, 2=index, 3=majeur, 4=annulaire, 5=auriculaire)';
    instructionsList.appendChild(fingeringInstruction);
  }
}

/**
 * Fonction modifiée pour dessiner les indicateurs de doigtés sur les notes
 * @param {Object} note - L'objet note avec les propriétés x, y, etc.
 * @param {number} y - La position verticale actuelle de la note
 * @param {number} noteHeight - La hauteur de la note
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu du canvas
 */
function drawFingeringIndicator(note, y, noteHeight, ctx) {
  if (!window.fingeringEnabled || !note.fingerNumber) return;
  
  // Définir la taille et la position du cercle de doigté
  const fingerSize = 18;
  const posY = y - noteHeight/2 - fingerSize/2 - 5; // Juste au-dessus de la note
  
  // Déterminer la main si pas déjà spécifié
  const hand = note.hand || (isLeftHandNote(note.englishNote) ? 'left' : 'right');
  
  // Définir la couleur selon la main (bleu pour gauche, orange pour droite)
  const handColor = hand === 'left' ? "#3F51B5" : "#FF9800";
  
  // Dessiner le cercle du doigté
  ctx.fillStyle = handColor;
  ctx.beginPath();
  ctx.arc(note.x, posY, fingerSize/2, 0, Math.PI * 2);
  ctx.fill();
  
  // Ajouter un contour
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Dessiner le numéro du doigt à l'intérieur du cercle
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 12px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(note.fingerNumber.toString(), note.x, posY);
}

/**
 * Modifie la fonction createNotesForSong pour ajouter les informations de doigté
 * Cette fonction est appelée par la version originale et complète les notes avec les doigtés
 * @param {Array} notesWithPositions - Les notes déjà positionnées
 * @param {Object} songData - Les données de la chanson
 * @returns {Array} - Les notes avec les informations de doigté ajoutées
 */
function addFingeringToNotes(notesWithPositions, songData) {
  if (!songData.fingerings) return notesWithPositions;
  
  return notesWithPositions.map((note, index) => {
    // Chercher un doigté correspondant à cette note
    // On considère que les doigtés sont dans le même ordre que les notes
    if (index < songData.fingerings.length) {
      const fingeringData = songData.fingerings[index];
      return {
        ...note,
        fingerNumber: fingeringData[0],
        hand: fingeringData[3] || (isLeftHandNote(note.englishNote) ? 'left' : 'right') // Déterminer la main automatiquement si non spécifiée
      };
    }
    return note;
  });
}

// Ajout d'explications sur les doigtés dans la section footer
function addFingeringExplanation() {
  const footer = document.querySelector('.footer');
  if (footer) {
    const fingeringExplanation = document.createElement('p');
    fingeringExplanation.innerHTML = '<strong>Indications de doigté :</strong> 1=pouce, 2=index, 3=majeur, 4=annulaire, 5=auriculaire. ' +
      'Les cercles <span style="color:#FF9800">orange</span> indiquent la main droite, les cercles <span style="color:#3F51B5">bleus</span> la main gauche.';
    footer.appendChild(fingeringExplanation);
  }
}

// Exportation des fonctions pour les rendre disponibles globalement
window.isLeftHandNote = isLeftHandNote;
window.initFingeringInterface = initFingeringInterface;
window.drawFingeringIndicator = drawFingeringIndicator;
window.addFingeringToNotes = addFingeringToNotes;
window.addFingeringExplanation = addFingeringExplanation;
