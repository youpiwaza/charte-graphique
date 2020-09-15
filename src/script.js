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
  for(let i = 0 ; i < sectionsHTML.length ; i++ ) {
    // On crée un bouton
    let newButton       = document.createElement('button');
    let newContent      = document.createTextNode('˅');
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



  //// Animations

  // Idem pour les liens du sommaire
  const liensSommaireHTML = gsap.utils.toArray('#sommaire a');
  // On vire la page sommaire
  const cloneSectionsPourSommaire = sectionsHTML.slice(1);
  for(let i = 0 ; i < liensSommaireHTML.length ; i++ ) {
    liensSommaireHTML[i].addEventListener('click', () => {
      gsap.to(window, {duration: 1, scrollTo: '#' + cloneSectionsPourSommaire[i].id});
    });
  }

});



