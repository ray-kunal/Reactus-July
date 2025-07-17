export const playerTemplate = {
  name: '',
  moves: { rows: [], cols: [] },
  clickIndex: [],
  currentPlayer: 0,
}



export const players = {
  player1: {
    ...playerTemplate,
    name: "PLAYER 1",
    Symbol: "X",
    wins: 0,
    lost: 0,
    tie: 0
  },
  player2: {
    ...playerTemplate,
    name: "PLAYER 2",
    Symbol: "O",
    wins: 0,
    lost: 0,
    tie: 0
  },
};
