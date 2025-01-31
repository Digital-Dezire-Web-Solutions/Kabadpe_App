import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import SugestionInpt from "./Components/SugestionInpt";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import ReactNativeModal from "react-native-modal";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Checkbox } from "react-native-paper";
import { Formik } from "formik";
import { number, object, string } from "yup";
import { workers } from "../lib/worker";
import { useQuery } from "@tanstack/react-query";
import { userServicableAriasFetch } from "../services/appoinment";
import { userValidateKabadPeRefrral } from "../services/auth";
import { userSignup, userVerifySignup } from "../features/auth/authActions";
import OTPInput from "./Components/OTPInput";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../features/user/userActions";
const KabadiCreateAccount = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [areaName, setAreaName] = useState("");
  const [subAreaName, setSubAreaName] = useState("");
  const [selectedValue, setSelectedValue] = useState("Choose One");
  const [selectModal, setSelectModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [arias, setArias] = useState([]);
  const [subArias, setSubArias] = useState([]);
  const [refrralValidation, setRefrralValidation] = useState(null);
  const [otpModal, setotpModal] = useState(false);
  const {
    user,
    success: { login, signup, verifySignup },
    errors: {
      login: errorLogin,
      signup: errorSignup,
      verifySignup: errorVerify,
    },
  } = useSelector((s) => s.auth);
  const { data: servicableAddresses } = useQuery({
    queryKey: ["servicableAddresses:workerLogin"],
    queryFn: () => userServicableAriasFetch(),
  });

  const pincodes = [];
  const getArias = (pincode, res) => {
    return [
      ...new Set(
        res
          .filter(
            (e) =>
              e?.pincode?.toLowerCase()?.trim() ==
              pincode?.toLowerCase()?.trim()
          )
          ?.map((e, i) => e?.ariaName?.toLowerCase()?.trim())
      ),
    ]?.map((name, i) => ({ id: i, name }));
  };

  const getSubArias = (pincode, aria, res) => {
    return [
      ...new Set(
        res
          .filter(
            (e) =>
              e?.pincode?.toLowerCase()?.trim() ==
                pincode?.toLowerCase()?.trim() &&
              e?.ariaName?.toLowerCase()?.trim() == aria?.toLowerCase()?.trim()
          )
          ?.map((e, i) => e?.subAriaName?.toLowerCase()?.trim())
      ),
    ]?.map((name, i) => ({ id: i, name }));
  };
  const handleSubmit = async (data) => {
    dispatch(userSignup({ ...data, loginType: "collector" }));
  };
  useEffect(() => {
    if (verifySignup) {
      dispatch(userFetch({}));
    } else if (signup) {
      setotpModal(true);
    }
  }, [signup, verifySignup]);
  return (
    <SafeAreaProvider>
      <ScrollView style={styles.newAcontComp} nestedScrollEnabled={true}>
        <ImageBackground
          style={styles.formBg}
          source={require("../assets/images/recycle.png")}
        ></ImageBackground>

        <ImageBackground
          style={[styles.formBg, styles.formBg2]}
          source={require("../assets/images/recycle.png")}
        ></ImageBackground>
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            pincode: "",
            phoneNumber: "",
            companyRef: "",
            workerRole: "",
            ariaName: "",
            subAriaName: "",
            emergencyPhone: "",
          }}
          validationSchema={object().shape({
            fullname: string().required("Full name is required"),
            emergencyPhone: string().matches(
              /^\d{10}$/,
              "Phone number must be exactly 10 digits"
            ),
            companyRef: string(),
            email: string().email("Invalid email address"),
            password: string().required("Password is required"),
            pincode: number().required("Pincode is required"),
            workerRole: string().required("Worker role is required"),
            phoneNumber: string()
              .required("Phone number is required")
              .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
            ariaName: string().required("Area name is required"),
            subAriaName: string().required("Sub Area name is required"),
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
            <SafeAreaView style={styles.newAcontBx}>
              <View style={styles.loginLogo}>
                <Image
                  style={styles.logoImg}
                  source={require("../assets/images/kabadpe-logo.jpg")}
                />
              </View>

              <Text style={styles.loginTitle}> SignUp as a Worker </Text>

              <View style={styles.signUpForm}>
                <View style={styles.InputBx}>
                  <Text style={styles.label}>Full Name / पूरा नाम</Text>
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
                      name="name"
                      placeholder="Enter your name..."
                    />
                  </View>
                </View>

                <View style={styles.InputBx}>
                  <Text style={styles.label}>
                    WhatsApp No. / व्हाट्सएप नंबर
                  </Text>
                  <View style={styles.input}>
                    <FontAwesome
                      style={styles.icon}
                      name="whatsapp"
                      size={15}
                      color="#a6a4a4"
                    />
                    <TextInput
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      value={values?.phoneNumber}
                      style={styles.mainInput}
                      maxLength={10}
                      name="whatsappnumber"
                      keyboardType="numeric"
                      placeholder="Enter your whatsapp no..."
                    />
                  </View>
                </View>

                <SugestionInpt
                  data={pincodes}
                  //   state={pinValue}
                  //   setterFunc={()=>{}}
                  onChange={(value) => {
                    handleChange("pincode")(value);
                    const arias = getArias(value, servicableAddresses);
                    setArias(
                      arias?.map(({ name }) => ({
                        value: name,
                        lable: name,
                      }))
                    );
                  }}
                  labelTitle={"Work Area Pincode / कार्य क्षेत्र पिनकोड"}
                  placeHolderText={"Enter your workarea pincode..."}
                  iconName={"pin"}
                />

                <SugestionInpt
                  data={arias?.map(({ value }) => value)}
                  onChange={(value) => {
                    handleChange("ariaName")(value);
                    const subArias = getSubArias(
                      values?.pincode,
                      value,
                      servicableAddresses
                    );
                    setSubArias(
                      subArias?.map(({ name }) => ({
                        value: name,
                        lable: name,
                      }))
                    );
                  }}
                  labelTitle={"Choose Area / क्षेत्र चुनें"}
                  placeHolderText={"Enter your area..."}
                  iconName={"location-pin"}
                />

                <SugestionInpt
                  data={subArias?.map(({ value }) => value)}
                  onChange={handleChange("subAriaName")}
                  labelTitle={"Choose Sub Area / उप क्षेत्र चुनें"}
                  placeHolderText={"Enter your subarea..."}
                  iconName={"location"}
                />

                <View style={styles.InputBx}>
                  <Text style={styles.label}>
                    Choose Work Type / कार्य का प्रकार चुनें
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSelectModal(true)}
                    activeOpacity={0.8}
                    style={styles.input}
                  >
                    <Feather
                      style={styles.icon}
                      name="type"
                      size={15}
                      color="#a6a4a4"
                    />

                    <Text style={styles.selectedText}>
                      {" "}
                      {values?.workerRole}{" "}
                    </Text>
                    <View style={styles.downicon}>
                      <FontAwesome
                        name="angle-down"
                        size={18}
                        color="#858282"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <ReactNativeModal
                  isVisible={selectModal}
                  animationIn={"fadeIn"}
                  animationInTiming={100}
                  onBackButtonPress={() => setSelectModal(false)}
                  onBackdropPress={() => setSelectModal(false)}
                >
                  <View style={styles.choseWorkTypeBx}>
                    <FlatList
                      nestedScrollEnabled={true}
                      data={workers}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          activeOpacity={0.2}
                          style={[styles.dropdownItem]}
                          onPress={() => {
                            handleChange("workerRole")(item?.value);
                            setSelectModal(false);
                          }}
                        >
                          <Text style={styles.workText}>
                            {item?.hindiLable}
                          </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => item.id}
                    />
                  </View>
                </ReactNativeModal>

                {values?.workerRole == "kabadi" ? (
                  <View style={styles.InputBx}>
                    <Text style={styles.label}>
                      Company Referral Code / कंपनी रेफरल कोड
                    </Text>
                    <View style={styles.input}>
                      <AntDesign
                        style={styles.icon}
                        name="codesquareo"
                        size={15}
                        color="#a6a4a4"
                      />
                      <TextInput
                        onChangeText={async (text) => {
                          const value = text?.trim();
                          handleChange("companyRef")(value);
                          if (!value) {
                            setRefrralValidation(null);
                            return;
                          }
                          const result = await userValidateKabadPeRefrral(
                            value
                          );
                          setRefrralValidation(result);
                        }}
                        // onBlur={handleBlur("email")}
                        value={values?.companyRef}
                        style={styles.mainInput}
                        name="companyreferralcode"
                        placeholder="Enter company referral code..."
                      />
                    </View>
                    {refrralValidation?.error ? (
                      <Text style={{ color: "red" }}>
                        {refrralValidation?.message}
                      </Text>
                    ) : refrralValidation?.name ? (
                      <Text style={{ color: "green" }}>
                        {refrralValidation?.name}
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                <View style={styles.InputBx}>
                  <Text style={styles.label}>
                    Enter Your Email / अपना ईमेल डालें
                  </Text>
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
                      //   name="useremail"
                      placeholder="Enter your emai id..."
                    />
                  </View>
                </View>

                <View style={styles.InputBx}>
                  <Text style={styles.label}>
                    Enter Your Password / अपना पासवर्ड डालें
                  </Text>
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
                      name="userpassword"
                      placeholder="Enter your password..."
                    />
                  </View>
                </View>

                <View style={styles.InputBx}>
                  <Text style={styles.label}>
                    Emergency Contact No. / आपातकालीन संपर्क नंबर
                  </Text>
                  <View style={styles.input}>
                    <FontAwesome6
                      style={styles.icon}
                      name="phone"
                      size={15}
                      color="#a6a4a4"
                    />
                    <TextInput
                      onChangeText={handleChange("emergencyPhone")}
                      onBlur={handleBlur("emergencyPhone")}
                      value={values?.emergencyPhone}
                      style={styles.mainInput}
                      name="usermobilenumber"
                      placeholder="Enter your mobile no..."
                    />
                  </View>
                </View>
              </View>

              <View style={styles.chekbxCont}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => setChecked(!checked)}
                  color="#0594b0" // Checkbox checkmark color
                  uncheckedColor="#c2c0c0" // Border color when unchecked
                />

                <Text style={styles.notetext}>
                  Please Read{" "}
                  <Text style={{ color: "#1cb8b2" }}>Team & Conditions </Text>{" "}
                  for Workers and Confirm before Clicking the Request Button /
                  कृपया श्रमिकों के लिए{" "}
                  <Text style={{ color: "#1cb8b2" }}> टर्म और शर्तें </Text>{" "}
                  पढ़ें और अनुरोध बटन पर क्लिक करने से पहले पुष्टि करें
                </Text>
              </View>

              <View style={styles.signupFormBtns}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!checked || refrralValidation?.error}
                  activeOpacity={0.7}
                  style={styles.signInBtn}
                >
                  <Text style={styles.formSignText}>
                    Submit Request / रिक्वेस्ट सबमिट करें
                  </Text>
                </TouchableOpacity>
              </View>

              {/* आपका अनुरोध सबमिट कर दिया गया है, और हम आपको शीघ्र ही सूचित करेंगे! / Your request has been submitted, and we will notify you soon! */}
            </SafeAreaView>
          )}
        </Formik>
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
              An 5 digit code has been sent to your WhatsApp
            </Text>
          </View>

          <View style={styles.otpinptflexBx}>
            <OTPInput
              length={5}
              onOTPComplete={(otp) => {
                Keyboard.dismiss();
                dispatch(
                  userVerifySignup({
                    otp,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                    loginType: "collector",
                  })
                );
              }}
            />
          </View>
          <Text style={{ color: "red", marginTop: 10, textAlign: "center" }}>
            {errorVerify}
          </Text>
          <View style={styles.notgetOtpbx}>
            <Text style={styles.didnotgetotptext}>Did not get OTP Code ?</Text>
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
  );
};

