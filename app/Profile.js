import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { userAddressesFetch } from "../services/user";

const Profile = () => {
  const router = useRouter();
  const { userInfo } = useSelector((s) => s?.user);
  const RedirectPage = () => {
    router.navigate("ProfileEdit");
  };
  const { data: addresses, refetchAddress } = useQuery({
    queryKey: ["userAddress:appoinment:default:2"],
    queryFn: () => userAddressesFetch({ id: userInfo?.id }),
  });
  const { aria, subAria, zipCode, city, state } = addresses?.[0] || {};
  return (
    <SafeAreaView style={styles.profileMain}>
      <View style={styles.profileBanner}>
        <ImageBackground
          style={styles.bgImageProfile}
          source={require("../assets/images/Mask-group.png")}
          resizeMode="cover"
        ></ImageBackground>
      </View>
      <View style={styles.profileImgBx}>
        <Image
          style={styles.profImg}
          source={
            userInfo?.profileImage
              ? { uri: userInfo?.profileImage }
              : require("../assets/images/profile-img.png")
          }
        />
      </View>

      <SafeAreaProvider>
        <ScrollView style={styles.userProfileSec}>
          <View style={styles.userProfileInfoData}>
            <View style={styles.userProfInfoBx}>
              <Text style={styles.labelText}>Name</Text>
              <Text style={styles.userDetText}>{userInfo?.fullname}</Text>
            </View>

            <View style={styles.userProfInfoBx}>
              <Text style={styles.labelText}>Email</Text>
              <Text style={styles.userDetText}>{userInfo?.email}</Text>
            </View>

            <View style={styles.userProfInfoBx}>
              <Text style={styles.labelText}>Phone</Text>
              <Text style={styles.userDetText}>{userInfo?.phoneNumber}</Text>
            </View>

            {/* <View style={styles.userProfInfoBx}>
              <Text style={styles.labelText}>Gender</Text>
              <Text style={styles.userDetText}>Male</Text>
            </View> */}

            {/* <View style={styles.userProfInfoBx}>
              <Text style={styles.labelText}>Date of Birth</Text>
              <Text style={styles.userDetText}>10/4/2001</Text>
            </View> */}

            <View style={styles.userProfInfoBx}>
              <Text style={styles.labelText}>Address</Text>
              <Text
                style={styles.userDetText}
              >{`${aria}, ${subAria}, ${city}, ${zipCode}`}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editProfBtn}
            activeOpacity={0.4}
            onPress={() => RedirectPage()}
          >
            <Text style={styles.editprofText}>Edit Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  editProfBtn: {
    position: "relative",
    marginTop: 15,
    marginBottom: 30,
    width: 120,
    backgroundColor: "#066D71",
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: "auto",
  },

  editprofText: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    letterSpacing: 0.3,
  },

  userProfInfoBx: {
    position: "relative",
    width: "100%",
    gap: 6,
    marginBottom: 20,
  },

  userDetText: {
    fontSize: 15,
    paddingBottom: 7,
    color: "#026874",
    fontWeight: "500",
    borderBottomWidth: 1,
    borderBottomColor: "#8f898b",
  },

  labelText: {
    fontSize: 13,
    color: "#8f898b",
  },

  userProfileInfoData: {
    position: "relative",
    width: "100%",
    paddingTop: 24,
    paddingHorizontal: 18,
  },

  userProfileSec: {
    position: "relative",
    flex: 1,
    width: "100%",
    marginBottom: 70,
  },

  profileImgBx: {
    position: "relative",
    marginTop: -55,
    width: 100,
    marginHorizontal: "auto",
  },

  profImg: {
    width: "90%",
    height: 90,
    objectFit: "cover",
    borderRadius: 50,
  },

  bgImageProfile: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  profileMain: {
    position: "relative",
    width: "100%",
    flex: 1,
  },

  profileBanner: {
    position: "relative",
    width: "100%",
    height: 200,
    backgroundColor: "#066D71",
    borderBottomRightRadius: 120,
    overflow: "hidden",
  },
});
