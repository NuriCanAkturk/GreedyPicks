import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Router from 'GreedyPicks/src/Router';
import StoryBook from './storybook';

if (__DEV__) {
  import('./src/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const StoryBookActive = true;

if (StoryBookActive) {
  AppRegistry.registerComponent(appName, () => StoryBook);
} else {
  AppRegistry.registerComponent(appName, () => Router);
}
