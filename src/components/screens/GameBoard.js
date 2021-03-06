import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import AsyncStorage from '@react-native-community/async-storage';
import Game from 'GreedyPicks/src/components/Game';
import admob from '@react-native-firebase/admob';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';

const adUnitId = Platform.select({
  ios: 'ca-app-pub-7590562592808907/4769992983',
  android: 'ca-app-pub-7590562592808907/2335401337',
});

let interstitialLoading = true;
const interstitial = InterstitialAd.createForAdRequest(adUnitId);

interstitial.onAdEvent(type => {
  if (type === AdEventType.ERROR || type === AdEventType.LOADED) {
    interstitialLoading = false;
  }
  if (type === AdEventType.OPENED) {
    interstitial.load();
  }
});

interstitial.load();

export default ({route}) => {
  const heroId = route.params.hero.id;
  const [game, setGame] = useState(null);
  const [isRateLimited, setRateLimit] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [gameCounter, setGameCounter] = useState(0);
  useEffect(() => {
    DataProvider.fetchNextGame(heroId, route.params.patch)
      .then(val => {
        setGame(val);
      })
      .catch(e => {
        console.log('error', e);
        if (e == 'rate-limit') {
          setRateLimit(true);
        }
      });
  }, [heroId]);

  if (isRateLimited) {
    return (
      <View>
        <Text>Dotabuff rate limit exceed :( </Text>
        <Text>Please wait a few minutes</Text>
      </View>
    );
  }

  if (game == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <Game
        game={game}
        onAnswer={answer => {
          setAnswer(answer);
          setShowResults(true);
          setGameCounter(gameCounter + 1);
          if (interstitial.loaded) {
            if (gameCounter > 0 && gameCounter % 5 == 0) {
              interstitialLoading = false;
              interstitial.show();
            }
          } else {
            if (!interstitialLoading) {
              interstitial.load();
            }
          }
        }}
        showResults={showResults}
        hero={route.params.hero}
        answer={answer}
        initialSaveStatus={'not-saved'}
      />
      <TouchableOpacity
        onPress={() => {
          setGame(null);
          setAnswer(null);
          setShowResults(false);
          DataProvider.fetchNextGame(heroId, route.params.patch).then(val => {
            setGame(val);
          });
        }}>
        <Text style={{color: '#ffffff', fontSize: 12}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
