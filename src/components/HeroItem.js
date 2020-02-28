import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default ({hero, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(hero.id);
      }}>
      <View style={{flex: 1, height: 30}}>
        <Text>{hero.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
