import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Map from './Components/Map';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const MapScreen = () => {
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
    <Text style={styles.editProfText}>Edit Profile</Text>
    </TouchableOpacity>
</SafeAreaView>

    <Map />

    <View style={styles.bottomAdressBx}>

        <View style={styles.locatMarker}>
        <FontAwesome6 name="location-dot" size={18} color="#fff" />
        <Text style={styles.locText}>Civil Lines, Jaipur</Text>
        </View>

        <TouchableOpacity onPress={() => router.navigate("AddressScreen")} activeOpacity={0.6} style={styles.CompAddresBtn}>
            <Text style={styles.compAddText}>Add Complete Address</Text>
        </TouchableOpacity>


    </View>

</>
  )
}

export default MapScreen

const styles = StyleSheet.create({

    bottomAdressBx:{
        position : 'absolute',
        bottom: 0,
        left : 0,
        width : '100%',
        height : 120,
        backgroundColor : "#026874",
        paddingHorizontal : 18,
        paddingVertical : 20,
    },

    compAddText:{
        fontSize : 14,
        fontWeight : '500',
        color : "#026874",
    },

    locText:{
        fontSize : 15,
        color : "#fff",
        fontWeight : '500',
    },

    locatMarker:{
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap : 10,
        marginBottom : 20,
    },

    CompAddresBtn:{
        position : 'relative',
        width : 170,
        backgroundColor : "#fff",
        borderRadius : 8,
        height : 40,
        alignItems:'center',
        justifyContent: 'center',

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

editProfText:{
    fontSize : 14,
    color : "#fff",
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