import { router, Stack } from "expo-router";
import { Provider, useDispatch, useSelector } from "react-redux";
// import { store } from "../features/store";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { Modal } from "react-native";
import { useEffect } from "react";
import { userFetch } from "../features/user/userActions";
import { removeFromLocalStorage } from "@/lib/localStorage";
// import { Modal, View } from "react-native";
// import ReactNativeModal from "react-native-modal";
export default function StackScreen() {
  const dispatch = useDispatch();
  const {
    user,
    success: { login, signup, verifySignup },
    errors: {
      login: errorLogin,
      signup: errorSignup,
      verifySignup: errorVerify,
    },
  } = useSelector((s) => s.auth);
  const { userInfo } = useSelector((s) => s?.user);
  useEffect(() => {
    dispatch(userFetch({}));
  }, [verifySignup, login]);
  useEffect(() => {
    if (userInfo) {
      console.log("its userInfo", userInfo);
      router.navigate("Spalsh");
    }
  }, [userInfo]);
  return (
    // -------------------------------------
    // <SafeAreaProvider>
    //   <RootSiblingParent>
    //     <Provider store={store}>
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
      <Stack.Screen name="Spalsh" options={{ animation: "fade_from_bottom" }} />
      <Stack.Screen
        name="ForogotPassword"
        options={{ animation: "simple_push" }}
      />
      <Stack.Screen
        name="CreateAccount"
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen name="KabadiLogin" options={{ animation: "simple_push" }} />
      <Stack.Screen
        name="KabadiCreateAccount"
        options={{ animation: "fade_from_bottom" }}
      />
    </Stack>
    //     </Provider>
    //     <Toast />
    //   </RootSiblingParent>
    // </SafeAreaProvider>
  );
}
