import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../features/store";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { Modal } from "react-native";
// import { Modal, View } from "react-native";
// import ReactNativeModal from "react-native-modal";
export default function RootLayout() {
  return (
    // -------------------------------------
    <SafeAreaProvider>
      <RootSiblingParent>
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
        {/* <Modal transparent pointerEvents="none"> */}
        {/* <View style={{ flex: 1, pointerEvents: "box-none" }}> */}
        <Toast />
        {/* </View> */}
        {/* </Modal> */}
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}
