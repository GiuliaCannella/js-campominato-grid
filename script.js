// recupero elementi dal DOM
let grid = document.getElementById("grid");
let button = document.getElementById("button");
let levelSelect = document.getElementById("select-level");
let scorePlaceholder = document.getElementById("score");

// funzione che contine la logica del gioco
const startGame = () => {
  button.innerText = "Rigioca";

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

// preparo il punteggio
let score = 0;

// setto il numero delle bombe
const totalBombs = 16;
// preparo il punteggio massimo
const maxPoints = totaleCelle - totalBombs;

// preparo un contenitore per le bombe
const bombs =[];

// funzione per creare una cella
function createCell(cellNumber, level) {
  const cell = document.createElement("div");
  // cell.className = "cell";
  cell.classList.add("cell");
  cell.classList.add(`cell-${level}`);
  cell.innerText = cellNumber;
  return cell;
}

const onCellClick = (event) => {
  event.preventDefault();
  const cell = event.target;
  // controllo se era gia stata cliccata
  if (!cell.classList.contains("clicked")) {
    console.log('clicked');
    // incremento il punteggio
    scorePlaceholder.innerText = ++score;
    // funzione che gestisce il click sulla cella
    cell.classList.add("clicked");
  }
};

function createGrid() {
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
