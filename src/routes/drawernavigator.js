//import liraries
import React, { Component } from 'react';
import {getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NavigationDrawerStructure from './NavigationDrawerStructure';

import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import bottomTabsNav from './bottomtabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Details from '../screens/Home/details';
import Explore from '../screens/Explore';



const drawer = createDrawerNavigator();
const stack = createStackNavigator();

const getHeaderTitle = (route) => {
   
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'bottomTabsNav';
    console.log("route",routeName);
    switch (routeName) {
      case 'bottomTabsNav':
        return 'Home';
        case 'Home':
            return 'Home';
      case 'About':
        return 'About';
      case 'Setting':
        return 'Setting';
        case 'Explore':
        return 'Explore';
    }
  };

const tabstack =({navigation})=>{
    return(
    <stack.Navigator  >
        <stack.Screen name = "bottomTabsNav" component={bottomTabsNav} options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#e22729', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleAlign:'center',
          headerTitleStyle: {

            fontWeight: 'bold', //Set Header text style
          },
        })}></stack.Screen>
        {/* <stack.Screen name = "Explore" component={Explore}></stack.Screen> */}
    </stack.Navigator>
    );
}

const Explorestack = ({navigation}) =>{
  return(
    <stack.Navigator>
      <stack.Screen name = "Explore" component={Explore} options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#e22729', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleAlign:'left',
          headerTitleStyle: {

            fontWeight: 'bold', //Set Header text style
          },
        })}></stack.Screen>
    </stack.Navigator>
  );
}

// create a component
const MyDrawer = ({navigation}) => {
    return (
       
        <drawer.Navigator 
              screenOptions={{headerShown:true,headerStyle:{backgroundColor:'#e22729'},headerTintColor:'white'}}
           >
        <drawer.Screen name = "Home Tab" component={tabstack} options={{headerShown:false}} >
       
        </drawer.Screen>
        <drawer.Screen name = "Explorestack" component={Explorestack} options={{headerShown:false}}></drawer.Screen>
    </drawer.Navigator>
   
    );
};

//make this component available to the app
export default MyDrawer;
