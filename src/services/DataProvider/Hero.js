import Match from './Match';

export default class Hero {
  id: string;
  name: string;
  image_url: string;
  players: Array;
  playerIndex: number;
  matches: Match<>;
  matchIndex: number;

  constructor() {
    this.playerIndex = 0;
    this.players = [];
    this.matches = [];
    this.matchIndex = 0;
  }

  getNextMatch() {
    if (this.matchIndex < this.matches.length) {
      const match = this.matches[this.matchIndex];
      this.matchIndex++;
      return match;
    }
    return null;
  }

  getNextPlayerId() {
    const player = this.players[this.playerIndex];
    this.playerIndex++;
    return player;
  }
}
