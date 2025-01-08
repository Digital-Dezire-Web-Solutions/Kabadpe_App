import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const KabadTypeBx = ({kabadItem}) => {

    const {height ,  width} = Dimensions.get('window');
    // {backgroundColor : kabadItem.bgColor}
  return (
    <View style={[styles.kabadTypeBx]}>
        <View style={[styles.kabadImgBx ]}>
            <Image style={styles.kabadImg} source={kabadItem.img} />
        </View>

        {/* <Text style={styles.kabadTitleText}> {kabadItem.title} </Text> */}
            
    </View>
  )
}

export default KabadTypeBx

const styles = StyleSheet.create({

    kabadTypeBx:{
        position : 'relative',
        width : 'max-content',
        marginRight : 4,
    },

    kabadTitleText:{
        fontSize : 15,
        textAlign : 'center',
        color : "#7C7C7C",
        fontWeight : '500',
    },

    kabadImgBx:{
        position : 'relative',
        width : 60,
        // width : wp('19.5%'),
        height : 60,
        // height : hp('9.4%'),
        borderRadius : 50,
        alignItems : 'center',
        justifyContent : 'center',
    },

    kabadImg:{
        width : 38,
        height : 38,
        objectFit : 'cover',
    },
    
})