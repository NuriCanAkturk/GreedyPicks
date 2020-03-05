import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: 'white',
            height: 40,
            borderWidth: 1,
            borderColor: 'black',
            width: 100,
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
    </View>
  );
};