export default KabadiCreateAccount;

const styles = StyleSheet.create({
  formBg: {
    position: "absolute",
    top: "1%",
    left: "45%",
    width: "85%",
    height: "50%",
    objectFit: "cover",
    opacity: 0.03,
  },

  formBg2: {
    top: "80%",
    left: "-20%",
    width: "80%",
    height: "45%",
  },

  chekbxCont: {
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 14,
    gap: 4,
  },

  notetext: {
    position: "relative",
    top: 5,
    fontSize: 13,
    width: 270,
    lineHeight: 20,
  },

  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "black", // Text color when unchecked
  },
  checkedText: {
    color: "white", // Text color when checked
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  choseWorkTypeBx: {
    position: "relative",
    backgroundColor: "#fff",
    paddingInline: 14,
    borderRadius: 10,
  },

  workText: {
    position: "relative",
    fontSize: 16,
    fontWeight: "600",
    paddingBlock: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: "#ddd",
  },

  downicon: {
    position: "absolute",
    top: "29%",
    right: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 18,
    color: "blue", // Custom font color for Android
  },

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
    // position: "relative",
    width: "100%",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  newAcontBx: {
    position: "relative",
    marginBottom: 60,
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
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },

  mainInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 35,
    fontSize: 13,
    color: "#212121",
  },

  selectedText: {
    paddingHorizontal: 35,
    fontSize: 13,
    color: "#212121",
  },

  label: {
    color: "#0d0d0d",
    letterSpacing: 0.55,
    fontSize: 13.4,
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
