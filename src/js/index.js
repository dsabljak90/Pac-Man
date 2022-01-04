"use strict";
const container = document.querySelector("#app");
const pacman = document.querySelector("#pacman");

let xpos = 0;
let ypos = 0;

// xpos and ypos are coordinates where is a pacman.
let points = 0; //Counts current points (eaten apples)
//
let game = true;

let scoreDiv = document.createElement("div");
document.querySelector("#app").append(scoreDiv);
scoreDiv.innerHTML = `<h1> Points :${points}</h1>`;

pacman.style.left = xpos + "px";
pacman.style.top = ypos + "px";

let decision = 0; //This variable with function close opens and closes pacman mouth.

const close = () => {
  if (game) {
    if (decision === 0) {
      pacman.classList.remove("entity--pac");
      pacman.classList.add("entity--pac--closed");
      decision = 1;
    } else if (decision === 1) {
      pacman.classList.remove("entity--pac--closed");
      pacman.classList.add("entity--pac");
      decision = 0;
    }
  }
};
document.addEventListener("keydown", close);

document.addEventListener("keydown", (event) => {
  if (game) {
    if (event.code === "ArrowRight" && xpos <= 850) {
      const newPosition = xpos + 85;
      const isMatch = collision(newPosition, ypos); // collision defined walls. If isMatch is true the functions returnees and stops executing.
      if (isMatch) return;
      xpos += 85;
      pacman.classList.add("entity--pac--right");
      pacman.classList.remove("entity--pac--left");
      pacman.classList.remove("entity--pac--up");
      pacman.classList.remove("entity--pac--down");
      movement(); // Function witch assigned new coordinates on pacman element (move it right)
      const isApple = eatenApple(newPosition, ypos); // This calls the function witch checks is it pacman on apple property (if is add one point).If is eatenApple returns isApple as a true and code bellow is executed.
      if (isApple) {
        points++;

        scoreDiv.innerHTML = `<h1>Points :${points}</h1>`;
        createNewElement(newPosition, ypos);
        if (points === 8) {
          // If total points are === games ends by setting game variable as false.
          game = false;
          gameOver(`Victory`);
        }
      }
      const isBomb = bombActivated(newPosition, ypos); //This calls the function witch checks is it pacman on bomb property (if is add one point).If is bombActivated returns isBomb as a true and code bellow is executed (game is over).
      if (isBomb) {
        pacman.classList.add("entity--tomb");
        pacman.classList.remove("pacboy-active-light");
      }
    }
  }

  if (game) {
    if (event.code === "ArrowLeft" && xpos >= 85) {
      const newPosition = xpos - 85;
      const isMatch = collision(newPosition, ypos); // collision defined walls. If isMatch is true the functions returnees and stops executing.
      if (isMatch) return;
      xpos -= 85;
      pacman.classList.add("entity--pac--left");
      pacman.classList.remove("entity--pac--right");
      pacman.classList.remove("entity--pac--up");
      pacman.classList.remove("entity--pac--down");
      movement(); // Function witch assigned new coordinates on pacman element (move it left)
      const isApple = eatenApple(newPosition, ypos); // This calls the function witch checks is it pacman on apple property (if is add one point).If is eatenApple returns isApple as a true and code bellow is executed.
      if (isApple) {
        points++;

        scoreDiv.innerHTML = `<h1>Points :${points}</h1>`;
        createNewElement(newPosition, ypos);
        if (points === 8) {
          // If total points are === games ends by setting game variable as false.
          game = false;
          gameOver(`Victory`);
        }
      }
      const isBomb = bombActivated(newPosition, ypos); //This calls the function witch checks is it pacman on bomb property (if is add one point).If is bombActivated returns isBomb as a true and code bellow is executed (game is over).
      if (isBomb) {
        pacman.classList.add("entity--tomb");
        pacman.classList.remove("pacboy-active-light");
      }
    }
  }
});
const movement = () => {
  {
    pacman.style.left = xpos + "px";
  } // this moves packman on the screen left or right 85 px it is called int he function above.
};
document.addEventListener("keydown", (event) => {
  if (game) {
    if (event.code === "ArrowUp" && ypos >= 85) {
      const newPosition = ypos - 85;
      const isMatch = collision(xpos, newPosition); // collision defined walls. If isMatch is true the functions returnees and stops executing.
      if (isMatch) return;
      ypos -= 85;
      pacman.classList.add("entity--pac--up");
      pacman.classList.remove("entity--pac--down");
      pacman.classList.remove("entity--pac--left");
      pacman.classList.remove("entity--pac--right");

      movementUp(); //Function witch assigned new coordinates on pacman element (move it up)
      const isApple = eatenApple(xpos, newPosition); // This calls the function witch checks is it pacman on apple property (if is add one point).If is eatenApple returns isApple as a true and code bellow is executed.
      if (isApple) {
        points++;

        scoreDiv.innerHTML = `<h1>Points :${points}</h1>`;
        createNewElement(xpos, newPosition);
        if (points === 8) {
          // If total points are === games ends by setting game variable as false.
          game = false;
          gameOver(`Victory`);
        }
      }
      const isBomb = bombActivated(xpos, newPosition); //This calls the function witch checks is it pacman on bomb property (if is add one point).If is bombActivated returns isBomb as a true and code bellow is executed (game is over).
      if (isBomb) {
        pacman.classList.add("entity--tomb");
        pacman.classList.remove("pacboy-active-light");
        pacman.classList.remove("entity--pac--up");
      }
    }
  }
  if (game) {
    if (event.code === "ArrowDown" && ypos <= 340) {
      const newPosition = ypos + 85;
      const isMatch = collision(xpos, newPosition); // collision defined walls. If isMatch is true the functions returnees and stops executing.
      if (isMatch) return;
      ypos += 85;
      pacman.classList.add("entity--pac--down");
      pacman.classList.remove("entity--pac--up");
      pacman.classList.remove("entity--pac--left");
      pacman.classList.remove("entity--pac--right");
      movementUp(); //Function witch assigned new coordinates on pacman element (move it down)
      const isApple = eatenApple(xpos, newPosition); // This calls the function witch checks is it pacman on apple property (if is add one point).If is eatenApple returns isApple as a true and code bellow is executed.
      if (isApple) {
        points++;
        scoreDiv.innerHTML = `<h1>Points :${points}</h1>`;
        createNewElement(xpos, newPosition);
        if (points === 8) {
          // If total points are === games ends by setting game variable as false.
          game = false;
          gameOver(`Victory`);
        }
      }
      const isBomb = bombActivated(xpos, newPosition); //This calls the function witch checks is it pacman on bomb property (if is add one point).If is bombActivated returns isBomb as a true and code bellow is executed (game is over).
      if (isBomb) {
        pacman.classList.add("entity--tomb");
        pacman.classList.remove("pacboy-active-light");
      }
    }
  }
});
const movementUp = () => {
  pacman.style.top = ypos + "px"; // this moves packman on the screen up or down 85 px it is called int he function above.
};

