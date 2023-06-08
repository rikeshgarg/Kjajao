//import liraries

import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../screens/Login";
import Register from '../screens/Register';

const AuthStack = createStackNavigator();

// create a component
const AuthScreen = () => {
    return (
       <AuthStack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        <AuthStack.Screen name ="Login" component={Login}></AuthStack.Screen>
        <AuthStack.Screen name ="Register" component={Register}></AuthStack.Screen>
       </AuthStack.Navigator>
    );
};

//make this component available to the app
export default AuthScreen;
