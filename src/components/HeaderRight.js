import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';

const resizeIcon = require('GreedyPicks/src/assets/images/resize.png');
const selectHero = require('GreedyPicks/src/assets/images/selecthero.png');

export default props => {
  console.log('header props', props);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', width: 60}}>
      {props.button == 'saved-games' && (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SavedGames');
          }}>
          <Image source={resizeIcon} style={{width: 24, height: 24}} />
        </TouchableOpacity>
      )}
      {props.button == 'select-hero' && !props.navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            props.navigation.replace('SelectHero');
          }}>
          <Image source={selectHero} style={{width: 24, height: 24}} />
        </TouchableOpacity>
      )}
    </View>
  );
};