// Classes for rendering the objects.

class Entity {
  constructor(y, x, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = `entity entity--${this.type}`;
  }
  mount() {
    this.render();
    this.update();
    return this.element;
  }
  update() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    console.log();
  }
}

const briks = [
  new Entity(85, 85, "wall"),
  new Entity(0, 255, "wall"),
  new Entity(85, 170, "wall"),
  new Entity(85, 255, "wall"),
  new Entity(85, 340, "wall"),
  new Entity(170, 255, "wall"),
  new Entity(255, 255, "wall"),
  new Entity(255, 85, "wall"),
  new Entity(255, 595, "wall"),
  new Entity(255, 680, "wall"),
  new Entity(0, 850, "wall"),
  new Entity(85, 850, "wall"),
  new Entity(170, 850, "wall"),
  new Entity(170, 935, "wall"),
  new Entity(340, 0, "wall"),
  new Entity(340, 85, "wall"),
  new Entity(340, 595, "wall"),
  new Entity(425, 595, "wall"),
];

briks.forEach((brick) => {
  document.querySelector(".stage").appendChild(brick.mount());
}); // displays walls

const collision = (x, y) => {
  // checks is the pacman going in wall if yes returnees true. The function is called in eventListener above.
  const isMatch = briks.filter((element) => {
    if (element.x === x && element.y === y) {
      if (element.type === "wall") {
        return true;
      } else {
        return false;
      }
    }
  });

  return !!isMatch[0];
};
// the !! returns a true or false not type of value.

