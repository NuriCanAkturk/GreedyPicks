import React from 'react';
import HeroItem from './HeroItem';
import {FlatList, ImageBackground, View, StyleSheet} from 'react-native';

export default props => {
  return (
    <View style={{flex: 1, padding: 15, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)'}}>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <HeroItem
            onSelect={hero => {
              props.onSelect(hero);
            }}
            hero={item}
          />
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create(
{

});
