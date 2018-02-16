/* ===
ML5 SFPC Workshop

Example 04
Word2Vec.
Perform word vector operations on a train data set
=== */

let wordVecs;
let wordVectors;

function setup() {
  // We dont need a canvas and a loop
  noCanvas();
  noLoop();

  // Create a wordVector variable holding our model
  wordVectors = new ml5.Word2Vec('../models/wordvecs/wordvecs10000.json');

  // Nearest Words
  createP('Nearest words');
  let nearWordInput = createInput('');
  let nearButton = createButton('is similar to...');
  let nearResults = createP('');

  // In Between Words
  createP('Between Words');
  let betweenWordInput1 = createInput("");
  let betweenWordInput2 = createInput("");
  let betweenButton = createButton("is...");
  let betweenResults = createP("");

  // Operations
  createP('Operation');
  let addInput1 = createInput("king");
  createP('is to');
  let addInput2 = createInput("queen");
  createP('as');
  let addInput3 = createInput("man");
  let addButton = createButton("is to...");
  let addResults = createP("");

  nearButton.mousePressed(() => {
    let word = nearWordInput.value();
    nearResults.html(findNearest(word, 10));
  });

  betweenButton.mousePressed(() => {
    let word1 = betweenWordInput1.value();
    let word2 = betweenWordInput2.value();
    let average = wordVectors.average([word1, word2], 1);
    betweenResults.html(average[0].vector);
  });

  addButton.mousePressed(() => {
    let is1 = addInput1.value();
    let to1 = addInput2.value();
    let is2 = addInput3.value();
    let difference = wordVectors.subtract([to1, is1]);
    let to2 = wordVectors.add([is2, difference[0].vector]);
    addResults.html(to2[0].vector);
  });
}

// Find the nearest of a given word.
function findNearest(word, n=10) {
  let nearest = wordVectors.nearest(word, n);
  if (!nearest) {
    return 'No word vector found';
  }
  let output = '';
  for (let i = 0; i < nearest.length; i++) {
    output += nearest[i].vector + '<br/>';
  }
  return output;
}
