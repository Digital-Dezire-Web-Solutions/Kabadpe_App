import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import haversine from "haversine";
import {
  calculateDistance,
  getCoordinatesFromAddress,
  getUserLocation,
} from "../lib/location";


const DistanceCalculator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    getUserLocation().then((res) => {
      console.log("this is userlocation res", res);
      setUserLocation(res);
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>
        User Location:{" "}
        {userLocation
          ? `${userLocation.latitude}, ${userLocation.longitude}`
          : "Fetching..."}
      </Text>
      <Button
        title="Calculate Distance"
        onPress={async () => {
          const dist = await calculateDistance(userLocation, "laxmi nagar");
          setDistance(dist);
        }}
      />
      {distance && <Text>Distance to Taj Mahal: {distance.toFixed(2)} km</Text>}
    </View>
  );
};

export default DistanceCalculator;
