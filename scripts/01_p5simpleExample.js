/* ===
ML5 SFPC Workshop

Example 01
A Simple Example of p5.js
Draw circles following the mouse positions.
=== */

// Size of the ellipse
var s = 20;

// This will run only once, before the loop begins
function setup() {
  // Create a canvas of width 500px and height 400px
  createCanvas(500, 400);

  // Add a green color to the background
  background(50, 180, 50);
}

// This will run only forever
function draw() {
  // At every new frame (60fps), 
  // get the mouse X and Y positions
  var x = mouseX;
  var y = mouseY;

  // Uncomment the following line to see the values
  //console.log(x,y)

  // Set the color of the ellipse
  fill(255);

  // Uncomment this following line
  // to refresh the drawing's background
  // background(50, 180, 50);

  // Draw an ellipse based on the x and y positions
  ellipse(x, y, s, s);


}