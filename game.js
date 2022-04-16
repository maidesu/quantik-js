let first_run = 1;

let turn = 0;

let selectedPiece = 0;

let name_one = "";
let name_two = "";

const inventory_one = [];
const inventory_two = [];

const game_field = [];

var statistics = [];

let home_div = document.querySelector("#home");
let game_div = document.querySelector("#game");

let game_table = document.querySelectorAll("#gameTable td");
let status_table = document.querySelectorAll("#statusTable td");

let inventory_one_table = document.querySelectorAll("#inventoryOneTable td");
let inventory_two_table = document.querySelectorAll("#inventoryTwoTable td");

document.querySelector("#startGameButton").addEventListener("click", initGame);

let home_button = document.querySelector("#homeButton");
home_button.addEventListener("click", () => { home_button.style.display = "none"; game_div.style.display = "none"; home_div.style.display = "block"; });

function initGame()
{
    turn = 1; // intentionally set to opponent, because of endTurn()

    name_one = document.querySelector("#p1name").value;
    name_two = document.querySelector("#p2name").value;

    inventory_one.splice(0, inventory_one.length);
    inventory_two.splice(0, inventory_two.length);

    game_field.splice(0, game_field.length);

    inventory_one.push(1, 1, 2, 2, 4, 4, 8, 8);
    inventory_two.push(-1, -1, -2, -2, -4, -4, -8, -8);

    game_field.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    home_div.style.display = "none";
    game_div.style.display = "block";

    status_table[0].textContent = name_one;
    status_table[1].textContent = "VS";
    status_table[2].textContent = name_two;

    if (first_run) { assignTable(); }

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

    // Row & col checks
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

    // Group of 4 tiles check
    let c = Math.floor(position / 4) < 2 ? 0 : 1;
    let d = (position % 4) < 2 ? 0 : 1;

    const box = [ Math.abs(game_field[c*8+0+d*2]), Math.abs(game_field[c*8+1+d*2]), Math.abs(game_field[c*8+4+d*2]), Math.abs(game_field[c*8+5+d*2]) ];
    if (box.includes(Math.abs(selectedPiece))) { return 0; }

    return 1;
}

function checkWinCondition()
{
    for (let i = 0; i < 4; ++i)
    {
        const row = [ game_field[i*4+0], game_field[i*4+1], game_field[i*4+2], game_field[i*4+3] ];
        if (!row.includes(0)) { return 1; }
    }
    for (let j = 0; j < 4; ++j)
    {
        const col = [ game_field[0*4+j], game_field[1*4+j], game_field[2*4+j], game_field[3*4+j] ];
        if (!col.includes(0)) { return 1; }
    }

    for (let i = 0; i < 2; ++i)
    {
        for (let j = 0; j < 2; ++j)
        {
            const box = [ game_field[i*8+0+j*2], game_field[i*8+1+j*2], game_field[i*8+4+j*2], game_field[i*8+5+j*2] ];
            if (!box.includes(0)) { return 1; }
        }
    }

    return 0;
}

function submitMove(position)
{
    if (checkValidMove(position))
    {
        if (!turn)
        {
            let index = inventory_one.indexOf(selectedPiece);
            if (index < 0) { console.log("No such piece left!"); return; }
            inventory_one.splice(index, 1);
        }
        else
        {
            let index = inventory_two.indexOf(selectedPiece);
            if (index < 0) { console.log("No such piece left!"); return; }
            inventory_two.splice(index, 1);
        }

        game_field[position] = selectedPiece;
        endTurn();
    }
    else
    {
        console.log(`Placement of ${selectedPiece} to position ${position} is illegal!`);
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
                console.log("Opponent's turn!");
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
                console.log("Opponent's turn!");
            }

        });
    }

    first_run = 0;
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
    
    if (checkWinCondition())
    {
        statistics = JSON.parse(document.querySelector("#jsonStatistics").textContent);

        let found = 0;

        let p1wins = 0;
        let p2wins = 0;

        statistics.forEach(e => {
            if (e.player1 == name_one && e.player2 == name_two)
            {
                if (!turn)
                {
                    e.player1wins = e.player1wins + 1; 
                }
                else
                {
                    e.player2wins = e.player2wins + 1; 
                }
                found = 1;
                p1wins = e.player1wins;
                p2wins = e.player2wins;
            }
        });

        if (!found) {
            if (!turn) { statistics.push({'player1': `${name_one}`, 'player2': `${name_two}`, 'player1wins': 1, 'player2wins': 0}); p1wins = 1; }
            else { statistics.push({'player1': `${name_one}`, 'player2': `${name_two}`, 'player1wins': 0, 'player2wins': 1}); p2wins = 1; }
        }

        document.querySelector("#jsonStatistics").textContent = JSON.stringify(statistics, null, '\t');
        statistics = [];

        alert((!turn) ? `A játékot megnyerte az 1. játékos: ${name_one}, összesen ${p1wins} győzelemmel` : `A játékot megnyerte a 2. játékos: ${name_two}, összesen ${p2wins} győzelemmel`);
        home_button.style.display = "block";
    }

    changeTurn();
}
