import express from 'express';
import { Server } from 'socket.io'
import { createServer } from 'node:http';
import ejs from 'ejs';


const app = express()
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.engine('html', ejs.renderFile);
app.set('view engine', ejs);
app.use(express.static('public'));



const clients = {};

app.get("/", (req, res) => {
    res.render('index.html')
})

const players = {};
let unmatched;

io.on("connection", function (socket) {
    let id = socket.id;

    console.log("New client connected. ID: ", socket.id);
    clients[socket.id] = socket;

    socket.on("disconnect", () => {
        console.log("Client disconnected. ID: ", socket.id);
        delete clients[socket.id];
        socket.broadcast.emit("clientdisconnect", id);
    });

    join(socket);

    if (opponentOf(socket)) {
        socket.emit("game.begin", {
            symbol: players[socket.id].symbol
        });

        opponentOf(socket).emit("game.begin", {
            symbol: players[opponentOf(socket).id].symbol
        });
    }


    socket.on("make.move", function (data) {
        if (!opponentOf(socket)) {
            return;
        }

        socket.emit("move.made", data);
        opponentOf(socket).emit("move.made", data);
    });

    socket.on("disconnect", function () {
        if (opponentOf(socket)) {
            opponentOf(socket).emit("opponent.left");
        }
    });
});



function join(socket) {
    players[socket.id] = {
        opponent: unmatched,
        symbol: "X",
        socket: socket
    };


    if (unmatched) {
        players[socket.id].symbol = "O";
        players[unmatched].opponent = socket.id;
        unmatched = null;
    } else {
        unmatched = socket.id;
    }
}

function opponentOf(socket) {
    if (!players[socket.id].opponent) {
        return;
    }
    return players[players[socket.id].opponent].socket;
}

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})

