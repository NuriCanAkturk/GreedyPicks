import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectHero from 'GreedyPicks/src/components/screens/SelectHero';
import GameBoard from 'GreedyPicks/src/components/screens/GameBoard';
import HeaderRight from 'GreedyPicks/src/components/HeaderRight';
import SavedGames from 'GreedyPicks/src/components/screens/SavedGames';
import ViewGame from 'GreedyPicks/src/components/screens/ViewGame';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SelectHero"
          component={SelectHero}
          options={({route, navigation}) => ({
            title: 'Select a Hero',
            headerRight: () => <HeaderRight navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="GameBoard"
          component={GameBoard}
          options={({route, navigation}) => ({
            title: route.params.hero.name,
            headerRight: () => <HeaderRight navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="SavedGames"
          component={SavedGames}
          options={({route, navigation}) => ({
            title: 'Saved Games',
            headerRight: () => <HeaderRight navigation={navigation} />,
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
