import React, { useState, useEffect } from "react";
import { Button, Text, View, Image, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { getLinkingURL } from "expo-linking";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import { userGoogleLogin } from "../services/auth";
import { useDispatch } from "react-redux";
import { userFetch } from "../features/user/userActions";
import Toast from "react-native-toast-message";
import { setInLocalStorage } from "../lib/localStorage";
WebBrowser.maybeCompleteAuthSession();

function GoogelLogin({}) {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const init = params.get("init");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "486027651802-ov8ekmpp7ql59re46eoosdn604ucjmmo.apps.googleusercontent.com",
    androidClientId:
      "486027651802-te1tbgqq19duusn868g3nuiqehcjk20v.apps.googleusercontent.com",
    iosClientId:
      "486027651802-0h1a1lntcptcrq3oekp62ibgk56i6a4u.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response || {};
      fetchUserInfo(authentication?.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    const res = await userGoogleLogin({ app: "app", token: accessToken });
    if (res?.error) {
      Toast.show({ type: "error", text1: "ERROR!", text2: res?.message });
      return;
    }
    await setInLocalStorage("token", res);
    dispatch(userFetch({ tk: res, type: "user" }));
    router.navigate("Spalsh");
  };

  useEffect(() => {
    if (init == "yes" && promptAsync) {
      promptAsync();
    }
  }, [init, promptAsync]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />
      {userInfo && (
        <View style={{ marginTop: 20 }}>
          <Image
            source={{ uri: userInfo.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text>Welcome, {userInfo.name}!</Text>
          <Text>Email: {userInfo.email}</Text>
        </View>
      )} */}
    </View>
  );
}

export default GoogelLogin;
