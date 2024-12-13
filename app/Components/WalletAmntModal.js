import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
const WalletAmntModal = ({WaletModal , FundModal , setFundModal , WaletBtn , setWaletModal , title , text}) => {
    const [amnt , setAmnt] = useState("10");
    const amounts  = [ " ₹10" , "₹100" , "₹200" , "₹500" , "₹1000" , "₹5000"]
    const [ withdrawalSuces , setWithDrawalSuces] =  useState(false);
    
  return (
    <>
   { WaletBtn === 'Withdrawal' ? 
   <ReactNativeModal isVisible={WaletModal} animationIn="fadeInUp" onBackButtonPress={() => setWaletModal(false)} 
   onBackdropPress={() => setWaletModal(false)}
   style={{justifyContent: 'flex-end' , margin : 0}}
   >
    <View style={styles.waletwithdrawlBx}>
        <Text style={styles.walettitle}> {title} </Text>
        <Text style={styles.waletText}> {text} </Text>

        <View style={styles.amntInptBx}>
        <MaterialCommunityIcons name="currency-inr" size={30} style={styles.curencyText} color="#8f898b" />
            <TextInput 
            value={amnt}
            onChange={(text) => setAmnt(text)}
            style={styles.amntInpt}
            placeholder='Enter'
            placeholderTextColor={'#8f898b'}
            />
        </View>
        
        <View style={styles.amntBtnsLists}>
            {amounts.map((item) => (
  <TouchableOpacity activeOpacity={0.6} onPress={() => setAmnt(item)} key={item.id} style={[styles.amountBtn , {backgroundColor: amnt === item ? "#026874" : "#E5F7F4"}]} >
  <Text style={[styles.amountText , {color : amnt === item ? "#fff" : "#026874"} ]}> {item} </Text>
</TouchableOpacity>
            ))}
              
        </View>
        
        <View style={styles.waletButonBx}>
        <TouchableOpacity onPress={() => setWithDrawalSuces(true)} activeOpacity={0.5} style={styles.waletButon}>
            <Text style={styles.waletButonText}> {WaletBtn} </Text>
        </TouchableOpacity>
        </View>

      {WaletBtn === "Withdrawal" ?  
      <View style={styles.withdrawlTo}>
            <Text style={styles.withdrawlText}> Withdrawal to </Text>
            <View style={styles.bankWithdrawBx}>
                <View style={styles.leftBankBx}>
                    <Image style={styles.bankImg} source={require('../../assets/images/bank-img.png')} />

                 
                    
                </View>

                <View style={styles.bankInfo}>
                        <Text style={styles.bankTitle}>Kotak Bank </Text>
                        <Text style={styles.paswrdText}>********1230</Text>

                    </View>

                    <AntDesign name="checkcircle" size={20} style={styles.checkIcon} color="#4CC36D" />

            </View>
        </View> : null}
        
    </View>

   </ReactNativeModal> :  

   <ReactNativeModal isVisible={FundModal} animationIn="fadeInUp" onBackButtonPress={() => setFundModal(false)} 
   onBackdropPress={() => setFundModal(false)}
   style={{justifyContent: 'flex-end' , margin : 0}}
   >
    <View style={styles.waletwithdrawlBx}>
        <Text style={styles.walettitle}> {title} </Text>
        <Text style={styles.waletText}> {text} </Text>
   
        <View style={styles.amntInptBx}>
        <MaterialCommunityIcons name="currency-inr" size={30} style={styles.curencyText} color="#8f898b" />
            <TextInput 
            value={amnt}
            onChange={(text) => setAmnt(text)}
            style={styles.amntInpt}
            placeholder='Enter'
            placeholderTextColor={'#8f898b'}
            />
        </View>
        
        <View style={styles.amntBtnsLists}>
            {amounts.map((item) => (
   <TouchableOpacity activeOpacity={0.6} onPress={() => setAmnt(item)} key={item.id} style={[styles.amountBtn , {backgroundColor: amnt === item ? "#026874" : "#E5F7F4"}]} >
   <Text style={[styles.amountText , {color : amnt === item ? "#fff" : "#026874"} ]}> {item} </Text>
   </TouchableOpacity>
            ))}
              
        </View>
        
        <View style={styles.waletButonBx}>
        <TouchableOpacity activeOpacity={0.5} style={styles.waletButon}>
            <Text style={styles.waletButonText}> {WaletBtn} </Text>
        </TouchableOpacity>
        </View>
   
      {WaletBtn === "Withdrawal" ?  <View style={styles.withdrawlTo}>
            <Text style={styles.withdrawlText}> Withdrawal to </Text>
            <View style={styles.bankWithdrawBx}>
                <View style={styles.leftBankBx}>
                    <Image style={styles.bankImg} source={require('../../assets/images/bank-img.png')} />
   
                 
                    
                </View>
   
                <View style={styles.bankInfo}>
                        <Text style={styles.bankTitle}>Kotak Bank </Text>
                        <Text style={styles.paswrdText}>********1230</Text>
   
                    </View>
   
                    <AntDesign name="checkcircle" size={20} style={styles.checkIcon} color="#4CC36D" />
   
            </View>
        </View> : null}
        
    </View>
   
   </ReactNativeModal>
   }

   <ReactNativeModal isVisible={withdrawalSuces} animationIn={'fadeInRight'} 
   onBackButtonPress={() => setWithDrawalSuces(false)} 
onBackdropPress={() => setWithDrawalSuces(false)} 
style={{top : -34,}} 
    >
        <View style={styles.WithdrawalSuccessBx}>
            <ImageBackground style={styles.withdrawalSucesBg} source={require('../../assets/images/withdrawl-suces-bg.png')} resizeMode='cover'></ImageBackground>

            <View style={styles.checkMainBx}>
                <View style={styles.shadowOpacity}></View>
                <View style={styles.checkBx}>
                    <Image  source={require('../../assets/images/check.png')}/>
                </View>
            </View>

            <View style={styles.withdrawalInfoDet}>
                <Text style={styles.greatText}>Great!</Text>
                <Text style={styles.withdrsuccText}>Withdrawal Success</Text>
                <Text style={styles.withdrawlSucText}>Below is your withdraw summary</Text>
            </View>


            <View style={[styles.withdrawlTo , {paddingHorizontal : 18}]}>
            <Text style={styles.withdrawlText}> Send Winning to </Text>
            <View style={styles.bankWithdrawBx}>
                <View style={styles.leftBankBx}>
                    <Image style={styles.bankImg} source={require('../../assets/images/bank-img.png')} />

                 
                    
                </View>

                <View style={styles.bankInfo}>
                        <Text style={styles.bankTitle}>Kotak Bank </Text>
                        <Text style={styles.paswrdText}>********1230</Text>

                    </View>


            </View>
        </View>

        <View style={styles.totlWithdrawBx}>
            <Text style={styles.totlwithdrawText}> Total Withdraw </Text>
            <Text style={styles.withdrawAnt}> ₹1400</Text>

        </View>

        <View style={[styles.waletButonBx , styles.withdrawsuccBtn]}>
        <TouchableOpacity onPress={() => setWithDrawalSuces(false)} activeOpacity={0.5} style={[styles.waletButon , {backgroundColor : "#34e6ed"} ]}>
            <Text style={[styles.waletButonText , {fontSize : 15, letterSpacing : .3}]}> BACK TO HOME </Text>
        </TouchableOpacity>
        </View>
            
        </View>

   </ReactNativeModal>


</>
  )
}

