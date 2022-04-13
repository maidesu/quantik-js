let turn = 1;

let name_one = "";
let name_two = "";

const inventory_one = [];
const inventory_two = [];

let home_div = document.querySelector("#home");
let game_div = document.querySelector("#game");

let game_table = document.querySelector("#gameTable");
let status_table = document.querySelector("#statusTable");

let inventory_one_table = document.querySelector("#inventoryOneTable");
let inventory_two_table = document.querySelector("#inventoryTwoTable");

document.querySelector("#startGameButton").addEventListener("click", initGame);

function initGame()
{
    name_one = document.querySelector("#p1name").value;
    name_two = document.querySelector("#p2name").value;

    inventory_one.push(1, 1, 2, 2, 4, 4, 8, 8);
    inventory_two.push(1, 1, 2, 2, 4, 4, 8, 8);

    home_div.style.display = "none";
    game_div.style.display = "block";

    status_table.

    changeTurn();
}

function changeTurn()
{
    if (turn)
    {

        turn = 0;
    }
    else
    {

        turn = 1;
    }
}