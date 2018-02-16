/* ===
ML5 SFPC Workshop

Example 02
Image Classification with ML5.js and p5.js
=== */

let imagenet;
let img;
let predictImg;

// The image source
let imgUrl = '../images/dog.jpg';

function preload() {
  // Initialize ImageNet with the MobileNet model.
  imagenet = new ml5.ImageNet('MobileNet');
}

function setup() {
  // We are not using the canvas this time
  noCanvas();

  // Load and display the img
  img = createImg(imgUrl);

  // Create the actual image to run the prediction on.
  // Run the imageReady function once it has loaded.
  predictImg = createImg(imgUrl, imageReady);
}

function imageReady() {
  // The image should be 227x227
  predictImg.attribute('width', 227);
  predictImg.attribute('height', 227);
  predictImg.hide();

  // Get a prediction for that image
  imagenet.predict(predictImg.elt, 10, gotResult);
}

// When we get the results
function gotResult(results) {
  // The results are in an array ordered by probability.
  createP(results[0].label);
  createP(nf(results[0].probability, 0, 2));

  // Console the results
  console.log(results);
}