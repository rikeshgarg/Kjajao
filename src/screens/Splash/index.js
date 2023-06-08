//import liraries
import React, { Component, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native';
import Images from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      console.log('splash');
      AsyncStorage.getItem('user_id').then(value =>
        navigation.replace(
          value === null ? 'Auth' : 'bottomTabsNav'
        )
      );
    }, 500);
  }, []);


  return (
    <ImageBackground resizeMode={'cover'} style={styles.backgroundImage} source={Images.splashNew}></ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%', height: '100%'

  },

  backgroundImage: {
    width: '100%', height: '100%'
  }
});

//make this component available to the app
export default Splash;
