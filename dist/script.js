console.log('script.js');

import { gsap } from './js/vendors/index.js';
import { ScrollTrigger } from './js/vendors/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);
import { ScrollToPlugin } from './js/vendors/ScrollToPlugin.js';
gsap.registerPlugin(ScrollToPlugin);
// KO, import via <script>
// import { tinycolor } from './js/vendors/tinycolor.js';

import { bottomButtons }      from './assets/js/bottomButtons.js';
import { colors }             from './assets/js/colors.js';
import { fonts }              from './assets/js/fonts.js';
// import { responsiveViaJs } from './assets/js/responsiveViaJs.js';
import { summary }            from './assets/js/summary.js';


window.addEventListener('DOMContentLoaded', () => {
  
  // Classic stuff : fonts & responsive
  fonts();
  // responsiveViaJs();
  
  // Recupération de toutes les sections
  let sectionsHTML  = gsap.utils.toArray('section');
  
  //// Générations automatiques des éléments de navigation
  bottomButtons(sectionsHTML);
  
  /// Génération des liens du sommaire
  summary(sectionsHTML);

  //// Gestion des couleurs
  // Génération de la palette
  // Génération des déclinaisons
  // Génération des classes CSS auto
  colors();
});
