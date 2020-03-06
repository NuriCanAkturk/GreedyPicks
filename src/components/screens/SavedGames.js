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

  console.log('render');
  const bannerId = Platform.select({
    ios: 'ca-app-pub-7590562592808907/7131883708',
    android: 'ca-app-pub-7590562592808907/3384210384',
  });
  return (
    <View style={{flex: 1}}>
      {games.length == 0 && (
        <View style={{flex: 1}}>
          <Text
            style={{
              marginTop: 40,
              flex: 1,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            You can save matches to see here. For now, this is a great
            opportunity to publish some ads :P
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <BannerAd
              size={BannerAdSize.MEDIUM_RECTANGLE}
              unitId={
                Platform.OS == 'ios'
                  ? 'ca-app-pub-7590562592808907/5993164063'
                  : 'ca-app-pub-7590562592808907/4243106303'
              }
              testDevices={[TestIds]}
              onAdFailedToLoad={error => console.error(error)}
            />
          </View>
        </View>
      )}
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
