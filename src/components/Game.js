import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);

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
          paddingTop: 15,
          paddingBottom: 15,
          margin: 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: 6,
        }}>
        <Image
          source={{uri: DataProvider.getHeroImage(pick.hero.id)}}
          style={{width: 40, height: 40, marginBottom: 10, borderRadius: 100}}
        />
        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>
          {pick.lane}
        </Text>
        <Text style={{color: '#ffffff', fontSize: 12, opacity: 0.8}}>
          {pick.role}
        </Text>
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
    <ImageBackground
      source={require('../assets/images/23766_blur.jpg')}
      style={{flexDirection: 'column', flex: 1}}>
      <View
        style={{
          width: screenWidth,
          height: 55,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 3,
          flexDirection: 'row',
          zIndex: 2,
        }}>
        <View style={{width: (screenWidth - 120) / 2, height: 40}}>
          <Text style={[styles.text_title, {width: (screenWidth - 20) / 2}]}>
            Match ID
          </Text>
          <Text style={styles.title_content}>{game.id}</Text>
        </View>
        <View
          style={{
            width: 100,
            height: 60,
            padding: 10,
            marginTop: 10,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 6,
          }}>
          <Text
            style={[
              styles.text_title,
              {height: 20, lineHeight: 20, textAlign: 'center', opacity: 1},
            ]}>
            Duration
          </Text>
          <Text
            style={{
              color: '#ffffff',
              height: 20,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            {game.duration}
          </Text>
        </View>
        <View style={{width: (screenWidth - 120) / 2, height: 40}}>
          <Text
            style={{
              width: (screenWidth - 120) / 2,
              height: 15,
              lineHeight: 15,
              color: '#ffffff',
              fontSize: 10,
              opacity: 0.6,
              textAlign: 'right',
            }}>
            Date
          </Text>
          <Text
            style={[
              styles.title_content,
              {width: (screenWidth - 120) / 2, textAlign: 'right'},
            ]}>
            {game.dateText}
          </Text>
        </View>
      </View>

      <ScrollView style={{flex: 1, zIndex: 1}}>
        <View style={{width: screenWidth, flexDirection: 'row'}}>
          <View
            style={{
              width: screenWidth / 2,
              height: 50,
              padding: 10,
              paddingTop: 5,
            }}>
            <Text style={styles.text_title}>Game Mode</Text>
            <Text style={{color: '#ffffff'}}>{game.gameMode}</Text>
          </View>
          <View
            style={{
              width: screenWidth / 2,
              height: 50,
              padding: 10,
              paddingTop: 5,
            }}>
            <Text style={[styles.text_title, {textAlign: 'right'}]}>
              Region
            </Text>
            <Text style={{color: '#ffffff', textAlign: 'right'}}>
              {game.region}
            </Text>
          </View>
        </View>
        <ImageBackground
          source={require('../assets/images/23766.jpg')}
          style={{
            width: screenWidth - 20,
            padding: 5,
            margin: 10,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          imageStyle={{borderRadius: 10}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              onAnswer('radiant');
            }}>
            <View>{radiantRows}</View>
          </TouchableOpacity>
          <View style={{width: 100}} />
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              onAnswer('dire');
            }}>
            <View>{direRows}</View>
          </TouchableOpacity>
        </ImageBackground>
        {showResults && (
          <View style={{position: 'absolute'}}>
            <Text style={{color: '#ffffff'}}>results</Text>
            <Text style={{color: '#ffffff'}}>
              {game.winner == answer ? 'CORRECT' : 'INCORRECT'}
            </Text>
            <Text style={{color: '#ffffff'}}>
              {game.winner == 'dire' ? 'Dire' : 'Radiant'} Victory
            </Text>
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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text_title: {
    height: 15,
    lineHeight: 15,
    color: '#ffffff',
    fontSize: 10,
    opacity: 0.6,
  },

  title_content: {
    width: (screenWidth - 20) / 2,
    height: 20,
    lineHeight: 20,
    color: '#ffffff',
    fontSize: 14,
  },
});
