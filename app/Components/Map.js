import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Map = ({ onChange }) => {
  const [address, setAddres] = useState({});
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    reverseGeocode(location.coords.latitude, location.coords.longitude);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922, // Zoom level (latitude)
      longitudeDelta: 0.0421, // Zoom level (longitude)
    });
  };
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (addresses.length > 0) {
        setAddres(addresses?.[0]);
        onChange(addresses?.[0]);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to fetch address");
    }
  };

  useEffect(() => {
    userLocation()
      .then(() => {})
      .catch(() => {});
  }, []);

  return (

    <SafeAreaProvider style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <Button title="Get Location" onPress={userLocation} />

      <View style={styles.addresSerch}>
        <View style={styles.addressSerchBx}>
          <AntDesign name="search1" size={18} color="#026874" />
          <TextInput
            style={styles.addrsTextSrch}
            placeholder="Search Address"
            placeholderTextColor={"#898f8b"}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Map;

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

  addrsTextSrch: {
    fontSize: 14,
    fontWeight: "500",
    color: "#898f8b",
  },

  addresSerch: {
    position: "absolute",
    top: 20,
    width: "100%",
  },

  addressSerchBx: {
    position: "relative",
    marginHorizontal: 18,
    height: 52,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    borderRadius: 12,
  },
});
