// Configuration file for gulp process

// CSS vendors paths
const cssVendors = [
  'node_modules/normalize.css/normalize.css',
];


// JS vendors paths
const jsVendors = [
  // // Don't go for old stuff
  // 'node_modules/gsap/dist/**/*.js',
  // Modern modules import, at root. Careful, npm stuf != from gsap zip file
  'node_modules/gsap/*.js',
  'node_modules/tinycolor2/tinycolor.js',
  'node_modules/fontfaceobserver/fontfaceobserver.js',
];


// Export
module.exports = {
  cssVendors,
  jsVendors,
};
