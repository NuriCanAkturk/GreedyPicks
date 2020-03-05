import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onSelected(props.game);
      }}>
      <View
        style={{height: 60, borderBottomWidth: 1, borderBottomColor: 'red'}}>
        <Text>{props.game.hero.id}</Text>
        <Text>{props.game.id}</Text>
      </View>
    </TouchableOpacity>
  );
};
