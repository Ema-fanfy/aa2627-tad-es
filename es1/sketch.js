// Illusione: spirale ottica formata da poligoni concentrici ruotati.
// Fonte: https://openprocessing.org/@u398497/2026897
// Parametri critici: 10 lati, passo radiale 5, spessore 10 + 9*cos(faseSpessore),
// rotazione progressiva PI/(25*cos(faseRotazione)+150).

// Obiettivo: animare un'illusione ottica geometrica composta da elementi ripetuti.
// Vincoli: canvas 800x600; solo bianco, nero e grigi; elementi ripetuti con cicli for;
// parametri numerici dichiarati all'inizio; movimento applicato agli elementi
// o ai parametri critici, non all'intera immagine.


let points = 10;
let step = 0;
let step2 = 0;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 1);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  
  const maxRadius = max(width, height);
  
  noFill();
  strokeWeight(9 * cos(step) + 10);
  
  for (let i = 5; i < maxRadius; i += 5) {
    push();
    
    if (i % 10 == 0) {
      stroke(33);
    } else {
      stroke(0);
    }
    
    beginShape();
    for (let a = 0.1; a < TWO_PI; a += TWO_PI / points) {
      let sx = cos(a) * i;
      let sy = sin(a) * i;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
    
    // Ora la rotazione usa direttamente step2 crescendo in un'unica direzione
    rotate(PI / (25 * cos(step2) + 150));
  }
  
  step += 0.0055;
  step2 += 0.01; // Modifica questo valore per accelerare o rallentare la rotazione
}
