import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import AsyncStorage from '@react-native-community/async-storage';
import Game from 'GreedyPicks/src/components/Game';

export default ({route}) => {
  const heroId = route.params.hero.id;
  const [game, setGame] = useState(null);
  const [isRateLimited, setRateLimit] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answer, setAnswer] = useState(null);
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
    <View style={{flex:1}}>
      <Game
        game={game}
        onAnswer={answer => {
          setAnswer(answer);
          setShowResults(true);
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
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
