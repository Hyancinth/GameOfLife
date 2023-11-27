// count the number of live neighbors for a given cell
// function countNeighbors(row, col){
//     var count = 0; 

//     // check the cell to the left
//     if(col - 1 >= 0){
//         if(grid[row][col-1] == 1){
//             count++;
//         }
//     }

//     // check the cell to the right
//     if (col + 1 < cols){
//         if(grid[row][col+1] == 1){
//             count++;
//         }
//     }

//     // check the cell above
//     if (row - 1 >= 0){
//         if(grid[row-1][col] == 1){
//             count++;
//         }
//     }

//     // check the cell below 
//     if (row + 1 < row){
//         if(grid[row+1][col] == 1){
//             count++;
//         }
//     }

//     // check the cell to the upper left
//     if (row - 1 >= 0 && col - 1 >= 0){
//         if(grid[row-1][col-1] == 1){
//             count++;
//         }
//     }

//     // check the cell to the upper right
//     if (row - 1 >= 0 && col + 1 < cols){
//         if(grid[row-1][col+1] == 1){
//             count++;
//         }
//     }

//     // check the cell to the lower left
//     if(row + 1 < rows && col - 1 >= 0){
//         if(grid[row+1][col-1] == 1){
//             count++;
//         }
//     }

//     // check the cell to the lower right
//     if(row + 1 < rows && col + 1 < cols){
//         if(grid[row+1][col+1] == 1){
//             count++;
//         }
//     }

//     return count;
// }