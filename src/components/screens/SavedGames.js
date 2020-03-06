import React, {useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GameList from 'GreedyPicks/src/components/GameList';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

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

  console.log('render', props);
  const bannerId = Platform.select({
    ios: 'ca-app-pub-7590562592808907/7131883708',
    android: 'ca-app-pub-7590562592808907/3384210384',
  });
  return (
    <GameList
      data={games}
      onSelected={game => {
        console.log('selected', game);
        props.navigation.navigate('ViewGame', {game});
      }}
    />
  );
};
