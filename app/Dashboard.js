import { FlatList, Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import ApntCard from './Components/ApntCard';
import Feather from '@expo/vector-icons/Feather';
const Dashboard = () => {
    const [userName, setUserName] = useState('Nawaz Akhtar');

    const ICON_LIBRARIES = {
        FontAwesome5: FontAwesome5,
        FontAwesome6: FontAwesome6,
        Feather: Feather
      };

    const statusCard = [

        {
            id: 1,
            icon: require('../assets/images/apnt-icon.png'),
            name: 'Appointments',
            number: 20,
        },

        {
            id: 2,
            icon: require('../assets/images/walet-icon.png'),
            name: 'Wallet Balance',
            number: 1000.00,
        },

        {
            id: 3,
            icon: require('../assets/images/rupees-icon.png'),
            name: 'Cash Paid',
            number: 3500.00,
        },

        {
            id: 4,
            icon: require('../assets/images/waste-icon.png'),
            name: 'Waste Collected',
            number: 150,
            categ: 'kg',

        },

        {
            id: 5,
            icon: require('../assets/images/waste-icon.png'),
            name: 'Waste Sold',
            number: 150,
            categ: 'kg',
        },

    ]

    const ApntData = [

        {
            id: 1,
            image: require('@/assets/images/user-img.png'),
            name: 'Rajesh Verma',
            date: '10-May-2024, 8 Am - 10 Pm',
            locat: 'Laxmi Nagar',
            dist: 2,
        },

        {
            id: 2,
            image: require('@/assets/images/user-img.png'),
            name: 'Rahul Verma',
            date: '15-Jul-2024, 8 Am - 10 Pm',
            locat: 'Kundan Nagar',
            dist: 10,
        },


        {
            id: 3,
            image: require('@/assets/images/user-img.png'),
            name: 'Ankit Desai',
            date: '20-May-2024, 8 Am - 10 Pm',
            locat: 'Gandhi Nagar',
            dist: 3,
        },


        {
            id: 4,
            image: require('@/assets/images/user-img.png'),
            name: 'Pankaj Tripati',
            date: '05-June-2024, 8 Am - 10 Pm',
            locat: 'Azad Nagar',
            dist: 8,
        },




    ]

    const actionsBtns = [
        {
            id: 1,
            name: 'Active',
            iconName: 'user',
            iconFrom: 'Feather',
        },

        {
            id: 1,
            name: 'Waste Sale',
            iconName: 'coins',
            iconFrom: 'FontAwesome6',
        },

        {
            id: 3,
            name: 'Buy Waste',
            iconName: 'cart-plus',
            iconFrom: 'FontAwesome6',
        },


        {
            id: 4,
            name: 'Leave Request',
            iconName: 'running',
            iconFrom: 'FontAwesome5',
        },

    ]

    return (
        <>
            <SafeAreaProvider>
                <ScrollView style={styles.dashboardScreen} nestedScrollEnabled={true}>
                    <View style={styles.topHeader}>
                        <View style={styles.leftUserInfo}>
                            <Image style={styles.userImg} source={require('../assets/images/Ellipse-101.jpg')} />
                            <View style={styles.userDet}>
                                <Text style={styles.username}>Nawaz Akhtar</Text>
                                <Text style={styles.userId}>KPW0000014</Text>
                                <View style={styles.ratingFlex}>
                                    <Entypo name="star" size={12} color="#facb3e" />
                                    <Entypo name="star" size={12} color="#facb3e" />
                                    <Entypo name="star" size={12} color="#facb3e" />
                                    <Entypo name="star-outlined" size={12} color="#3c3c3c" />
                                    <Entypo name="star-outlined" size={12} color="#3c3c3c" />
                                </View>
                            </View>
                        </View>

                        <View style={styles.rightHeaderBx}>
                            <TouchableOpacity style={styles.bellBtn}>
                                <FontAwesome5 name="bell" size={18} color="#026874" />
                                <View style={styles.reddot}></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuIcon}>
                                <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }} source={require('../../KabadpeApp/assets/images/menu-icon.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    
                    <View style={styles.actionsBtnsComp}>
                        <View style={styles.actionsBtnsFlex}>
                            <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}
                                data={actionsBtns}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    const IconComponent = ICON_LIBRARIES[item.iconFrom]; 
                                    return (
                                        <TouchableOpacity activeOpacity={0.3} style={styles.actionBtn}>
                                        <Text style={styles.actionText}> {item.name} </Text>
                                        <View style={styles.actioniconBx}>
                                            {IconComponent &&  <IconComponent  name={item.iconName} size={13} color="#fff" />}
                                        </View>
                                    </TouchableOpacity>   
                                    )
                                }}

                            />




                        </View>
                    </View>

                    <View style={styles.statusCardComp}>
                        <Text style={styles.statusText}> Hey {userName}, <Text style={{ fontWeight: '500' }}>Good Morning!</Text>  </Text>

                        <View style={styles.statusCardList}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={statusCard}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.statusCardBx}>
                                        <View style={styles.iconBx}>
                                            <Image style={{ width: 16, height: 16, objectFit: 'cover' }} source={item.icon} />
                                        </View>
                                        <Text style={styles.statusTitle}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.statusdet}>
                                            {item.number}
                                            {item.categ ? <Text style={styles.kgtext}> kg </Text> : null}
                                        </Text>

                                        <TouchableOpacity activeOpacity={0.4} style={styles.statusBtn}>
                                            <Text style={styles.viewalltext}>View All</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            />


                        </View>

                    </View>

                    <View style={styles.actApntFlexBx}>
                        <Text style={styles.apntTitle}>
                            Active Appointments
                        </Text>

                        <TouchableOpacity activeOpacity={0.67} style={[styles.viewApntBtn, styles.clicklocatBtn]}>
                            <Text style={styles.ViewText}>Align Location</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
                            <Text style={styles.ViewText}>View All</Text>
                        </TouchableOpacity>



                    </View>

                    <View style={styles.apntDataList}>
                        <FlatList
                            data={ApntData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => <ApntCard itemStart='flex-start' bgColor="#E5F2F2" item={item} index={index} />}
                        />
                    </View>


                    <View style={styles.noApntBx}>
                        <Text style={styles.noApntText}>No Appointments Available</Text>
                    </View>


                </ScrollView>
            </SafeAreaProvider>
        </>
    )
}

