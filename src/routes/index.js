//import liraries
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import SplashScreen from './splash';
import AuthScreen from './auth';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import bottomTabsNav from './bottomtabs';
import Details from '../screens/Home/details';
import MyDrawer from './drawernavigator';


const stack = createStackNavigator();
//const drawer = createDrawerNavigator();
// create a component
// const HomeScreenStack = () =>{
//     return(
//     <stack.Navigator screenOptions={{headerShown:false}}>
//        <stack.Screen name='MyDrawer' component={MyDrawer}></stack.Screen>
//     </stack.Navigator>
//     )
// }
const RootNavigator = () => {
    return (
        <NavigationContainer>
          
            <stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
                <stack.Screen name='Splash' component={SplashScreen}></stack.Screen>
                <stack.Screen name='Auth' component={AuthScreen} ></stack.Screen>
                {/* <stack.Screen name='MyDrawer' component={MyDrawer}></stack.Screen> */}
                <stack.Screen name='bottomTabsNav' component={bottomTabsNav}></stack.Screen>

                {/* <drawer.Navigator screenOptions={{headerStyle:{backgroundColor:'red'},headerTintColor:'white'}}>
                    <drawer.Screen name = "HomeScreenStack" component={HomeScreenStack} options={{drawerLabel:'Home',title:'Home'}}>

                    </drawer.Screen>
                </drawer.Navigator> */}
                {/* <stack.Screen name='bottomTabsNav' component={bottomTabsNav}></stack.Screen> */}
                {/* <stack.Screen name='Details' component={Details}></stack.Screen> */}
            </stack.Navigator>
            {/* <SplashScreen/>
            <AuthScreen/> */}
        </NavigationContainer>
    );
};



//make this component available to the app
export default RootNavigator;
