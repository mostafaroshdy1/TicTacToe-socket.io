const socket = io();
let myTurn = true;
let symbol;

function getBoardState() {
    const obj = {};

    document.querySelectorAll(".board button").forEach(button => {
        obj[button.id] = button.textContent || "";
    });

    return obj;
}

function isGameOver() {
    const state = getBoardState();
    const matches = ["XXX", "OOO"];
    const rows = [
        state.r0c0 + state.r0c1 + state.r0c2,
        state.r1c0 + state.r1c1 + state.r1c2,
        state.r2c0 + state.r2c1 + state.r2c2,
        state.r0c0 + state.r1c0 + state.r2c0,
        state.r0c1 + state.r1c1 + state.r2c1,
        state.r0c2 + state.r1c2 + state.r2c2,
        state.r0c0 + state.r1c1 + state.r2c2,
        state.r0c2 + state.r1c1 + state.r2c0
    ];

    for (let i = 0; i < rows.length; i++) {
        if (rows[i] === matches[0] || rows[i] === matches[1]) {
            return true;
        }
    }

    return false;
}

function renderTurnMessage() {
    const messageElement = document.getElementById("message");

    if (!myTurn) {
        messageElement.textContent = "Your opponent's turn";
        document.querySelectorAll(".board button").forEach(button => button.disabled = true);
    } else {
        messageElement.textContent = "Your turn.";
        document.querySelectorAll(".board button").forEach(button => button.disabled = false);
    }
}

function makeMove(e) {
    if (!myTurn) {
        return;
    }

    if (e.target.textContent) {
        return;
    }

    socket.emit("make.move", {
        symbol: symbol,
        position: e.target.id
    });
}

socket.on("move.made", function (data) {
    document.getElementById(data.position).textContent = data.symbol;

    myTurn = data.symbol !== symbol;

    if (!isGameOver()) {
        renderTurnMessage();
    } else {
        const messageElement = document.getElementById("message");
        if (myTurn) {
            messageElement.textContent = "You lost.";
        } else {
            messageElement.textContent = "You won!";
        }

        document.querySelectorAll(".board button").forEach(button => button.disabled = true);
    }
});

socket.on("game.begin", function (data) {
    symbol = data.symbol;
    myTurn = symbol === "X";
    renderTurnMessage();
});

socket.on("opponent.left", function () {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "Your opponent left the game.";
    document.querySelectorAll(".board button").forEach(button => button.disabled = true);
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".board button").forEach(button => button.disabled = true);
    document.querySelectorAll(".board button").forEach(button => button.addEventListener("click", makeMove));
});
