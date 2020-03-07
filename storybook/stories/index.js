import React from 'react';
import {Text} from 'react-native';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import SelectHero from 'GreedyPicks/src/components/screens/SelectHero';
import GameBoard from 'GreedyPicks/src/components/screens/GameBoard';
import SavedGames from 'GreedyPicks/src/components/screens/SavedGames';
import ViewGame from 'GreedyPicks/src/components/screens/ViewGame';
import HeroList from 'GreedyPicks/src/components/HeroList';
import GameList from 'GreedyPicks/src/components/GameList';
import Game from 'GreedyPicks/src/components/Game';
import Welcome from 'GreedyPicks/src/components/Welcome';

import samples from 'GreedyPicks/storybook/stories/samples';

storiesOf('Welcome', module)
  .add('First launch', () => <Welcome games={[]} />)
  .add('If there are saved games', () => <Welcome games={[1,2,3]} />);

storiesOf('SelectHero', module)
  .add('Select a hero', () => (
    <SelectHero
      navigation={{}}
      route={{key: 'SelectHero-uXH1yqIWj', name: 'SelectHero'}}
    />
  ))
  .add('Hero list', () => (
    <HeroList
      data={samples.heroListProps}
      onSelect={(hero: Hero) => {
        console.log('hero selected');
      }}
    />
  ));

storiesOf('GameBoard', module)
  .add('Gameboard', () => (
    <GameBoard
      navigation={{}}
      route={{
        key: 'GameBoard-gs5Mv--p',
        name: 'GameBoard',
        params: {
          hero: {
            playerIndex: 0,
            players: [],
            matches: [],
            matchIndex: 0,
            id: 'anti-mage',
            name: 'Anti-Mage',
            image_url:
              'https://www.dotabuff.com//assets/heroes/anti-mage-04c8f359a3b98ffbc15595a9a9ddf42b1e540c051351d0b840155880e09fc06d.jpg',
          },
          patch: '7.24',
        },
      }}
    />
  ))
  .add('Game without result', () => (
    <Game
      game={samples.game.game}
      onAnswer={answer => {
        console.log(answer);
      }}
      showResults={false}
      hero={samples.game.hero}
      answer={null}
      initialSaveStatus={'not-saved'}
    />
  ))
  .add('Game with result incorrect', () => (
    <Game
      game={samples.game.game}
      onAnswer={answer => {
        console.log(answer);
      }}
      showResults={true}
      hero={samples.game.hero}
      answer={null}
      initialSaveStatus={'not-saved'}
    />
  ))
  .add('Game with result correct', () => (
    <Game
      game={samples.game.game}
      onAnswer={answer => {
        console.log(answer);
      }}
      showResults={true}
      hero={samples.game.hero}
      answer={'radiant'}
      initialSaveStatus={'not-saved'}
    />
  ))
  .add('Game with result saved', () => (
    <Game
      game={samples.game.game}
      onAnswer={answer => {
        console.log(answer);
      }}
      showResults={true}
      hero={samples.game.hero}
      answer={'radiant'}
      initialSaveStatus={'saved'}
    />
  ))
  .add('Game with result saving', () => (
    <Game
      game={samples.game.game}
      onAnswer={answer => {
        console.log(answer);
      }}
      showResults={true}
      hero={samples.game.hero}
      answer={null}
      initialSaveStatus={'saving'}
    />
  ));

storiesOf('ViewGame', module).add('View saved game', () => (
  <ViewGame route={samples.viewGameProps.route} />
));

storiesOf('SavedGames', module)
  .add('Saved game list', () => (
    <GameList data={samples.gameList.data} onSelected={game => {}} />
  ))
  .add('Saved game list no data', () => (
    <GameList data={[]} onSelected={game => {}} />
  ));
