var rows = 38;
var cols = 100;

var grid = new Array(rows);
var tempGrid = new Array(rows);

function initGrids(){
    for (var i = 0; i < rows; i++){
        grid[i] = new Array(cols); // in each row of the grid, create a new array of columns
        tempGrid[i] = new Array(cols);
    }
}

function resetGrids(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            grid[i][j] = 0;
            tempGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            grid[i][j] = tempGrid[i][j];
            tempGrid[i][j] = 0;
        }
    }
}

function initGame(){
    createTable();
    initGrids();
    resetGrids();
    setupControlButtons();
}

function createTable(){
    var gridContainer = document.getElementById("gridContainer");
    if(!gridContainer){
        console.error("Error: no div for the grid table");
    }
    var table = document.createElement("table");
    for(var i = 0; i < rows; i++){
        var tr = document.createElement("tr"); // create a row in the table
        for(var j = 0; j < cols; j++){
            var cell = document.createElement("td"); // create a cell in the row
            cell.setAttribute("id", i + "_" + j); // set the id of the cell to the row and column number
            cell.setAttribute("class", "dead"); // set the class of the cell to dead, this is for style purpos
            cell.onclick = cellClickHandler; // when the cell is clicked, call the cellClickHandler function
            tr.appendChild(cell); // add the cell to the row
        }
        table.appendChild(tr); // add the row to the table
    }
    gridContainer.appendChild(table); // add the table to the gridContainer
}

function cellClickHandler(){
    var rowcol = this.id.split("_"); // split the id of the cell into an array of the row and column number
    var row = rowcol[0]; // get the row number
    var col = rowcol[1]; // get the column number

    var cellClass = this.getAttribute("class"); // get the class of the cell

    if(cellClass.indexOf("live") > -1){ // if the cell is live (check if the string "live" is present)
        // if the cell is live, set the class to dead
        this.setAttribute("class", "dead"); // set the class of the cell to dead
        grid[row][col] = 0; // set the value of the cell in the grid to 0
    }
    else{
        this.setAttribute("class", "live"); // set the class of the cell to live
        grid[row][col] = 1; // set the value of the cell in the grid to 1
    }
}

function updateView(){
    for (var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            var cell = document.getElementById(i + "_" + j); // get the cell with the id of the row and column number
            if(grid[i][j] == 0){ // if the value of the cell in the grid is 0
                cell.setAttribute("class", "dead"); // set the class of the cell to dead
            }
            else{
                cell.setAttribute("class", "live"); // set the class of the cell to live
            }
        }
    }
}

window.onload = initGame; // when the window loads, call the initGame function