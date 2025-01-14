import { router, Stack } from "expo-router";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../features/store";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { Modal } from "react-native";
import { useEffect } from "react";
import { userFetch } from "../features/user/userActions";
import StackScreen from "../components/StackScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
// import { Modal, View } from "react-native";
// import ReactNativeModal from "react-native-modal";
export default function RootLayout() {
  // const dispatch = useDispatch();
  // const {
  //   user,
  //   success: { login, signup, verifySignup },
  //   errors: {
  //     login: errorLogin,
  //     signup: errorSignup,
  //     verifySignup: errorVerify,
  //   },
  // } = useSelector((s) => s.auth);
  // const { userInfo } = useSelector((s) => s?.user);
  // useEffect(() => {
  //   dispatch(userFetch());
  // }, [verifySignup, login]);
  // useEffect(() => {
  //   if (userInfo) {
  //     router.navigate("Spalsh");
  //   }
  // }, [userInfo]);
  return (
    // -------------------------------------
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <StackScreen />
          </QueryClientProvider>
        </Provider>
        <Toast />
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}
