import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import haversine from "haversine";

// Initialize Google Maps API (Replace with your API key)
Geocoder.init("AIzaSyBPOPPXBdFH_v4U4-6M2xkKZdsTSzlKBjQ");

export const getUserLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access to continue.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
    };
  } catch (error) {
    return {};
  }
};

// Function to get coordinates from an address
export const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await Geocoder.from(address);
    const location = response.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    //   console.error("Error getting coordinates:", error);
    return null;
  }
};

export const calculateDistance = async (userLocation, address) => {
  const destination = await getCoordinatesFromAddress(address);
  const dist = haversine(userLocation, destination, { unit: "km" });
  return dist;
};
