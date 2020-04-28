const Game = function() {
  
  let width;
  let height;
  const cubes = [];
  const colors = ["red", "blue", "pink", "purple", "green", "yellow"];
  let points = 0;
  const gameBoard = document.getElementById("gameBoard");

  let swapCube1 = null;
  let swapCube2 = null;

  this.initBoard = (_width=5, _height=5) => {
    width = _width;
    height = _height;
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const cube = {
          row: i,
          column: j,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        row.push(cube);
      }
      cubes.push(row);
    }
    console.log(cubes);
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
            swapCube1 = cube;
          } else if (swapCube2 == null) {
            swapCube2 = cube;
          }

          if (swapCube1 && swapCube2) {
            this.swap(swapCube1, swapCube2);
            swapCube1 = null;
            swapCube2 = null;
          }
        });
      });
      gameBoard.appendChild(rowDom);
    });
  };

  this.getMatchedCubes = () => {
    return [];
  };

  this.reoorgCubes = matchedBlocks => {};

  this.swap = (cube1, cube2) => {
    cubes[cube2.row][cube2.column] = cube1;
    cubes[cube1.row][cube1.column] = cube2;
    const tempCoords = [cube1.row, cube1.column];
    cube1.row = cube2.row;
    cube1.columnn = cube2.column;
    cube2.row = tempCoords[0];
    cube2.column = tempCoords[1];

    this.render();
    while (true) {
      const matchedCubes = this.getMatchedCubes();
      if (matchedCubes.length === 0) break;

      points += matchedCubes.length;

      this.reoorgCubes(matchedCubes);
    }
  };
};

const game = new Game();

const form = document.getElementById('form');
const init = () => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let width = this.querySelector('[name="width"]').value;
    let height = this.querySelector('[name="height"]').value;
    console.log(width, height);
    game.initBoard(width, height);
    game.render();
  });
};

game.initBoard();
game.render();
init();
