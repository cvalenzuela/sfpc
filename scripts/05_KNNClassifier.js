/* ===
ML5 SFPC Workshop

Example 05
KNN Image Classifier.
Trains a classifier using the webcam with Imagenet and then performs predictions.
=== */

let knn;
let video;

function preload() {
  // Initialize the KNN method.
  knn = new ml5.KNNImageClassifier(modelLoaded, 2, 1);
}

function setup() {
  createCanvas(320, 240);

  // Create the video element
  video = createCapture(VIDEO);
  video.attribute('width', 227);
  video.attribute('height', 227);
  video.hide();

  // Message Elements
  msg = createP('Loading...');
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
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);
}

// A function to be called when the model has been loaded
function modelLoaded() {
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