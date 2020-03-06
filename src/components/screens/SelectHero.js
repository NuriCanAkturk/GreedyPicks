import React, {useState} from 'react';
import {View, Text, TextInput, ImageBackground} from 'react-native';
import DataProvider from 'GreedyPicks/src/services/DataProvider/';
import HeroList from 'GreedyPicks/src/components/HeroList';
import Hero from 'GreedyPicks/src/services/DataProvider/Hero';

export default props => {
  const [heroList, setHeroList] = useState([]);
  DataProvider.getHeroList().then(data => {
    setHeroList(data);
  });

  return (
    <HeroList
      data={heroList}
      onSelect={(hero: Hero, patch) => {
        props.navigation.navigate('GameBoard', {hero, patch});
      }}
    />
  );
};
