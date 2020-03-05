import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

export default ({hero, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(hero);
      }}>
      <View style={{flex: 1, height: 60, flexDirection: 'row'}}>
        <Image source={{uri: hero.image_url}} style={{width: 40, height: 40}} />
        <Text>{hero.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
