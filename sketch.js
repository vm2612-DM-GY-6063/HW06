let data;
let points = [];
let maxPoints = 10000; // Limit to 1000 points for performance
let particles = []; // Store particles for animation

function preload() {
  // Load the CSV file
  data = loadTable("Beijing-PM2.5.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);

  // Extract relevant data, limited to maxPoints
  for (let i = 0; i < data.getRowCount() && points.length < maxPoints; i++) {
    let pm25 = float(data.getString(i, "pm2.5"));
    let temp = float(data.getString(i, "temperature"));
    let windSpeed = float(data.getString(i, "wind_speed"));
    if (!isNaN(pm25) && !isNaN(temp) && !isNaN(windSpeed)) {
      points.push({ pm25, temp, windSpeed });
    }
  }

  // Initialize particles for animation
  for (let i = 0; i < 200; i++) {
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
  background(30, 30, 30, 25); // Fading background for animation
  noStroke();

  // Scatterplot
  for (let point of points) {
    let x = map(point.temp, -30, 40, 50, width - 50); // Map temperature to x-axis
    let y = map(point.pm25, 0, 500, height - 50, 50); // Map PM2.5 to y-axis
    let size = map(point.windSpeed, 0, 10, 5, 15); // Size based on wind speed
    fill(lerpColor(color(0, 255, 0), color(255, 0, 0), point.pm25 / 500)); // Color by PM2.5
    ellipse(x, y, size, size);
  }

  // Particle animation for pollution
  for (let particle of particles) {
    fill(255, particle.opacity);
    ellipse(particle.x, particle.y, particle.size);
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap particles around the screen
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
  }

  // Display text
  fill(255);
  textSize(16);
  text("PM2.5 Levels and Temperature in Beijing (Colored by Wind Speed)", 20, 30);
}
