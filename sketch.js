let table; // Store the tree census data
let trees = []; // Array to hold processed tree data

function preload() {
  // Load the CSV file
  table = loadTable("Tree-Census-2015.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

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
  background(30);

  // Display each tree as a circle
  for (let tree of trees) {
    let x = map(tree.lon, -74.25, -73.7, 50, width - 50); // Longitude range to canvas
    let y = map(tree.lat, 40.5, 40.9, height - 50, 50);   // Latitude range to canvas

    // Color based on health
    if (tree.health === "Good") fill(0, 255, 0, 150); // Green
    else if (tree.health === "Fair") fill(255, 255, 0, 150); // Yellow
    else if (tree.health === "Poor") fill(255, 0, 0, 150); // Red
    else fill(100); // Default for undefined health

    noStroke();
    ellipse(x, y, 5, 5); // Plot tree as a small circle
  }

  // Add NYC borough names
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("Bronx", width * 0.3, height * 0.2);            // Approximate Bronx location
  text("Manhattan", width * 0.45, height * 0.3);      // Approximate Manhattan location
  text("Brooklyn", width * 0.55, height * 0.55);      // Approximate Brooklyn location
  text("Queens", width * 0.7, height * 0.4);          // Approximate Queens location
  text("Staten Island", width * 0.2, height * 0.75);  // Approximate Staten Island location

  // Add legend for tree health
  drawLegend();
}

function drawLegend() {
  fill(255);
  textAlign(LEFT);
  textSize(16);
  text("Tree Health Legend:", 20, height - 120);

  // Good
  fill(0, 255, 0, 150);
  ellipse(30, height - 90, 10, 10);
  fill(255);
  textSize(14);
  text("Good", 50, height - 85);

  // Fair
  fill(255, 255, 0, 150);
  ellipse(30, height - 70, 10, 10);
  fill(255);
  text("Fair", 50, height - 65);

  // Poor
  fill(255, 0, 0, 150);
  ellipse(30, height - 50, 10, 10);
  fill(255);
  text("Poor", 50, height - 45);
}
