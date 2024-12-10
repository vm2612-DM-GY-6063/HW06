let table; // Store the tree census data
let trees = []; // Array to hold processed tree data

function preload() {
  // Load the CSV file
  table = loadTable("Tree-Census-2015.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);

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

  // Add title
  fill(255);
  textSize(16);
  text("Tree Health Visualization (NYC Tree Census 2015)", 20, 30);
}
