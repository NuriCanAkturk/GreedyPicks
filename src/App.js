import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DataProvider from './services/DataProvider/DataProvider';

const App: () => React$Node = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome</Text>
    </View>
  );
};

export default App;
