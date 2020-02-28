import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';

export default ({route}) => {
  const heroId = route.params.heroId;
  const [game, setGame] = useState(null);
  const [isRateLimited, setRateLimit] = useState(false);
  useEffect(() => {
    DataProvider.fetchNextGame(heroId)
      .then(val => {
        setGame(val);
      })
      .catch(e => {
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
    <View>
      <Text>asdf</Text>
      <Text>{game.id}</Text>
      <Text>{game.fetched ? 'fetched' : 'not fetched'}</Text>
      <TouchableOpacity
        onPress={() => {
          DataProvider.fetchNextGame(heroId).then(val => {
            setGame(val);
          });
        }}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
