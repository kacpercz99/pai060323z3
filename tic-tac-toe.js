let isXTurn = true;
let gf = [];
let someoneWon = "noOne";
let controls;
let turnStatus;
function gen() {
  //Tworzenie podstawowych zmiennych i ich ustawianie
  const main = document.getElementById("main");

  const board = document.createElement("div");
  board.className = "board";

  const top = document.createElement("div");
  top.innerText = "Tic-Tac-Toe";
  top.className = "top";

  turnStatus = document.createElement("div");
  turnStatus.className = "turn";
  turnStatus.innerText = "It is X turn";

  controls = document.createElement("button");
  controls.className = "controls";
  controls.innerText = "Reset game";
  controls.disabled = true;
  controls.onclick = resetBoard;

  //tworzenie 9 elementow planszy, wraz z obsluga kliknieca
  for (let i = 0; i < 9; i++) {
    gf[i] = document.createElement("button");
    gf[i].className = "gameField";
    gf[i].onclick = function () {
      controls.disabled = false;
      if (isXTurn) {
        gf[i].innerText = "X";
        gf[i].style.color = "red";
        turnStatus.innerText = "It is O turn";
      } else {
        gf[i].innerText = "O";
        gf[i].style.color = "blue";
        turnStatus.innerText = "It is X turn";
      }
      gf[i].disabled = true;
      isXTurn = !isXTurn;
      //po kliknieciu, sprawdzamy czy moze ktos wygral
      someoneWon = checkIfWon();
      //jezeli nikt nie wygral, sprawdzamy czy moze wszystkie pola zostaly kliniete, wiec moze byc to remis
      if (someoneWon != "noOne") {
        if (someoneWon == "DRAW") {
          turnStatus.innerText = "It's a draw!";
        }
        //jezeli wykryto kombinacje ktora wygrywa, blokujemy reszte przyciskow, wyswietlamy kto wygral
        else {
          disableAll();
          turnStatus.innerText = someoneWon + " won!";
        }
      }
    };
    board.appendChild(gf[i]);
  }
  //dodajemy elementy do planszy
  board.appendChild(top);
  board.appendChild(turnStatus);
  board.appendChild(controls);
  main.appendChild(board);
}

//funkcja sprawdzajaca czy ktos wygral
function checkIfWon() {
  //uzywamy funkcji checkWinCombinations, aby otrzymac tablice ktora ma sprawdzona kazda z kombinacji
  //jezeli jeden z jej elementow jest rowny 1, to zapisujemy jej index
  let wonIndex = checkWinCombinations().indexOf(1);
  if (wonIndex != -1) {
    //jezeli znaleziono index, uzywamy indexu kombinacji, aby oznaczyc wygrywajace pola
    combinations[wonIndex].forEach((index) => {
      gf[index].style.background = "green";
    });
    //zwracamy kto wygral, uzywajac indexu kombinacji
    return gf[combinations[wonIndex][0]].innerText;
    //jezeli nie znaleziono wygrywajacej kombinacji, sprawdzamy czy jest remis, czy moze nikt jeszcze nie wygral
  } else if (checkIfDraw()) {
    gf.forEach((button) => {
      button.style.background = "lightgray";
    });
    return "DRAW";
  } else {
    return "noOne";
  }
}
//funkcja sprawdzajaca kazda kombinacje dla planszy
function checkWinCombinations() {
  //zwracamy tablice, ktora jest 0 albo 1 w przypadku porowanania elementow dla kazdej kombinacji
  return combinations.map((c) => {
    if (gf[c[0]].innerText.length != 0) {
      if (and3(gf[c[0]], gf[c[1]], gf[c[2]])) {
        return 1;
      }
    }
    return 0;
  });
}

/*
0 1 2
3 4 5
6 7 8
*/
//wszystkie wygrywajace kombinacje
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
//funckja resetujaca plansze i ustawiajaca pola kontrolne, na domyslne wartosci
function resetBoard() {
  gf.forEach((button) => {
    button.innerText = null;
    button.disabled = false;
    button.style.background = null;
    button.style.color = null;
  });
  isXTurn = true;
  turnStatus.innerText = "It is X turn";
  someoneWon = "noOne";
  controls.disabled = true;

  //location.reload();
}
//funckja wylaczajaca wszystkie pola gry
function disableAll() {
  gf.forEach((button) => {
    button.disabled = true;
  });
}
//funckja porownujaca 3 zmienne
function and3(x, y, z) {
  return (
    x.innerText == y.innerText &&
    (x.innerText == z.innerText) & (y.innerText == z.innerText)
  );
}
//funckja sprawdzajaca czy nie nastapil remis
function checkIfDraw() {
  let counter = 9;
  gf.forEach((button) => {
    if (button.innerText == "X" || button.innerText == "O") counter--;
  });
  return counter == 0;
}
