import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';

const resizeIcon = require('GreedyPicks/src/assets/images/resize.png');

export default props => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', width: 60}}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('SavedGames');
        }}>
        <Image source={resizeIcon} style={{width: 24, height: 24}} />
      </TouchableOpacity>
    </View>
  );
};
