
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/Splash";



const stack = createStackNavigator();
// create a component
const SplashScreen = () => {
    return (
        <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name="SplashScreen" component={Splash}></stack.Screen>
        </stack.Navigator>
    );
};



//make this component available to the app
export default SplashScreen;

