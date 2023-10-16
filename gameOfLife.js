var rows = 38;
var cols = 100;

var grid = new Array(rows);
var tempGrid = new Array(rows);

var playing = false;

var timer;
var reproductionTime = 100;

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

    if(!playing){ // if the game is not playing
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
    else if(playing){ 
        this.onclick = null; // if the game is playing, disable the onclick event
    }
}

function updateView(){
    console.log("updateView");
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

function setupControlButtons(){
    var startButton = document.getElementById("start"); // get the start button
    startButton.onclick = startButtonHandler; // when the start button is clicked, call the startButtonHandler function

    var clearButton = document.getElementById("clear"); // get the clear button
    clearButton.onclick = clearButtonHandler; // when the clear button is clicked, call the clearButtonHandler function

    var randomButton = document.getElementById("random"); // get the random button
    randomButton.onclick = randomButtonHandler; // when the random button is clicked, call the randomButtonHandler function
}

function randomButtonHandler(){
    if (playing){
        return; // if the game is playing, return
    }
    clearButtonHandler(); // clear the grid

    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            var cellStatus = Math.round(Math.random()); // generate a random number between 0 and 1
            if(cellStatus ==1){
                var cell = document.getElementById(i +"_"+ j); // get the cell with the id of the row and column number
                cell.setAttribute("class", "live"); // set the class of the cell to live
                grid[i][j] = 1; // set the value of the cell in the grid to 1
            }
        }
    }
}

function clearButtonHandler(){
    console.log("Clearing Game");
    playing = false; // set playing to false
    var startButton = document.getElementById("start"); // get the start button
    startButton.innerHTML = "Start"; // set the text of the start button to "Start"
    clearTimeout(timer); // clear the timer

    var cellList = document.getElementsByClassName("live"); // get all the cells with the class of live
    // convert the cellList to an array
    var liveCells = [];
    for(var i = 0; i < cellList.length; i++){
            liveCells.push(cellList[i]); // add the cell to the array
    }

    // loop through the array of live cells and set the class of each cell to dead
    for(var i = 0; i < liveCells.length; i++){
            liveCells[i].setAttribute("class", "dead"); // set the class of the cell to dead
    }

    resetGrids; // reset the grids
}

function startButtonHandler(){
    if (playing){
        playing = false; // set playing to false
        this.innerHTML = "Continue"; // set the text of the start button to "Continue"
        clearTimeout(timer); // clear the timer
     
    }
    else{
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}


function play(){
    console.log("Playing the game");
    computeNextGen(); // compute the next generation of cells
    if(playing){
        timer = setTimeout(play, reproductionTime); // set the timer to call the play function every reproductionTime milliseconds
    }
}

function computeNextGen(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            applyRules(i, j);
        }
    }

    copyAndResetGrid(); // copy the tempGrid to the grid
    updateView(); // update the view
}

/**
    Rules: 
    1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
    2. Any live cell with two or three live neighbors lives on to the next generation. 
    3. Any live cell with more than three live neighbors dies, as if by overpopulation
    4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
*/
function applyRules(row, col){

    var liveNeighbors = countNeighbors(row, col); // count the number of live neighbors
    var cell = grid[row][col]; // get the value of the cell in the grid
    
    if(cell == 1){ // if the cell is alive
        if(liveNeighbors < 2){
            tempGrid[row][col] = 0; // set the value of the cell in the tempGrid to 0
        }
        else if(liveNeighbors == 2 || liveNeighbors == 3){
            tempGrid[row][col] = 1; // set the value of the cell in the tempGrid to 1
        }
        else if(liveNeighbors > 3){
            tempGrid[row][col] = 0; // set the value of the cell in the tempGrid to 0
        }
    }
    else if(cell == 0){ // if the cell is dead
        if(liveNeighbors == 3){
            tempGrid[row][col] = 1; // set the value of the cell in the tempGrid to 1
        }
    }
}

// count the number of live neighbors for a given cell
function countNeighbors(row, col){
    var count = 0; 

    // check the cell to the left
    if(col - 1 >= 0){
        if(grid[row][col-1] == 1){
            count++;
        }
    }

    // check the cell to the right
    if (col + 1 < cols){
        if(grid[row][col+1] == 1){
            count++;
        }
    }

    // check the cell above
    if (row - 1 >= 0){
        if(grid[row-1][col] == 1){
            count++;
        }
    }

    // check the cell below 
    if (row + 1 < row){
        if(grid[row+1][col] == 1){
            count++;
        }
    }

    // check the cell to the upper left
    if (row - 1 >= 0 && col - 1 >= 0){
        if(grid[row-1][col-1] == 1){
            count++;
        }
    }

    // check the cell to the upper right
    if (row - 1 >= 0 && col + 1 < cols){
        if(grid[row-1][col+1] == 1){
            count++;
        }
    }

    // check the cell to the lower left
    if(row + 1 < rows && col - 1 >= 0){
        if(grid[row+1][col-1] == 1){
            count++;
        }
    }

    // check the cell to the lower right
    if(row + 1 < rows && col + 1 < cols){
        if(grid[row+1][col+1] == 1){
            count++;
        }
    }

    return count;
}

window.onload = initGame; // when the window loads, call the initGame function