import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";
import {
  workerMarkActiveToday,
  workerTodayAvailabilityFetch,
} from "../../services/worker/availability";

const CommonModal = ({
  onCloseClick = () => {},
  cancelApntPopup,
  setterFunc,
  state,
}) => {
  const handleMarkActiveToday = async () => {
    const res = await workerMarkActiveToday();
    if (!res?.error) {
      refetch();
      //   refetchStatus();
    }
    
    onCloseClick()
  };
  const { data: todayAvail, refetch } = useQuery({
    queryKey: ["workerTodayAvailabilityFetch"],
    queryFn: () => workerTodayAvailabilityFetch(),
  });
  return (
    <>
      {state === "cancelApnt" && (
        <ReactNativeModal
          isVisible={cancelApntPopup}
          animationIn={"fadeIn"}
          onBackButtonPress={() => setterFunc(false)}
          onBackdropPress={() => setterFunc(false)}
        >
          <View style={styles.apntCancelPopup}>
            <View style={styles.erroricon}>
              <FontAwesome6 name="cancel" size={22} color="#ff0000" />
            </View>

            <Text style={styles.cancelApntText}>
              Confirm before canceling the Appointment{" "}
            </Text>

            <TouchableOpacity
              onPress={() => setterFunc(false)}
              activeOpacity={0.3}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelBtnText}>Confirm & Cancel</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      )}

      {state === "activeToday" && (
        <ReactNativeModal
          isVisible={cancelApntPopup}
          animationIn={"fadeIn"}
          onBackButtonPress={onCloseClick}
          onBackdropPress={onCloseClick}
        >
          <View style={[styles.apntCancelPopup, styles.actTodayModal]}>
            <Text style={[styles.cancelApntText, styles.acttodaytext]}>
              {todayAvail?.availabilityStatus != "leave"
                ? "Mark You Are Not Working Today."
                : "Mark You Are Working Today."}
            </Text>

            <TouchableOpacity
              onPress={handleMarkActiveToday}
              activeOpacity={0.3}
              style={[styles.cancelBtn, styles.confBtn]}
            >
              <Text style={[styles.cancelBtnText, styles.confBtnText]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      )}

      {state === "leaveReqSent" && (
        <ReactNativeModal
          isVisible={cancelApntPopup}
          animationIn={"fadeIn"}
          onBackButtonPress={() => setterFunc(false)}
          onBackdropPress={() => setterFunc(false)}
        >
          <View style={styles.apntCancelPopup}>
            <View style={styles.erroricon}>
              <AntDesign name="check" size={28} color="green" />
            </View>

            <Text style={styles.cancelApntText}>
              Leave request has been sent{" "}
            </Text>
          </View>
        </ReactNativeModal>
      )}
    </>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  cancelBtn: {
    position: "relative",
    marginTop: 20,
    borderWidth: 1.2,
    borderColor: "#3c3c3c",
    paddingHorizontal: 12,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  confBtnText: {
    color: "#fff",
  },

  confBtn: {
    borderColor: "#fff",
  },

  cancelBtnText: {
    fontSize: 13,
    color: "#3c3c3c",
  },

  cancelApntText: {
    position: "relative",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "400",
    color: "#242424",
  },

  acttodaytext: {
    marginTop: 0,
    color: "#fff",
  },

  erroricon: {
    position: "relative",
    width: 50,
    height: 50,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C7EAEB",
  },

  apntCancelPopup: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
    height: 180,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: 10,
    paddingHorizontal: 14,
  },

  actTodayModal: {
    height: 120,
    backgroundColor: "#026874",
  },
});
