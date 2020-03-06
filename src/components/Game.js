import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';
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
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: DataProvider.getHeroImage(pick.hero.id)}}
          style={{width: 40, height: 40, marginBottom: 10, borderRadius: 100,}}
        />
        <Text style={{color: '#ffffff', fontSize: 12}}>{pick.lane}</Text>
        <Text style={{color: '#ffffff', fontSize: 12, opacity: .8}}>{pick.role}</Text>
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
      <Text style={{color: '#ffffff'}}>Match ID: {game.id}</Text>
      <Text style={{color: '#ffffff'}}>Date: {game.dateText}</Text>
      <Text style={{color: '#ffffff'}}>Duration: {game.duration}</Text>
      <Text style={{color: '#ffffff'}}>Region: {game.region}</Text>
      <Text style={{color: '#ffffff'}}>Game Mode: {game.gameMode}</Text>
      <ImageBackground
        source={require('../assets/images/23768.jpg')}
        style={{flexDirection: 'row', paddingTop: 15, paddingBottom: 15}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            onAnswer('radiant');
          }}>
          <View>{radiantRows}</View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            onAnswer('dire');
          }}>
          <View>{direRows}</View>
        </TouchableOpacity>
      </ImageBackground>
      {showResults && (
        <View>
          <Text style={{color: '#ffffff'}}>results</Text>
          <Text style={{color: '#ffffff'}}>{game.winner == answer ? 'CORRECT' : 'INCORRECT'}</Text>
          <Text style={{color: '#ffffff'}}>{game.winner == 'dire' ? 'Dire' : 'Radiant'} Victory</Text>
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
