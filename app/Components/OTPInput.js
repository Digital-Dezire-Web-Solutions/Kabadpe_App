import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const OTPInput = () => {
    const [focused , setFocused] =  useState(false);
    const [number , setNUmber] =  useState("");

    const handlenumberFunc = (text) => {
        setNUmber(text)        
    }

  return (
    <TouchableOpacity activeOpacity={0.4}  
   style={[styles.otpinpt]}>
    <TextInput  style={[styles.otpInptBx, focused && styles.isfocused]} keyboardType='number-pad' placeholder='_'  
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    value={number}
    onChange={(text) => handlenumberFunc(text)}
    />

  </TouchableOpacity>
  )
}

export default OTPInput

const styles = StyleSheet.create({
    otpInptBx:{
        fontSize : 20,
        width : '100%',
        height : '100%',
        color : "#242424",
        textAlign : 'center',
        borderRadius : 12,
        borderWidth : 2,
        borderColor : "#fafafa",

      },

      isfocused:{
        borderColor : "#026874",
        opacity : 0.67,
      },
    
      otpinpt:{
        position : 'relative',
        width : '22%',
        height : 60,
        borderRadius : 12,
        alignItems : 'center',
        justifyContent: 'center',
        backgroundColor : '#fafafa',

      },
})