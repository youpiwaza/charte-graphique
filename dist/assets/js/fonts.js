console.log('fonts.js');

export function fonts() {
  // console.log('fonts()');
  
  //// Font face observer
  // https://github.com/bramstein/fontfaceobserver
  //    family name declared in css @import

  // Be careful as font order will impact dynamically generated css
  //    ex: First font will have the class '.font1', Second will have 'font2', etc.
  //    .font1 will be used for titles, .font2 for regular texts

  const fonts = ['Shadows Into Light', 'Roboto Condensed', 'Press Start 2P'];

  for(let i = 0 ; i < fonts.length ; i++) {
    const font = new FontFaceObserver(fonts[i]);
    font.load().then( () => {
      const bodyHTML = document.getElementsByTagName('body')[0];
      bodyHTML.classList.add(`font${i + 1}-loaded`);
    });
  }
}