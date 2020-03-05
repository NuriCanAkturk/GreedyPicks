import React from 'react';
import GameItem from './GameItem';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';

export default props => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={props.data}
        renderItem={({item}) => <GameItem game={item} onSelected={(game) => props.onSelected(game) } />}
      />
    </View>
  );
};
