import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import WalletAmntModal from './Components/WalletAmntModal';
const WalletScreen = () => {
    const router = useRouter();
    const [WaletModal , setWaletModal] =  useState(false);
    const [FundModal , setFundModal] =  useState(false);


    const kabadTypeLists  = [

        {
            id : 1,
            img : require('../assets/images/kabad-type-w.png'),
            text : 'Paper',
        },

        {
            id : 2,
            img : require('../assets/images/kabad-type-w-2.png'),
            text : 'Plastic',
        },

        {
            id : 3,
            img : require('../assets/images/kabad-type-w-3.png'),
            text : 'Clothes',
        },

        {
            id : 4,
            img : require('../assets/images/kabad-type-w-4.png'),
            text : 'Vehicles',
        },

        {
            id : 5,
            img : require('../assets/images/kabad-type-w-5.png'),
            text : 'Others',
        },

        
        {
            id : 6,
            img : require('../assets/images/kabad-type-w-6.png'),
            text : 'Wood',
        },

        
        {
            id : 7,
            img : require('../assets/images/kabad-type-w-7.png'),
            text : 'Glass',
        },

        {
            id : 8,
            img : require('../assets/images/kabad-type-w-8.png'),
            text : 'Metal',
        },

        {
            id : 9,
            img : require('../assets/images/kabad-type-w-9.png'),
            text : 'Glass',
        },
        
    ]

    const TransactionsLists = [
        {
            id : 1,
            arrowRecv : 'arrow-top-left',
            title : 'Paid To manish',
            text : '02:34 PM, 25 February 2024',
            amnt : '-₹300',
        },
        {
            id : 2,
            arrowRecv : 'arrow-bottom-right',
            title : 'Received from Kabadpe',
            text : '02:34 PM, 25 February 2024',
            amnt : '+₹200',
        },

        {
            id : 3,
            arrowRecv : 'arrow-top-left',
            title : 'Paid To Faiz',
            text : '02:34 PM, 25 February 2024',
            amnt : '-₹400',
        },

        {
            id : 4,
            arrowRecv : 'arrow-bottom-right',
            title : 'Received from Extraframes',
            text : '02:34 PM, 25 February 2024',
            amnt : '+₹500',
        },

        {
            id : 5,
            arrowRecv : 'arrow-bottom-right',
            title : 'Received from Kabadpe',
            text : '02:34 PM, 25 February 2024',
            amnt : '+₹400',
        },

        {
            id : 6,
            arrowRecv : 'arrow-top-left',
            title : 'Paid To Faisal',
            text : '02:34 PM, 25 February 2024',
            amnt : '-₹300',
        },

        {
            id : 7,
            arrowRecv : 'arrow-top-left',
            title : 'Paid To manish',
            text : '02:34 PM, 25 February 2024',
            amnt : '-₹300',
        },

        {
            id : 8,
            arrowRecv : 'arrow-bottom-right',
            title : 'Received from Kabadpe',
            text : '02:34 PM, 25 February 2024',
            amnt : ' +₹500',
        },
        
    ]
    
    return (
        <>
            
            <SafeAreaView style={styles.editprofileTopBx}>
                <ImageBackground style={styles.profTopBg} source={require('../assets/images/prifBannerTop.png')} resizeMode='cover'>
                </ImageBackground>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.editprofleftTextBx} >
                    <View style={styles.angleBx}>
                        <FontAwesome name="angle-left" size={14} color="#fff" style={{ paddingRight: 2 }} />
                    </View>
                    <Text style={styles.editProfText}>Edit Profile</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <SafeAreaProvider>
                <ScrollView style={styles.walletTrnstionComp}>
                <SafeAreaView style={styles.walletMain}>

                    <View style={styles.waletAmntBx}>
                        <ImageBackground style={styles.walletBg} source={require('../assets/images/wallet-bg.png')} resizeMode='cover'></ImageBackground>

                        <View style={styles.waletIconBx}>
                            <Image style={styles.walletIcon} source={require('../assets/images/wallet-icon.png')} />
                        </View>

                        <View style={styles.walletInfoBx}>
                            <Text style={styles.walletAmntText}>Wallet Amount</Text>
                            <Text style={styles.walletPrice}>₹ 2100.00</Text>
                        </View>

                        <View>

                        </View>

                    </View>

                    <View style={styles.walletBtnFlex}>

                        <TouchableOpacity style={styles.waletBtn} onPress={() => setFundModal(true)}>
                            <Text style={styles.waletBtnText}>Add Funds</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.waletBtn} onPress={ () => setWaletModal(true)}>
                            <Text style={styles.waletBtnText}>Withdrawl</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={[styles.waletBtn, styles.marketplceBtn]}>
                        <Text style={[styles.waletBtnText, styles.waletBtnText2]}>Marketplace</Text>
                    </TouchableOpacity>



                </SafeAreaView>

                <View style={styles.kabadTypeListBx}>
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={kabadTypeLists}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <>
                        <View style={styles.kabadTypeBx} key={item.id}>
                            <View style={styles.kabadTypeImgBx}>
                                <Image style={styles.kabadTypeImg} source={item.img} />
                            </View>
                            <Text style={styles.kabadTypeText}> {item.text} </Text>
                        </View>
                        </>
                    )}
                    />

