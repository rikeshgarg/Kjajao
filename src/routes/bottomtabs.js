//import liraries

import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet,TouchableOpacity,Alert,Image , TouchableWithoutFeedback} from 'react-native';
import Home from '../screens/Home';
import About from '../screens/About';
import Setting from '../screens/Setting';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoutComponent from '../screens/Logout';
import Images from '../assets';
import Details from '../screens/Home/details';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native/Libraries/Alert/Alert';
const bottomTabs = createBottomTabNavigator();
const stack = createStackNavigator();

// const homestack = (props) =>{
//   return(
//     <stack.Navigator initialRouteName='Home' >
//       <stack.Screen name = "Home" component={Home} options={{headerShown:false}}/>
//       <stack.Screen name = "Details" component={Details}/>
    
//     </stack.Navigator>

//   );
// }


// create a component
const bottomTabsNav = () => {

    

    return (
       <bottomTabs.Navigator initialRouteName='Home' screenOptions={{headerShown:true,tabBarStyle:{borderTopWidth:0},tabBarShowLabel:false,tabBarLabelStyle:{fontSize:14,fontWeight:'bold'},tabBarActiveBackgroundColor:'#e22729',tabBarInactiveBackgroundColor:'#e22729' }} >
            <bottomTabs.Screen name = "Home" component={Home} options={{tabBarLabelStyle:{fontSize:14,fontWeight:'bold'},headerStyle:{backgroundColor:'#e22729'}, headerTitleAlign:'center',headerTitleStyle:{color:'white'},tabBarIcon:({navigation}) => (
                
                <Image source={Images.home} style={{height:65,width:65}} />
               
            ) }}></bottomTabs.Screen>
             
            <bottomTabs.Screen name = "VIEW WEBSITE" component={About} options={{headerStyle:{backgroundColor:'#e22729'},headerTitleAlign:'center',headerTitleStyle:{color:'white'} , tabBarIcon:({color,size}) => (
                <Image source={Images.browse} style={{height:65,width:65}} />
            ) }}></bottomTabs.Screen>
            <bottomTabs.Screen name = "CONTACT US" component={Setting} options={{headerStyle:{backgroundColor:'#e22729'},headerTitleAlign:'center',headerTitleStyle:{color:'white'},tabBarLabelStyle:{fontSize:12,fontWeight:'bold'} , tabBarIcon:({color,size}) => (
                 
                 <Image source={Images.contact} style={{height:65,width:65}} />
            ) }}></bottomTabs.Screen>
             {/* <bottomTabs.Screen name = "Logout" component={"LogoutComponent"} options={{tabBarLabelStyle:{fontSize:12,fontWeight:'bold'} , tabBarIcon:({color,size}) => (
                <Icon
                name="user"
                size={size}
                color={color}
                
              />
            ),  }}></bottomTabs.Screen> */}

                <bottomTabs.Screen name="Logout" component={"LogoutComponent"} 
            options={({navigation})=> ({
           tabBarButton:(props) => <TouchableOpacity {...props} activeOpacity={1} onPress={()=>{
            return Alert.alert(   // Shows up the alert without redirecting anywhere
                'Confirmation required'
                ,'Do you really want to logout?'
                ,[
                  {text: 'Accept', onPress: () => {AsyncStorage.clear();
                    navigation.replace('Auth');
                }},
                  {text: 'Cancel'}
                 ]
            );
        }}/>
           ,tabBarLabelStyle:{fontSize:12,fontWeight:'bold'},tabBarIcon:({color,size}) => (
            <Image source={Images.logout} style={{height:65,width:65}} />
        )})}/>
       </bottomTabs.Navigator>
    );
};



//make this component available to the app
export default bottomTabsNav;
