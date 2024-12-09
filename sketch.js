let data;
let points = [];
let maxPoints = 1000; // Limit points for performance
let particles = [];
let viewMode = "temp"; // Toggle between "temp" and "wind"

function preload() {
  data = loadTable("Beijing-PM2.5.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);

  // Extract data
  for (let i = 0; i < data.getRowCount() && points.length < maxPoints; i++) {
    let pm25 = float(data.getString(i, "pm2.5"));
    let temp = float(data.getString(i, "temperature"));
    let windSpeed = float(data.getString(i, "wind_speed"));
    if (!isNaN(pm25) && !isNaN(temp) && !isNaN(windSpeed)) {
      points.push({ pm25, temp, windSpeed });
    }
  }

  // Particles for animation
  for (let i = 0; i < 300; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(2, 5),
      speedX: random(-1, 1),
      speedY: random(-1, 1),
      opacity: random(50, 200),
    });
  }
}

function draw() {
  background(30, 30, 30, 25);

  noStroke();

  // Display points
  for (let point of points) {
    let x, y;
    if (viewMode === "temp") {
      x = map(point.temp, -30, 40, 50, width - 50); // Temperature to x-axis
      y = map(point.pm25, 0, 500, height - 50, 50); // PM2.5 to y-axis
    } else if (viewMode === "wind") {
      x = map(point.windSpeed, 0, 15, 50, width - 50); // Wind speed to x-axis
      y = map(point.pm25, 0, 500, height - 50, 50); // PM2.5 to y-axis
    }

    let colorGradient = lerpColor(color(0, 255, 0), color(255, 0, 0), point.pm25 / 500);
    fill(colorGradient);
    ellipse(x, y, 8, 8);
  }

  // Particle animation
  for (let particle of particles) {
    fill(255, particle.opacity);
    ellipse(particle.x, particle.y, particle.size);
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap particles around screen
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
  }

  // Display mode and instructions
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text("Press T for PM2.5 vs Temperature | W for PM2.5 vs Wind Speed", 20, 30);
  textAlign(RIGHT);
  text(viewMode === "temp" ? "PM2.5 vs Temperature" : "PM2.5 vs Wind Speed", width - 20, 30);
}

function keyPressed() {
  if (key === 'T' || key === 't') viewMode = "temp";
  if (key === 'W' || key === 'w') viewMode = "wind";
}
