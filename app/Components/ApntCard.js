import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import ReactNativeModal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DateTime } from "luxon";
import { slotLabels } from "../../lib/slot";
import {
  adminAppoinmentCancel,
  adminAppoinmentReschedule,
  userFetchAvailableSlots,
} from "../../services/appoinment";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { userAddressesFetch } from "@/services/user";
const ApntCard = ({ item, index, refetch, bgColor, itemStart }) => {
  const { height, width } = Dimensions.get("window");
  const [step, setStep] = useState(1);
  const { userInfo } = useSelector((s) => s?.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [dateBox, setDateBox] = useState("2024-10-May, 8 AM - 10 AM");
  const [selectedTodayDate, setSelectedTodayDate] = useState(null);
  const [close, setClose] = useState(false);
  const { data: addresses, refetchAddress } = useQuery({
    queryKey: ["userAddress:appoinment:default:1"],
    queryFn: () => userAddressesFetch({ id: userInfo?.id }),
  });
  const { data: timeSlots, refetch: refetchSlot } = useQuery({
    queryKey: ["userAvailableSlot:1"],
    queryFn: () =>
      userFetchAvailableSlots({
        franchiseId: item?.Franchise?.id,
        date: new Date(selectedDate).toISOString(),
        aria: (!addresses?.error ? addresses : [])?.find(
          (e) => e?.id == item?.appoinmentAria
        )?.aria,
        // userId: userData?.id,
      }),
  });
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const companies = [
    {
      id: 1,
      img: require("../../assets/images/kabadpe-logo.jpg"),
      name: "KabadPe",
    },
    {
      id: 2,
      img: require("../../assets/images/cmp-4.jpg"),
      name: "Extra Frames",
    },
    {
      id: 3,
      img: require("../../assets/images/kabadpe-logo.jpg"),
      name: "KabadPe",
    },
  ];

  const slots = [
    {
      id: 1,
      time: "8:00 AM - 10:00 AM",
    },
    {
      id: 2,
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: 3,
      time: "12:00 PM - 3:00 PM",
    },
    {
      id: 4,
      time: "3:00 PM - 5:00 PM",
    },
    {
      id: 5,
      time: "5:00 PM - 7:00 PM",
    },
    {
      id: 6,
      time: "7:00 PM - 9:00 PM",
    },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setSelectedTodayDate(date.dateString);
    setStep(3);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 2); // Go to the previous step
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setStep(3);
  };

  const handleSlotSelect = async (slot) => {
    const res = await adminAppoinmentReschedule({
      id: item?.id,
      appointmentTimeSlot: slot,
      appointmentDate: new Date(selectedDate).toISOString(),
    });
    if (res?.error) {
      Toast.show({ type: "error", text1: "ERROR!", text2: res?.message });
      return;
    }
    setModalVisible(false);
    Toast.show({ type: "success", text1: "DONE!", text2: res });
    refetch();
  };
  useEffect(() => {
    refetchSlot();
  }, [selectedDate]);
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <View style={styles.choseCompanyTextBx}>
              <Text style={styles.AvailCompText}>Choose Reschedule Date</Text>
            </View>
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              onDayPress={handleDateSelect}
              markedDates={{
                [today]: { selected: true, selectedColor: "#04e1ea" },
                ...(selectedDate && {
                  [selectedDate]: { selected: true, selectedColor: "#2196F3" }, // Highlight the selected date
                }),
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
          </View>
        );
      case 2:
        return (
          <View style={styles.chooseCompanyBx}>
            <View style={styles.choseCompanyTextBx}>
              <Text style={styles.AvailCompText}>Avaiable Companies</Text>
            </View>
            <SafeAreaProvider>
              <ScrollView
                style={styles.CompaniesList}
                showsVerticalScrollIndicator={false}
              >
                <FlatList
                  data={companies}
                  renderItem={({ item }) => (
                    <View style={styles.companyBx} key={item.id}>
                      <View style={styles.compLeftBx}>
                        <Image style={styles.compImg} source={item.img} />
                        <Text style={styles.nameText}> {item.name} </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => handleCompanySelect(item.name)}
                      >
                        <Text style={styles.selText}>Select</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>
            </SafeAreaProvider>
          </View>
        );
      case 3:
        return (
          <View style={[styles.chooseCompanyBx, styles.chooseSlotsBx]}>
            <View style={styles.choseCompanyTextBx}>
              <Text style={styles.AvailCompText}>Avaiable Slots</Text>
            </View>

            <SafeAreaProvider style={[styles.CompaniesList, styles.slotsList]}>
              {/* <ScrollView
                style={[styles.CompaniesList, styles.slotsList]}
                showsVerticalScrollIndicator={false}
              > */}
              <FlatList
                data={timeSlots?.error ? [] : timeSlots}
                renderItem={({ item: { slotName, reminingSlot } }) => (
                  <View style={styles.slotBx} key={slotName}>
                    <View style={styles.slotDateFlex}>
                      <View style={styles.slotsDate}>
                        <AntDesign name="calendar" size={16} color="#898f8b" />
                        <Text style={styles.timeText}>
                          {" "}
                          {slotLabels?.[slotName]}{" "}
                        </Text>
                      </View>
                      <Text style={styles.slotsAvaiText}>
                        {reminingSlot} slots available
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.bookApntBtn}
                      onPress={() => handleSlotSelect(slotName)}
                    >
                      <Text style={styles.bookApntBtnText}>
                        Book Appointment
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.slotName}
              />
              {/* </ScrollView> */}
            </SafeAreaProvider>
          </View>
        );
      default:
        return null;
    }
  };
  const handleCancelClick = async (ident) => {
    const flow = ident == "confirm" ? "flow" : "";
    const res = await adminAppoinmentCancel({
      id: item?.id,
      flow,
    });
    if (res?.error) {
      Toast.show({ type: "error", text1: "ERROR!", text2: res?.message });
      return;
    }
    setClose(false);
    Toast.show({ type: "success", text1: "DONE!", text2: res });
    refetch();
  };
  return (
    <>
      <View style={[styles.apntCardBx, { backgroundColor: bgColor }]}>
        <View style={[styles.apntCardToFlex, { alignItems: itemStart }]}>
          <View style={[styles.userInfoBx, { alignItems: itemStart }]}>
            <Image
              style={styles.userImg}
              source={
                item?.KabadCollector?.profileImage
                  ? { uri: item?.KabadCollector?.profileImage }
                  : require("../../assets/images/profile-img.png")
              }
              // source={{ uri: item?.KabadCollector?.profileImage }}
            />
            <View style={styles.userDet}>
              <Text style={styles.userNameTitle}>
                {item?.KabadCollector?.fullname || "Worker Assigning..."}
              </Text>
              <Text style={styles.userNameText}>
                {" "}
                {item?.Franchise?.companyName}{" "}
              </Text>
            </View>
          </View>

          {item?.KabadCollector?.phoneNumber &&
          item?.orderStatus == "active" ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("tel:" + item?.KabadCollector?.phoneNumber)
                  .then((res) =>
                    console.log(
                      "phonnumber res",
                      res,
                      item?.KabadCollector?.phoneNumber
                    )
                  )
                  .catch((e) =>
                    console.log(
                      "phonnumber error",
                      e,
                      item?.KabadCollector?.phoneNumber
                    )
                  );
              }}
              style={styles.callBtnBx}
              activeOpacity={0.6}
            >
              <Ionicons name="call" size={18} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.dateCaleBx}>
          <AntDesign name="calendar" size={17} color="#3c3c3c" />
          <Text style={styles.apntDate}>
            {" "}
            {DateTime.fromISO(item?.appointmentDate, {
              zone: "utc",
            })
              .setZone("Asia/Kolkata")
              .toFormat("ccc dd LLL yyyy")}{" "}
            - {slotLabels?.[item?.appointmentTimeSlot]}
          </Text>
        </View>

        {item?.orderStatus == "active" ? (
          <View style={styles.apntBtnsFlex}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.apntResdBtn}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome name="rotate-right" size={18} color="#fff" />
              <Text style={styles.reshdText}>Reschedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setClose(true)}
              style={[styles.apntResdBtn, styles.apntResdBtn2]}
            >
              <Ionicons name="close" size={18} color="#026874" />
              <Text style={[styles.reshdText, styles.reshdText2]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : item?.orderStatus == "fullfill" ? (
          <View style={styles.apntBtnsFlex}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ ...styles.apntResdBtn, backgroundColor: "green" }}
              disabled
              // onPress={() => setModalVisible(true)}
            >
              {/* <FontAwesome name="rotate-right" size={18} color="#fff" /> */}
              <Text style={{ ...styles.reshdText }}>Completed</Text>
            </TouchableOpacity>
          </View>
        ) : item?.orderStatus == "cancel" ? (
          <View style={styles.apntBtnsFlex}>
            <TouchableOpacity
              activeOpacity={0.5}
              // onPress={() => setClose(true)}
              disabled
              style={[
                { ...styles.apntResdBtn, borderColor: "red" },
                styles.apntResdBtn2,
              ]}
            >
              {/* <Ionicons name="close" size={18} color="#026874" /> */}
              <Text
                style={[
                  styles.reshdText,
                  { ...styles.reshdText2, color: "red" },
                ]}
              >
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <ReactNativeModal
        isVisible={isModalVisible}
        animationIn="fadeInUp"
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          {renderStep()}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <AntDesign name="closecircle" size={22} color="#fff" />
          </TouchableOpacity>

          {step > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <FontAwesome name="angle-left" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        isVisible={close}
        animationIn="fadeInUp"
        onBackdropPress={() => setClose(false)}
        onBackButtonPress={() => setClose(false)}
      >
        <View style={styles.confirmationCalcenBx}>
          <AntDesign name="closecircleo" size={35} color="red" />
          <Text style={styles.cancelText}> Are You Sure ? </Text>
          {item?.frequency != "once" ? (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => handleCancelClick("confirm")}
            >
              <Text style={styles.cancelTextBtn}>
                {" "}
                Cancel All {item?.frequency} Flow{" "}
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => handleCancelClick("cancel")}
          >
            <Text style={styles.cancelTextBtn}> Cancel </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default ApntCard;

const styles = StyleSheet.create({
  locatText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7C7C7C",
  },

  aproxText: {
    color: "#4d4949",
  },

  cancelText: {
    fontSize: 18,
    color: "#0d0d0d",
    fontWeight: "500",
    marginTop: 5,
  },

  cancelTextBtn: {
    fontSize: 13,
    color: "red",
  },

  cancelBtn: {
    position: "relative",
    marginTop: 20,
    width: 160,
    height: 35,
    backgroundColor: "transparent",
    borderWidth: 1.4,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderRadius: 8,
  },

  confirmationCalcenBx: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 12,
  },

  backButton: {
    position: "absolute",
    top: 14,
    left: 6,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  slotDateFlex: {
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  bookApntBtnText: {
    fontSize: 14,
    color: "#04e1ea",
    fontWeight: "400",
  },

  bookApntBtn: {
    position: "relative",
    marginTop: 10,
    borderWidth: 1.4,
    borderColor: "#04e1ea",
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  timeText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#0d0d0d",
  },

  slotsDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },

  slotsAvaiText: {
    fontSize: 12,
    color: "#4A9524",
    fontWeight: "500",
  },

  closeButton: {
    position: "absolute",
    top: 16,
    right: 10,
  },

  slotBx: {
    position: "relative",
    width: "100%",
    marginBottom: 22,
  },

  companyBx: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  selectBtn: {
    position: "relative",
    paddingHorizontal: 10,
    height: 25,
    borderWidth: 1.4,
    borderColor: "#026874",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  selText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#026874",
  },

  nameText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#0d0d0d",
  },

  compImg: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 50,
  },

  compLeftBx: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },

  chooseSlotsBx: {
    height: 500,
  },

  chooseCompanyBx: {
    position: "relative",
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  CompaniesList: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: 12,
    paddingHorizontal: 18,
  },

  choseCompanyTextBx: {
    position: "relative",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#026874",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },

  AvailCompText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
  },

  saveBtnText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  saveBtn: {
    position: "relative",
    marginTop: 20,
    height: 50,
    width: "100%",
    backgroundColor: "#03acc0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  calednIcon: {
    position: "absolute",
    top: "30%",
    right: 10,
  },

  schedAppntMain: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 18,
  },

  schedAppntBx: {
    position: "relative",
    width: "100%",
    marginTop: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
    borderCurve: "continuous",
    borderRadius: 8,
    backgroundColor: "#e5f7f4",
    marginBottom: 90,
  },

  schedApntText: {
    fontSize: 16,
    textAlign: "center",
    color: "#026874",
    fontWeight: "500",
    marginBottom: 15,
  },

  apntResdBtn2: {
    width: "30%",
    backgroundColor: "transparent",
    gap: 4,
  },

  apntBtnsFlex: {
    position: "relative",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  reshdText: {
    fontSize: 12.5,
    color: "#fff",
  },

  reshdText2: {
    color: "#026874",
    fontWeight: "500",
  },

  apntResdBtn: {
    position: "relative",
    width: "45%",
    height: 37,
    backgroundColor: "#026874",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#026874",
    gap: 10,
  },

  apntResdBtn4: {
    width: "15%",
    backgroundColor: "transparent",
  },

  dateCaleBx: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    paddingHorizontal: 18,
  },

  dateCaleBx2: {
    marginTop: 6,
    paddingHorizontal: 0,
  },

  apntDate: {
    fontSize: 14,
    color: "#7c7c7c",
    fontWeight: "500",
  },

  callBtnBx: {
    position: "relative",
    width: 34,
    height: 34,
    backgroundColor: "#026874",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  userNameTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7c7c7c",
  },

  userNameText: {
    position: "relative",
    left: -4,
    marginTop: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#026874",
  },

  userImg: {
    width: 38,
    height: 38,
    objectFit: "cover",
  },

  userInfoBx: {
    position: "relative",
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  apntCardToFlex: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  apntCardBx: {
    position: "relative",
    width: "100%",
    marginHorizontal: "auto",
    // width : 300,
    // backgroundColor : "#eff7cf",
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
});
