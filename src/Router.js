import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectHero from 'GreedyPicks/src/components/screens/SelectHero';
import GameBoard from 'GreedyPicks/src/components/screens/GameBoard';
import HeaderRight from 'GreedyPicks/src/components/HeaderRight';
import SavedGames from 'GreedyPicks/src/components/screens/SavedGames';
import ViewGame from 'GreedyPicks/src/components/screens/ViewGame';
import Welcome from 'GreedyPicks/src/components/screens/Welcome';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={({route, navigation}) => ({})}
        />
        <Stack.Screen
          name="SelectHero"
          component={SelectHero}
          options={({route, navigation}) => ({
            title: 'Select a Hero',
            headerRight: () => (
              <HeaderRight navigation={navigation} button={'saved-games'} />
            ),
          })}
        />
        <Stack.Screen
          name="GameBoard"
          component={GameBoard}
          options={({route, navigation}) => ({
            title: route.params.hero.name,
            headerRight: () => (
              <HeaderRight navigation={navigation} button={'saved-games'} />
            ),
          })}
        />
        <Stack.Screen
          name="SavedGames"
          component={SavedGames}
          options={({route, navigation}) => ({
            title: 'Saved Games',
            headerRight: () => (
              <HeaderRight navigation={navigation} button={'select-hero'} />
            ),
          })}
        />
        <Stack.Screen
          name="ViewGame"
          component={ViewGame}
          options={({route, navigation}) => ({
            title: route.params.game.id,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
