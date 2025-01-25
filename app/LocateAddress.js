import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Map from './Components/Map';
const LocateAddress = () => {
    const router  =  useRouter();
    
        const handleBackNavigate = () => {
            router.back();
        }
  return (
   <>
  <SafeAreaView style={styles.editprofileTopBx}>
    <ImageBackground style={styles.profTopBg} source={require('../assets/images/prifBannerTop.png')} resizeMode='cover'> 
    </ImageBackground>
    <TouchableOpacity onPress={() => handleBackNavigate()} activeOpacity={0.7} style={styles.editprofleftTextBx} >
        <View style={styles.angleBx}>
    <FontAwesome name="angle-left" size={14} color="#fff" style={{paddingRight :2}} />
    </View>
    <Text style={styles.editProfText}>Back</Text>
    </TouchableOpacity>
</SafeAreaView>

    <Map state={"LocateAddress"} />
   </>
  )
}

export default LocateAddress

const styles = StyleSheet.create({
    editProfText:{
        fontSize : 14,
        color : "#fff",
    },

    editprofleftTextBx:{
        position : 'relative',
        paddingHorizontal : 20,
        height : '100%',
        justifyContent : 'flex-start',
        flexDirection : 'row',
        alignItems: 'center',
        gap : 8,
        marginTop : 6,
},
    
    angleBx:{
        position : 'relative',
        width : 17,
        height : 17,
        borderWidth : 1,
        borderColor : "#fff",
        borderRadius : 40,
        alignItems: 'center',
        justifyContent : 'center',
    },
    
    editprofileTopBx:{
        position : 'relative',
        width : '100%',
        height : 80,
        backgroundColor : "#026874",
        overflow : 'hidden',
    },
    
    profTopBg:{
        position : 'absolute',
        top : 0,
        left : 0,
        width : '100%',
        height : '100%',
        objectFit : 'cover',
    },
})