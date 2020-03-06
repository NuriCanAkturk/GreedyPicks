import React, {useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GameList from 'GreedyPicks/src/components/GameList';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

export default props => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('savedGames').then(v => {
      const val = JSON.parse(v);
      if (val != null) {
        setGames(val);
      }
    });
  }, []);

  return (
    <GameList
      data={games}
      onSelected={game => {
        props.navigation.navigate('ViewGame', {game});
      }}
    />
  );
};
