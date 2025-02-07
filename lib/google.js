import React, { useState, useEffect } from "react";
import { Button, Text, View, Image, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { getLinkingURL } from "expo-linking";
WebBrowser.maybeCompleteAuthSession();

function GoogelLogin({ path = "" }) {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "486027651802-ov8ekmpp7ql59re46eoosdn604ucjmmo.apps.googleusercontent.com",
    androidClientId:
      "486027651802-te1tbgqq19duusn868g3nuiqehcjk20v.apps.googleusercontent.com",
    iosClientId:
      "486027651802-0h1a1lntcptcrq3oekp62ibgk56i6a4u.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ path }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = await res.json();
      setUserInfo(user);
      console.log(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
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
      )}
    </View>
  );
}

export default GoogelLogin;
