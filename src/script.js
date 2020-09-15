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

  // Animations

  // Boutons pour testay
  const buttonsHTML   = gsap.utils.toArray('.button-down');
  // Recup toutes les sections
  let sectionsHTML  = gsap.utils.toArray('section');
  // On vire la première (pas de boutons qui pointent vers elle)
  sectionsHTML.shift();

  // // Chaque bouton pointe vers la section suivante
  for(let i = 0 ; i < buttonsHTML.length ; i++ ) {
    buttonsHTML[i].addEventListener('click', () => {
      // console.log('#' + sectionsHTML[i].id);
      gsap.to(window, {duration: 1, scrollTo: '#' + sectionsHTML[i].id});
    });
  }

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



