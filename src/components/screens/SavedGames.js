import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GameList from 'GreedyPicks/src/components/GameList';

export default props => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    console.log('effect');
    AsyncStorage.getItem('savedGames').then(v => {
      const val = JSON.parse(v);
      if (val != null) {
        setGames(val);
      }
    });
  }, []);

  console.log('render');

  return (
    <View style={{flex:1}}>
      <Text>Saved Games</Text>
      <GameList
        data={games}
        onSelected={game => {
          console.log('selected', game);
          props.navigation.navigate('ViewGame', {game});
        }}
      />
    </View>
  );
};
