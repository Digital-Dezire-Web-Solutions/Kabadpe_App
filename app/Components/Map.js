import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Map = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825, // Default latitude
    longitude: -122.4324, // Default longitude
    latitudeDelta: 0.0922, // Zoom level (latitude)
    longitudeDelta: 0.0421, // Zoom level (longitude)
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
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922, // Zoom level (latitude)
      longitudeDelta: 0.0421, // Zoom level (longitude)
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
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
  container: {
    position: "relative",
    width: "100%",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
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
