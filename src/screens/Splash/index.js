//import liraries
import React, { Component,useEffect } from 'react';
import {Dimensions, View, Text, StyleSheet, Image, ImageBackground,SafeAreaView } from 'react-native';
import Images from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    let arr = [10,23,34,54,2,45]
   
    let tempval;
    
   
    // useEffect(()=> {
    //     setTimeout(()=>{
    //         navigation.replace("Auth");
    //     },2000)

    // },[]);

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

    // useEffect(()=> {
        
    //     const str = getSecondHighest(arr);
    //     const eachchar = getcountEachChar('abcdaadegcb');
    //     console.log('SecondVal1 ', str)
    //         navigation.replace("Auth");

    //         console.log('each shar  ', eachchar)
    //         navigation.replace("Auth");
      

    // },[]);

    // const getSecondHighest = (arr) =>{
    //     for(let i=0;i<arr.length;i++)
    // {
    //     for(let j= i+1;j<arr.length;j++)
    //     {
    //         if(arr[i] > arr[j])
    //         {
    //             tempval = arr[i];
    //             arr[i] = arr[j];
    //             arr[j] = tempval;
    //         }
    
    //     }
    // }
    // return arr[arr.length-2]
   
    // }

    // const getcountEachChar = (strVal) =>{
    //     let result= {};
    //     for(let str of strVal){
    //         if(result[str] ? result[str]+=1:result[str]=1);
    //     }
    //     return result;
    // }
   


    return (
      //  <SafeAreaView>
      //   <ImageBackground  resizeMode={'cover'} style={styles.backgroundImage} source={Images.splashNew} 
      //   >
            
      //   </ImageBackground>
       
      //   </SafeAreaView>
     
        <ImageBackground  resizeMode={'cover'} style={styles.backgroundImage} source={Images.splashNew} 
        >
            
        </ImageBackground>
       
       
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%'
      
    },
    // backgroundImage: {
    //     position: 'absolute',
    //     left: 0,
    //     top: 0,
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // }
    backgroundImage: {
      width: '100%', height: '100%'
  }
});

//make this component available to the app
export default Splash;
