let costas1;
let costas2;
let quieto;
let farra1;
let farra2;
let gameover;
let olhando;
let situacao = "olhando";
let proximaAlteracao = 0;
let giz, grito, perdeu;
let bagunca = false;

function preload() {
  costas1 = loadImage("costas1.jpg");
  costas2 = loadImage("costas2.jpg");
  quieto = loadImage("quieto.jpg");
  farra1 = loadImage("farra1.jpg");
  farra2 = loadImage("farra2.jpg");
  gameover = loadImage("gameover.jpg");
  olhando = loadImage("olhando.jpg");
  giz = loadSound("giz.mp3");
  giz.setLoop(true);
  grito = loadSound("grito.mp3");
  grito.setLoop(true);
  perdeu = loadSound("perdeu.mp3");
}
function setup() {
  createCanvas(1024, 576);
}

function troca(){
  proximaAlteracao = millis() + random(2500, 7000);
  if(situacao === "olhando"){
    situacao = "nao";
    giz.play();
  }else{
    situacao = "olhando"
    giz.pause();
  }
}

function draw() {
  if(millis() > proximaAlteracao){
    troca();
  }
  if (situacao === "olhando") {
    image(olhando, 0, 0);
  } else {
    let tempo = millis() % 1000;
    if (tempo > 500) {
      image(costas1, 0, 0);
    } else {
      image(costas2, 0, 0);
    }
  }
  if (mouseIsPressed || touches.length > 0 || keyIsPressed) {
    if(bagunca === false){
      grito.play();
      bagunca = true;
    }
    if(situacao === "olhando"){
      image(gameover, 0, 0);
    }
    let tempo = millis() % 1200;
    if(tempo > 400){
      image(farra1, 50, 420, 100, 160, 180, 100, 450, 720);
      image(farra1, 150, 420, 100, 160, 180, 100, 450, 720);
      image(farra1, 250, 420, 100, 160, 180, 100, 450, 720);
    }else{
      image(farra2, 50, 420, 100, 160, 180, 100, 450, 720);
      image(farra2, 150, 420, 100, 160, 180, 100, 450, 720);
      image(farra2, 250, 420, 100, 160, 180, 100, 450, 720);
    }
    
    if(situacao === "olhando"){
      textSize(70);
      fill("red");
      textAlign(CENTER, CENTER);
      text("GAME OVER", width /2, height /2);
      grito.stop();
      giz.stop();
      perdeu.play();
      noLoop();
    }
  } else {
    grito.pause();
    bagunca = false;
    image(quieto, 50, 420, 100, 160, 180, 100, 450, 720);
    image(quieto, 150, 420, 100, 160, 180, 100, 450, 720);
    image(quieto, 250, 420, 100, 160, 180, 100, 450, 720);
  }
}