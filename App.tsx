/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import FlashMessage from "react-native-flash-message";

import AppContainer from './src/screens/navigation/AppContainer';
import { RegisterFunctionLoginContext, RegisterLoginContext,useRegisterLoginReducer } from './src/screens/navigation/context/LoginContext';

const App = () => {
  const {currentState, onLoginAction}= useRegisterLoginReducer()
  return (
    <RegisterLoginContext.Provider value={ currentState}>
      <RegisterFunctionLoginContext.Provider value={onLoginAction}>
        <View style={{ flex: 1 }}>
        <AppContainer />
        <FlashMessage position="top" />
      </View>
      </RegisterFunctionLoginContext.Provider>
      
    </RegisterLoginContext.Provider>

  );
};

const styles = StyleSheet.create({

});

export default App;
