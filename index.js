import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Router from 'GreedyPicks/src/Router';

if (__DEV__) {
  import('./src/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

AppRegistry.registerComponent(appName, () => Router);
