//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquetejogador
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variaveis da raqueteoponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//colisao entre bolinha e raquete
let colisao = false;

//placar do jogo
let pontosJogador = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaqueteJogador();
  //colisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
 xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha; 
} 

function colisaoBorda() {
 if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
      }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  } 
}

function mostraRaquete(x,y) {
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaRaqueteJogador() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function colisaoRaquete() {
  if (xBolinha - raio < xRaquete + larguraRaquete &&
      yBolinha - raio < yRaquete + alturaRaquete && 
      yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colisao =
    collideRectCircle ( x ,  y ,  larguraRaquete ,  alturaRaquete ,  xBolinha ,  yBolinha ,  raio ) ;
  if(colisao) {
    velocidadeXBolinha *= -1; 
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete /2 - 40;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosJogador, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    pontosJogador += 1;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}
