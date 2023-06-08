//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// create a component
const NavigationDrawerStructure  = (props) => {
  
    const toggleDrawer = () => {
       
        props.navigationProps.toggleDrawer();
      };
    return (
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{ marginLeft: 15}} onPress={() => toggleDrawer()}>
          {/*Donute Button Image */}
          {/* <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
            }}
            style={{width: 25, height: 25, marginLeft: 5}}
          /> */}
          <Icon name="bars" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
};

//make this component available to the app
export default NavigationDrawerStructure ;