class Entitytwo {
  constructor(y, x, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = `entity entity--${this.type}`;
  }

  mount() {
    this.render();
    this.update();
    return this.element;
  }
  update() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }
}

const apples = [
  new Entitytwo(0, 85, "apple"),
  new Entitytwo(0, 425, "apple"),
  new Entitytwo(340, 425, "apple"),
  new Entitytwo(85, 765, "apple"),
  new Entitytwo(340, 850, "apple"),
  new Entitytwo(170, 170, "apple"),
  new Entitytwo(425, 340, "apple"),
  new Entitytwo(255, 765, "apple"),
];

const applesClass = function () {
  apples.forEach((apple) => {
    document.querySelector(".stage").appendChild(apple.mount());
  }); // displays appels
};

applesClass();

const eatenApple = (x, y) => {
  // checks is the pacman on the apple if yes returnees true. The function is called in eventListener above.
  const isApple = apples.filter((element) => {
    if (element.x === x && element.y === y) {
      if (element.type === "apple") {
        element.type = 0;
        return true;
      } else {
        return false;
      }
    }
  });

  return !!isApple[0];
};

class Entitythree {
  constructor(y, x, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  render() {
    if (this.type === "bomb") {
      this.element = document.createElement("div");
      this.element.className = `entity entity--${this.type}`;
    } else {
      this.element.classList.remove("entity--bomb");
    }
  }
  mount() {
    this.render();
    this.update();
    return this.element;
  }
  update() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    console.log();
  }
}

const bombs = [
  new Entitythree(85, 425, "bomb"),
  new Entitythree(255, 340, "bomb"),
  new Entitythree(255, 935, "bomb"),
  new Entitythree(425, 85, "bomb"),
  new Entitythree(340, 510, "bomb"),
];

const bombFunc = function () {
  bombs.forEach((brick) => {
    document.querySelector(".stage").appendChild(brick.mount());
  }); // displays bombs
};
bombFunc();
const bombActivated = (x, y) => {
  // checks is the pacman on the apple if yes returnees true (ends game). The function is called in eventListener above.
  const isBomb = bombs.filter((element) => {
    if (element.x === x && element.y === y) {
      if (element.type === "bomb") {
        element.type = 0;
        bombFunc();

        game = false;
        gameOver(`Game Over`);
        return true;
      } else {
        return false;
      }
    }
  });
  return !!isBomb[0];
};

const createNewElement = function (x, y) {
  let newPic = document.createElement("div");
  document.querySelector(".stage").append(newPic);
  newPic.className = "empty";
  newPic.style.left = x + "px";
  newPic.style.top = y + "px";
}; // making an element witch covers apple after the pacman is on the apple.

const gameOver = function (title) {
  let gameEnd = document.createElement("div");
  let newGame = document.createElement("button");
  document.querySelector("#app").append(gameEnd);
  document.querySelector("#app").append(newGame);
  gameEnd.classList.add("game-over");
  newGame.classList.add("new-game-button");
  gameEnd.innerHTML = `${title}`;
  newGame.innerHTML = `New Game`;
  newGame.addEventListener("click", function () {
    location.reload();
  });
}; // Ends the game and displays the game over or victory, also a button for starting a new game. The function is called in eventListeners and bombActivated function.