export default WalletAmntModal

const styles = StyleSheet.create({

    totlwithdrawText:{
        fontSize : 18,
        fontWeight : '400',
        color : "#7c7c7c"
    },

    withdrawAnt:{
        fontSize : 20,
        fontWeight : '500',
        color : "#0d0d0d"
    },

    totlWithdrawBx:{
        position : 'relative',
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap : 6,
    },

    greatText:{
        fontSize : 16,
        fontWeight : '500',
        letterSpacing : .3,
        color : "#026874",
        marginBottom : 10,
    },

    withdrawlSucText:{
        fontSize : 15,
        fontWeight : '400',
        color : "#7c7c7c"
    },

    withdrsuccText:{
        fontSize : 21,
        fontWeight : '500',
        color : "#0d0d0d"

    },

    withdrawalInfoDet:{
        position : 'relative',
        marginTop :-35,
        alignItems: 'center',
        justifyContent: 'center',
        gap : 4,
    },

    shadowOpacity:{
        position: 'absolute',
        top : '-50%',
        left :0,
        width : '100%',
        height : '100%',
        backgroundColor : 'red',
        opacity : 0.2,
        borderRadius : 50,
    },

    WithdrawalSuccessBx:{
        position : 'relative',
        width : '97%',
        margin: 'auto',
        height : 470,
        gap : 15,
    },

    checkMainBx:{
        position : 'relative',
        width : 110,
        height : 110,
        marginHorizontal : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkBx:{
        position : 'relative',
        top : '-50%',
        width : 70, 
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : "#026874",
        borderRadius : 50,

    },

    withdrawalSucesBg:{
        position : 'absolute',
        top : 0,
        left : 0,
        width : '100%',
        height : '100%',
        objectFit : 'cover',

    },

    checkIcon:{
        position : 'absolute',
        top : '50%',
        right : 12,
    },

    bankTitle:{
        fontSize : 16,
        marginBottom: 5,
        color : "#0d0d0d",
        fontWeight : '500',
    },

    paswrdText:{
        fontSize : 13,
        color : "#7c7c7c",
    },
 
    withdrawlText:{
        fontSize : 18,
        color : "#0d0d0d",
        fontWeight : '500',
        marginBottom: 15,
    },

    bankImg:{
        width : '100%',
        height : '100%',
        objectFit: 'cover',
    },

    leftBankBx:{
        position : 'relative',
        width : 45,
        height : 45,
    },


    bankWithdrawBx:{
        position : 'relative',
        width : '100%',
        borderWidth : 1,
        borderColor : "#d9d9d9",
        borderRadius : 8,
        padding : 12,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent : 'flex-start',
        gap : 15,
    },

    withdrawlTo:{
        position : 'relative',
        marginTop : 50,
    },

    waletButonBx:{
        position : 'absolute',
        bottom : 20,
        left : 0,
        width : '100%',
        marginHorizontal : 18,

    },

    withdrawsuccBtn:{
        position : 'relative',
        marginTop : 25,
        bottom : 0,
        marginHorizontal : 0,
    },

    waletButonText:{
        fontSize : 17,
        color : "#fff",
        fontWeight : '400',
        letterSpacing : .3,
    },

    waletButon:{
        position : 'relative',
        height : 45,
        width : '100%',
        backgroundColor : "#026874",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 8,
    },

    amntInptBx:{
        position : 'relative',
        width : '100%',
        marginTop : 20,
        paddingBottom : 10,
        borderBottomWidth : 1.4,
        borderBlockColor : "#34e6ed",
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

  

    amntBtnsLists:{
        position : 'relative',
        marginTop : 20,
        alignItems: 'center',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent: 'center',
        gap : 12,
    },

    amountText:{
        fontSize : 14,
        fontWeight : '500',
        color : "#026874",
    },

    amountBtn:{
        position : 'relative',
        paddingHorizontal : 14,
        height : 32,
        backgroundColor : "#E5F7F4",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 8,

    },

    amntInpt:{
        fontSize : 22,
        fontWeight : '500',
    },

    walettitle:{
        fontSize : 20,
        fontWeight : '500',
        letterSpacing : .3,
        marginBottom: 6,
        color : "#026874",

    },
    

    waletText:{
        fontSize : 14,
        letterSpacing : .2,
        color : "#7c7c7c"
    },

    waletwithdrawlBx:{
        position : 'relative',
        width : '100%',
        height : '70%',
        backgroundColor : "#fff",
        borderTopLeftRadius : 40,
        borderTopRightRadius : 40,
        paddingTop : 30,
        paddingHorizontal : 20,
    },
    
})