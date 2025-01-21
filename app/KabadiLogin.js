import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ReactNativeModal from "react-native-modal";
import { useRouter } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from "@expo/vector-icons/Feather";

const KabadiLogin = () => {
  const [whatsApp, setWhatsApp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();
  return (
  <>
  <SafeAreaProvider>
    <SafeAreaView style={styles.kabadiPage}>
    <View style={[styles.LoginComp, styles.KabadiComp]}>
        <View style={styles.loginBx}>
          <View style={styles.loginLogo}>
            <Image
              style={styles.logoImg}
              source={require("../assets/images/kabadpe-logo.jpg")}
            />
          </View>
          <Text style={styles.loginTitle}>Sign In as Kabadi</Text>
          </View>
          </View>

                <View style={styles.loginForm}>
                  <View style={styles.InputBx}>
                    <Text style={styles.label}>Whatsapp No.</Text>
                    <View style={styles.input}>
                      <FontAwesome6
                        style={styles.icon}
                        name="whatsapp"
                        size={15}
                        color="#a6a4a4"
                      />
                      <TextInput
                        style={styles.mainInput}
                        onChangeText={(text) => setWhatsApp(text)}
                        value={whatsApp}
                        placeholder="Enter your whatsapp number..."
                      />
                    </View>
                  </View>

                  <View style={styles.InputBx}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.input}>
                      <Feather
                        style={styles.icon}
                        name="lock"
                        size={15}
                        color="#a6a4a4"
                      />
                      <TextInput
                        style={styles.mainInput}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder="Enter your password..."
                        secureTextEntry={showPassword ? true : false}
                      />

                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        activeOpacity={0.6}
                        style={styles.passwordtoggleBtn}
                      >
                        {showPassword ? (
                          <Feather name="eye-off" size={20} color="#a6a4a4" />
                        ) : (
                          <Feather name="eye" size={20} color="#a6a4a4" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => router.navigate("ForgetPassword")}
                    style={styles.forgotPasswrdBtn}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => router.navigate('Dashboard')}
                  activeOpacity={0.7}
                  style={styles.signInBtn}
                >
                  <Text style={styles.formSignText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
            onPress={() => router.navigate("KabadiCreateAccount")}
            activeOpacity={0.7}
            style={[styles.signInBtn, styles.newAcntBtn]}
          >
            <Text style={[styles.formSignText, styles.formSignText2]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => router.navigate("/")}
            activeOpacity={0.7}
            style={[styles.signInBtn, styles.vendLoginBtn]}
          >
            <Text style={styles.formSignText}>User Login</Text>
          </TouchableOpacity>

          <View style={styles.workerareabx}>
            <Text style={styles.workertextcolor}>Worker Area</Text>
          </View>
          
    </SafeAreaView>
  </SafeAreaProvider>
  </>
  )
}

export default KabadiLogin

const styles = StyleSheet.create({
  kabadiPage:{
    position : 'relative',
    flex : 1,
    width : '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,

  },


  loginForm: {
    position: "relative",
    marginTop: 15,
    marginBottom: 35,
  },

  workerareabx:{
    position : 'absolute',
    top : 0,
    right : 0,
    paddingBlock : 4,
    borderBottomWidth : .65,
    borderBottomColor : "#0eb0a0",
    paddingInlineEnd : 8,
    paddingInlineStart : 8,
    
  },

  workertextcolor:{
    fontSize : 12,
    color : "#0eb0a0",
  },

  forgotPasswrdBtn: {
    position: "relative",
    marginTop: 10,
  },

  forgotPasswordText: {
    textDecorationLine: "underline",
    textDecorationColor: "#026874",
    color: "#026874",
  },

  formSignText2: {
    color: "#026874",
  },

  newAcntBtn: {
    backgroundColor: "transparent",
  },

  vendLoginBtn: {
    backgroundColor: "#0eb0a0",
    borderColor: "#0eb0a0",
  },

  formSignText: {
    fontSize: 15,
    color: "#fff",
  },

  signInBtn: {
    position: "relative",
    width: "100%",
    height: 46,
    backgroundColor: "#026874",
    borderWidth: 1.2,
    borderColor: "#026874",
    borderRadius: 30,
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  passwordtoggleBtn: {
    position: "absolute",
    top: "28%",
    right: 10,
  },

  icon: {
    position: "absolute",
    top: "33%",
    left: 10,
  },

  input: {
    position: "relative",
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 0.15,
    borderColor: "#242421",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
  },

  mainInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 35,
    fontSize: 13,
    color: "#212121",
  },

  label: {
    fontSize: 15,
    color: "#0d0d0d",
    letterSpacing: 0.55,
    fontSize: 15,
    color: "#242424",
  },

  InputBx: {
    position: "relative",
    width: "100%",
    gap: 8,
    marginTop: 25,
  },


  LoginComp: {
    position: "relative",
    width: "100%",
 
  },

  loginBx: {
    position: "relative",
    width: "100%",
    height: "max-content",
    display: "flex",
    alignItems: "flexStart",
    justifyContent: "center",
  },

  loginLogo: {
    position: "relative",
    width: 75,
    height: 75,
    alignSelf: "center",
  },

  logoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 50,
  },

  loginTitle: {
    fontSize: 25,
    marginTop: 25,
    textAlign: "center",
    fontWeight: "500",
    color: "#224242",
  },

 
})