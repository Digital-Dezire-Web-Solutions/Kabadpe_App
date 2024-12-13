import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BigimpBx = ({impData}) => {
  const {height , width} = Dimensions.get('window');


  return (

    <View style={styles.bigImpBx}>
        <Image style={styles.bigImpImg} source={impData.icon} />

        <View style={styles.inlineText}>
          <Text style={styles.impValue}> {impData.textOne} </Text>
        {impData.kgText ? <Text style={styles.reltText}> {impData.kgText} </Text> : impData.crText ? <Text style={styles.reltText}> {impData.crText} </Text> : impData.kwhText ? <Text style={styles.reltText}> {impData.kwhText} </Text> : impData.thText ? <Text style={styles.reltText}> {impData.thText} </Text> : null}
        </View>
      
        <Text style={styles.impText}> {impData.text} </Text>
      
    </View>
    
  )
}

export default BigimpBx

const styles = StyleSheet.create({

  impValue:{
    width : 'max-content',
    fontSize : 16,
    fontWeight : '600',
    color : "#026874",
  },

  reltText:{
    position : 'relative',
    top : 2,
    left : -4,
    fontSize : 12,
    fontWeight : '500',
    color : "#026874",

  },

    bigImpBx:{
        position : 'relative',
        width : wp('30%'),
        marginBottom : 20,
        marginRight : 12,
        justifyContent : 'flex-start',
        alignItems : 'center'
    },

    inlineText:{
      flexDirection : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign : 'center',
    },

    impText:{
      fontSize : 14,
      textAlign : 'center',
      fontWeight : '500',
      color : "#7c7c7c"
    },

    bigImpImg:{
      width : 38,
      height : 38,
      // width : wp('10%'),
      // height : hp('5%'),
        objectFit : 'cover',
        marginBottom : 12,
    },
    
})