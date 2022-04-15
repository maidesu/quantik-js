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
    for (let i = 0; i < 4; ++i)
    {
        inventory_one_table[i].style.backgroundColor = "transparent";
        inventory_two_table[i].style.backgroundColor = "transparent";
    }

    selectedPiece = 0;

    if (turn)
    {
        status_table[0].style.fontWeight = "bold";
        status_table[0].style.color = "black";
        status_table[0].style.textDecoration = "underline";

        status_table[2].style.fontWeight = "normal";
        status_table[2].style.color = "gray";
        status_table[2].style.textDecoration = "none";
        turn = 0;
    }
    else
    {
        status_table[0].style.fontWeight = "normal";
        status_table[0].style.color = "gray";
        status_table[0].style.textDecoration = "none";

        status_table[2].style.fontWeight = "bold";
        status_table[2].style.color = "black";
        status_table[2].style.textDecoration = "underline";
        turn = 1;
    }
}

function checkValidMove(position)
{
    if (game_field[position] != 0) { return 0; }

    let a = Math.floor(position / 4);
    let b = position % 4;

    for (let i = 0; i < 4; ++i)
    {
        //console.log(i + "*4+" + b + " " + game_field[i*4+b] + "==" + selectedPiece);
        if (Math.abs(game_field[i*4+b]) == Math.abs(selectedPiece)) { return 0; }
    }
    for (let j = 0; j < 4; ++j)
    {
        //console.log(a + "*4+" + j + " " + game_field[a*4+j] + "==" + selectedPiece);
        if (Math.abs(game_field[a*4+j]) == Math.abs(selectedPiece)) { return 0; }
    }

    return 1; // TODO
}

function checkWinCondition()
{
    return 0; // TODO
}

function submitMove(position)
{
    if (checkValidMove(position))
    {
        if (!turn)
        {
            let index = inventory_one.indexOf(selectedPiece);
            if (index < 0) { console.log("No such piece left"); return; }
            inventory_one.splice(index, 1);
        }
        else
        {
            let index = inventory_two.indexOf(selectedPiece);
            if (index < 0) { console.log("No such piece left"); return; }
            inventory_two.splice(index, 1);
        }

        game_field[position] = selectedPiece;
        endTurn();
    }
    else
    {
        console.log(`Placement of ${selectedPiece} to position ${position} is illegal`);
    }
}

function assignTable()
{
    let i = 0;
    game_field.forEach(() => {
        game_table[i].dataset.num = i;
        game_table[i].addEventListener("click", function() { submitMove(this.dataset.num); });
        ++i;
    });

    for (let i = 0; i < 4; ++i)
    {
        inventory_one_table[i].dataset.num = Math.pow(2, i);
        inventory_two_table[i].dataset.num = - Math.pow(2, i);

        inventory_one_table[i].addEventListener("click", () => {

            if (!turn) {
                selectedPiece = parseInt(inventory_one_table[i].dataset.num);
                for (let j = 0; j < 4; ++j)
                {
                    inventory_one_table[j].style.backgroundColor = "transparent";
                    inventory_two_table[j].style.backgroundColor = "transparent";
                }
                inventory_one_table[i].style.backgroundColor = "yellow";
            }
            else {
                console.log("Opponent's turn");
            }

        });
        inventory_two_table[i].addEventListener("click", () => {

            if (turn)
            {
                selectedPiece = parseInt(inventory_two_table[i].dataset.num); 
                for (let j = 0; j < 4; ++j)
                {
                    inventory_one_table[j].style.backgroundColor = "transparent";
                    inventory_two_table[j].style.backgroundColor = "transparent";
                }
                inventory_two_table[i].style.backgroundColor = "yellow";
            }
            else {
                console.log("Opponent's turn");
            }

        });
    }
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
    checkWinCondition();
    changeTurn();
}
