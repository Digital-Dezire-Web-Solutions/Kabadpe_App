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
import Feather from "@expo/vector-icons/Feather";
import ReactNativeModal from "react-native-modal";
import OTPInput from "./Components/OTPInput";
import { Formik } from "formik";
import { object, string } from "yup";
import { FormError } from "../components/FormError";
import {
  userForgetPassRequestOTP,
  userForgetPassRequestReset,
} from "../services/auth";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const ForogotPassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [resErrors, setResErrors] = useState({});
  const [codes, setCode] = useState({});
  const [email, setEmail] = useState("");
  const [bgColor, setBgColor] = useState("#026874");
  const [otp, setOtp] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleModal = () => {
    if (emailValid.test(email)) {
      setOtp(true);
    }
  };
  const handleSubmit = async ({ email }) => {
    const res = await userForgetPassRequestOTP({ email });
    if (res?.error) {
      setResErrors({ request: res?.message });
      return;
    }
    setCode({ otp: res });
    setOtp(true);
    setResetForm(false);
  };
  return (
    <>
      <SafeAreaView style={styles.forgotPasswordComp}>
        <View style={styles.forgotPasswordBx}>
          <View style={styles.lock_img}>
            <Image
              style={styles.lockImg}
              source={require("../assets/images/padlock.png")}
            />
          </View>

          <Text style={styles.loginTitle}>Forgot Password </Text>
          <Text style={styles.forgotpoasswrdText}>
            Please enter your email address to reset your password.
          </Text>
        </View>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={object().shape({
            email: string()
              .required("Email is required")
              .email("Invalid email format"),
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
            <View style={styles.forgotpasswordform}>
              <View style={styles.InputBx}>
                <Text style={styles.label}>Emai Id </Text>
                {/* Mobile No. */}
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
                    placeholder="Enter your email id"
                    // or mobile no...
                  />
                </View>
                <FormError error={errors} touched={touched} name={"email"} />
              </View>
              <Text
                style={{ color: "red", marginTop: 10, textAlign: "center" }}
              >
                {resErrors?.request}
              </Text>
              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.7}
                style={[
                  styles.signInBtn,
                  styles.forgotpasswrdBtn,
                  { backgroundColor: bgColor },
                ]}
                onPressIn={() => setBgColor("#046e7a")} // Change to darker color when pressed
                onPressOut={() => setBgColor("#026874")}
              >
                <Text style={styles.formSignText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Text style={styles.remebEmil}>Don't remember your email? </Text>
        <View style={styles.remembrEmailText}>
          <Text style={[styles.remebEmil, { marginTop: 0 }]}>
            Contact us at{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.linkBtn}>
            <Text style={styles.linkText}>support@kabadpe.com</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ReactNativeModal
        isVisible={otp}
        animationIn={"bounceInUp"}
        animationInTiming={800}
        style={{ justifyContent: "flex-end", margin: 0 }}
        onBackButtonPress={() => setOtp(false)}
        onBackdropPress={() => setOtp(false)}
      >
        <View style={styles.otpModalBx}>
          <View style={styles.otpImg}>
            <Image
              style={styles.otpicon}
              source={require("../assets/images/password-access.png")}
            />
          </View>
          {!resetForm ? (
            <>
              <View style={styles.otptextBx}>
                <Text style={styles.otptext}>Enter OTP</Text>
                <Text style={styles.sixdigittext}>
                  An 5 digit code has been sent to Your Email
                </Text>
              </View>
              <Text
                style={{ color: "red", marginTop: 10, textAlign: "center" }}
              >
                {resErrors?.otp}
              </Text>
              <View style={styles.otpinptflexBx}>
                <OTPInput
                  onOTPComplete={async (otp) => {
                    const res = await userForgetPassRequestReset({
                      otp,
                      code: codes?.otp,
                    });
                    if (res?.error) {
                      setResErrors({ otp: res?.message });
                      return;
                    }
                    setCode({ callback: res });
                    setResetForm(true);
                  }}
                  length={5}
                />
              </View>

              <View style={styles.notgetOtpbx}>
                <Text style={styles.didnotgetotptext}>
                  Did not get OTP Code ?
                </Text>
                <TouchableOpacity style={styles?.resentcodeBtn}>
                  <Text style={styles.resentCodetext}>Resent Code</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Formik
              validationSchema={object().shape({
                password: string().required("Password is required"),
                confirmNewPassword: string()
                  .required("Confirm Password is required")
                  .oneOf([ref("password"), null], "Passwords must match"),
              })}
              initialValues={{ password: "", confirmNewPassword: "" }}
              onSubmit={async ({ password }) => {
                const res = await userForgetPassCallback({
                  password,
                  code: codes?.callback,
                });
                if (res?.error) {
                  setResErrors({ OTP: res?.message });
                  return;
                }
                router.navigate("/");
                Toast.show({
                  type: "success",
                  text1: "Success!",
                  text2: "Password Saved Succesfully",
                });
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <View style={styles.loginForm}>
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
                      <FormError
                        error={errors}
                        touched={touched}
                        name={"password"}
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
                          style={styles.mainInput}
                          onChangeText={handleChange("confirmNewPassword")}
                          onBlur={handleBlur("confirmNewPassword")}
                          value={values?.confirmNewPassword}
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
                        name={"confirmNewPassword"}
                      />
                    </View>
                  </View>
                  <Text
                    style={{ color: "red", marginTop: 10, textAlign: "center" }}
                  >
                    {resErrors?.callback}
                  </Text>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    // onPress={() => router.navigate("Spalsh")}
                    activeOpacity={0.7}
                    style={styles.signInBtn}
                  >
                    <Text style={styles.formSignText}>Save</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          )}
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
    </>
  );
};

export default ForogotPassword;

const styles = StyleSheet.create({
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
    marginTop: 25,
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
});
