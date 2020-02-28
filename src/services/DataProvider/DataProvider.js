import DotabuffParser from '../DotabuffParser';
import Hero from './Hero';
import PlayerGamesResult from './PlayerGamesResult';
import Match from './Match';

export default class DataProvider {
  constructor() {
    this.dotabuff = new DotabuffParser();
    this.heroes = [];
  }

  getHeroList() {
    return new Promise((resolve, reject) => {
      if (this.heroes.length > 0) {
        return resolve(this.heroes);
      }
      this.dotabuff
        .getHeroes()
        .then(data => {
          this.heroes = data;
          resolve(this.heroes);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  fetchMoreGames(hero) {
    return this.dotabuff.fetchPlayers(hero).then(() => {
      return this.dotabuff.fetchPlayerGames(hero);
    });
  }

  fetchMatchDetails(match: Match) {
    return this.dotabuff.fetchMatchDetails(match);
  }

  fetchNextGame(heroId) {
    const hero = this.heroes.find(x => x.id == heroId);
    const match = hero.getNextMatch();
    if (match == null) {
      return this.fetchMoreGames(hero)
        .then(() => {
          return hero.getNextMatch();
        })
        .then((match: Match) => {
          return this.fetchMatchDetails(match);
        });
    } else {
      return this.fetchMatchDetails(match);
    }
  }
}
