var isGameInProgress = false;
var whosTurn = "1";

var soldier1shotTimerId;
var soldier2shotTimerId;

var soldier1 = {
  name: 'Soldier1',
  health: 25,
  currentCoordinates: { x: 1, y: 1 },
  shot: function(x, y) {
    console.log("Солдат 1 стреляет по координатам ", x, y);
    if (x === soldier2.currentCoordinates.x && y === soldier2.currentCoordinates.y)
      {
        soldier2.health -= 25;
        console.log("Солдат 1 попадает в цель и наносит ей 25 единиц урона!");
        console.log("У солдата 2 остается ", soldier2.health, " единиц здоровья");
      }
    
    var shotCell = document.getElementsByClassName("cell-" + y + "/" + x)[0];
    shotCell.classList.add("shot");
    setTimeout(() => {
      shotCell.classList.remove("shot");
    }, 200);
  }
};

var soldier2 = {
  name: 'Soldier2',
  health: 25,
  currentCoordinates: { x: 1, y: 1 },
  shot: function(x, y) {
    console.log("Солдат 2 стреляет по координатам ", x, y);
    if (x === soldier1.currentCoordinates.x && y === soldier1.currentCoordinates.y)
      {
        soldier1.health -= 25;
        console.log("Солдат 2 попадает в цель и наносит ей 25 единиц урона!");
        console.log("У солдата 1 остается ", soldier1.health, " единиц здоровья");
      }

    var shotCell = document.getElementsByClassName("cell-" + y + "/" + x)[0];
    shotCell.classList.add("shot");
    setTimeout(() => {
      shotCell.classList.remove("shot");
    }, 200);
  }
};

function setSoldiers() {
  if (!isGameInProgress)
  {
    isGameInProgress = true;

    soldier1.currentCoordinates.x = Math.floor(Math.random() * (11 - 1) + 1);
    soldier1.currentCoordinates.y = Math.floor(Math.random() * (11 - 1) + 1);

    soldier2.currentCoordinates.x = Math.floor(Math.random() * (11 - 1) + 1);
    soldier2.currentCoordinates.y = Math.floor(Math.random() * (11 - 1) + 1);

    while (soldier1.currentCoordinates.x === soldier2.currentCoordinates.x && soldier1.currentCoordinates.y === soldier2.currentCoordinates.y)
    {
      soldier1.currentCoordinates.x = Math.floor(Math.random() * (11 - 1) + 1);
      soldier1.currentCoordinates.y = Math.floor(Math.random() * (11 - 1) + 1);

      soldier2.currentCoordinates.x = Math.floor(Math.random() * (11 - 1) + 1);
      soldier2.currentCoordinates.y = Math.floor(Math.random() * (11 - 1) + 1);
    }
    console.log("Солдат 1 заспавнен на координатах ", soldier1.currentCoordinates);
    console.log("Солдат 2 заспавнен на координатах ", soldier2.currentCoordinates);

    var soldier1_cell = document.getElementsByClassName("cell-" + soldier1.currentCoordinates.y + "/" + soldier1.currentCoordinates.x)[0];
    var soldier2_cell = document.getElementsByClassName("cell-" + soldier2.currentCoordinates.y + "/" + soldier2.currentCoordinates.x)[0];

    soldier1_cell.classList.add("occupedCell", "soldier1Cell");
    soldier2_cell.classList.add("occupedCell", "soldier2Cell");

    soldier1shotTimerId = setInterval(function() {
      if (whosTurn == "1")
      {
        whosTurn = "2";
        var shotX = Math.floor(Math.random() * (11 - 1) + 1);
        var shotY = Math.floor(Math.random() * (11 - 1) + 1);
        while (shotX === soldier1.currentCoordinates.x && shotY === soldier1.currentCoordinates.y)
        {
          shotX = Math.floor(Math.random() * (11 - 1) + 1);
          shotY = Math.floor(Math.random() * (11 - 1) + 1);
        }
        soldier1.shot(shotX, shotY);

        if (soldier2.health <= 0)
          endGame("soldier1");
      }
      }, 300);

    soldier2shotTimerId = setInterval(function() {
      if (whosTurn == "2")
      {
        whosTurn = "1";
        var shotX = Math.floor(Math.random() * (11 - 1) + 1);
        var shotY = Math.floor(Math.random() * (11 - 1) + 1);
        while (shotX === soldier2.currentCoordinates.x && shotY === soldier2.currentCoordinates.y)
        {
          shotX = Math.floor(Math.random() * (11 - 1) + 1);
          shotY = Math.floor(Math.random() * (11 - 1) + 1);
        }
        soldier2.shot(shotX, shotY);

        if (soldier1.health <= 0)
          endGame("soldier2");
      }
      }, 600);
  }
};

function endGame(winner) {
  clearTimeout(soldier1shotTimerId);
  clearTimeout(soldier2shotTimerId);

  if (winner === "soldier1")
    alert("Солдат 1 побеждает!");
  else if (winner === "soldier2")
    alert("Солдат 1 побеждает!");
  else
    alert("Ничья?");
}

function stopGame() {
  clearTimeout(soldier1shotTimerId);
  clearTimeout(soldier2shotTimerId);

  document.getElementsByClassName("soldier1Cell")[0].classList.remove("occupedCell", "soldier1Cell");
  document.getElementsByClassName("soldier2Cell")[0].classList.remove("occupedCell", "soldier2Cell");

  soldier1.health = 100;
  soldier1.currentCoordinates.x = 1;
  soldier1.currentCoordinates.y = 1;

  soldier2.health = 100;
  soldier2.currentCoordinates.x = 1;
  soldier2.currentCoordinates.y = 1;

  isGameInProgress = false;
}