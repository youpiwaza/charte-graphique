console.log('bottomButtons.js');

import { gsap } from '/js/vendors/index.js';

export function bottomButtons(sectionsHTML) {
  // console.log('bottomButtons()');
  
  // On vire la première (pas de boutons qui pointent vers elle)
  sectionsHTML.shift();

  /// Génération des boutons pour passer à la partie suivante
  // Pour chaque section (excepté la première & la dernière)
  for(let i = 0 ; i < sectionsHTML.length - 1 ; i++ ) {
    // On crée un bouton
    const newButton     = document.createElement('button');
    const newContent    = document.createTextNode('˅');
    newButton.className = 'button-down';
    newButton.appendChild(newContent);

    // console.log(sectionsHTML[i]);
    sectionsHTML[i].appendChild(newButton);

    // Ajout de l'animation au clic (scroll vers la section concernée)
    newButton.addEventListener('click', () => {
      // console.log('#' + sectionsHTML[i + 1].id);
      gsap.to(window, {duration: 1, scrollTo: '#' + sectionsHTML[i + 1].id});
    });
  }
}