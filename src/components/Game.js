import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import AsyncStorage from '@react-native-community/async-storage';

export default ({
  game,
  onAnswer,
  showResults,
  hero,
  answer,
  initialSaveStatus,
}) => {
  const [saveStatus, setSaveStatus] = useState(initialSaveStatus);
  const renderer = (pick: Pick, i) => {
    return (
      <View
        key={'row' + i}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 2,
          borderColor: 'white',
        }}>
        <Image
          source={{uri: DataProvider.getHeroImage(pick.hero.id)}}
          style={{width: 40, height: 40}}
        />
        <Text>{pick.lane}</Text>
        <Text>{pick.role}</Text>
      </View>
    );
  };

  let radiantRows = [];
  for (var i in game.radiant) {
    radiantRows.push(renderer(game.radiant[i], i));
  }

  let direRows = [];
  for (var i in game.dire) {
    direRows.push(renderer(game.dire[i], i));
  }

  return (
    <View style={{flexDirection: 'column'}}>
      <Text>Match ID: {game.id}</Text>
      <Text>Date: {game.dateText}</Text>
      <Text>Duration: {game.duration}</Text>
      <Text>Region: {game.region}</Text>
      <Text>Game Mode: {game.gameMode}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            onAnswer('radiant');
          }}>
          <View style={{backgroundColor: 'green'}}>{radiantRows}</View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            onAnswer('dire');
          }}>
          <View style={{backgroundColor: 'red'}}>{direRows}</View>
        </TouchableOpacity>
      </View>
      {showResults && (
        <View>
          <Text>results</Text>
          <Text>{game.winner == answer ? 'CORRECT' : 'INCORRECT'}</Text>
          <Text>{game.winner == 'dire' ? 'Dire' : 'Radiant'} Victory</Text>
          {saveStatus == 'not-saved' && (
            <TouchableOpacity
              onPress={() => {
                setSaveStatus('saving');
                AsyncStorage.getItem('savedGames').then(v => {
                  let value = JSON.parse(v);
                  if (value == null) {
                    value = [];
                  }
                  value.push({...game, hero: hero, answer});
                  AsyncStorage.setItem(
                    'savedGames',
                    JSON.stringify(value),
                  ).then(() => {
                    setSaveStatus('saved');
                  });
                });
              }}>
              <Text>Save Match ID</Text>
            </TouchableOpacity>
          )}
          {saveStatus == 'saving' && <Text>...</Text>}
          {saveStatus == 'saved' && <Text>Saved</Text>}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.dotabuff.com/matches/' + game.id);
            }}>
            <Text>Dotabuff Link</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
