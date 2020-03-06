import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default ({hero, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() =>
      {
        onSelect(hero);
      }}

      style={styles.item}
    >
      <View style={{flex: 1, height: 60, flexDirection: 'row'}}>
        <Image source={{uri: hero.image_url}} style={{width: 40, height: 40, borderRadius: 3}} />
        <Text style={styles.name}>{hero.name}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create(
{
    item:
    {
        height: 52,
        padding: 5,
        marginTop: 2,
        marginBottom: 2,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 3,
    },

    name:
    {
        height: 30,
        lineHeight: 30,
        marginTop: 5,
        marginLeft: 10,
        color: '#ffffff',
        fontSize: 14,
    }
});
