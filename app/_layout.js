import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../features/store";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="ProfileEdit"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="MapScreen"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="AddressScreen"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="WalletScreen"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Spalsh"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="ForogotPassword"
          options={{ animation: "simple_push" }}
        />
        <Stack.Screen
          name="CreateAccount"
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack>
    </Provider>
  );
}
