import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Router from 'GreedyPicks/src/Router';
import DotabuffParser from 'GreedyPicks/src/services/DotabuffParser';
import Hero from './src/services/DataProvider/Hero';

const parser = new DotabuffParser();
const hero = new Hero();
hero.id = 'meepo';
parser.fetchPlayers(hero);

AppRegistry.registerComponent(appName, () => Router);
