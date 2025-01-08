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

const ForogotPassword = () => {
  const [email, setEmail] = useState("");
  const [bgColor, setBgColor] = useState("#026874");
  const [otp, setOtp] = useState(false);
  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleModal = () => {
    if (emailValid.test(email)) {
      setOtp(true);
    }
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

          <Text style={styles.loginTitle}>Forgot Password</Text>
          <Text style={styles.forgotpoasswrdText}>
            Please enter your email address to reset your password.
          </Text>
        </View>

        <View style={styles.forgotpasswordform}>
          <View style={styles.InputBx}>
            <Text style={styles.label}>Emai Id / Mobile No.</Text>
            <View style={styles.input}>
              <Feather
                style={styles.icon}
                name="mail"
                size={15}
                color="#a6a4a4"
              />
              <TextInput
                style={styles.mainInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email id or mobile no..."
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleModal()}
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

          <View style={styles.otptextBx}>
            <Text style={styles.otptext}>Enter OTP</Text>
            <Text style={styles.sixdigittext}>
              An 6 digit code has been sent to +91 9971464759
            </Text>
          </View>

          <View style={styles.otpinptflexBx}>
            <OTPInput />
            <OTPInput />
            <OTPInput />
            <OTPInput />
          </View>

          <View style={styles.notgetOtpbx}>
            <Text style={styles.didnotgetotptext}>Did not get OTP Code ?</Text>
            <TouchableOpacity style={styles?.resentcodeBtn}>
              <Text style={styles.resentCodetext}>Resent Code</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.otpverifyBtn}>
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
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default ForogotPassword;

const styles = StyleSheet.create(
  {
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
