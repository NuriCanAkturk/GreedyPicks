import {parse} from 'node-html-parser';
import Hero from './DataProvider/Hero';
import Match from './DataProvider/Match';
import Pick from './DataProvider/Pick';

export default class DotabuffParser {
  getHeroes() {
    return fetch('https://www.dotabuff.com/heroes')
      .then(response => {
        return response.text();
      })
      .then(html => {
        const heroes = [];
        const doc = parse(html);
        const anchors = doc.querySelector('.hero-grid');
        for (const i in anchors.childNodes) {
          const node = anchors.childNodes[i];
          const hero = new Hero();
          try {
            hero.id = node.rawAttributes.href.split('heroes/')[1];
            hero.name = node.childNodes[0].childNodes[0].childNodes[0].rawText;
            const div = node.querySelector('div');
            hero.image_url =
              'https://www.dotabuff.com/' +
              div.rawAttributes.style
                .replace(/&#47;/g, '/')
                .split('url(')[1]
                .split(')')[0];

            heroes.push(hero);
          } catch (e) {
            // not hero
          }
        }
        return heroes;
      });
  }

  fetchPlayers(hero) {
    if (hero.players.length > 0) {
      return new Promise(resolve => resolve(hero));
    }
    return fetch('https://www.dotabuff.com/heroes/' + hero.id + '/players')
      .then(response => {
        return response.text();
      })
      .then(html => {
        const doc = parse(html);
        const rows = doc.querySelector('table.sortable tbody');
        for (var i in rows.childNodes) {
          const playerId = rows.childNodes[i].rawAttributes['data-link-to']
            .split('&#47;players&#47;')[1]
            .split('&#47;')[0];
          hero.players.push(playerId);
        }
        return hero;
      });
  }

  fetchPlayerGames(hero: Hero, patch) {
    return fetch(
      'https://www.dotabuff.com/players/' +
        hero.getNextPlayerId() +
        '/matches?hero=' +
        hero.id +
        '&date=patch_' +
        patch +
        '&lobby_type=ranked_matchmaking&enhance=overview',
    )
      .then(response => {
        return response.text();
      })
      .then(html => {
        let table;
        try {
          table = html
            .split('</footer></form></div><section><article>')[1]
            .split('</article>')[0];
        } catch (e) {
          throw 'rate-limit';
        }
        const doc = parse(table);
        const rows = doc.querySelector('tbody');
        for (var i in rows.childNodes) {
          const item = rows.childNodes[i];
          const matchId = item.childNodes[1].childNodes[0].rawAttributes.href.split(
            'matches/',
          )[1];
          const match = new Match();
          match.id = matchId;
          match.date = new Date(
            item.childNodes[3].childNodes[1].childNodes[0].rawAttributes.datetime,
          );
          hero.matches.push(match);
        }
        return hero;
      });
  }

  fetchMatchDetails(match: Match) {
    if (match.fetched) {
      return match;
    }
    return fetch('https://www.dotabuff.com/matches/' + match.id)
      .then(response => {
        return response.text();
      })
      .then(html => {
        const doc = parse(html);
        const radiant = doc.querySelector('section.radiant table tbody');
        const dire = doc.querySelector('section.dire table tbody');

        const parseHeroes = teamElement => {
          const picks = [];
          for (var i in teamElement.childNodes) {
            const item = teamElement.childNodes[i];
            const cellAnchor = item.querySelector('.cell-fill-image a');
            const role = item.querySelector('.role-icon');
            const lane = item.querySelector('.lane-icon');
            const heroId = cellAnchor.rawAttrs
              .split('/heroes/')[1]
              .replace('"', '');
            const hero = new Hero(heroId);
            const pick = new Pick(hero);
            try {
              pick.lane = lane.rawAttributes.title;
              pick.role = role.rawAttributes.title;
            } catch (e) {
              //
            }
            picks.push(pick);
          }
          return picks;
        };

        const result = doc.querySelector('.match-result');
        if (result.rawAttributes.class.indexOf('radiant') > -1) {
          match.winner = 'radiant';
        } else {
          match.winner = 'dire';
        }

        const header = doc.querySelector('.header-content-secondary');
        match.skillBracket =
          header.childNodes[0].childNodes[0].childNodes[0].rawText;
        match.gameMode =
          header.childNodes[2].childNodes[0].childNodes[0].rawText;
        match.region = header.childNodes[3].childNodes[0].childNodes[0].rawText;
        match.duration =
          header.childNodes[4].childNodes[0].childNodes[0].rawText;
        match.dateText =
          header.childNodes[5].childNodes[0].childNodes[0].rawText;
        match.dire = parseHeroes(dire);
        match.radiant = parseHeroes(radiant);
        match.fetched = true;
        return match;
      });
  }
}
