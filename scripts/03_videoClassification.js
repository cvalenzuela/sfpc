/* ===
ML5 SFPC Workshop

Example 03
Webcam Classification with ML5.js and p5.js
=== */

let imagenet;
let video;
let result;
let confidence;

function preload() {
  // Initialize ImageNet with the MobileNet model.
  imagenet = new ml5.ImageNet('MobileNet');
}

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);

  // Create the elements to hold the results
  result = createP('');
  confidence = createP('');

  // Set the input size and hide the video
  video.attribute('width', 227);
  video.attribute('height', 227);
  video.hide();
  guess();
}

function guess() {
  // Get a prediction for that image
  imagenet.predict(video.elt, 10, gotResult);
}

function draw() {
  // Draw a larger video on the canvas
  image(video, 0, 0, width, height);
}
// When we get the results
function gotResult(results) {
  // The results are in an array ordered by probability.
  result.html(results[0].label);
  confidence.html(results[0].probability, 0, 2);

  // Console the results
  // console.log(results);

  // Start again every 250ms
  setTimeout(guess, 250);
}