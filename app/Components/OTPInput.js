import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";

const OTPInput = ({ length = 5, onOTPComplete }) => {
  const [focused, setFocused] = useState({});
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically move to the next input if a digit is entered
    if (text && index < length - 1) {
      setFocused((prev) => ({ ...prev, [index]: true }));
      inputs.current[index + 1].focus();
    }

    // Trigger callback when OTP is complete
    if (newOtp.join("").length === length) {
      onOTPComplete && onOTPComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };
  return otp?.map((digit, index) => (
    <TouchableOpacity key={index} activeOpacity={0.4} style={[styles.otpinpt]}>
      <TextInput
        style={[styles.otpInptBx, focused?.[index] && styles.isfocused]}
        keyboardType="number-pad"
        placeholder="_"
        maxLength={1}
        value={digit}
        onChangeText={(text) => handleChangeText(text, index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
        ref={(ref) => (inputs.current[index] = ref)}
      />
    </TouchableOpacity>
  ));
};

export default OTPInput;

const styles = StyleSheet.create({
  otpInptBx: {
    fontSize: 20,
    width: "100%",
    height: "100%",
    color: "#242424",
    textAlign: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fafafa",
  },

  isfocused: {
    borderColor: "#026874",
    opacity: 0.67,
  },

  otpinpt: {
    position: "relative",
    width: "22%",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
});
