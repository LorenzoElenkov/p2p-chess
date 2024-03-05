# Peer 2 Peer - Chess

Welcome to P2P Chess.
I have a passion for chess, hence I developed a place, where two players can play against each other.

## Infrastructure

- **Front-end**: React with Vite
- **Back-end**: Express.js with SocketIO

## How does it work?

In order for a player to make his move, he can:

- Click on a chess piece
- Hold a chess piece

The legal moves for this chess piece will be shown on the chess board tiles as a dot.
The front-end will send a request to the back-end, only if this chess piece was moved to a legal tile.
Nevertheless, back-end also keeps track of the game and it will also validate the move made by the player.
If the move is illegal, the backend will send the appropriate response and front-end will revert it back.

## End-game conditions

1.  The player who first checkmates the opposing player - will win the game.
2.  The player whose remaining time hits 00:00 - will lose the game.
3.  If one player has no legal moves for any of his pieces on the board, but also is not in check - the game will end in a tie.
