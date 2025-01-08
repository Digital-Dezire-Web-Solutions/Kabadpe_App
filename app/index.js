import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import ReactNativeModal from "react-native-modal";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
export default function App() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();

  return (
    <>
      <SafeAreaProvider style={styles.LoginComp}>
        <View style={styles.loginBx}>
          <View style={styles.loginLogo}>
            <Image
              style={styles.logoImg}
              source={require("../assets/images/kabadpe-logo.jpg")}
            />
          </View>
          <Text style={styles.loginTitle}>Sign In to Kabadpe</Text>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values) => {
              dispatch(userLogin({ ...values, loginType: "user" }));
              // console.log(values);
              // router.navigate("Spalsh");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <View style={styles.loginForm}>
                  <View style={styles.InputBx}>
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.input}>
                      <Feather
                        style={styles.icon}
                        name="mail"
                        size={15}
                        color="#a6a4a4"
                      />
                      <TextInput
                        style={styles.mainInput}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values?.email}
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
                        style={styles.mainInput}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values?.password}
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
                    onPress={() => router.navigate("ForogotPassword")}
                    style={styles.forgotPasswrdBtn}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  // onPress={() => router.navigate("Spalsh")}
                  activeOpacity={0.7}
                  style={styles.signInBtn}
                >
                  <Text style={styles.formSignText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            onPress={() => router.navigate("CreateAccount")}
            activeOpacity={0.7}
            style={[styles.signInBtn, styles.newAcntBtn]}
          >
            <Text style={[styles.formSignText, styles.formSignText2]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.signInBtn, styles.vendLoginBtn]}
          >
            <Text style={styles.formSignText}>Worker Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>

      {/* <ReactNativeModal isVisible={true} animationIn={"fadeInUp"} style={{
      justifyContent : 'flex-end' , margin : 0
    }}>

      <SafeAreaView style={styles.forgotPasswordModal}>

        <View style={styles.lock_img}>
          <Image style={styles.lockImg} source={require('@/assets/images/padlock.png')} />
        </View>
        
      </SafeAreaView>

    </ReactNativeModal> */}
    </>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    position: "relative",
    marginTop: 15,
    marginBottom: 35,
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
    backgroundColor: "#34e6ed",
    borderColor: "#34e6ed",
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
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fafafa",
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
});
