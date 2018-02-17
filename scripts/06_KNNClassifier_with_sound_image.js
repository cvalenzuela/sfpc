/* ===
ML5 SFPC Workshop

Example 06
KNN Image Classifier with sound and image output.
Trains a classifier using the webcam with Imagenet and then performs predictions.
=== */

let knn;
let video;
let sound1, sound2;
let image1, image2;
let outputImage;

function preload() {
  // Initialize the KNN method.
  knn = new ml5.KNNImageClassifier(modelLoaded, 2, 1);
  // Load image file
  image1 = loadImage('../images/dog.jpg');
  image2 = loadImage('../images/kitten.jpg');
  // Load sound file
  sound1 = loadSound('../sounds/01.mp3');
  sound2 = loadSound('../sounds/02.mp3');
}

function setup() {
  createCanvas(640, 240);

  // Loop the sounds
  // sound1.loop();
  // sound2.loop();

  // Create the video element
  video = createCapture(VIDEO);
  video.attribute('width', 227);
  video.attribute('height', 227);
  video.hide();

  // Message Elements
  exampleA = createP('Examples Trained on A: 0');
  confidenceA = createP('Confidence for A: 0');;
  exampleB = createP('Examples Trained on B: 0');
  confidenceB = createP('Confidence for B: 0');

  // Train buttons
  buttonA = createButton('Train A');
  buttonA.mousePressed(() => {
    train(1, 'A');
  });

  buttonB = createButton('Train B');
  buttonB.mousePressed(() => {
    train(2, 'B');
  });

  // Reset buttons
  resetBtnA = createButton('Reset A');
  resetBtnA.mousePressed(() => {
    clearClass(1);
    updateExampleCounts();
  });

  resetBtnB = createButton('Reset B');
  resetBtnB.mousePressed(() => {
    clearClass(2);
    updateExampleCounts();
  });

  buttonPredict = createButton('Start Predicting');
  buttonPredict.mousePressed(predict);

  sound1.loop();
  sound2.loop();
}

function draw() {
  background(0);
  image(video, 0, 0, width / 2, height);
  if (outputImage) {
    image(outputImage, width / 2, 0, width / 2, height);
  }
}

// A function to be called when the model has been loaded
function modelLoaded() {
  msg = createP('Loading...');
  msg.html('Model loaded!');
}

// Train the Classifier on a frame from the video.
function train(category, type) {
  // Log the training type
  msg.html('Training on ' + type);

  // Train the classifier on the assigned category
  knn.addImage(video.elt, category);

  // Update how many frames are there for that class
  updateExampleCounts();
}

// Predict the current frame.
function predict() {
  // Run gotResults with the results from the prediction
  knn.predict(video.elt, gotResults);
}

// Show the results
function gotResults(results) {
  let type;
  if (results.classIndex == 1) {
    type = 'A';
  } else if (results.classIndex == 2) {
    type = 'B';
  }

  // Log the results
  msg.html('Prediction: ' + type);

  // Update confidence logs
  confidenceA.html('Confidence for A: ' + results.confidences[1]);
  confidenceB.html('Confidence for B: ' + results.confidences[2]);

  // Update sound and image output
  if (type === 'A' && !sound1.isPlaying()) {
    sound1.play();
    sound2.stop();
    outputImage = image1;
  } else if (type === 'B' && !sound2.isPlaying()) {
    sound2.play();
    sound1.stop();
    outputImage = image2;
  }

  // Set the prediction to every 1s
  setTimeout(() => predict(), 1000);
}

// Clear the data in one class
function clearClass(classIndex) {
  knn.clearClass(classIndex);
}

// Update the example count for each class
function updateExampleCounts() {
  let counts = knn.getClassExampleCount();
  exampleA.html('Examples Trained on A: ' + counts[1]);
  exampleB.html('Examples Trained on B: ' +  counts[2]);
}