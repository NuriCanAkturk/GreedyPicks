import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectHero from 'GreedyPicks/src/components/screens/SelectHero';
import GameBoard from 'GreedyPicks/src/components/screens/GameBoard';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SelectHero"
          component={SelectHero}
          options={{title: 'Select a Hero'}}
        />
        <Stack.Screen
          name="GameBoard"
          component={GameBoard}
          options={{title: 'Game'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
