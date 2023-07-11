//import liraries
import React, { Component, useEffect, useState } from 'react';
import { ImageBackground, StatusBar, TouchableWithoutFeedback, Image, Alert, StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, TextInput, RefreshControl } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import FastImage from 'react-native-fast-image'


import Axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from 'react-native-image-slider-box';

import Loader from '../../util/loader';

import moment from 'moment';
import Gallery from 'react-native-image-gallery';

// create a component
const Home = (props) => {
    const [items, setItems] = useState([]);
    const [Arrayitems, setArrayItems] = useState([]);
    const [Loading, setLoading] = useState(false);
    const images = [require('../../assets/common/img_sample.jpg'), require('../../assets/common/image1.jpg'), require('../../assets/common/image1.jpg'), require('../../assets/common/image1.jpg')]
    useEffect(() => {
        var Currentdate = moment().format('YYYY-MM-DD');
        console.log("Date.......", Currentdate);
        setItems([require('../../assets/common/splash.png'), require('../../assets/common/splash.png')])
        readData();

    }, []);

    readData = async () => {
        try {
            const email = await AsyncStorage.getItem('email_id');
            const password = await AsyncStorage.getItem('password');
            const userdata = await AsyncStorage.getItem('UserData');
            let userDetails = JSON.parse(userdata);
            let titlename = userDetails.donorname;
            props.navigation.setOptions({
                title: 'Welcome ' + titlename,
            })
            console.log('async data', email + ",,,,,," + password)
            getdata(email, password);
        } catch (e) {

        }
    }

    const convertdate = (currentdate) => {
        // let date = new Date(currentdate);
        let dateObject = moment(currentdate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
        let Currentdate = moment().format('YYYY-MM-DD');

        const startDate = moment(dateObject); 
        const endDate = moment(Currentdate); 
        const duration = moment.duration(endDate.diff(startDate));
        const years = duration.years();
        const months = duration.months();
        if (months == 0) {
            console.log('NewDate', years + "," + months)
            return years + " Year ";
        } else if (years == 0) {
            return months + " Months";
        } else if (years != 0 && months != 0) {
            return years + " Year " + months + " Months";
        }

        console.log('NewDate', years + "," + months)
    }

    const getdata = async (email, password) => {
        console.log('getdata', email + ",,,,,," + password)
        setLoading(true);
        await Axios.post('http://banshividya.aanksoft.com/ProcessAPIWithK.aspx', {
            userid: email,
            passwd: password,
            reqtype: 'getlcno',
        }).then((response) => {
            console.log('response ', response.data.response);

            if (response.data.response == 'OK') {
                console.log('Result ' + JSON.stringify(response.data.lcno));
                setArrayItems(response.data.lcno)
                console.log(Arrayitems.length);
                setLoading(false);

            } else {
                setLoading(false);
            }

        }, (error) => {
            console.log(error);
            setLoading(false);

        });
    }

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "#fff",
                }}
            />
        );
    };
    return (
        <View style={styles.container}>
            <Loader loading={Loading} />
            {/* <Text  style={{fontSize:25,color:'black'}}>Home Screen</Text> */}
            {/* <Text onPress={() => props.navigation.navigate('Details')}>Click to Details</Text> */}

            {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#e22729', height: 30, }}>
                    <View style={{ flexDirection: 'column', position: 'absolute', marginTop: 10 }}>
                        <Image source={require('../../assets/common/img_sample.jpg')} style={styles.imageView} />
                    </View>
                    <View style={{ flexDirection: 'column', position: 'absolute', marginTop: 10 }}>
                    <Text style={{ color: '#ffffff', textAlignVertical: 'center', textAlign: 'center' }}>
                        Hello Rikesh
                    </Text>
                    </View>
                </View>

            </View> */}
            <View style={{ flexDirection: 'column', width: '100%', height: 170 }}>
                {/* <Gallery
          style={{backgroundColor:'#000', }}
          images={[
            { source: require('../../assets/common/image1.jpg'), dimensions: { width: 400, height: 150 } },
            { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
            { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
            { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
            { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
          ]}
        /> */}

                <ImageBackground resizeMode={'stretch'} style={{ marginTop: 0, width: '100%', height: '100%' }} source={require('../../assets/common/slider_image.png')}
                >

                </ImageBackground>
                {/* <SliderBox
                    dotColor="red"   sliderBoxHeight={"99%"} images={[require('../../assets/common/slider_image.png')]} /> */}

            </View>

            <View
                style={{
                    height: "2%",
                    width: "100%",
                    backgroundColor: "gray",
                }}
            />

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 5, marginRight: 5, color: '#e22729', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>THE LIVES YOU</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 5, marginRight: 5, color: '#e22729', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}> HAVE CONTRIBUTED </Text>

            </View>

            {
                Arrayitems.length > 0 ?
                    (
                        <FlatList style={{ marginBottom: 5 }}
                            data={Arrayitems}
                            renderItem={({ item }) =>

                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <View style={styles.imageViewBG}>
                                                {/* <Image source={require('../../assets/common/img_sample.jpg')} style={styles.imageView} /> */}
                                                {/* <Image source={{uri: item.img}} style={styles.imageView} /> */}
                                                <FastImage
                                                    style={styles.imageView}
                                                    source={{
                                                        uri: item.img,
                                                        priority: FastImage.priority.high,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                />
                                            </View>
                                            <View style={{ flexShrink: 1, flexDirection: 'column', marginTop: 1 }}>
                                                <View style={{ flexDirection: 'row', height: 30, textAlignVertical: 'center', backgroundColor: '#e22729' }}>
                                                    {/* <Text style={{ marginLeft: 5, marginRight: 2, color: '#ffffff', fontSize: 15, textAlignVertical: 'center', fontWeight: '600' }}>Name: </Text> */}
                                                    <Text style={{ alignItems:'center',width: '100%', color: '#ffffff', fontSize: 15, alignSelf: 'center', alignContent: 'center', textAlign: 'center' }}>{item.patientname}</Text>
                                                </View>
                                                {/* <View style={{ marginLeft: 5, marginRight: 2, flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Born On: </Text>
                                                    <Text style={{ color: '#000000', fontSize: 15 }}>{item.birthdate}</Text>
                                                </View> */}

                                                <View style={{ marginLeft: 5, marginRight: 2, flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Age: </Text>
                                                    <Text style={{ color: '#000000', fontSize: 15 }}>{item.age}</Text>
                                                </View>

                                                <View style={{ marginLeft: 5, marginRight: 2, flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Illness: </Text>
                                                    <Text style={{ color: '#000000', fontSize: 15 }}>Cancer-{item.lllness}</Text>
                                                </View>
                                                <View style={{ marginLeft: 5, marginRight: 2, flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Treating Doc: </Text>
                                                    <Text style={{ color: '#000000', fontSize: 15 }}>{item.doctorname}</Text>
                                                </View>
                                                <View style={{ flex: 1, flexWrap: 'wrap', flexShrink: 1, marginLeft: 5, marginRight: 2, flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Hospital: </Text>
                                                    <Text style={{ color: '#000000', fontSize: 15 }}>{item.hospitalname}</Text>
                                                </View>
                                                <View style={{ marginLeft: 5, marginRight: 2, flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Parent Occupation: </Text>
                                                    <Text style={{ color: '#000000', fontSize: 15 }}>{item.occupationfather}</Text>
                                                </View>
                                               
                                                <View style={{ flex: 1, flexWrap: 'wrap', flexShrink: 1, marginLeft: 5, marginRight: 2, flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Belongs to: </Text>
                                                    {(item.location) != "" ?
                                                        (
                                                            <Text style={{ color: '#000000', fontSize: 15 }}>{item.location},{item.statename}</Text>
                                                        ) :
                                                        (
                                                            <Text style={{ color: '#000000', fontSize: 15 }}>{item.statename}</Text>
                                                        )

                                                    }

                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                </View>}

                            ItemSeparatorComponent={renderSeparator()}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (<View >
                    </View>)
            }



            {/* <View style={{ flex: 1, flexDirection: 'row' }}>



                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#e22729', height: 30, }}>
                        <View style={styles.imageViewBG}>
                            <Image source={require('../../assets/common/img_sample.jpg')} style={styles.imageView} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', height: 150, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', height: 30, textAlignVertical: 'center' }}>
                                <Text style={{ color: '#ffffff', fontSize: 17, textAlignVertical: 'center' }}>Name: </Text>
                                <Text style={{ color: '#ffffff', fontSize: 17, alignSelf: 'center', alignContent: 'center', textAlignVertical: 'center' }}>fgdfgdfg</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                                <Text style={{ color: '#000000', fontSize: 17 }}>Name: </Text>
                                <Text style={{ color: '#000000', fontSize: 17 }}>Manraj Singh</Text>
                            </View>


                        </View>
                    </View>
                </View>
            </View> */}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: 'white',

    },
    imageView: {

        width: 170,
        height: 190,

        //borderRadius: 10,


    },
    imageViewBG: {
        width: 120,
        height: 170,
        marginLeft: 5,
        overflow: "hidden",
        borderWidth: 4,
        borderRadius: 5,
        borderColor: "gray",
        backgroundColor: 'gray',


        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyListStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyMessageStyle: {
        textAlign: 'center',
        fontSize: 15,
    },


});

//make this component available to the app
export default Home;
