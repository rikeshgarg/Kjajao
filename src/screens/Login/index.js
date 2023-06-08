//import liraries
import React, { useEffect, Component, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native';
import Images from '../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../util/loader';
import Axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



// create a component


const Login = ({ navigation }) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState("");
    const [isValidemail, setisValidemail] = useState(false);
    const [isValidPass, setisValidPass] = useState(false);
    const [isReqemail, setisReqemail] = useState(false);

    //const { navigation } = navigation;
    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            console.log("CallBAck ", "yes");
        }

    }, [isFocused]);


    const goHome = () => {
        // navigation.replace("bottomTabsNav");
        //navigation.replace("bottomTabsNav");
        setError('');

        if (Email != '') {
            setisReqemail(false);
        } else {
            setisReqemail(true);
        }

        if (Password != '') {
            setisValidPass(false);
        } else {
            setisValidPass(true);
        }

    }

    const handleSubmitPress = async () => {
        setError('');

        if (Email != '') {
            setisReqemail(false);
        } else {
            setisReqemail(true);
        }

        if (Password != '') {
            setisValidPass(false);
        } else {
            setisValidPass(true);
        }

        if (!isReqemail && Email != '') {
            if (!isValidemail) {
                if (!isValidPass && Password != '') {
                    setLoading(true)
                    await Axios.post('http://banshividya.aanksoft.com/ProcessAPIWithK.aspx', {
                        userid:Email,
      passwd: Password,
      reqtype:'reqlogin',
}).then((response) => {
    console.log('response ',response.data.response);
    setLoading(false);
    if(response.data.response == 'OK'){
        setLoading(false);
        //const data = response.data.data.email;
        console.log('data ',response.data);
        AsyncStorage.setItem('user_id', response.data.id.toString());
        AsyncStorage.setItem('email_id', Email);
        AsyncStorage.setItem('password', Password);
        //setUserData('user_id',response.data.data.id.toString());
        AsyncStorage.setItem('UserData',JSON.stringify(response.data));
        //setUserData('loggedInStatus','loggedIn');
        //this.props.screenProps.isLoggedIn(); 
        navigation.replace("bottomTabsNav");
    }
    else {
        setError('Please check your email id or password');
      //this.setState({errortext:'Please check your email id or password'});
        //alert('Invalid Sign in');
        setLoading(false);
        }
  }, (error) => {
    console.log(error);
    setLoading(false)

  });
                } else {
                    isValidPass(true)
                }
            }
            else {
                isValidemail(true);
            }

        } else {
            isReqemail(true);
        }

    }


    const emailcheck = (text) => {
        //alert(text);
        console.log(text);
        if (text != '') {
            setEmail(text);
            setisReqemail(false);

            if (validateEmail(text)) {
                setisValidemail(false);
                console.log('true');
            } else {
                setisValidemail(true);
                setError('');
                console.log('false');
            }
        } else {
            setError('');
            setEmail('');
            setisReqemail(true);
            setisValidemail(false);
        }
    }

    const passwordcheck = (text) => {
        //alert(text);
        console.log(text);
        if (text != '') {
            setPassword(text);
            setisValidPass(false);

        } else {
            setError('');
            setPassword(text);
            setisValidPass(false);
        }
    }


    const validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log('fun1 ');
            return false;
        }
        else {
            console.log('fun2 ');
            return true;
        }
    }


    return (

        <ImageBackground resizeMode={'cover'} style={styles.backgroundImage} source={Images.login_backgroundNew}>
            <KeyboardAvoidingView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
            <Loader loading={Loading} />
                <View style={{ marginTop: '30%', marginLeft: '20%' }}>
                    <Text style={styles.loginText}>Login</Text>
                    <Text style={styles.subHeaderText}>Please sign in to continue.</Text>


                    <View style={{
                        marginTop: '10%', borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth, width: '85%'
                    }}>
                        <Text style={styles.userNameText}>USER NAME</Text>
                        <View style={{
                            flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: -7
                        }}>

                            <Image source={Images.userName} style={{ height: 30, width: 30 }} />
                            <TextInput
                                style={{ marginLeft: 5, flex: 1,fontSize:16 }}
                                placeholder='Enter User Name'
                                placeholderTextColor="#6E878F"
                                autoCapitalize="none"
                                numberOfLines={1}
                                keyboardType="email-address"
                                selectionColor="#000000"
                                returnKeyType="next"
                                onChangeText={text => emailcheck(text)}
                            ></TextInput>
                        </View>

                    </View>
                    {isReqemail ? (
                        <Text style={styles.labelContainer}>Email is required</Text>
                    ) : (null)}
                    {isValidemail ? (
                        <Text style={styles.labelContainer}>Email is not valid</Text>
                    ) : (null)}
                    {/* <Text style={styles.labelContainer}>Email is required</Text>
                    <Text style={styles.labelContainer}>Email is not valid</Text> */}

                    <View style={{
                        marginTop: '10%', borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth, width: '85%'
                    }}>
                        <Text style={styles.userNameText}>PASSWORD</Text>
                        <View style={{
                            flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: -7
                        }}>

                            <Image source={Images.password} style={{ height: 30, width: 30 }} />
                            <TextInput
                                style={{ marginLeft: 5, flex: 1,fontSize:16 }}
                                placeholder='Enter Password'
                                placeholderTextColor="#6E878F"
                                returnKeyType='go'
                                secureTextEntry={true}
                                onChangeText={text => passwordcheck(text)}
                                autoCorrect={false}
                            ></TextInput>
                        </View>
                    </View>
                    {isValidPass ? (
                        <Text style={styles.labelContainer}>Password is required</Text>
                    ) : (null)}

{Error != '' ? (
            <Text style={styles.labelContainer}> {Error} </Text>
          ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.6}
                        onPress={() => handleSubmitPress()}
                    >
                        <Text style={{ color: '#FFFFFF', padding: 10, fontSize: 18, fontWeight: 'bold' }}>LOGIN</Text>
                    </TouchableOpacity>
                    {/* <Text  style={{color: '#000',  padding: 10, fontSize: 18, fontWeight: 'bold' }} onPress={() => navigation.navigate('Register')}>REGISTER</Text> */}
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>



    );
};

// define your styles


const styles = StyleSheet.create({
    loginText: {
        color: '#e22729',
        fontSize: 40,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: 'black',
        fontSize: 18,

    },
    userNameText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonStyle: {
        backgroundColor: '#e22729',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#e22729',
        width: '85%',
        marginTop: '20%',
        alignItems: 'center',
        borderRadius: 20,


    },
    backgroundImage: {
        //position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    labelContainer: {
        alignSelf: 'flex-start',
        marginTop: '2%',
        color: 'red',
        fontSize: 15,
    },

});


//make this component available to the app
export default Login;