export default Dashboard

const styles = StyleSheet.create({

    actionsBtnsComp: {
        position: 'relative',
        marginTop : 10,
        // bottom: 10,
        // left: 0,
        width: '100%',
        // paddingHorizontal: 20,
    },

    actioniconBx:{
        position : 'relative',
        width : 25,
        height : 25,
        backgroundColor : "#026874",
        borderRadius : 50,
        alignItems : 'center',
        justifyContent : 'center',
    },

    actionText:{
        fontSize : 13,
        color : "#026874",
        fontWeight : '500',
    },

    actionBtn:{
        position : 'relative',
        width : 'auto',
        backgroundColor: "#fff",
        marginRight : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        gap : 10,
        height : 34,
        borderRadius : 30,
        paddingInlineStart : 6,
        paddingInlineEnd : 4,
        borderWidth : .76,
        borderColor : "#bababa",
    },

    actionsBtnsFlex: {
        position: 'relative',
        width: '100%',
        // backgroundColor: '#026874',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll',
        gap: 20,
        paddingBlock: 5,
        paddingInlineStart: 12,
        paddingInlineEnd : 0,
        // borderRadius : 12,
    },

    noApntBx: {
        position: 'relative',
        width: '100%',
        paddingHorizontal: 20,
        marginBlockEnd: 20,


    },

    noApntText: {
        position: 'relative',
        width: '100%',
        height: 120,
        backgroundColor: "#E5F2F2",
        textAlignVertical: 'center',
        textAlign: 'center',
        borderRadius: 12,
        fontSize: 14,
        fontWeight: '400',
        color: "#7c7c7c",
    },

    editprofleftTextBx: {
        position: 'relative',
        paddingHorizontal: 20,
        height: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 10,
    },

    editProfText: {
        fontSize: 14,
        color: "#fff",
    },

    angleBx: {
        position: 'relative',
        width: 17,
        height: 17,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    editprofileTopBx: {
        position: 'relative',
        width: '100%',
        height: 80,
        backgroundColor: "#026874",
        overflow: 'hidden',
    },

    profTopBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    kabadListMain: {
        position: 'relative',
        width: '100%',
        marginTop: 25,
    },

    viewApntBtn: {
        position: 'relative',
        width: 80,
        height: 30,
        backgroundColor: "#026874",
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',

    },

    ViewText: {
        fontSize: 13,
        color: "#fff",
    },

    apntTitle: {
        fontSize: 17,
        color: "#3C3C3C",
        fontWeight: "600",
    },


    actApntFlexBx: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 18,
        marginBottom: 10,

    },

    apntDataList: {
        position: 'relative',
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 18,
    },

    viewApntBtn: {
        position: 'relative',
        width: 'auto',
        height: 30,
        backgroundColor: "transparent",
        borderRadius: 6,
        borderWidth: 1.3,
        paddingHorizontal: 10,
        borderColor: "#026874",
        alignItems: 'center',
        justifyContent: 'center',

    },

    ViewText: {
        fontSize: 12,
        fontWeight: '500',
        color: "#026874",
    },


    apntTitle: {
        fontSize: 14.4,
        color: "#3C3C3C",
        fontWeight: "600",
    },



    actApntFlexBx: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 18,

    },

    statusCardList: {
        position: 'relative',
        marginTop: 16,
        width: '100%',
    },

    viewalltext: {
        fontSize: 12,
        fontWeight: '500',
        color: "#242424",
    },

    statusBtn: {
        position: 'relative',
        width: 'auto',
        paddingBlock: 4,
        paddingHorizontal: 12,
        borderWidth: .76,
        borderColor: "#026874",
        borderRadius: 6,
    },

    statusTitle: {
        fontSize: 13.5,
        color: "#3c3c3c",
        fontWeight: '500',
        marginBottom: 4,
    },

    statusdet: {
        fontSize: 12.76,
        fontWeight: '500',
        color: "#545454",
        marginBottom: 12,
    },

    iconBx: {
        position: 'relative',
        width: 30,
        height: 30,
        backgroundColor: "#026874",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
    },

    statusCardBx: {
        position: 'relative',
        width: 120,
        backgroundColor: "#C7EAEB",
        marginRight: 12,
        borderRadius: 6,
        paddingBlock: 12,
        alignItems: 'center',
        justifyContent: 'center',

    },

    statusCardComp: {
        position: 'relative',
        width: '100%',
        paddingBlock: 14,
        paddingLeft: 20,
        paddingRight: 8,
    },

    statusText: {
        fontSize: 13.5,
        color: "#5e5e5e",
        fontWeight: '400',
    },

    menuIcon: {
        width: 22,
        height: 22,
    },

    rightHeaderBx: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
    },

    username: {
        fontSize: 13,
        fontWeight: '500',
        color: "#3C3C3C",
    },

    userId: {
        fontSize: 10,
        color: "#242424",
    },

    ratingFlex: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    topHeader: {
        position: 'relative',
        width: '100%',
        backgroundColor: "#C7EAEB",
        paddingBlock: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    userImg: {
        width: 42,
        height: 42,
        objectFit: 'cover',
        borderRadius: 50,
    },

    leftUserInfo: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },

    reddot: {
        position: "absolute",
        top: 1.5,
        right: 7,
        width: 5,
        height: 5,
        backgroundColor: "red",
        borderRadius: 50,
    },

    bellBtn: {
        position: "relative",
        width: 24,
    },

    dashboardScreen: {
        position: 'relative',
        width: '100%',
        flex: 1,
        marginBlockStart: '7.5%',
    },

})