console.log('script.js');

import { gsap } from './js/vendors/index.js';
import { ScrollTrigger } from './js/vendors/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);
import { ScrollToPlugin } from './js/vendors/ScrollToPlugin.js';
gsap.registerPlugin(ScrollToPlugin);

// KO, import via <script>
// import { tinycolor } from './js/vendors/tinycolor.js';

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

  //// Gestion des couleurs
  let couleursHTML = gsap.utils.toArray('.colors .color');
  // Need at least one declinaison
  let isDeclinaisonColumn = false;

  couleursHTML.forEach(couleurHTML => {
    const labelCouleur = couleurHTML.textContent;
    const couleurText = couleurHTML.dataset.color;
    // On supprime le contenu précédent
    couleurHTML.textContent = "";

    const tinyCouleur = tinycolor(couleurText);
    
    // Crétion d'une div afin d'afficher la couleur
    const newColorPastilleHTML = document.createElement('div');
    newColorPastilleHTML.className = 'pastille';

    /// Création d'une liste populée automatiquement
    const newList = document.createElement('ul');

    // Test de la couleur fournie
    if(!tinyCouleur.isValid()) {
      // Si non valide, affichage d'une erreur
      newColorPastilleHTML.style.backgroundColor = '#FF4136';
      newColorPastilleHTML.style.color = '#fbfbfb';
      newColorPastilleHTML.style.lineHeight = 'calc(55px - 1em)';
      newColorPastilleHTML.textContent = 'Couleur invalide';
      couleurHTML.appendChild(newColorPastilleHTML);

      // Ajustement de la taille de police
      couleurHTML.classList.add('small-font');

      const newListItem = document.createElement('li');
      const newContent  = document.createTextNode(`La couleur '${couleurText} n'est pas au bon format`);

      const newListItem2 = document.createElement('li');
      const newDiv = document.createElement('div');
      newDiv.innerHTML = `Merci de vous référer aux 
        <a href="https://github.com/bgrins/TinyColor#accepted-string-input" target="_blank" title="Tinycolor github">formats acceptés</a>`;
      
      newListItem.appendChild(newContent);
      newList.appendChild(newListItem);

      newListItem2.appendChild(newDiv);
      newList.appendChild(newListItem2);
    }
    else {
      // Modifier la couleur de fond en fonction de la valeur passée en texte dans le HTML
      newColorPastilleHTML.style.backgroundColor = tinyCouleur.toHexString();

      // Ajuster la couleur du texte si la couleur à afficher est trop sombre
      //    https://github.com/bgrins/TinyColor#getbrightness
      if(tinyCouleur.isDark()) {
        newColorPastilleHTML.style.color = '#fbfbfb';
      }

      // newColorPastilleHTML.textContent = tinyCouleur.toHexString();
      newColorPastilleHTML.textContent = labelCouleur;

      // Afficher CMJN RVB Hexa
      // Print CMJN / C 20 ; M 70 ; J 100 ; N 10
      // Web RGB / R 204 ; V 106 ; B 45
      // Hexadécimal / #CC6A2D
      const newListItemCMJN = document.createElement('li');
      const newContentCMJN  = document.createTextNode(tinyCouleur.toHslString());
      newListItemCMJN.appendChild(newContentCMJN);
      newList.appendChild(newListItemCMJN);

      const newListItemRGB = document.createElement('li');
      const newContentRGB  = document.createTextNode(tinyCouleur.toRgbString());
      newListItemRGB.appendChild(newContentRGB);
      newList.appendChild(newListItemRGB);

      const newListItemHex = document.createElement('li');
      const newContentHex  = document.createTextNode(tinyCouleur.toHexString());
      newListItemHex.appendChild(newContentHex);
      newList.appendChild(newListItemHex);

      /// Gestion de la colonne déclinaison
      const isDeclinsaison = couleurHTML.dataset.declinaison;
      if( //dem users x')
        isDeclinsaison === 'ok' || 
        isDeclinsaison === 'yes' || 
        isDeclinsaison === 'oui' || 
        isDeclinsaison === 'true' 
      ) {
        // At least one must be set for the column to be displayed
        isDeclinaisonColumn = true;
      }
    }
    // On ajoute le contenu au html
    couleurHTML.appendChild(newColorPastilleHTML);
    couleurHTML.appendChild(newList);
  });

  //// Gestion de la déclinaison des couleurs
  // Si pas de déclinaison, on masque la colonne
  if(!isDeclinaisonColumn) {
    console.log('if(!isDeclinaisonColumn) {')
    const declinaisonsContainer = document.querySelector('.declinaisonsColumn');
    declinaisonsContainer.classList.add('hidden');
  }
  else {
    // Sinon, on la remplit
    console.log('if(isDeclinaisonColumn) {')

  }
});
