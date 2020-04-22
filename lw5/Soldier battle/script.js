var isGameInProgress = false;
var whosTurn = "1";

var soldier1shotTimerId;
var soldier2shotTimerId;

class Soldier {
  constructor(new_x, new_y, name) {
    this.name = name;
    this.health = 25;
    this.currentCoordinates = { x: new_x, y: new_y };
  }

  Shoot(x, y, enemy) {
    if (x === enemy.currentCoordinates.x && y === enemy.currentCoordinates.y) {
      enemy.TakeDamage(25);
      console.log(this.name + " попадает в цель!");
    }

    var shotCell = document.getElementsByClassName("cell-" + y + "/" + x)[0];
    shotCell.classList.add("shot");
    setTimeout(() => {
      shotCell.classList.remove("shot");
    }, 200);
  }

  TakeDamage(dmg) {
    this.health -= dmg;
    console.log("Солдат " + this.name + " теряет " + dmg + " единиц здоровья!");
  }
}

//#region Old code

// var soldier1 = {
//   name: 'Soldier1',
//   health: 25,
//   currentCoordinates: { x: 1, y: 1 },
//   shot: function(x, y) {
//     console.log("Солдат 1 стреляет по координатам ", x, y);
//     if (x === sld2.currentCoordinates.x && y === sld2.currentCoordinates.y)
//       {
//         sld2.health -= 25;
//         console.log("Солдат 1 попадает в цель и наносит ей 25 единиц урона!");
//         console.log("У солдата 2 остается ", sld2.health, " единиц здоровья");
//       }
    
//     var shotCell = document.getElementsByClassName("cell-" + y + "/" + x)[0];
//     shotCell.classList.add("shot");
//     setTimeout(() => {
//       shotCell.classList.remove("shot");
//     }, 200);
//   }
// };

// var soldier2 = {
//   name: 'Soldier2',
//   health: 25,
//   currentCoordinates: { x: 1, y: 1 },
//   shot: function(x, y) {
//     console.log("Солдат 2 стреляет по координатам ", x, y);
//     if (x === sld1.currentCoordinates.x && y === sld1.currentCoordinates.y)
//       {
//         sld1.health -= 25;
//         console.log("Солдат 2 попадает в цель и наносит ей 25 единиц урона!");
//         console.log("У солдата 1 остается ", sld1.health, " единиц здоровья");
//       }

//     var shotCell = document.getElementsByClassName("cell-" + y + "/" + x)[0];
//     shotCell.classList.add("shot");
//     setTimeout(() => {
//       shotCell.classList.remove("shot");
//     }, 200);
//   }
// };

//#endregion

var sld1;
var sld2;

function setSoldiers() {
  if (!isGameInProgress)
  {
    isGameInProgress = true;

    var sld1_x = Math.floor(Math.random() * (11 - 1) + 1);
    var sld1_y = Math.floor(Math.random() * (11 - 1) + 1);

    var sld2_x = Math.floor(Math.random() * (11 - 1) + 1);
    var sld2_y = Math.floor(Math.random() * (11 - 1) + 1);

    while (sld1_x === sld2_x && sld1_y === sld2_y)
    {
      sld1_x = Math.floor(Math.random() * (11 - 1) + 1);
      sld1_y = Math.floor(Math.random() * (11 - 1) + 1);

      sld2_x = Math.floor(Math.random() * (11 - 1) + 1);
      sld2_y = Math.floor(Math.random() * (11 - 1) + 1);
    }

    sld1 = new Soldier(sld1_x, sld1_y, "Пушкин");
    sld2 = new Soldier(sld2_x, sld2_y, "Дантес");

    console.log("Солдат " + sld1.name + " заспавнен на координатах ", sld1.currentCoordinates);
    console.log("Солдат " + sld2.name + " заспавнен на координатах ", sld2.currentCoordinates);

    var soldier1_cell = document.getElementsByClassName("cell-" + sld1.currentCoordinates.y + "/" + sld1.currentCoordinates.x)[0];
    var soldier2_cell = document.getElementsByClassName("cell-" + sld2.currentCoordinates.y + "/" + sld2.currentCoordinates.x)[0];

    soldier1_cell.classList.add("occupedCell", "soldier1Cell");
    soldier2_cell.classList.add("occupedCell", "soldier2Cell");

    soldier1shotTimerId = setInterval(function() {
      if (whosTurn == "1")
      {
        whosTurn = "2";
        var shotX = Math.floor(Math.random() * (11 - 1) + 1);
        var shotY = Math.floor(Math.random() * (11 - 1) + 1);
        while (shotX === sld1.currentCoordinates.x && shotY === sld1.currentCoordinates.y)
        {
          shotX = Math.floor(Math.random() * (11 - 1) + 1);
          shotY = Math.floor(Math.random() * (11 - 1) + 1);
        }
        sld1.Shoot(shotX, shotY, sld2);

        if (sld2.health <= 0)
          endGame("soldier1");
      }
      }, 300);

    soldier2shotTimerId = setInterval(function() {
      if (whosTurn == "2")
      {
        whosTurn = "1";
        var shotX = Math.floor(Math.random() * (11 - 1) + 1);
        var shotY = Math.floor(Math.random() * (11 - 1) + 1);
        while (shotX === sld2.currentCoordinates.x && shotY === sld2.currentCoordinates.y)
        {
          shotX = Math.floor(Math.random() * (11 - 1) + 1);
          shotY = Math.floor(Math.random() * (11 - 1) + 1);
        }
        sld2.Shoot(shotX, shotY, sld1);

        if (sld1.health <= 0)
          endGame("soldier2");
      }
      }, 600);
  }
};

function endGame(winner) {
  clearTimeout(soldier1shotTimerId);
  clearTimeout(soldier2shotTimerId);

  if (winner === "soldier1")
    alert("Солдат " + sld1.name + " побеждает!");
  else if (winner === "soldier2")
    alert("Солдат " + sld2.name + " побеждает!");
  else
    alert("Ничья?");
}

function stopGame() {
  clearTimeout(soldier1shotTimerId);
  clearTimeout(soldier2shotTimerId);

  document.getElementsByClassName("soldier1Cell")[0].classList.remove("occupedCell", "soldier1Cell");
  document.getElementsByClassName("soldier2Cell")[0].classList.remove("occupedCell", "soldier2Cell");

  sld1.health = 100;
  sld1.currentCoordinates.x = 1;
  sld1.currentCoordinates.y = 1;

  sld2.health = 100;
  sld2.currentCoordinates.x = 1;
  sld2.currentCoordinates.y = 1;

  isGameInProgress = false;
}