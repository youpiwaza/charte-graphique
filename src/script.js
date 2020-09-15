console.log('script.js');

import { gsap } from './js/vendors/index.js';
import { ScrollTrigger } from "./js/vendors/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);
import { ScrollToPlugin } from "./js/vendors/ScrollToPlugin.js";
gsap.registerPlugin(ScrollToPlugin);

window.addEventListener('DOMContentLoaded', () => {
  //// Font face observer
  // https://github.com/bramstein/fontfaceobserver
  //                                family name declared in css @import
  const font = new FontFaceObserver('Roboto Condensed');
  font.load().then( () => {
    const bodyHTML = document.getElementsByTagName('body')[0];
    bodyHTML.classList.add('fonts-loaded');
  });

  //// Responsive JS / Prefer use _.throttle if it isn't one shot
  // const browserWidth = window.innerWidth || document.body.clientWidth;

  // style.css > @media screen and (min-width: 960px)
  // (browserWidth < 960)
  //   ? console.log('< 960')
  //   : console.log('> 960');



  // Recupération de toutes les sections
  let sectionsHTML  = gsap.utils.toArray('section');
  // On vire la première (pas de boutons qui pointent vers elle)
  sectionsHTML.shift();


  //// Générations automatiques des éléments de navigation

  /// Génération des boutons pour passer à la partie suivante
  // Pour chaque section (excepté la première)
  for(let i = 0 ; i < sectionsHTML.length - 1 ; i++ ) {
    // On crée un bouton
    const newButton     = document.createElement('button');
    const newContent    = document.createTextNode('˅');
    newButton.className = 'button-down';
    newButton.appendChild(newContent);

    console.log(sectionsHTML[i]);
    sectionsHTML[i].appendChild(newButton);

    // Ajout de l'animation au clic (scroll vers la section concernée)
    newButton.addEventListener('click', () => {
      console.log('#' + sectionsHTML[i + 1].id);
      gsap.to(window, {duration: 1, scrollTo: '#' + sectionsHTML[i + 1].id});
    });
  }

  /// Génération des liens du sommaire
  // On vire la page sommaire des sections
  const cloneSectionsPourSommaire = sectionsHTML.slice(1);

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

});



