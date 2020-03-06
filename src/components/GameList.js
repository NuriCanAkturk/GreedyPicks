import React from 'react';
import GameItem from './GameItem';
import {FlatList, Text, View, TouchableOpacity, Platform} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

export default props => {
  return (
    <View style={{flex: 1}}>
      {props.data.length == 0 && (
        <View style={{flex: 1}}>
          <Text
            style={{
              marginTop: 40,
              flex: 1,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            You can save matches to see here. For now, this is a great
            opportunity to publish some ads :P
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <BannerAd
              size={BannerAdSize.MEDIUM_RECTANGLE}
              unitId={
                Platform.OS == 'ios'
                  ? 'ca-app-pub-7590562592808907/5993164063'
                  : 'ca-app-pub-7590562592808907/4243106303'
              }
              testDevices={[TestIds]}
              onAdFailedToLoad={error => console.error(error)}
            />
          </View>
        </View>
      )}
      <View style={{flex: 1}}>
        <FlatList
          data={props.data}
          renderItem={({item}) => (
            <GameItem game={item} onSelected={game => props.onSelected(game)} />
          )}
        />
      </View>
    </View>
  );
};
