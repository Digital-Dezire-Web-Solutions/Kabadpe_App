import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ApntCard from "./Components/ApntCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { userAppoinmentsFetch } from "../services/appoinment";
import { workerAppoinmentsFetch } from "../services/worker/appoinments";
import ApntCardWorker from "./Components/ApntCardWorker";

const ApntList = () => {
  const router = useRouter();
  const handleBackNavigate = () => {
    router.back();
  };

  const { data: appoinments, refetch } = useQuery({
    queryKey: ["todayWorkerAppoinmentsall"],
    queryFn: () => workerAppoinmentsFetch({}),
  });
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
          <Text style={styles.editProfText}>Appointments</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaProvider style={styles.kabadListMain}>
        <View style={styles.actApntFlexBx}>
          <Text style={styles.apntTitle}>All Appointments</Text>
        </View>

        <View style={styles.apntDataList}>
          <FlatList
            data={
              appoinments?.error
                ? []
                : appoinments?.sort(
                    (a, b) => new Date(b?.updatedOn) - new Date(a?.updatedOn)
                  )
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ApntCardWorker
                bgColor="#eff7cf"
                refetch={refetch}
                item={item}
                index={index}
                key={item?.id}
              />
            )}
          />
        </View>
      </SafeAreaProvider>
    </>
  );
};

export default ApntList;

const styles = StyleSheet.create({
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

  editprofileTopBx: {
    position: "relative",
    width: "100%",
    height: 96,
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

  kabadListMain: {
    position: "relative",
    width: "100%",
    marginTop: 25,
  },

  viewApntBtn: {
    position: "relative",
    width: 80,
    height: 30,
    backgroundColor: "#026874",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  ViewText: {
    fontSize: 13,
    color: "#fff",
  },

  apntTitle: {
    fontSize: 17,
    color: "#3C3C3C",
    fontWeight: "600",
  },

  actApntFlexBx: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 18,
    marginBottom: 10,
  },

  apntDataList: {
    position: "relative",
    width: "100%",
    marginTop: 15,
    paddingHorizontal: 18,
  },
});
