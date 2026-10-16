// Obiettivo: realizzare un primo sketch e modificarlo con l'assistenza di un agente.
// Vincoli: la consegna non prescrive forme o colori; la tela iniziale concordata è 400 × 400.
let tono

function setup() {
  createCanvas(800, 600);
  colorMode(HSL, 300, 100, 100);
  tono = random(360);
  background(0);
}

function draw() {
  if (mouseIsPressed) {
    stroke(110)
    fill(tono, 200, 45)
    let x = mouseX
    let y = mouseY
    let dx = random(-10, 10)
    let dy = random(-10, 10)
    for (let i = 0; i < 50; i = i + 1) {
      x = x + dx
      y = y + dy
    circle (x, y, (50 - i) / 2)
    if (random() < 0.1) {        //<-- DIREZIONE CASUALE (dentro i for)
      dx = random(-10, 10)
      dy = random(-10, 10)
    }
   }
   if (random() < 0.02) {        //<-- CAMBIO COLORE CASUALE (fuori i for)
    tono = random(350)
   }  
  }
}

