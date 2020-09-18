console.log('fonts.js');

export function manageFonts() {
  // console.log('manageFonts()');
  
  //// Font face observer
  // https://github.com/bramstein/fontfaceobserver
  //    family name declared in css @import
  //    Prefer loading each font individually
  const font1 = new FontFaceObserver('Shadows Into Light');
  font1.load().then( () => {
    const bodyHTML = document.getElementsByTagName('body')[0];
    bodyHTML.classList.add('font1-loaded');
  });

  const font2 = new FontFaceObserver('Roboto Condensed');
  font2.load().then( () => {
    const bodyHTML = document.getElementsByTagName('body')[0];
    bodyHTML.classList.add('font2-loaded');
  });
  
  const font3 = new FontFaceObserver('Press Start 2P');
  font3.load().then( () => {
    const bodyHTML = document.getElementsByTagName('body')[0];
    bodyHTML.classList.add('font2-loaded');
  });
}