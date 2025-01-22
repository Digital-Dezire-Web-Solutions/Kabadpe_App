import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import GendSelect from "./Components/GendSelect";
import { Calendar } from "react-native-calendars";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { ReactNativeModal } from "react-native-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AddressChooseModal from "./Components/AddressChooseModal";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { object, string } from "yup";
import {
  userAddressesFetch,
  userProfileImageAdd,
  userUpdateProfile,
} from "../services/user";
import Toast from "react-native-toast-message";
// import * as FileSystem from "expo-file-system";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import { userFetch } from "../features/user/userActions";
import { useQuery } from "@tanstack/react-query";
const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((s) => s?.user);
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/profile-img.png")
  );
  const { data: addresses, refetchAddress } = useQuery({
    queryKey: ["userAddress:appoinment:default:3"],
    queryFn: () => userAddressesFetch({ id: userInfo?.id }),
  });
  const { aria, subAria, zipCode, city, state, locationType } =
    addresses?.[0] || {};
  const [name, setName] = useState("Suni Sharma");
  const [email, setEmail] = useState("sunilsharma@gmail.com");
  const [mobile, setMobile] = useState("+91 9876543210");
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const handleBackNavigate = () => {
    router.back();
  };
  const convertImageToBinary = async (imageUri) => {
    try {
      // Read the file as a Base64 string
      const base64Data = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert the Base64 string to binary (Buffer)
      const binaryData = Buffer.from(base64Data, "base64");

      // console.log('Binary data:', binaryData);

      return binaryData; // You can now send this binary data to your API
    } catch (error) {
      console.error("Error converting image to binary:", error);
    }
  };

  const handleImagePicker = async (handleChange) => {
    // Request permission to access the gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the gallery is required!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Optional: For cropping square images
      quality: 1, // Quality of the image
    });

    if (!result.canceled) {
      // console.log(
      //   "this is binary data",
      //   convertImageToBinary(result.assets[0].uri)
      // );
      // const file = new Blob([result.assets[0].uri], {
      //   type: result.assets[0].type,
      // });
      // console.log("this is file Blob", blob);
      handleChange("profileImage")({ target: { value: result.assets[0] } });
      // console.log("its image result", result);
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false); // Close calendar after selection
  };
  const handleSubmit = async (data) => {
    const { profileImage, ...rest } = data;
    if (profileImage && typeof profileImage != "string") {
      const imageRes = await userProfileImageAdd(profileImage);

      console.log("image res", imageRes, profileImage);
    }
    const res = await userUpdateProfile(rest);
    if (res?.error) {
      Toast.show({ type: "error", text1: "ERROR!", text2: res?.message });
      return;
    }
    dispatch(userFetch({}));
    Toast.show({ type: "success", text1: "DONE!", text2: res });
  };

  return (
    <>
      <SafeAreaView style={styles.editprofileTopBx}>
        <ImageBackground
          style={styles.profTopBg}
          source={require("../assets/images/prifBannerTop.png")}
          resizeMode="cover"
        ></ImageBackground>
        <TouchableOpacity
          onPress={() => handleBackNavigate()}
          activeOpacity={0.7}
          style={styles.editprofleftTextBx}
        >
          <View style={styles.angleBx}>
            <FontAwesome
              name="angle-left"
              size={14}
              color="#fff"
              style={{ paddingRight: 2 }}
            />
          </View>
          <Text style={styles.editProfText}>Edit Profile</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Formik
        initialValues={{
          email: userInfo?.email,
          phoneNumber: userInfo?.phoneNumber,
          fullname: userInfo?.fullname,
          profileImage: userInfo?.profileImage,
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
          <SafeAreaView style={styles.edtiProfMain}>
            <ImageBackground
              style={styles.profEditBgMain}
              source={require("../assets/images/profileEdit-Bg.png")}
              resizeMode="cover"
            ></ImageBackground>

            <TouchableOpacity
              style={styles.profEditImgBx}
              activeOpacity={0.7}
              onPress={() => handleImagePicker(handleChange)}
            >
              <Image
                style={styles.profEditImg}
                source={
                  values?.profileImage
                    ? {
                        uri:
                          typeof values?.profileImage == "string"
                            ? values?.profileImage
                            : values?.profileImage?.uri,
                      }
                    : require("../assets/images/profile-img.png")
                }
              />
              <Entypo
                name="camera"
                size={20}
                color="#026874"
                style={styles.cameraIcon}
              />
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.userProfForm}
            >
              <View style={styles.userInptBx}>
                <Text style={styles.labelText}>Name</Text>
                <TextInput
                  style={styles.inptBx}
                  onChangeText={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                  value={values?.fullname}
                  placeholder="Enter Name"
                  placeholderTextColor="#7b7b7b"
                />
              </View>

              <View style={styles.userInptBx}>
                <Text style={styles.labelText}>Email</Text>
                <TextInput
                  style={styles.inptBx}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values?.email}
                  placeholder="Enter Email ID"
                  placeholderTextColor="#7b7b7b"
                />
              </View>

              <View style={styles.userInptBx}>
                <Text style={styles.labelText}>Phone</Text>
                <TextInput
                  style={styles.inptBx}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values?.phoneNumber}
                  placeholder="Enter Mobile no."
                  placeholderTextColor="#7b7b7b"
                />
              </View>

              {/* <GendSelect /> */}

              {/* <View style={styles.container}>
                <TouchableOpacity
                  style={[styles.userInptBx]}
                  onPress={() => setShowCalendar(true)}
                >
                  <Text style={styles.labelText}>Date of Birth</Text>
                  <View style={styles.datePickerDFlex}>
                    <TextInput
                      style={[styles.inptBx, styles.inptBx2]}
                      value={selectedDate}
                      placeholder="DD/MM/YY"
                      editable={false}
                      placeholderTextColor="#7b7b7b"
                    />
                    <AntDesign
                      name="calendar"
                      style={styles.calendIcon}
                      size={19}
                      color="#7b7b7b"
                    />
                  </View>
                </TouchableOpacity>

              
                <Modal visible={showCalendar} transparent animationType="slide">
                  <View style={styles.modalContainer}>
                    <View style={styles.calendarContainer}>
                      <Calendar
                        current={selectedDate || undefined} // Default to selected date
                        onDayPress={handleDateSelect}
                        markedDates={{
                          [selectedDate]: {
                            selected: true,
                            selectedColor: "#2196F3",
                          },
                        }}
                        theme={{
                          backgroundColor: "#F3F4F6",
                          calendarBackground: "#F9FAFB",
                          textSectionTitleColor: "#03acc0",
                          selectedDayBackgroundColor: "#026874",
                          selectedDayTextColor: "#FFFFFF",
                          todayTextColor: "#026874",
                          dayTextColor: "#111827",
                          textDisabledColor: "#D1D5DB",
                          arrowColor: "#03acc0",
                          monthTextColor: "#026874",
                          indicatorColor: "#1E3A8A",
                          // textDayFontFamily: 'Arial',
                          // textMonthFontFamily: 'Arial',
                          // textDayHeaderFontFamily: 'Arial',
                          textDayFontSize: 16,
                          textMonthFontSize: 18,
                          textDayHeaderFontSize: 14,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setShowCalendar(false)}
                        style={styles.closeButton}
                      >
                        <Text style={styles.closeText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View> */}

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => router.navigate("MapScreen")}
              >
                <Text style={styles.addrssBtnText}> + Add Address</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModal(true)}
                style={styles.addrssBtnBx}
              >
                <View style={styles.addBtnFlex}>
                  <FontAwesome6 name="location-dot" size={12} color="#026874" />
                  <Text style={styles.placeText}>{locationType}</Text>
                </View>
                <Text style={styles.addrsText}>
                  {`${aria}, ${subAria}, ${city}, ${zipCode}`}
                </Text>

                <FontAwesome
                  name="angle-right"
                  size={18}
                  style={styles.arrowRight}
                  color="8c8c8c"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>

              <View style={styles.container}></View>
            </ScrollView>

            <AddressChooseModal
              addresses={addresses?.error ? [] : addresses}
              modal={modal}
              onClick={() => setModal(false)}
              setModal={setModal}
            />
          </SafeAreaView>
        )}
      </Formik>
    </>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  selctAddrsText: {
    fontSize: 15,
    fontWeight: "500",
    paddingTop: 22,
    paddingHorizontal: 20,
  },

  ChooseAddressBx: {
    position: "relative",
    width: "100%",
    height: "62%",
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 12,
  },

  addressList: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 80,
    marginTop: 5,
  },

  arrowRight: {
    position: "absolute",
    top: "50%",
    right: 10,
  },

  saveBtnText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  saveBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 50,
    backgroundColor: "#03acc0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  saveBtn2: {
    position: "relative",
    width: "90%",
    marginHorizontal: "auto",
  },

  addaddressbtn2: {
    position: "absolute",
    bottom: 10,
    left: 0,
    width: "100%",
  },

  addBtnFlex: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },

  addrsText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#026874",
  },

  placeText: {
    fontSize: 12,
    color: "#5b5b5b",
    fontWeight: "400",
  },

  addrssBtnText: {
    fontWeight: "500",
    color: "#026874",
    fontSize: 14,
  },

  addrssBtnBx2: {
    marginBottom: 0,
  },

  addrssBtnBx: {
    position: "relative",
    marginTop: 15,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#03acc0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 80,
  },

  datePickerDFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 45,
    borderWidth: 0.5,
    borderColor: "#026874",
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  inptBx: {
    width: "100%",
    height: 45,
    borderWidth: 0.5,
    borderColor: "#026874",
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 13.5,
    fontWeight: "500",
    color: "#026874",
  },

  inptBx2: {
    width: "auto",
    borderWidth: 0,
    paddingHorizontal: 0,
    height: "auto",
  },

  // ---------

  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  closeButton: {
    padding: 12,
    backgroundColor: "#026874",
    alignItems: "center",
  },
  closeText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  //   --------

  userProfForm: {
    position: "relative",
    marginTop: 20,
  },

  userInptBx: {
    position: "relative",
    width: "100%",
    gap: 8,
    marginBottom: 14,
  },

  labelText: {
    fontSize: 13,
    color: "#8f898b",
  },

  cameraIcon: {
    position: "absolute",
    bottom: -2,
    right: -4,
  },

  profEditImgBx: {
    position: "relative",
    width: 80,
    height: 80,
    marginHorizontal: "auto",
    borderRadius: 50,
  },

  profEditImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 50,
  },

  profEditBgMain: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  edtiProfMain: {
    position: "relative",
    width: "100%",
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },

  editprofleftTextBx: {
    position: "relative",
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  editProfText: {
    fontSize: 14,
    color: "#fff",
  },

  angleBx: {
    position: "relative",
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },

    editprofileTopBx:{
        position : 'relative',
        width : '100%',
        height : 80,
        backgroundColor : "#026874",
        overflow : 'hidden',
    },

  profTopBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
