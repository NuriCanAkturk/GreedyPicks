import React, {useState} from 'react';
import {View, Text, TextInput, ImageBackground} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import HeroList from 'GreedyPicks/src/components/HeroList';
import Hero from 'GreedyPicks/src/services/DataProvider/Hero';

export default props => {
  const [heroList, setHeroList] = useState([]);
  const [patch, setPatch] = useState('7.24');
  DataProvider.getHeroList().then(data => {
    setHeroList(data);
  });

  return (
    <ImageBackground
      source={require('../../assets/images/steamworkshop_webupload_previewfile_150826626_preview.jpg')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: 200,
          height: 40,
          padding: 10,
          margin: 10,
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 3,
        }}>
        <Text
          style={{
            width: 100,
            height: 20,
            lineHeight: 20,
            borderRightWidth: 1,
            borderRightColor: 'rgba(0,0,0,0.9)',
            color: '#000000',
            fontSize: 12,
              textAlign: 'center'
          }}>
          Game Version
        </Text>
        <TextInput
          style={{
            width: 100,
            height: 20,
            borderWidth: 0,
            borderRadius: 3,
            color: '#000000',
              textAlign: 'center'
          }}
          value={patch}
          onChangeText={text => setPatch(text)}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <HeroList
          data={heroList}
          onSelect={(hero: Hero) => {
            props.navigation.navigate('GameBoard', {hero, patch});
          }}
        />
      </View>
    </ImageBackground>
  );
};
