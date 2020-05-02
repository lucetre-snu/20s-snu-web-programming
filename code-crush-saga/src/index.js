const Game = function() {
  
  let width;
  let height;
  let numColors;
  let cubes = [];
  const colors = ["red", "lime", "cyan", "magenta", "yellow", "dodgerblue", "dimgray", "indianred"];
  let points = 0;
  const gameBoard = document.getElementById("gameBoard");
  const textlog = document.getElementById("textlog");
  const scoreDom = document.getElementById("score");

  let swapCube1 = null;
  let swapCube2 = null;

  this.printLog = (logContent, concatenate=true) => {
    if (concatenate)
      textlog.innerText += logContent + '\n';
    else
      textlog.innerText = logContent + '\n';
  }

  this.printScore = () => {
    scoreDom.textContent = points;
  }

  this.isCubeAdjacent = (cube1, cube2) => {
    const distance = Math.abs(cube1.row - cube2.row) + Math.abs(cube1.column - cube2.column);
    return distance === 1;
  }

  this.initBoard = (_height=6, _width=6, _numColors=5) => {
    cubes = [];
    width = _width;
    height = _height;
    numColors = _numColors;
    points = 0;
    this.printScore();
    
    this.printLog('Welcome to Code Crush Saga!', false);
    console.log(`Width(${width}), Height(${height}), Colors(${numColors})`);

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const cube = {
          row: i,
          column: j,
          color: colors[Math.floor(Math.random() * numColors)]
        };
        row.push(cube);
      }
      cubes.push(row);
    }
  };

  this.render = () => {
    gameBoard.innerHTML = "";
    cubes.forEach(row => {
      const rowDom = document.createElement("div");
      rowDom.className = "cube-row";
      row.forEach(cube => {
        const cubeDom = document.createElement("div");
        cubeDom.className = `cube ${cube.color}`;
        rowDom.appendChild(cubeDom);

        cubeDom.addEventListener("click", e => {
          if (swapCube1 == null) {
            cubeDom.setAttribute('selected', true);
            this.printLog('Select 1st cube (' + cube.row + ', ' + cube.column + ')', false);
            swapCube1 = {cube, cubeDom};
          } else if (swapCube2 == null) {
            cubeDom.setAttribute('selected', true);
            this.printLog('Select 2nd cube (' + cube.row + ', ' + cube.column + ')');
            swapCube2 = {cube, cubeDom};
          }

          if (swapCube1 && swapCube2) {
            swapCube1.cubeDom.setAttribute('selected', false);
            swapCube2.cubeDom.setAttribute('selected', false);
            if (this.isCubeAdjacent(swapCube1.cube, swapCube2.cube)) {
              this.swap(swapCube1.cube, swapCube2.cube);
            }
            else
              this.printLog('These cubes are not adjacent.');
            swapCube1 = null;
            swapCube2 = null;
          }
        });
      });
      gameBoard.appendChild(rowDom);
    });
  };

  this.getMatchedCubes = () => {
    matchedCubes = [];

    verticalMatch = new Array(height);
    for (let i = 0; i < height; i++) {
      verticalMatch[i] = new Array(width);

      verticalMatch[i][0] = 1;
      for (let j = 1; j < width; j++)
          verticalMatch[i][j] = cubes[i][j].color === cubes[i][j-1].color ?
                                verticalMatch[i][j-1] + 1 : 1;

      verticalMatch[i][width-1] = verticalMatch[i][width-1] >= 3;
      for (let j = width-2; j >= 0; j--) {
        verticalMatch[i][j] = verticalMatch[i][j] >= 3;
        if (cubes[i][j].color === cubes[i][j+1].color)
          verticalMatch[i][j] = verticalMatch[i][j+1];
      }
    }

    horizontalMatch = new Array(width);
    for (let j = 0; j < width; j++) {
      horizontalMatch[j] = new Array(height);
      
      horizontalMatch[j][0] = 1;
      for (let i = 1; i < height; i++)
        horizontalMatch[j][i] = cubes[i][j].color === cubes[i-1][j].color ?
          horizontalMatch[j][i-1] + 1 : 1;

      horizontalMatch[j][height-1] = horizontalMatch[j][height-1] >= 3;
      for (let i = height-2; i >= 0; i--) {
        horizontalMatch[j][i] = horizontalMatch[j][i] >= 3;
        if (cubes[i][j].color === cubes[i+1][j].color)
          horizontalMatch[j][i] = horizontalMatch[j][i+1];
      }
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (verticalMatch[i][j] || horizontalMatch[j][i]) {
          matchedCubes.push(cubes[i][j]);
        }
      }
    }
    return matchedCubes;
  };

  this.removeCubes = () => {
    setTimeout(() => {
      let flag = true;
      for (let i = 0; i < height; i++)
        for (let j = 0; j < width; j++)
          if (cubes[i][j].color === 'white')
            flag = false;
      if (flag) {    
        this.handle3Match();
        return;
      }

      for (let j = 0; j < width; j++) {
        let i = height-1;
        for (; i >= 0; i--) {
          if (cubes[i][j].color === 'white') {
            break;
          }
        }
        if (i < 0) continue;
        for (; i > 0; i--) {
          cubes[i][j].color = cubes[i-1][j].color;
        }
        cubes[0][j].color = colors[Math.floor(Math.random() * numColors)];
      }
      this.render();
      this.removeCubes();
    }, 400);
  }

  this.reorgCubes = matchedCubes => {
    for (let i = 0; i < matchedCubes.length; i++) {
      let row = matchedCubes[i].row;
      let col = matchedCubes[i].column;
      cubes[row][col].color = 'white';
    }
    this.render();
    this.removeCubes();
  };

  this.handle3Match = () => {
    const matchedCubes = this.getMatchedCubes();
    if (matchedCubes.length === 0) return;
    points += matchedCubes.length;
    this.printScore();
    this.reorgCubes(matchedCubes);
  };

  this.swap = (cube1, cube2) => {
    let temp = cube1.color;
    cube1.color = cube2.color;
    cube2.color = temp;

    if (! this.getMatchedCubes().length) {
      temp = cube1.color;
      cube1.color = cube2.color;
      cube2.color = temp;

      this.printLog('Swap cannot be done.');
      return;
    }

    this.printLog('Reorganizing Cubes...');
    this.render();
    this.handle3Match();
    this.printLog('Swap completed.');
  };
};

const game = new Game();

const form = document.getElementById('form');
const init = () => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let height = this.querySelector('[name="height"]').value;
    let width = this.querySelector('[name="width"]').value;
    let num_colors = this.querySelector('[name="colors"]').value;
    height = height ? parseInt(height) : 6;
    width = width ? parseInt(width) : 6;
    num_colors = parseInt(num_colors) ? num_colors : 5;
    game.initBoard(height, width, num_colors);
    game.render();
    setTimeout(game.handle3Match, 500);
  });
};

game.initBoard();
game.render();
setTimeout(game.handle3Match, 500);
init();