<TouchableOpacity style={styles.checkTodTextBx}>
              <Text style={styles.checkRateText}> Check Today's Rate </Text>

              <View style={styles.arowBorder}>
                <FontAwesome name="angle-right" size={16} color="#34e6ed" />
              </View>
            </TouchableOpacity>
                    
                </View>

                <View style={styles.transactionsListsBx}>
                        <Text style={styles.transactinText}>Transactions</Text>

                        <View style={styles.trnsctionLists}>
                        <FlatList 
                        data={TransactionsLists}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <>

                            <View style={styles.trnsctBx}>
                                <View style={styles.trnLeftBx}>
                                    <View style={styles.trnIconBx}>
                                    <MaterialCommunityIcons name={item.arrowRecv} size={20} color={item.arrowRecv === "arrow-bottom-right" ? "#4CC36D" : "#f10000"} />
                                    </View>
                                    <View style={styles.trnInfo}>
                                        <Text style={styles.trnTitleText}> {item.title} </Text>
                                        <Text style={styles.trnText}> {item.text} </Text>
                                    </View>
                                </View>

                                <Text style={[styles.amntText , {color : item.arrowRecv === "arrow-bottom-right" ? "#4CC36D" : "#f10000" }]}> {item.amnt} </Text>

                            </View>
                                
                            </>
                        )}
                        />
                        </View>
                        
                </View>
                
                </ScrollView>
            </SafeAreaProvider>

            <WalletAmntModal title="Set Amount" text="How Much Would you like to top up?" WaletModal={WaletModal} WaletBtn={"Withdrawal"} setWaletModal={setWaletModal} />

            <WalletAmntModal title="Enter Amount" text="How Much Would you like to top up?" FundModal={FundModal} WaletBtn={"Add Funds"} setFundModal={setFundModal} />
        </>
    )
}

export default WalletScreen

const styles = StyleSheet.create({

    walletTrnstionComp:{
        flex : 2,
    },

    amntText:{
        fontSize : 14,
        fontWeight : '500',
        letterSpacing : .3,
    },

    trnTitleText:{
        fontSize : 15,
        color : "#0d0d0d",
        letterSpacing : .2,
        marginBottom: 3,
    },

    trnText:{
        fontSize : 12.5,
        color : "#7c7c7c",
    },

    trnsctBx:{
        position : 'relative',
        width : '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection : 'row',
        marginBottom: 16,
    },

    trnInfo:{
        position : 'relative',
        width : 'auto',
    },

    trnLeftBx:{
        position : 'relative',
        width : 'auto',
        flexDirection :'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap : 12,
    },

    trnIconBx:{
        position : 'relative',
        width : 50,
        height : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : "#edfaf8",
        borderRadius : 8,
    },
    // E5F7F4

    transactionsListsBx:{
        position : 'relative',
        width : '100%',
        paddingHorizontal : 18,
        paddingTop : 18,
        paddingBottom : 20,
    },

    trnsctionLists:{
        position : 'relative',
        width : '100%',
    },

    transactinText:{
        fontSize : 20,
        color : "#0d0d0d",
        fontWeight : '500',
        letterSpacing : .2,
        marginBottom: 20,
    },

    checkRateText: {
        fontSize: 13,
        color: "#34e6ed",
        fontWeight: '400',
      },
    
      arowBorder: {
        position: 'relative',
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#34e6ed",
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      checkTodTextBx: {
        position: 'relative',
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginTop : 20,
        paddingRight : 12,
      },

    kabadTypeListBx: {
        position: 'relative',
        width: '100%',
        marginTop: 10,
        borderTopWidth: 3,
        borderBottomWidth : 3,
        paddingVertical : 22,
        borderColor: '#d9d9d9',
        paddingLeft : 18,
        paddingRight : 6,
    },

    kabadTypeText:{
        textAlign : 'center',
        marginTop : 6,
        fontSize : 13,
        fontWeight : '500',
        color : "#026874",
        letterSpacing : .4,
    },

    kabadTypeBx:{
        position : 'relative',
        width : 62,
        marginRight : 12,

    },

    kabadTypeImgBx:{
        position : 'relative',
        width : 64,
        height : 64,
        backgroundColor : "#E5F7F4",
        borderRadius : 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    kabadTypeImg:{
        width : 40,
        height : 40,
        objectFit : 'cover',
    },

    walletBtnFlex: {
        position: 'relative',
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },

    waletBtnText2: {
        color: "#026874",
        fontSize: 16,
    },

    marketplceBtn: {
        width: '100%',
        marginTop: 18,
        backgroundColor: 'transparent',
        borderWidth: 1.4,
        borderColor: "#026874",
    },

    waletBtnText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: '500',
        letterSpacing: .4,
    },

    waletBtn: {
        position: 'relative',
        width: '48%',
        height: 44,
        backgroundColor: "#34e6ed",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },

    waletIconBx: {
        position: 'relative',
        width: 60,
        height: 60,
        backgroundColor: "#045357",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },

    walletPrice: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '500',
    },

    walletAmntText: {
        fontSize: 13,
        color: "#fff",
        letterSpacing: .5,
        marginBottom: 2,
    },

    walletInfoBx: {
        position: 'relative',
        width: 'auto',
        gap: 5,
    },

    walletIcon: {
        width: 38,
        height: 38,
        objectFit: 'cover',
    },

    walletBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 200,
        height: '100%',
        objectFit: 'cover',
        opacity: 0.1,

    },

    waletAmntBx: {
        position: 'relative',
        width: '100%',
        height: 140,
        backgroundColor: "#026874",
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 20,

    },

    walletMain: {
        position: 'relative',
        width: '100%',
        flex : 1,
        paddingTop: 22,
        paddingBottom: 15,
        paddingHorizontal : 18,
    },

    editprofleftTextBx: {
        position: 'relative',
        paddingHorizontal: 20,
        height: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
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
        height: 110,
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

})