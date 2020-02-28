import Match from './Match';

export default class PlayerGamesResult {
  playerId: number;
  matches: Array<Match>;

  constructor() {
    this.matches = [];
  }
}
