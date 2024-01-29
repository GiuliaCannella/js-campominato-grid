// recupero elementi dal DOM
let grid = document.getElementById("grid");
let button = document.getElementById("button");

// funzione per creare una cella
// const createCell = (cellNumber) => {
//   const cell = document.createElement("div");
//   cell.className = "cell";
//   cell.innerText = cellNumber;
//   return cell;
// };

function createCell(cellNumber) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.innerText = cellNumber;
  return cell;
}

// Preparo i dati iniziali
const rigo = 10;
const cols = 10;
const totaleCelle = rigo * cols;

function createGrid() {
    grid.innerHTML = '';
  // formiamo le celle con la griglia
  for (let i = 1; i <= totaleCelle; i++) {
    const cell = createCell(i);

    cell.addEventListener("click", function (event) {
      this.classList.add("clicked");
    });
    grid.append(cell);
  }
}

// clicco sul btn e mi compare la griglia
button.addEventListener("click", function () {
  createGrid();
});
