console.log('script.js');

import { gsap } from '/js/vendors/index.js';
import { ScrollTrigger } from './js/vendors/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);
import { ScrollToPlugin } from './js/vendors/ScrollToPlugin.js';
gsap.registerPlugin(ScrollToPlugin);
// KO, import via <script>
// import { tinycolor } from './js/vendors/tinycolor.js';

import { bottomButtons }      from './assets/js/bottomButtons.js';
import { manageFonts }        from './assets/js/fonts.js';
// import { responsiveViaJs } from './assets/js/responsiveViaJs.js';
import { bottomButtons }      from './assets/js/bottomButtons.js';


window.addEventListener('DOMContentLoaded', () => {
  
  manageFonts();
  // responsiveViaJs();
  
  // Recupération de toutes les sections
  let sectionsHTML  = gsap.utils.toArray('section');
  
  //// Générations automatiques des éléments de navigation
  bottomButtons(sectionsHTML);
  
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
  // Need at least one declinaison for the column to show, let's count 'em
  let isDeclinaisonColumn = false;

  // Dynamic generation of CSS custom classes with provided colors
  let chaineCustomCss     = `<style>`;
  let customCssColorIndex = 1;

  couleursHTML.forEach(couleurHTML => {
    const labelCouleur  = couleurHTML.textContent;
    const couleurText   = couleurHTML.dataset.color;
    const tinyCouleur   = tinycolor(couleurText);
    
    // On supprime le contenu précédent
    couleurHTML.textContent = "";
    
    // Crétion d'une div afin d'afficher la couleur
    const newColorPastilleHTML = document.createElement('div');
    newColorPastilleHTML.className = 'pastille';

    /// Création d'une liste populée automatiquement
    const newList = document.createElement('ul');

    /// Test de la couleur fournie
    // Si non valide
    if(!tinyCouleur.isValid()) {
      // Affichage d'une erreur pour cette couleur
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
      newList.style.display = 'table-cell';
      newList.style.verticalAlign = 'middle';

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
      const isDeclinaison = couleurHTML.dataset.declinaison;
      if( //dem users x')
        isDeclinaison === 'ok' || 
        isDeclinaison === 'yes' || 
        isDeclinaison === 'oui' || 
        isDeclinaison === 'true' 
      ) {
        // At least one must be set for the column to be displayed
        isDeclinaisonColumn = true;
      }

      /// Generate custom CSS classes
      chaineCustomCss += `
        .bg-color${customCssColorIndex} {
          background-color: ${tinyCouleur.toHexString()};
        }
        .color${customCssColorIndex} {
          color: ${tinyCouleur.toHexString()};
        }
      `;
      customCssColorIndex++;
    }
    // On ajoute le contenu au html
    couleurHTML.appendChild(newColorPastilleHTML);
    couleurHTML.appendChild(newList);
  });

  //// Gestion de la déclinaison des couleurs
  // Si pas de déclinaison, on masque la colonne
  if(!isDeclinaisonColumn) {
    // console.log('if(!isDeclinaisonColumn)');
    const declinaisonsContainer = document.querySelector('.declinaisonsColumn');
    declinaisonsContainer.classList.add('hidden');
  }
  else {
    // Sinon, on la crée et on la remplit
    // console.log('if(isDeclinaisonColumn) {');
    let declinaisonsHTML = document.createElement('div');
    declinaisonsHTML.classList.add('declinaisonsColumn');

    let declinaisonsHTMLText = `
      <h3>Déclinaisons</h3>
      <table class="declinaisons small-font">
    `;

    // Reset custom css classes counter
    customCssColorIndex = 1;

    // Pour chaque couleur
    couleursHTML.forEach(couleurHTML => {
      const labelCouleur  = couleurHTML.querySelector('.pastille').textContent;
      const couleurText   = couleurHTML.dataset.color;
      const tinyCouleur   = tinycolor(couleurText);
      const isDeclinaison = couleurHTML.dataset.declinaison;

      // Si la déclinaison est demandée, et que la couleur est valide
      if( //dem users x')
        ( isDeclinaison === 'ok' || 
          isDeclinaison === 'yes' || 
          isDeclinaison === 'oui' || 
          isDeclinaison === 'true' 
        ) && tinyCouleur.isValid()
      ) {
        // On génère les valeurs des déclinaisons
        const brighter  = tinycolor(couleurText).brighten();
        const darker    = tinycolor(couleurText).darken();

        let textColor = '';
        if(tinyCouleur.isDark()) {
          textColor = ' color: #fbfbfb;';
        }

        // On crée le HTML demandé
        // La div .small-pastille est nécessaire, la taille du tableau s'adapte à son contenu
        declinaisonsHTMLText += `
          <tr class="declinaison">
            <td>
              <ul>
                <li>${ brighter.toHslString() }</li>
                <li>${ brighter.toRgbString() }</li>
                <li>${ brighter.toHexString() }</li>
              </ul>
            </td>
            <td>
              <div class="pastille-small" style="background-color: ${ brighter.toHexString() };${ textColor }">Plus clair</div>
            </td>
            <td>
              <div class="pastille-small" style="background-color: ${ tinyCouleur.toHexString() };${ textColor }">${ labelCouleur }</div>
            </td>
            <td>
              <div class="pastille-small" style="background-color: ${ darker.toHexString() };${ textColor }">Plus foncé</div>
            </td>
            <td>
              <ul>
                <li>${ darker.toHslString() }</li>
                <li>${ darker.toRgbString() }</li>
                <li>${ darker.toHexString() }</li>
              </ul>
            </td>
          </tr>
        `;

        /// Generate custom CSS classes
        chaineCustomCss += `
          .bg-color${customCssColorIndex}-brighter {
            background-color: ${brighter.toHexString()};
          }
          .color${customCssColorIndex}-brighter {
            color: ${brighter.toHexString()};
          }
          .bg-color${customCssColorIndex}-darker {
            background-color: ${darker.toHexString()};
          }
          .color${customCssColorIndex}-darker {
            color: ${darker.toHexString()};
          }
        `;
      }
      // Sinon
      else {
        // On rajoute une case vide dans le tableau, afin que l'alginement corresponde
        // Les cases vides seront masquées en CSS (empilement > pas besoin d'alignement horizontal)
        declinaisonsHTMLText += `
          <tr class="declinaison hidden-mobile">
            <td colspan="4"><div class="pastille-small"></div></td>
          </tr>
        `;
      }
    });
    // Une fois toutes les déclinaisons ajoutées..
    declinaisonsHTMLText += '</table>';
    declinaisonsHTML.innerHTML = declinaisonsHTMLText;

    // On rajoute l'ensemble des déclinaisons au html
    let declinaisonsColumnHTML = document.querySelector('.declinaisonsColumn');
    declinaisonsColumnHTML.appendChild(declinaisonsHTML);

    // Add custom CSS to HTML
    chaineCustomCss += `</style>`;

    let headHTML = document.querySelector('head');
    headHTML.innerHTML += chaineCustomCss;
  }
});
