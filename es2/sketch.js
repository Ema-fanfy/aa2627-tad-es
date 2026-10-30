// Opera scelta: Piet Mondrian, "Composizione con rosso, giallo, blu e nero", 1921.
// Fonte: https://app.fta.art/it/artwork/ac22d224ce65905bb599196f23b64e821d59c2ed
// Regola cromatica: Uso dei colori primari (rosso, giallo, blu) abbinati a toni acromatici
// Obiettivo: riprodurre un quadro astratto geometrico e creare variazioni
//           (bianco e nero/grigio scuro), con saturazione elevata e luminosità bilanciata 
//per ricreare il rigore geometrico neoplasticista.
// casuali e dinamiche dei colori o dell'estensione delle aree colorate.
// Vincoli: canvas di riferimento 800x600; colori in HSL, HSB o OKLCH;
// parametri cromatici variabili dichiarati all'inizio; variazioni casuali
// controllate da una regola; animazione o interazione sui colori o sulle
// aree colorate; creare preview.png con una variante rappresentativa.

var thickness = 2;
let baseHue; // Tono di base casuale per la regola cromatica dei colori primari
let colors;
let probColors = [0.05, 0.45, 0.16, 0.16, 0.18]; // Probabilità di distribuzione delle aree
let qtree;

function setup() {
   /*if(windowHeight < windowWidth){
	createCanvas(windowHeight, windowHeight);
	}
	else{*/
  createCanvas(800, 600);
  // }

  // Impostazione HSL richiesta dai vincoli (Tono 0-360, Saturazione 0-100, Luminosità 0-100)
    colorMode(HSL, 360, 100, 100);
    
    // Scrivi qui direttamente i colori esatti che vuoi (Formato: [Tono, Saturazione, Luminosità])
    colors = [
        [0, 0, 10],     // 0: Nero / Grigio scuro
        [0, 0, 95],     // 1: Bianco / Grigio chiarissimo
        [220, 90, 38],   // 2: Blu stile Mondrian (più profondo e scuro, con luminosità a 38)
        [50, 90, 60],   // 3: Giallo vivace
        [5, 90, 45]      // 4: Rosso primario intenso e corposo
    ];

    let boundary = new Rectangle(width/2, height/2, width/2, height/2);
    qtree = new QuadTree(boundary, 4);
    background(0, 0, 90); 
    qtree.show();
}



function draw() {
}

function mouseDragged(){
    for(let i=0; i<5; i++){
        let m= new Point(mouseX+random(-5,5), mouseY+random(-5,5));
        qtree.insert(m);
		}
	qtree.show();
}


function mousePressed(){
    for(let i=0; i<5; i++){
        let m= new Point(mouseX+random(-5,5), mouseY+random(-5,5));
        qtree.insert(m);
		}
	qtree.show();
}

function keyTyped() {
  if (key == 's' || key == 'S') save(str(random(0,1000))+".jpg");
}

function chooseColor(){
			var r = random(1), sum = 0;
			var i = 0;
			while (sum <= r && i < probColors.length) {
				sum += probColors[i++];
			}  
			return constrain(i - 1, 0, colors.length - 1);
		}
class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

class Rectangle{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    contains(point){
        return(point.x>=this.x-this.w && point.x<=this.x+this.w && point.y>=this.y-this.h && point.y<=this.y+this.h);
    }
}

class QuadTree{
 constructor(boundary, n){
        this.boundary=boundary;
        this.capacity=n;
        this.points=[];
        this.divided=false;
			
			
			
			  this.color = chooseColor();
    }
    subdivide(){
        let x= this.boundary.x;
        let y= this.boundary.y;
        let w= this.boundary.w;
        let h= this.boundary.h;

        let ne = new Rectangle(x+w/2, y-h/2, w/2, h/2);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x-w/2, y-h/2, w/2, h/2);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x+w/2, y+h/2, w/2, h/2);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x-w/2, y+h/2, w/2, h/2);
        this.southwest = new QuadTree(sw, this.capacity);
    
        this.divided=true;
 
    }
    insert(point){
        if (!this.boundary.contains(point)){
            return false;
        }
        
        if (this.points.length<this.capacity){
            this.points.push(point);
            return true;
        }else{
            if(!this.divided){
                this.subdivide();
            }
            
            if(this.northeast.insert(point)){
                return true;
            }
            else if(this.northwest.insert(point)){
                return true;
            }
            else if(this.southeast.insert(point)){
                return true;
            }
            else if(this.southwest.insert(point)){
                return true;
            }
        }
    }
     show(){
        stroke(0);
        strokeWeight(thickness);
			  rectMode(CENTER);
			
				var color = this.color;
				fill(colors[color][0], colors[color][1], colors[color][2]);

        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
        if(this.divided){
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
    }
  }
