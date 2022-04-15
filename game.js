let turn = 1;

let selectedPiece = 0;

let name_one = "";
let name_two = "";

const inventory_one = [];
const inventory_two = [];

const game_field = [];

let home_div = document.querySelector("#home");
let game_div = document.querySelector("#game");

let game_table = document.querySelectorAll("#gameTable td");
let status_table = document.querySelectorAll("#statusTable td");

let inventory_one_table = document.querySelectorAll("#inventoryOneTable td");
let inventory_two_table = document.querySelectorAll("#inventoryTwoTable td");

document.querySelector("#startGameButton").addEventListener("click", initGame);

function initGame()
{
    name_one = document.querySelector("#p1name").value;
    name_two = document.querySelector("#p2name").value;

    inventory_one.push(1, 1, 2, 2, 4, 4, 8, 8);
    inventory_two.push(-1, -1, -2, -2, -4, -4, -8, -8);

    game_field.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    home_div.style.display = "none";
    game_div.style.display = "block";

    status_table[0].textContent = name_one;
    status_table[1].textContent = "VS";
    status_table[2].textContent = name_two;

    assignTable();

    endTurn();
}



function changeTurn()
{
    if (turn)
    {
        status_table[0].style.fontWeight = "bold";
        status_table[2].style.fontWeight = "normal";
        turn = 0;
    }
    else
    {
        status_table[0].style.fontWeight = "normal";
        status_table[2].style.fontWeight = "bold";
        turn = 1;
    }
}

function checkValidMove()
{
    return 1; // TODO
}

function checkWinCondition()
{
    return 0; // TODO
}

function submitMove(position)
{
    if (checkValidMove(position, selectedPiece))
    {
        game_field[position] = selectedPiece;
        endTurn();
    }
    else
    {
        console.error(`Placement of ${selectedPiece} to position ${position} is illegal`);
    }
}

function assignTable()
{
    let i = 0;
    game_field.forEach(e => {
        game_table[i].dataset.num = i;
        game_table[i].addEventListener("click", function() { submitMove(this.dataset.num); });
        ++i;
    });
}

function refreshGameTable()
{
    let i = 0;
    game_field.forEach(e => {
        game_table[i].innerHTML = "";
        game_table[i].appendChild(getImage(e));
        ++i;
    });
}

function refreshInventory()
{
    inventory_one_table[4].textContent = inventory_one.filter(e => e == 1).length;
    inventory_one_table[5].textContent = inventory_one.filter(e => e == 2).length;
    inventory_one_table[6].textContent = inventory_one.filter(e => e == 4).length;
    inventory_one_table[7].textContent = inventory_one.filter(e => e == 8).length;

    inventory_two_table[4].textContent = inventory_two.filter(e => e == -1).length;
    inventory_two_table[5].textContent = inventory_two.filter(e => e == -2).length;
    inventory_two_table[6].textContent = inventory_two.filter(e => e == -4).length;
    inventory_two_table[7].textContent = inventory_two.filter(e => e == -8).length;
}

function getImage(piece)
{
    let img = document.createElement("img");

    switch(piece)
    {
        case 0:
            img.src = "img/empty.png";
            break;
        case 1:
            img.src = "img/circle0.png";
            break;
        case 2:
            img.src = "img/square0.png";
            break;
        case 4:
            img.src = "img/triangle0.png";
            break;
        case 8:
            img.src = "img/x0.png";
            break;
        case -1:
            img.src = "img/circle1.png";
            break;
        case -2:
            img.src = "img/square1.png";
            break;
        case -4:
            img.src = "img/triangle1.png";
            break;
        case -8:
            img.src = "img/x1.png";
            break;
    }

    return img;
}

function endTurn()
{
    refreshInventory();
    refreshGameTable();
    changeTurn();
}
