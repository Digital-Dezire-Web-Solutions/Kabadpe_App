import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

const Map = ({state}) => {
    const [mapRegion , setMapRegion] = useState({
        latitude: 37.78825, // Default latitude
        longitude: -122.4324, // Default longitude
        latitudeDelta: 0.0922, // Zoom level (latitude)
        longitudeDelta: 0.0421, // Zoom level (longitude)
    })

    const userLocation  = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy : true});
        setMapRegion({
            latitude : location.coords.latitude,
            longitude : location.coords.longitude,
            latitudeDelta: 0.0922, // Zoom level (latitude)
            longitudeDelta: 0.0421, // Zoom level (longitude)
        })
    }

    const ICON_LIBRARIES = {
      AntDesign: AntDesign ,
      FontAwesome5: FontAwesome5,
      Entypo: Entypo,

  };

  const locationIcon = [
    {id : 1, iconName : 'home', iconFrom: 'AntDesign'},
    {id : 2, iconName : 'building', iconFrom : 'FontAwesome5'},
    {id : 3, iconName : 'shop', iconFrom:'Entypo'},
    {id : 4, iconName : 'shopping-cart', iconFrom:'FontAwesome5'},

  ];
  
  const buildingIcon = locationIcon.find((item) => item.iconName === 'building'); 
  const IconComponent = ICON_LIBRARIES[buildingIcon.iconFrom];

    useEffect(() => {
        userLocation()
    }, [])
    
  return (

    <SafeAreaProvider style={styles.container}>
    <MapView style={styles.map}
    region={mapRegion}
    >
        <Marker coordinate={mapRegion} title='Marker' />
    </MapView>
    <Button title='Get Location' onPress={userLocation} />

   {!state ? <View style={styles.addresSerch}>
    <View style={styles.addressSerchBx}>
    <AntDesign name="search1" size={18} color="#026874" />
        <TextInput style={styles.addrsTextSrch} placeholder='Search Address' placeholderTextColor={"#898f8b"} />

    </View>
    </View> : null}


    <View style={styles.addressInfoBx}>

   if(buildingIcon) {
        <View style={styles.locateIconBx}>
            <IconComponent name={buildingIcon.iconName} size={18} color="#000" />
        </View>
}

<View style={styles.locateInfoBx}>
  <Text style={styles.locateText}>Location Type: Office/Home/Mall</Text>
  <Text style={styles.locateText}>Pickup Time: 10:00 AM - 12:00 PM, 25, Jan 2025</Text>
  <Text style={styles.locateText}>Full Address: 65A, Street No 4, Kundan Nagar, Laxmi Nagar, Delhi: 110092</Text>

</View>


<TouchableOpacity activeOpacity={0.5} style={styles.locateBtn}>
  <Text style={styles.locateBtnText}>Drive Location</Text>
</TouchableOpacity>
    
    </View>
    
    
  </SafeAreaProvider>
  )
}

export default Map

const styles = StyleSheet.create({

  locateBtn:{
      position : 'absolute',
      bottom : 20,
      right : 20,
      paddingHorizontal : 15,
      paddingBlock : 5,
      borderWidth : .76,
      borderColor : "#eee",
      borderRadius : 6,
  },

  locateBtnText:{
    fontSize : 13.4,
    color : "#f5f5f5",
  },

  addressInfoBx:{
    position : 'absolute',
    bottom : 0,
    left : 0,
    width : '100%',
    height : 180,
    backgroundColor : '#026874',
    paddingBlock : 20,
    paddingHorizontal : 20,
    flexDirection : 'row',
    alignItems : 'flex-start', 
    justifyContent : 'flex-start',
    gap  : 10,
  },

  locateText :{
    fontSize : 12,
    color : "#f5f5f5",
    paddingBottom : 4,
    borderBottomWidth : .4,
    borderBottomColor : "#eee",
    marginBottom : 6,
    maxWidth : 270,
  },

  locateIconBx:{
    position : 'relative',
    width : 40,
    height : 40,
    backgroundColor : "#C7EAEB",
    borderRadius : 40,
    alignItems : 'center',
    justifyContent: 'center',
  },
  
    container: {
        position : 'relative',
        width : '100%',
        flex: 1,
      },
      map: {
        width: '100%',
        height: '100%',
      },

      addrsTextSrch:{
        fontSize : 14,
        fontWeight : '500',
        color : "#898f8b"
      },

      addresSerch:{
        position : 'absolute',
        top : 20,
        width : '100%',
      },

      addressSerchBx:{
            position : 'relative',
            marginHorizontal : 18,
            height : 52,
            backgroundColor : "#fff",
            paddingHorizontal : 18,
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'flex-start',
            gap : 10,
            borderRadius : 12,
            
      }
})