import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import HeroList from 'GreedyPicks/src/components/HeroList';
import Hero from 'GreedyPicks/src/services/DataProvider/Hero';

export default props => {
  const [heroList, setHeroList] = useState([]);
  DataProvider.getHeroList().then(data => {
    setHeroList(data);
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <HeroList
        data={heroList}
        onSelect={(heroId) => {
          props.navigation.navigate('GameBoard', {heroId});
        }}
      />
    </View>
  );
};
