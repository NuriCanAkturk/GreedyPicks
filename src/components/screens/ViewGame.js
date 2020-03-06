import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import AsyncStorage from '@react-native-community/async-storage';
import Game from 'GreedyPicks/src/components/Game';

export default props => {
    console.log('navigation', JSON.stringify(props.navigation));
    console.log('route', JSON.stringify(props.route));

    const game = props.route.params.game;
  return (
    <View>
      <Game
        game={game}
        onAnswer={answer => {
          //
        }}
        showResults={true}
        hero={game.hero}
        answer={game.answer}
        initialSaveStatus={'saved'}
      />
    </View>
  );
};
