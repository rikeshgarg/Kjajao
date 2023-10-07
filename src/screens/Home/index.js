//import liraries
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground, StatusBar, TouchableWithoutFeedback, Image, Alert, StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, TextInput, RefreshControl } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import FastImage from 'react-native-fast-image'


import Axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from 'react-native-image-slider-box';

import Loader from '../../util/loader';

import moment from 'moment';
import Gallery from 'react-native-image-gallery';
import { Dropdown } from 'react-native-element-dropdown';

// create a component
const Home = (props) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [totalrecord, settotalrecord] = useState("");
    const [items, setItems] = useState([]);
    const [Arrayitems, setArrayItems] = useState([]);
    const [year, setYear] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [yearvalue, setValue] = useState("");
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
            //setemail(email1);
            const password = await AsyncStorage.getItem('password');
            //setpassword(password1);
            const userdata = await AsyncStorage.getItem('UserData');
            let userDetails = JSON.parse(userdata);
            let titlename = userDetails.donorname;
            props.navigation.setOptions({
                title: 'Welcome ' + titlename,
            })
            console.log('async data', email + ",,,,,," + password)
            //getdata(email, password);
            getYearData(email, password);
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

    const getYearData = async (email, password) => {
        console.log('getYearData', email + ",,,,,," + password)
        setemail(email);
        setpassword(password);
        setLoading(true);
        await Axios.post('http://banshividya.aanksoft.com/ProcessAPIWithK.aspx', {
            userid: email,
            passwd: password,
            reqtype: 'yearselection',
        }).then((response) => {
            console.log('response ', response.data.response);

            if (response.data.response == 'OK') {
                console.log('Result Year' + JSON.stringify(response.data.year));
                setYear(response.data.year);
                //alert(JSON.stringify(year[0].Year));
                var first = response.data.year[0].Year;
                console.log('Result Year dddd' + first);
                setValue(response.data.year[0].Year.toString());
                //alert(first.Year);
                getdata(email, password, response.data.year[0].SNo.toString());
                //console.log('Result Year dddd' + JSON.stringify(response.data.year));

            } else {
                setLoading(false);
            }

        }, (error) => {
            console.log(error);
            setLoading(false);

        });
    }

    const getdata = async (email, password, year) => {
        console.log('getdata1', email + ",,,,,," + password + ",,,,,," + year)
        setLoading(true);
        await Axios.post('http://banshividya.aanksoft.com/ProcessAPIWithK.aspx', {
            userid: email,
            passwd: password,
            reqtype: 'getlcnonew',
            startyear: year
        }).then((response) => {
            console.log('response ', response.data.response);

            if (response.data.response == 'OK') {
                console.log('Result ' + JSON.stringify(response.data.lcno));
                setArrayItems(response.data.lcno)
                console.log(Arrayitems.length);
                settotalrecord(response.data.TotalRecord)
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
        <SafeAreaView style={styles.container}>
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
                <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 5, marginRight: 5, color: '#e22729', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>THANKYOU FOR SUPPORTING</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#000000', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}> {totalrecord}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#e22729', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}> CHILDREN </Text>


                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'red', borderWidth: 2 }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        mode='modal'
                        iconStyle={styles.iconStyle}
                        nestedScrollEnabled={true}

                        data={year}

                        search
                        maxHeight={200}
                        labelField="Year"
                        valueField="Year"
                        placeholder={'Select Year'}
                        searchPlaceholder="Search..."
                        value={yearvalue}
                        textColor="#000000"
                        autoScroll={false}
                        onChange={item => {
                            setValue(item.Year);
                            getdata(email, password, item.SNo)


                        }}
                    //   renderLeftIcon={() => (
                    //     <AntDesign
                    //       style={styles.icon}
                    //       color={'blue'}
                    //       name="Safety"
                    //       size={20}
                    //     />
                    //   )}
                    />
                </View>
            </View>







            {
                Arrayitems.length > 0 ?
                    (
                        <FlatList style={{ marginBottom: 5 }}
                            data={Arrayitems}
                            nestedScrollEnabled={true}
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
                                                    <Text style={{ alignItems: 'center', width: '100%', color: '#ffffff', fontSize: 15, alignSelf: 'center', alignContent: 'center', textAlign: 'center' }}>{item.patientname}</Text>
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
                    ) : (<View style={{ marginTop: 50, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1, fontSize: 22, marginLeft: 5, marginRight: 5, color: 'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>No data found for this year</Text>
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

        </SafeAreaView>
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
    dropdown: {
        width: '35%',
        height: 35,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        color: 'black',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        color: 'black',
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemContainerStyle: {
        width: 500
    },

});

//make this component available to the app
export default Home;
