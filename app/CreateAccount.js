import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { Formik } from "formik";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <SafeAreaProvider>
        <ScrollView style={styles.newAcontComp}>
          <SafeAreaView style={styles.newAcontBx}>
            <View style={styles.loginLogo}>
              <Image
                style={styles.logoImg}
                source={require("../assets/images/kabadpe-logo.jpg")}
              />
            </View>

            <Text style={styles.loginTitle}> SignUp to Kabadpe </Text>
            <Formik
              initialValues={{}}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.signUpForm}>
                  <View style={styles.InputBx}>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.input}>
                      <AntDesign
                        style={styles.icon}
                        name="user"
                        size={15}
                        color="#a6a4a4"
                      />
                      <TextInput
                        onChangeText={handleChange("fullname")}
                        onBlur={handleBlur("fullname")}
                        value={values?.fullname}
                        style={styles.mainInput}
                        placeholder="Enter your name..."
                      />
                    </View>
                  </View>

                  <View style={styles.InputBx}>
                    <Text style={styles.label}>Whatsapp no.</Text>
                    <View style={styles.input}>
                      <FontAwesome
                        style={styles.icon}
                        name="whatsapp"
                        size={15}
                        color="#a6a4a4"
                      />
                      <TextInput
                        style={styles.mainInput}
                        onChangeText={handleChange("phoneNumber")}
                        onBlur={handleBlur("phoneNumber")}
                        value={values?.phoneNumber}
                        maxLength={10}
                        keyboardType="numeric"
                        placeholder="Enter your whatsapp no..."
                      />
                    </View>
                  </View>

                  <View style={styles.InputBx}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.input}>
                      <Feather
                        style={styles.icon}
                        name="mail"
                        size={15}
                        color="#a6a4a4"
                      />
                      <TextInput
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values?.email}
                        style={styles.mainInput}
                        placeholder="Enter your email address..."
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
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values?.password}
                        style={styles.mainInput}
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

                  <View style={styles.signupFormBtns}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      activeOpacity={0.7}
                      style={styles.signInBtn}
                    >
                      <Text style={styles.formSignText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.alrhveAcnt}
                    >
                      <Text style={styles.alrhveacntext}>
                        I already have an account
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.googleBtn}
                    >
                      <AntDesign name="google" size={18} color="#026874" />
                      <Text style={styles.googleText}> Google </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  signUpForm: {
    position: "relative",
    width: "100%",
    marginTop: 30,
  },

  googleText: {
    fontSize: 16,
    color: "#026874",
    fontWeight: "600",
    letterSpacing: 0.55,
  },

  googleBtn: {
    position: "relative",
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 50,
    borderWidth: 1.2,
    borderColor: "#026874",
    flexDirection: "row",
    gap: 8,
  },

  alrhveAcnt: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },

  alrhveacntext: {
    textDecorationLine: "underline",
    color: "#026874",
    fontSize: 15,
    fontWeight: "500",
  },

  newAcntBtn: {
    height: "max-content",
    backgroundColor: "transparent",
    borderWidth: 12,
    borderColor: "red",
  },

  signupFormBtns: {
    position: "relative",
    width: "100%",
    marginTop: 50,
  },

  formSignText: {
    fontSize: 15,
    color: "#fff",
  },

  passwordtoggleBtn: {
    position: "absolute",
    top: "28%",
    right: 10,
  },

  newAcontComp: {
    position: "relative",
    width: "100%",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  newAcontBx: {
    position: "relative",
    marginBottom: 150,
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
});
