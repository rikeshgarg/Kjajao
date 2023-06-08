//import liraries
import React, { useState,Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
// create a component
const Setting = (props) => {
  const[visible,setvisible] = useState(true);

    const hidespinner = ()=>{
        setvisible(false);
    }
    const IndicatorLoadingView=() =>{
        return (
          <ActivityIndicator
            color="#e22729"
            size="large"
            style={styles.IndicatorStyle}
          />
        );
      }

    return (
        <View style={styles.container}>
            <WebView
       onLoad={() => hidespinner}
        source={{
          uri: 'https://www.leukemiacrusaders.org/contacts/',
        }}
        
        renderLoading={IndicatorLoadingView}
        startInLoadingState={true}
      />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    IndicatorStyle: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
});

//make this component available to the app
export default Setting;
