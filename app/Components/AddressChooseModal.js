import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { addutilityAction } from "../../features/utilitySlice";

const AddressChooseModal = ({ modal, setModal, addresses, onClick }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <ReactNativeModal
        isVisible={modal}
        animationIn="fadeInUp"
        style={{ justifyContent: "flex-end", margin: 0 }}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
      >
        <View style={styles.ChooseAddressBx}>
          <Text style={styles.selctAddrsText}>Select Address</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.addressList}
          >
            {addresses?.map(
              ({
                id,
                aria,
                subAria,
                city,
                state,
                zipCode,
                locationType,
                ...rest
              }) => (
                <TouchableOpacity
                  key={id}
                  onPress={() =>
                    onClick({
                      id,
                      aria,
                      subAria,
                      city,
                      state,
                      zipCode,
                      locationType,
                      ...rest,
                    })
                  }
                  style={[styles.addrssBtnBx, styles.addrssBtnBx2]}
                >
                  <View style={styles.addBtnFlex}>
                    <FontAwesome6
                      name="location-dot"
                      size={12}
                      color="#026874"
                    />
                    <Text style={styles.placeText}>{locationType}</Text>
                  </View>
                  <Text style={styles.addrsText}>
                    {`${aria} ${subAria} ${city} ${state} ${zipCode}`}
                  </Text>

                  <MaterialIcons
                    onPress={() => {
                      dispatch(
                        addutilityAction({
                          name: "initAddress",
                          value: {
                            id,
                            aria,
                            subAria,
                            city,
                            state,
                            zipCode,
                            locationType,
                            ...rest,
                          },
                        })
                      );
                      router.navigate("AddressScreen");
                    }}
                    name="edit"
                    size={18}
                    style={styles.arrowRight}
                    color="#03acc0"
                  />
                </TouchableOpacity>
              )
            )}
          </ScrollView>
          <View style={styles.addaddressbtn2}>
            <TouchableOpacity
              style={[styles.saveBtn, styles.saveBtn2]}
              onPress={() => {
                router.navigate("MapScreen"), setModal(false);
              }}
            >
              <Text style={styles.saveBtnText}>+ Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default AddressChooseModal;

const styles = StyleSheet.create({
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

  selctAddrsText: {
    fontSize: 15,
    fontWeight: "500",
    paddingTop: 22,
    paddingHorizontal: 20,
  },

  arrowRight: {
    position: "absolute",
    top: "50%",
    right: 10,
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
});
