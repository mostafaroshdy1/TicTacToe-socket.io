# TicTacToe-socket.io

TicTacToe-socket.io is a real-time multiplayer Tic Tac Toe game built using Node.js, Express, Socket.IO, and EJS.

## Live Demo

You can access the live demo of the game [here](https://tictactoe-socketio-production.up.railway.app/). Once you enter the link, you will be matched with another player, allowing you to enjoy the game in real-time.

![z](https://github.com/mostafaroshdy1/TicTacToe-socket.io/assets/66712535/6ebc77ac-bfef-43c2-b688-b8c5a1beb796)


## How to Play

1. Access the live demo link provided above.
2. Once you enter the game, you will be matched with another player automatically.
3. Play Tic Tac Toe against your opponent in real-time.
4. The game ends when one player achieves three of their symbols (either "X" or "O") in a row, column, or diagonal, or when the board is full with no winner.

## Technologies Used

- **Node.js**: A JavaScript runtime used for building scalable network applications.
- **Express**: A web application framework for Node.js used for building web applications and APIs.
- **Socket.IO**: A library that enables real-time, bidirectional, and event-based communication between web clients and servers.
- **EJS**: A simple templating language that lets you generate HTML markup with plain JavaScript.

## How it Works

The game utilizes Socket.IO to establish real-time communication between players and the server. When a player enters the game, the server matches them with another player currently waiting for a match. Once matched, both players can interact with the game board simultaneously, making their moves and seeing their opponent's moves instantly.

## Running Locally

If you want to run the game locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/mostafaroshdy1/TicTacToe-socket.io.git
    ```

2. Navigate to the project directory:

    ```
    cd TicTacToe-socket.io
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the server:

    ```
    node server.js
    ```

5. Access the game in your browser at `http://localhost:3000`.
