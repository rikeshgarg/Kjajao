//import liraries
import React, { useEffect, Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Images from '../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';

// create a component
const Register = () => {
    return (
        <ImageBackground style={{ flex:1 }} source={Images.login_background} imageStyle={{ resizeMode: 'cover' }}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
                <View style={{ marginTop: '30%', marginLeft: '20%' }}>
                    <Text style={styles.loginText}>Login</Text>
                    <Text style={styles.subHeaderText}>Please Register to continue.</Text>


                    <View style={{
                        marginTop: '10%', borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth, width: '85%'
                    }}>
                        <Text style={styles.userNameText}>USER NAME</Text>
                        <View style={{
                            flexDirection: 'row', width: '80%', alignItems: 'center', marginBottom: -7
                        }}>

                            <Icon name="user" size={20} color="red" />
                            <TextInput
                                style={{ marginLeft: 5,flex: 1 }}
                                placeholder='Enter User Name'
                                placeholderTextColor="#6E878F"
                                autoCapitalize="none"
                                numberOfLines={1}
                                keyboardType="email-address"
                                selectionColor="#000000"
                                returnKeyType="next"

                            ></TextInput>
                        </View>
                    </View>

                    <View style={{
                        marginTop: '10%', borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth, width: '85%'
                    }}>
                        <Text style={styles.userNameText}>PASSWORD</Text>
                        <View style={{
                            flexDirection: 'row', width: '80%', alignItems: 'center', marginBottom: -7
                        }}>

                            <Icon name="lock" size={20} color="red" />
                            <TextInput
                                style={{ marginLeft: 5, flex: 1 }}
                                placeholder='Enter Password'
                                placeholderTextColor="#6E878F"
                                returnKeyType='go'
                                secureTextEntry={true}

                                autoCorrect={false}
                            ></TextInput>
                        </View>
                    </View>


                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.6}
                    >
                        <Text style={{ color: '#FFFFFF', padding: 10, fontSize: 18, fontWeight: 'bold' }}>Sign In</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </ImageBackground>
    );
};

// define your styles


const styles = StyleSheet.create({
    loginText: {
        color: 'red',
        fontSize: 40,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: 'black',
        fontSize: 20,

    },
    userNameText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonStyle: {
        backgroundColor: 'red',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: 'red',
        width: '85%',
        marginTop: '20%',
        alignItems: 'center',
        borderRadius: 20,


    },

});

//make this component available to the app
export default Register;
