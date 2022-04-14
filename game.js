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
    inventory_two.push(1, 1, 2, 2, 4, 4, 8, 8);

    game_field.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    home_div.style.display = "none";
    game_div.style.display = "block";

    status_table[0].textContent = name_one;
    status_table[1].textContent = "VS";
    status_table[2].textContent = name_two;

    changeTurn();
    refreshInventory();
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

function refreshInventory()
{
    inventory_one_table[0].textContent = inventory_one.filter(e => e == 1).length;
    inventory_one_table[1].textContent = inventory_one.filter(e => e == 2).length;
    inventory_one_table[2].textContent = inventory_one.filter(e => e == 4).length;
    inventory_one_table[3].textContent = inventory_one.filter(e => e == 8).length;

    inventory_two_table[0].textContent = inventory_two.filter(e => e == 1).length;
    inventory_two_table[1].textContent = inventory_two.filter(e => e == 2).length;
    inventory_two_table[2].textContent = inventory_two.filter(e => e == 4).length;
    inventory_two_table[3].textContent = inventory_two.filter(e => e == 8).length;
}
