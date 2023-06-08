//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,LogBox } from 'react-native';
import RootNavigator from './src/routes';




// create a component
const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <RootNavigator/>
  );
};


export default App;
