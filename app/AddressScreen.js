import {
  FlatList,
  ImageBackground,
  ScrollView,
  //   ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import SugestDropdown from "./Components/SugestDropdown";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { userServicableAriasFetch } from "../services/appoinment";
import { useQuery } from "@tanstack/react-query";
import {
  getSubArias,
  getArias,
  getCities,
  getPincodes,
  getStates,
} from "../lib/address";
import { userAddressesAdd, userAddressesUpdate } from "../services/user";
import Toast from "react-native-toast-message";
const AddressScreen = () => {
  const { userInfo } = useSelector((s) => s?.user);
  const { utilities } = useSelector((s) => s?.utility);
  const [locMark, setLocMark] = useState("home-filled");
  const [addresData, setAddressData] = useState({});
  const [fullName, setFullName] = useState("Suni Sharma");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [arias, setArias] = useState([]);
  const [subArias, setSubArias] = useState([]);
  const [selection, setSelection] = useState({
    state: "",
    city: "",
    pincode: "",
    aria: "",
    subAria: "",
  });
  const [initialFormValues, setInitialFormValues] = useState(
    utilities?.initAddress
      ? utilities?.initAddress
      : {
          street: utilities?.mapAddress?.street || "",
          city: utilities?.mapAddress?.city || "",
          state: utilities?.mapAddress?.region || "",
          zipCode: utilities?.mapAddress?.postalCode || "",
          landmark: "",
          locationType: "home",
        }
  );
  const router = useRouter();
  const { data: servicableAddresses } = useQuery({
    queryKey: ["servicableAddresses:appoinment"],
    queryFn: () => userServicableAriasFetch(),
  });
  const LocMark = [
    {
      id: 1,
      icon: "home-filled",
      text: "Home",
      value: "home",
    },
    {
      id: 2,
      icon: "work",
      text: "Work",
      value: "office",
    },
    {
      id: 3,
      icon: "local-convenience-store",
      text: "Shop",
      value: "shop",
    },

    // {
    //     id :4,
    //     icon : "other-houses",
    //     text : "Other",
    // },

    {
      id: 4,
      icon: "local-mall",
      text: "Malls/Outlet",
      value: "mall",
    },
  ];

  const handleBackNavigate = () => {
    router.back();
  };
  const handleAddressSubmit = async (data) => {
    if (utilities?.initAddress) {
      const res = await userAddressesUpdate({ ...data, userId: userInfo?.id });
      if (res?.error) {
        Toast.show({ type: "error", text1: "ERROR!", text2: res?.message });
        return;
      }
      Toast.show({ type: "success", text1: "DONE!", text2: res });
      router.navigate("(tabs)/Appointment");
    } else {
      const res = await userAddressesAdd({ ...data, userId: userInfo?.id });
      if (res?.error) {
        Toast.show({ type: "error", text1: "ERROR!", text2: res?.message });
        return;
      }
      Toast.show({ type: "success", text1: "DONE!", text2: res });
      router.navigate("(tabs)/Appointment");
    }
  };
  useEffect(() => {
    if (
      servicableAddresses?.error ||
      !servicableAddresses ||
      !servicableAddresses?.length
    ) {
      return;
    }
    const state = getStates(servicableAddresses);
    setStates(state);
  }, [servicableAddresses]);
  useEffect(() => {
    setSelection({
      state: initialFormValues?.state || "",
      city: initialFormValues?.city || "",
      pincode: initialFormValues?.zipCode || "",
      aria: initialFormValues?.aria || "",
      subAria: initialFormValues?.subAria || "",
    });
    if (
      servicableAddresses?.error ||
      !servicableAddresses ||
      !servicableAddresses?.length
    ) {
      return;
    }
    if (!initialFormValues?.state) return;
    const cities =
      getCities(initialFormValues?.state, servicableAddresses) || [];
    setCity(
      cities?.map(({ name, id }) => ({
        value: name,
        lable: name,
      }))
    );
    if (!initialFormValues?.city) return;
    const pins =
      getPincodes(
        initialFormValues?.state,
        initialFormValues?.city,
        servicableAddresses
      ) || [];
    setPincodes(
      pins.map(({ name }) => ({
        value: name,
        lable: name,
      }))
    );
    if (!initialFormValues?.zipCode) return;
    const arias =
      getArias(
        initialFormValues?.state,
        initialFormValues?.city,
        initialFormValues?.zipCode,
        servicableAddresses
      ) || [];
    setArias(
      arias?.map(({ name }) => ({
        value: name,
        lable: name,
      }))
    );
    if (!initialFormValues?.aria) return;
    const subArias =
      getSubArias(
        initialFormValues?.state,
        initialFormValues?.city,
        initialFormValues?.zipCode,
        initialFormValues?.aria,
        servicableAddresses
      ) || [];
    setSubArias(
      subArias?.map(({ subAriaName }) => ({
        value: subAriaName,
        lable: subAriaName,
      }))
    );
  }, []);

  return (
    <SafeAreaProvider>
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
        initialValues={initialFormValues}
        //   validationSchema={{}}
        onSubmit={handleAddressSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => {
          //   console.log("these are form value", values);
          return (
            <ScrollView style={styles.AddressPage} nestedScrollEnabled={true}>
              <ImageBackground
                style={styles.addrsbg}
                source={require("../assets/images/profileEdit-Bg.png")}
                resizeMode="cover"
              ></ImageBackground>

              <View style={styles.addressComp}>
                <View style={styles.chooseAddressLocatList}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={LocMark}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          handleChange("locationType")(item?.value);
                        }}
                        style={[
                          styles.addresLocatBtn,
                          {
                            backgroundColor:
                              values?.locationType === item?.value
                                ? "#cffdff"
                                : "transparent",
                            borderColor:
                              values?.locationType === item?.value
                                ? "#026874"
                                : "#898f8b",
                          },
                        ]}
                        key={item.id}
                      >
                        <MaterialIcons
                          name={item.icon}
                          size={18}
                          style={{
                            color:
                              values?.locationType === item?.value
                                ? "#026874"
                                : "#5c5c5c",
                          }}
                        />
                        <Text
                          style={[
                            styles.locateText,
                            {
                              color:
                                values?.locationType === item?.value
                                  ? "#026874"
                                  : "#5c5c5c",
                            },
                          ]}
                        >
                          {" "}
                          {item.text}{" "}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <SafeAreaView style={styles.userProfForm}>
                  {/* <View style={styles.userInptBx}>
                  <Text style={styles.labelText}>Name</Text>
                  <TextInput
                    style={styles.inptBx}
                    value={fullName}
                    onChange={(text) => setFullName(text)}
                    placeholder="Enter Name"
                    placeholderTextColor="#7b7b7b"
                  />
                </View> */}
                  <View style={[styles.userInptBx]}>
                    <Text style={styles.labelText}>Address Line</Text>
                    <TextInput
                      onChangeText={handleChange("street")}
                      onBlur={handleBlur("street")}
                      value={values?.street}
                      style={[styles.inptBx, { height: 45 }]}
                      placeholder="Wing/Flat No./Building Name/House No./Street No./Colony Name"
                      placeholderTextColor="#7b7b7b"
                    />
                  </View>
                  <SugestDropdown
                    onChange={(item) => {
                      setSelection((prev) => ({
                        ...prev,
                        state: item,
                      }));
                      const cities = getCities(item, servicableAddresses);
                      setCity(
                        cities?.map(({ name, id }) => ({
                          value: name,
                          lable: name,
                        }))
                      );
                      handleChange("state")(item);
                    }}
                    value={values?.state}
                    data={states?.map(({ name }) => name)}
                    setValue={() => {}}
                    labelText={"State"}
                    placeholderText={"Enter state"}
                  />

                  <SugestDropdown
                    onChange={(item) => {
                      setSelection((prev) => ({ ...prev, city: item }));
                      const pins = getPincodes(
                        selection?.state,
                        item,
                        servicableAddresses
                      );
                      setPincodes(
                        pins?.map(({ name }) => ({
                          value: name,
                          lable: name,
                        }))
                      );
                      handleChange("city")(item);
                    }}
                    value={values?.city}
                    data={city?.map(({ value }) => value)}
                    setValue={() => {}}
                    labelText={"City"}
                    placeholderText={"Enter city"}
                  />

                  <SugestDropdown
                    onChange={(item) => {
                      setSelection((prev) => ({ ...prev, pincode: item }));
                      const arias = getArias(
                        selection?.state,
                        selection?.city,
                        item,
                        servicableAddresses
                      );
                      setArias(
                        arias?.map(({ name }) => ({
                          value: name,
                          lable: name,
                        }))
                      );
                      handleChange("zipCode")(item);
                    }}
                    value={values?.zipCode}
                    data={pincodes?.map(({ value }) => value)}
                    setValue={() => {}}
                    labelText={"Pincode"}
                    placeholderText={"Enter pincode"}
                  />

                  <SugestDropdown
                    data={arias?.map(({ value }) => value)}
                    onChange={(item) => {
                      setSelection((prev) => ({ ...prev, aria: item }));
                      const subArias = getSubArias(
                        selection?.state,
                        selection?.city,
                        selection?.pincode,
                        item,
                        servicableAddresses
                      );
                      setSubArias(
                        subArias?.map(({ subAriaName }) => ({
                          value: subAriaName,
                          lable: subAriaName,
                        }))
                      );
                      handleChange("aria")(item);
                    }}
                    value={values?.aria}
                    setValue={() => {}}
                    labelText={"Area"}
                    placeholderText={"Enter area"}
                  />

                  <SugestDropdown
                    data={subArias?.map(({ value }) => value)}
                    onChange={(item) => handleChange("subAria")(item)}
                    value={values?.subAria}
                    setValue={() => {}}
                    labelText={"Subarea"}
                    placeholderText={"Enter subarea"}
                  />

                  <View style={styles.userInptBx}>
                    <Text style={styles.labelText}>Landmark</Text>
                    <TextInput
                      onChangeText={handleChange("landmark")}
                      onBlur={handleChange("landmark")}
                      value={values?.landmark}
                      style={styles.inptBx}
                      placeholder="Enter Landmark"
                      placeholderTextColor="#7b7b7b"
                    />
                  </View>
                </SafeAreaView>

                <View style={styles.addsubmitbtn}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.saveBtn}
                  >
                    <Text style={styles.saveBtnText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaProvider>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  saveBtnText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  addsubmitbtn: {
    position: "relative",
    marginTop: 20,
    marginBlockEnd: 30,
    width: "100%",
  },

  saveBtn: {
    position: "relative",
    marginHorizontal: 18,
    height: 50,
    backgroundColor: "#03acc0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  inptBx: {
    width: "100%",
    height: 45,
    borderWidth: 0.5,
    borderColor: "#026874",
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 13.5,
    fontWeight: "400",
    color: "#026874",
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

  userProfForm: {
    position: "relative",
    marginTop: 20,
    paddingHorizontal: 18,
  },

  editprofleftTextBx: {
    position: "relative",
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
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

  editprofileTopBx: {
    position: "relative",
    width: "100%",
    height: 80,
    backgroundColor: "#026874",
    overflow: "hidden",
  },

  profTopBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  addressComp: {
    position: "relative",
    width: "100%",
    flex: 2,
  },

  chooseAddressLocatList: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    paddingTop: 20,
    paddingLeft: 18,
    paddingRight: 6,
  },

  addresLocatBtn: {
    position: "relative",
    width: "auto",
    paddingHorizontal: 14,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#898f8b",
    borderRadius: 4,
    gap: 5,
    marginRight: 12,
  },

  locateText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#5c5c5c",
  },

  AddressPage: {
    position: "relative",
    width: "100%",
    flex: 1,
  },

  addrsbg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
