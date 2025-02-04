import { router, Slot, Stack } from "expo-router";
import { Provider, useDispatch, useSelector } from "react-redux";
// import { store } from "../features/store";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { Modal } from "react-native";
import { useEffect } from "react";
import { userFetch } from "../features/user/userActions";
import { removeFromLocalStorage } from "@/lib/localStorage";
import { StatusBar } from "expo-status-bar";
// import { Modal, View } from "react-native";
// import ReactNativeModal from "react-native-modal";
// import {JsStack} from "../components/JsStack"
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
      console.log("its userInfo", userInfo, userInfo?.role);
      const initPage = { user: "Spalsh", kabadCollector: "Dashboard" }; //kabadCollector: "UnderMaintenace"
      router.navigate(initPage?.[userInfo?.role]);
    }
  }, [userInfo]);
  // const Stack=JsStack
  return (
    // -------------------------------------
    // <SafeAreaProvider>
    //   <RootSiblingParent>
    //     <Provider store={store}>
    <>
      <StatusBar style="light" backgroundColor="#026874" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        {/* <Stack.Screen name="(drawer)" /> */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(drawer)" options={{ animation: "simple_push" }} />
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
        <Stack.Screen
          name="KabadiLogin"
          options={{ animation: "simple_push" }}
        />
        <Stack.Screen
          name="KabadiCreateAccount"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen name="Profile" options={{ animation: "simple_push" }} />
        <Stack.Screen
          name="Dashboard"
          options={{ animation: "fade_from_bottom", title: "Dashboard" }}
        />
        <Stack.Screen
          name="LocateAddress"
          options={{ animation: "fade_from_bottom", title: "LocateAddress" }}
        />
        <Stack.Screen
          name="BuyWaste"
          options={{ animation: "simple_push", title: "BuyWaste" }}
        />

        <Slot />
      </Stack>
    </>

    //     </Provider>
    //     <Toast />
    //   </RootSiblingParent>
    // </SafeAreaProvider>
  );
}
