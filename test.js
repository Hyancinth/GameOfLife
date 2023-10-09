var rows = 38;
var cols = 100;

var grid = new Array(rows);
var nextGrid = new Array(rows);

console.log("grid: " + grid);
console.log("nextGrid: " + nextGrid);

conway = document.getElementById("conway").getContext("2d")
width = document.getElementById("conway").width
height = document.getElementById("conway").height

size = 5 // size of each cell

draw = (x, y, colour, size) => {
  conway.fillStyle = colour // colour of cell
  conway.fillRect(x, y, size, size) // x, y, width, height
}

grid = [] // array of cells
tempGrid = [] // array of cells for next generation

