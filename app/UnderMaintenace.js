import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";

const UnderMaintenance = ({ onRetry }) => {
  const handleRetryClick = onRetry
    ? onRetry
    : () => {
        router.back();
      };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3081/3081910.png",
        }}
        style={styles.image}
      />
      <Text variant="headlineMedium" style={styles.title}>
        Under Maintenance
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        We're working on something awesome! Check back later.
      </Text>
      {handleRetryClick && (
        <Button
          mode="contained"
          onPress={handleRetryClick}
          style={styles.button}
        >
          Go Back
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    marginBottom: 20,
    color: "#6c757d",
  },
  button: {
    marginTop: 10,
  },
});

export default UnderMaintenance;
