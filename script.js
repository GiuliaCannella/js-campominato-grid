/*
    DESCRIZIONE DEL GIOCO
    Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe. 
    Attenzione: nella stessa cella può essere posizionata al massimo una bomba, 
    perciò nell'array delle bombe non potranno esserci due numeri uguali In seguito l'utente clicca su una cella: 
    se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. 
    La cella si colora di rosso e la partita termina. 
    Altrimenti, la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. 
    LA partita termina quando il giocatore clicca su una bomba o quando raggiunger il numero massimo possibile 
    di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe). 
    Al termine della partita, il software deve comunicare il punteggio, 
    cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba

    MILESTONE 1
    Prepariamo "Qualcosa" per tenere il punteggio dell'utente. Quando l'utente clicca su una cella, 
    incrementiamo il punteggio. Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella

    MILESTONE 2
    Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili. 
    Generiamoli e stampiamo in console per essere certi che siano corretti

    MILESTONE 3
    Quando l'utente clicca su una cella, verrifichiamo se ha calpestato una bomba, 
    controllando se il numero di cella è presente nell'array di bombe. 
    Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) 
    altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

    MILESTONE 4
    Quando l'utente clicca su una cella, e questa non è una bomba, 
    dobbiamo controllare se il punteggio incrementato ha raggiunto l punteggio massimo,
    perchè in quel caso la partita termina. Raccogliamo quindi il messaggio e scriviamo un messaggio appropriato.

    MILESTONE 5
    Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se
    perchè l'utente ha raggiunto il punteggio massimo(ossia ha vinto). 
    Dobbiamo poi in ogni caso stampare lin pagina il punteggio raggiunto ed il messaggio 
    adeguato in caso di vittoria o sconfitta.

    BONUS
    Aggiungere una select accanto al bottone di generazione, 
    che fornisca una scelta tra tre diversi livelli di difficoltà (come le istruzioni di ieri se non già fatto)

    SUPERBONUS
    Colorare tutte le celle bomba quando la partita finisce

*/

const myModal = new bootstrap.Modal(document.getElementById('messageModal'), {})
// recupero elementi dal DOM
let grid = document.getElementById("grid");
let button = document.getElementById("button");
let levelSelect = document.getElementById("select-level");
let scorePlaceholder = document.getElementById("score");
let message = document.getElementById("message");
let btnRestart = document.getElementById("btn-restart");

// funzione che contine la logica del gioco
const startGame = () => {
  console.log("START GAME");

  // recupero il livello scelto
  let level = levelSelect.value;

  // calcolo delle celle totali
  let rows;
  let cols;

  switch (level) {
    case "hard":
      rows = 7;
      cols = 7;
      break;
    case "normal":
      rows = 9;
      cols = 9;
      break;
    case "easy":
    default:
      rows = 10;
      cols = 10;
      break;
  }
  return rows * cols;
};

let totaleCelle = startGame();

// preparo il punteggio
let score = 0;

// setto il numero delle bombe
const totalBombs = 16;
// preparo il punteggio massimo
const maxPoints = totaleCelle - totalBombs;

// preparo un contenitore per le bombe
const bombs = generateBombs(totalBombs, totaleCelle);

console.log("BOMBS", bombs.sort( function( a , b){
  if(a > b) return 1;
  if(a < b) return -1;
  return 0;
}));

// funzione per generare le bombe

function generateBombs(numberOfBombs, maxNumber) {
  console.log("generateBombs");
  let bombs = [];

  while (bombs.length < numberOfBombs) {
    let randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    if (!bombs.includes(randomNumber)) {
      bombs.push(randomNumber);
    }
  }

  return bombs;
}

// funzione per creare una cella
function createCell(cellNumber, level) {
  console.log("createCell");
  const cell = document.createElement("div");
  // cell.className = "cell";
  if (bombs.includes(cellNumber)) {
    cell.classList.add("bomb");
  }

  cell.classList.add("cell");
  cell.classList.add(`cell-${level}`);
  cell.innerText = cellNumber;
  return cell;
}

const onCellClick = (event) => {
  console.log("onCellClick");
  event.preventDefault();
  const cell = event.target;
  // controllo se era gia stata cliccata

  if (score == maxPoints) {
    message.innerHTML = `
      <p class="text-danger">HAI VINTO!</p>
      <p>Totale punteggio: ${score}</p>
    `
    myModal.show();
    showAllBombs();
    return;
  }

  if (!cell.classList.contains("bomb")) {
    if (!cell.classList.contains("clicked")) {
      console.log("clicked");
      // incremento il punteggio
      scorePlaceholder.innerText = ++score;
      // funzione che gestisce il click sulla cella
      cell.classList.add("clicked");
    }
  } else {
    cell.classList.add('show-bomb');
    message.innerHTML = `
      <p class="text-danger">HAI PERSO!</p>
      <p>Totale punteggio: ${score}</p>
    `
    myModal.show();
    showAllBombs();
  }

  
};


function showAllBombs() {
  const cells = document.querySelectorAll('.cell');

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      
      if (cell.classList.contains('bomb')) {
        cell.classList.add('show-bomb');
      } else {
        cell.classList.add('clicked');
      }
    }
}

function createGrid() {
  console.log("createGrid");
  score = 0;
  scorePlaceholder.innerText = score;
  button.innerText = "Rigioca";
  grid.innerHTML = "";
  let level = levelSelect.value;
  const totaleCelle = startGame();
  // formiamo le celle con la griglia
  for (let i = 1; i <= totaleCelle; i++) {
    const cell = createCell(i, level);
    cell.addEventListener("click", onCellClick);
    grid.append(cell);
  }
}

//aggancio il btn alla funzione
button.addEventListener("click", function (e) {
  e.preventDefault();
  createGrid();
});
