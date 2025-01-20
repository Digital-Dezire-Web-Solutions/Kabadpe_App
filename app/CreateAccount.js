import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { Formik } from "formik";
import { object, string } from "yup";
import { FormError } from "../components/FormError";
import { useDispatch, useSelector } from "react-redux";
import { userSignup, userVerifySignup } from "../features/auth/authActions";
import ReactNativeModal from "react-native-modal";
import OTPInput from "./Components/OTPInput";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
const CreateAccount = () => {
  const [otp, setOpt] = useState("");
  const [otpModal, setotpModal] = useState(false);
  const [bgColor, setBgColor] = useState("#026874");
  const {
    user,
    success: { login, signup, verifySignup },
    errors: {
      login: errorLogin,
      signup: errorSignup,
      verifySignup: errorVerify,
    },
  } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (values) => {
    dispatch(userSignup(values));
  };
  console.log(
    "this is auth state",
    otpModal,
    login,
    signup,
    verifySignup,
    user
  );
  useEffect(() => {
    if (login || verifySignup) {
      router.navigate("Spalsh");
    } else if (signup) {
      setotpModal(true);
    }
  }, [login, signup, verifySignup]);
  // useEffect(() => {
  //   // if (errorSignup || errorVerify) {
  //   Toast.show({
  //     type: "error",
  //     text1: "ERROR!",
  //     text2: "errorSignup || errorVerify",
  //   });
  //   // }
  // }, [errorSignup, errorVerify]);
  return (
    <>
      <SafeAreaProvider>
        <ScrollView style={styles.newAcontComp}>
          <ImageBackground style={styles.formBg} source={require('../assets/images/recycle.png')}></ImageBackground>

          <ImageBackground style={[styles.formBg, styles.formBg2]} source={require('../assets/images/recycle.png')}></ImageBackground>
          
          <SafeAreaView style={styles.newAcontBx}>
            <View style={styles.loginLogo}>
              <Image
                style={styles.logoImg}
                source={require("../assets/images/kabadpe-logo.jpg")}
              />
            </View>

            <Text style={styles.loginTitle}> SignUp to Kabadpe </Text>
            <Formik
              initialValues={{
                fullname: "",
                email: "",
                password: "",
                phoneNumber: "",
              }}
              validationSchema={object().shape({
                fullname: string().required("Fullname is required"),
                email: string()
                  .required("Email is required")
                  .email("Invalid email format"),
                password: string().required("Password is required"),
                phoneNumber: string()
                  .required("Phone number is required")
                  .matches(
                    /^\d{10}$/,
                    "Phone number must be exactly 10 digits"
                  ),
              })}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
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
                    <FormError
                      error={errors}
                      touched={touched}
                      name={"fullname"}
                    />
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
                    <FormError
                      error={errors}
                      touched={touched}
                      name={"phoneNumber"}
                    />
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
                    <FormError
                      error={errors}
                      touched={touched}
                      name={"email"}
                    />
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
                    <FormError
                      error={errors}
                      touched={touched}
                      name={"password"}
                    />
                  </View>
                  <Text
                    style={{ color: "red", marginTop: 10, textAlign: "center" }}
                  >
                    {errorSignup}
                  </Text>
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
        <ReactNativeModal
          // propagateSwipe={true}
          isVisible={otpModal}
          animationIn={"bounceInUp"}
          animationInTiming={800}
          style={{ justifyContent: "flex-end", margin: 0 }}
          onBackButtonPress={() => setotpModal(false)}
          onBackdropPress={() => setotpModal(false)}
        >
          <View style={styles.otpModalBx}>
            <View style={styles.otpImg}>
              <Image
                style={styles.otpicon}
                source={require("../assets/images/password-access.png")}
              />
            </View>

            <View style={styles.otptextBx}>
              <Text style={styles.otptext}>Enter OTP</Text>
              <Text style={styles.sixdigittext}>
                An 6 digit code has been sent to +91 9971464759
              </Text>
            </View>

            <View style={styles.otpinptflexBx}>
              <OTPInput
                length={5}
                onOTPComplete={(otp) => {
                  Keyboard.dismiss();
                  dispatch(userVerifySignup({ otp, email: user?.email }));
                }}
              />
            </View>
            <Text style={{ color: "red", marginTop: 10, textAlign: "center" }}>
              {errorVerify}
            </Text>
            <View style={styles.notgetOtpbx}>
              <Text style={styles.didnotgetotptext}>
                Did not get OTP Code ?
              </Text>
              <TouchableOpacity style={styles?.resentcodeBtn}>
                <Text style={styles.resentCodetext}>Resent Code</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.otpverifyBtn}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.signInBtn,
                  styles.forgotpasswrdBtn,
                  { backgroundColor: bgColor },
                  styles.verifyBtn,
                ]}
                onPressIn={() => setBgColor("#046e7a")} // Change to darker color when pressed
                onPressOut={() => setBgColor("#026874")}
              >
                <Text style={styles.formSignText}>Verify OTP</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ReactNativeModal>
      </SafeAreaProvider>
    </>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({

  formBg:{
    position : 'absolute',
    top : '1%',
    left : '40%',
    width : '95%',
    height : '65%',
    objectFit : 'cover',
    opacity : 0.03,
  },

  formBg2:{
    top : '70%',
    left : '-30%',
    width : '90%',
    height : '60%',
  },
  
  signUpForm: {
    position: "relative",
    width: "100%",
    marginTop: 10,
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
    marginTop: 10,
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
    paddingTop: 40,
  },

  newAcontBx: {
    position: "relative",
    marginBottom: 80,
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
  ...{
    otpverifyBtn: {
      position: "absolute",
      bottom: 30,
      left: 18,
      width: "100%",
    },

    notgetOtpbx: {
      position: "relative",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 45,
    },

    didnotgetotptext: {
      fontSize: 15,
      color: "#8b8c8c",
      fontWeight: "500",
      marginBottom: 6,
    },

    resentCodetext: {
      fontSize: 15,
      fontWeight: "500",
      color: "#026874",
    },

    otpinptflexBx: {
      position: "relative",
      marginTop: 32,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    otptextBx: {
      position: "relative",
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: 20,
    },

    sixdigittext: {
      fontSize: 15,
      color: "#828585",
      fontWeight: "400",
      lineHeight: 22,
      maxWidth: 220,
    },

    otptext: {
      fontSize: 26,
      fontWeight: "600",
      color: "#0b1f1f",
      marginBottom: 4,
    },

    otpModalBx: {
      position: "relative",
      width: "100%",
      height: "90%",
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 50,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
    },

    otpModelScroll: {
      position: "relative",
      flex: 1,
      height: "100%",
      width: "100%",
    },

    otpImg: {
      position: "relative",
      width: 100,
      height: 100,
      marginHorizontal: "auto",
      marginBottom: 20,
    },

    otpicon: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    forgotpasswordform: {
      marginTop: 20,
      width: "100%",
    },

    remembrEmailText: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },

    linkText: {
      fontSize: 14,
      color: "#026874",
      textDecorationLine: "underline",
      fontWeight: "500",
    },

    remebEmil: {
      position: "relative",
      marginTop: 25,
      fontSize: 14.5,
      fontWeight: "400",
      color: "#7e8080",
    },

    forgotpasswrdBtn: {
      marginTop: 40,
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
      letterSpacing: 0,
      fontSize: 15,
      color: "#242424",
    },

    InputBx: {
      position: "relative",
      width: "100%",
      gap: 8,
      marginTop: 20,
    },

    forgotpoasswrdText: {
      textAlign: "center",
      marginTop: 8,
      fontSize: 15,
      lineHeight: 22,
      color: "#827e7d",
    },

    loginTitle: {
      fontSize: 25,
      marginTop: 25,
      textAlign: "center",
      fontWeight: "500",
      color: "#224242",
    },

    forgotPasswordComp: {
      position: "relative",
      width: "100%",
      flex: 1,
      backgroundColor: "#fafafa",
      paddingHorizontal: 20,
      paddingVertical: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    forgotPasswordBx: {
      position: "relative",
      width: "100%",
    },

    lock_img: {
      position: "relative",
      width: 100,
      height: 100,
      marginHorizontal: "auto",
      marginBottom: 12,
    },

    lockImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
});
