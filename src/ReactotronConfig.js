import Reactotron from 'reactotron-react-native';

Reactotron
  //.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure()
  .useReactNative()
  .connect();
