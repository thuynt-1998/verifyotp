/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppContainer from './src/screens/navigation/AppContainer';

const App= () => {
  return (
    <View style= {{flex:1}}>
      <AppContainer/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
