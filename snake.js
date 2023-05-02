const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10;
const WIDTH = canvas.width / CELL_SIZE;
const HEIGHT = canvas.height / CELL_SIZE;

let snake = [{ x: WIDTH / 2, y: HEIGHT / 2 }];
let direction = "right";
let food = randomCell();

function randomCell() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function drawCell(cell, color) {
  ctx.fillStyle = color;
  ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnake() {
  snake.forEach((cell, index) => {
    drawCell(cell, index === 0 ? "green" : "darkgreen");
  });
}

function drawFood() {
  drawCell(food, "red");
}

function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT) {
    // A cobra bateu nas paredes, jogo acaba!
    return false;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    // A cobra comeu a comida, gerar nova posição da comida
    food = randomCell();
  } else {
    snake.pop();
  }
  return true;
}

function update() {
  if (moveSnake()) {
    // A cobra ainda está se movendo, atualizar o jogo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
  } else {
    // A cobra bateu nas paredes, jogo acaba!
    alert("Fim de Jogo!");
  }
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});

setInterval(update, 100);
