console.log('summary.js');

import { gsap } from './../../js/vendors/index.js';

export function summary(sectionsHTML) {
  // console.log('summary()');
  
  // On vire les pages intro & sommaire des sections
  const cloneSectionsPourSommaire = sectionsHTML.slice(2);

  // Récupération de la liste du sommaire
  let ulHTML = document.querySelector('#sommaire ul');

  for(let i = 0 ; i < cloneSectionsPourSommaire.length ; i++ ) {
    const texteDuH2DeLaSection = cloneSectionsPourSommaire[i].querySelector('h2').textContent;

    // Création de l'élément de liste qui contient un lien
    const newListItem = document.createElement('li');
    const newLink     = document.createElement('a');
    const newContent  = document.createTextNode(texteDuH2DeLaSection);

    // Imbrication des éléments puis ajout au html, dans la liste
    newLink     .appendChild(newContent);
    newListItem .appendChild(newLink);
    ulHTML      .appendChild(newListItem);

    // Ajout de l'animation au clic (scroll vers la section concernée)
    newLink.addEventListener('click', () => {
      gsap.to(window, {duration: 1, scrollTo: '#' + cloneSectionsPourSommaire[i].id});
    });
  }
}