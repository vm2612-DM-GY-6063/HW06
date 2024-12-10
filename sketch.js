let table; // Store the tree census data
let trees = []; // Array to hold processed tree data

function preload() {
  // Load the CSV file
  table = loadTable("Tree-Census-2015.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30); // Set background to white

  // Process the table data
  for (let i = 0; i < table.getRowCount(); i++) {
    let lat = parseFloat(table.getString(i, "latitude"));
    let lon = parseFloat(table.getString(i, "longitude"));
    let health = table.getString(i, "health");

    if (!isNaN(lat) && !isNaN(lon)) {
      trees.push({ lat, lon, health });
    }
  }
}

function draw() {
  background(30); // White background

  // Display each tree as a circle
  for (let tree of trees) {
    let x = map(tree.lon, -74.25, -73.7, 50, width - 50); // Longitude range to canvas
    let y = map(tree.lat, 40.5, 40.9, height - 50, 50);   // Latitude range to canvas

    // Color based on health
    if (tree.health === "Good") fill(0, 200, 0, 150); // Green
    else if (tree.health === "Fair") fill(255, 200, 0, 150); // Yellow
    else if (tree.health === "Poor") fill(255, 0, 0, 150); // Red
    else fill(150); // Default for undefined health

    noStroke();
    ellipse(x, y, 5, 5); // Plot tree as a small circle
  }


  textAlign(CENTER);
 

  // Add legend for tree health
  drawLegend();
}

function drawLegend() {
   fill(255); // White text
  textAlign(LEFT);
  textSize(16);
  text("Tree Health Legend:", 20, 40);

  // Good
  fill(0, 200, 0, 150);
  ellipse(30, 70, 10, 10);
  fill(255); // White text
  textSize(14);
  text("Good", 50, 75);

  // Fair
  fill(255, 200, 0, 150);
  ellipse(30, 90, 10, 10);
  fill(255); // White text
  text("Fair", 50, 95);

  // Poor
  fill(255, 0, 0, 150);
  ellipse(30, 110, 10, 10);
  fill(255); // White text
  text("Poor", 50, 115);
}
