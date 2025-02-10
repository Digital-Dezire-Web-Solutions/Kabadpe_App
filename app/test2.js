import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { getCoordinatesFromAddress, getUserLocation } from "../lib/location";
import { useSearchParams } from "expo-router/build/hooks";

const GOOGLE_MAPS_APIKEY = "AIzaSyBPOPPXBdFH_v4U4-6M2xkKZdsTSzlKBjQ";

const getNavigationInstructions = async (origin, destination) => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "OK") return [];
    return data.routes[0].legs[0].steps.map((step) => step.html_instructions);
  } catch (error) {
    console.error("Error fetching navigation instructions:", error);
    return [];
  }
};

const getDirectionIcon = (instruction) => {
  if (instruction.toLowerCase().includes("left"))
    return require("../assets/images/road-sign/left-turn.jpg");
  if (instruction.toLowerCase().includes("right"))
    return require("../assets/images/road-sign/right-turn.webp");
  if (instruction.toLowerCase().includes("u-turn"))
    return require("../assets/images/road-sign/u-turn.jpg");
  return require("../assets/images/road-sign/straight.jpg");
};

const LiveNavigation = (
  {
    //   destinationAddress = ,
  }
) => {
  const params = useSearchParams();
  const destinationAddress = params.get("a") || "India Gate, New Delhi, India";
//   console.log("this is destination ", destinationAddress);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [driveMode, setDriveMode] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const userLoc = await getUserLocation();
      const destLoc = await getCoordinatesFromAddress(destinationAddress);
      if (userLoc && destLoc) {
        setUserLocation(userLoc);
        setDestination(destLoc);
        const steps = await getNavigationInstructions(userLoc, destLoc);
        setInstructions(steps);
      }
    };
    fetchLocations();
  }, [destinationAddress]);

  useEffect(() => {
    let locationSubscription = null;
    const startTracking = async () => {
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        async (location) => {
          const newCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setUserLocation(newCoords);
          setRouteCoordinates((prev) => [...prev, newCoords]);
          if (destination) {
            const steps = await getNavigationInstructions(
              newCoords,
              destination
            );
            setInstructions(steps);
          }
        }
      );
    };
    startTracking();
    return () => locationSubscription?.remove();
  }, [destination]);
  return (
    <View style={styles.container}>
      {userLocation && destination && (
        <>
          <MapView
            // cacheEnabled
            provider="google"
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              //   identifier={require("../assets/images/road-sign/drive.webp")}
              icon={require("../assets/images/road-sign/drive.webp")}
              coordinate={userLocation}
              title="You"
              pinColor="blue"
            />
            <Marker
              coordinate={destination}
              title="Destination"
              pinColor="red"
            />
            <MapViewDirections
              origin={userLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={10}
              strokeColor="green"
              mode="DRIVING"
            />
          </MapView>
          <View style={styles.instructionContainer}>
            {instructions.length > 0 && (
              <View style={styles.directionWrapper}>
                <Image
                  source={getDirectionIcon(instructions[0])}
                  style={styles.directionIcon}
                />
                <Text style={styles.instructionText}>
                  {instructions[0].replace(/<[^>]*>?/gm, "")}
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                setDriveMode(!driveMode);
              }}
              style={styles.driveModeButton}
            >
              <Text style={styles.driveModeText}>
                {driveMode ? "Stop Drive Mode" : "Start Drive Mode"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "70%" },
  instructionContainer: {
    height: "30%",
    backgroundColor: "#fff",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  directionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  directionIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  driveModeButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  driveModeText: {
    color: "white",
    fontSize: 16,
  },
});

export default LiveNavigation;
