import React, {useState} from 'react';
import HeroItem from './HeroItem';
import {
  FlatList,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

const background = require('../assets/images/steamworkshop_webupload_previewfile_150826626_preview.jpg');

export default props => {
  const [patch, setPatch] = useState('7.24');
  return (
    <ImageBackground
      source={background}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: 200,
          height: 40,
          padding: 10,
          margin: 10,
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 3,
        }}>
        <Text
          style={{
            width: 100,
            height: 20,
            lineHeight: 20,
            borderRightWidth: 1,
            borderRightColor: 'rgba(0,0,0,0.9)',
            color: '#000000',
            fontSize: 12,
            textAlign: 'center',
          }}>
          Game Version
        </Text>
        <TextInput
          style={{
            width: 100,
            height: 20,
            borderWidth: 0,
            borderRadius: 3,
            color: '#000000',
            textAlign: 'center',
          }}
          value={patch}
          onChangeText={text => setPatch(text)}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            flex: 1,
            padding: 15,
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.1)',
          }}>
          <FlatList
            data={props.data}
            renderItem={({item}) => (
              <HeroItem
                onSelect={hero => {
                  props.onSelect(hero, patch);
                }}
                hero={item}
              />
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});
