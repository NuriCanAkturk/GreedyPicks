import React from 'react';
import HeroItem from './HeroItem';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';

export default props => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <HeroItem
            onSelect={heroId => {
              props.onSelect(heroId);
            }}
            hero={item}
          />
        )}
      />
    </View>
  );
};
