import {
  Dimensions,
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
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import ReactNativeModal from "react-native-modal";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  workerBuyWasteCallback,
  workerRateListFetch,
} from "../services/worker/buyWaste";
import { walletFetch } from "../services/wallet";

const { width, height } = Dimensions.get("window");

const BuyWaste = () => {
  const { utilities } = useSelector((s) => s?.utility);
  const userInfo = utilities?.buyWasteUserInfo;
  const [menuOpen, setMenuOpen] = useState(true);
  const [menuBtn, setMenuBtn] = useState("Dashboard");
  const xValue = useSharedValue(-400);
  const opacityMenu = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  const overlayVisible = useSharedValue(false);
  const [selectProd, setSelectProd] = useState(null);
  const [showBx, setShowBx] = useState(false);
  const router = useRouter();
  const [walletModal, setWalletModal] = useState(false);
  const [cashPaidModal, setCashPaidModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [weight, setWeight] = useState("");
  const [cart, setCart] = useState([]);
  const [weightModal, setWeightModal] = useState(false);

  const slideMenuStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xValue.value }],
      opacity: opacityMenu.value,
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
      display: overlayVisible.value ? "flex" : "none",
    };
  });

  const rotateValues = [
    useSharedValue(0), // Rotation value for button 1
    useSharedValue(0), // Rotation value for button 2
  ];

  const [activeIndex, setActiveIndex] = useState(null); // Track the active button index

  // Function to handle rotation for any button
  const handlePress = (index) => {
    // Reset all other buttons
    rotateValues.forEach((rotateValue, i) => {
      rotateValue.value = withTiming(i === index ? 180 : 0, { duration: 300 });
    });
    // Update active index
    setActiveIndex(index === activeIndex ? null : index); // Deselect if already selected
  };

  // Create animated styles dynamically for each button
  const iconStyles = rotateValues.map((rotateValue) =>
    useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotateValue.value}deg` }],
    }))
  );

  const handleSideMenuDrawer = () => {
    if (xValue.value !== 0) {
      xValue.value = withTiming(0, { duration: 400 }); // Slide in
      opacityMenu.value = withTiming(1, { duration: 400 }); // Fade in
      setMenuOpen(false);
    } else {
      xValue.value = withTiming(-400, { duration: 400 }); // Slide out
      opacityMenu.value = withTiming(0, { duration: 400 }); // Fade out
      setMenuOpen(true);
    }

    if (!overlayVisible.value) {
      overlayVisible.value = true;
      overlayOpacity.value = withTiming(0.67, { duration: 400 });
      setMenuOpen(false);
    } else {
      overlayOpacity.value = withTiming(0, { duration: 400 });
      overlayVisible.value = false;
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    xValue.value = withTiming(-400, { duration: 400 }); // Slide out
    opacityMenu.value = withTiming(0, { duration: 400 }); // Fade out
    overlayOpacity.value = withTiming(0, { duration: 400 });
    overlayVisible.value = false;
    setMenuOpen(true);
  };

  const products = [
    {
      id: 1,
      name: "Paper",
      icon: require("../assets/images/kabad-type-img-1.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 2,
      name: "Plastic",
      icon: require("../assets/images/kabad-type-img-2.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 3,
      name: "Clothes",
      icon: require("../assets/images/kabad-type-img-3.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 4,
      name: "Vehicles",
      icon: require("../assets/images/kabad-type-img-4.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 5,
      name: "Others",
      icon: require("../assets/images/kabad-type-img-5.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 6,
      name: "Wood",
      icon: require("../assets/images/kabad-type-img-6.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 7,
      name: "Glass",
      icon: require("../assets/images/kabad-type-img-7.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 8,
      name: "Metal",
      icon: require("../assets/images/kabad-type-img-8.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },

    {
      id: 9,
      name: "Electronics",
      icon: require("../assets/images/kabad-type-img-9.png"),
      retPrice: "15.00",
      bulkPrice: "12.00",
    },
  ];

  const handleSelectBx = (item) => {
    setSelectProd(item);
    setShowBx(false);
    setWeightModal(true);
  };

  const handleCart = () => {
    if (+weight && selectProd) {
      let ammount;
      if (+weight <= 200) {
        ammount =
          +weight && +selectProd?.retailPrice
            ? +selectProd?.retailPrice * +weight
            : null;
      } else {
        ammount =
          +weight && +selectProd?.bulkPrice
            ? +selectProd?.bulkPrice * +weight
            : null;
      }

      const productBx = {
        ...selectProd,
        weight,
        ammount,
      };

      setCart([...cart, productBx]);
      setWeight("");
      setWeightModal(false);
    } else {
      alert("Please select a product and enter the weight.");
    }
  };
  const { data: rateList, refetch } = useQuery({
    queryKey: ["workerGetRateList"],
    queryFn: () => workerRateListFetch({ ariaId: userInfo?.ariaId }),
  });
  const totalAmmount = cart
    ?.reduce((a, b) => {
      if (b?.ammount) {
        return a + b?.ammount;
      } else {
        return a;
      }
    }, 0)
    .toFixed(2);
  const { data: wallet, refetch: refetchWallet } = useQuery({
    queryKey: ["workerWalletFetchBuyWaste"],
    queryFn: () => walletFetch(),
  });
  const handleCashPaidClick = async () => {
    const data = {
      orderDetail: { waste: cart, totalAmmount },
      user: userInfo,
      appoinmentId: userInfo?.appoinmentId,
    };
    const res = await workerBuyWasteCallback({ ...data, type: "cash" });
    if (!res?.error) {
      setCashPaidModal(true);
      setCart([]);
      return;
    }
    // toast.error(res?.message);
  };
  const handleConfirmButtonClick = async () => {
    const data = {
      orderDetail: { waste: cart, totalAmmount },
      user: userInfo,
      appoinmentId: userInfo?.appoinmentId,
    };
    const res = await workerBuyWasteCallback({ ...data, type: "wallet" });
    if (!res?.error) {
      setWalletModal(true);
      setCart([]);
      return;
    }
    // toast.error(res?.message);
  };
  return (
    <>
      <SafeAreaProvider>
        <ScrollView style={styles.buyWasteComp} nestedScrollEnabled={true}>
          <View style={styles.topHeader}>
            <View style={styles.leftUserInfo}>
              <Text style={styles.username}>Buy Waste</Text>
            </View>

            <View style={styles.rightHeaderBx}>
              <TouchableOpacity style={styles.bellBtn}>
                <FontAwesome5 name="bell" size={18} color="#fff" />
                <View style={styles.reddot}></View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => handleSideMenuDrawer()}
                style={styles.menuIcon}
              >
                <Image
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  source={require("..//assets/images/menu-2.png")}
                />
                {/* <Text>Menu</Text> */}
              </TouchableOpacity>
            </View>
          </View>

          <Animated.View
            style={[styles.overlayBg, overlayStyle]}
          ></Animated.View>
          <Animated.View style={[styles.sidedrawerComp, slideMenuStyle]}>
            <View style={styles.sidedrawerMenu}>
              <View style={styles.profile_Infobx}>
                <View style={styles.profileLog}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 50,
                    }}
                    source={require("../assets/images/nawaz-bhai.jpg")}
                  />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profName}>Nawaz Akhtar</Text>
                  <Text style={styles.profId}>KPW0000014</Text>
                  {/* <Text style={[styles.profMail, styles.profId]}>
                                    <Feather name="mail" size={14} color="#858282" /> fanddfashions@gmail.com
                                    </Text>
                                    <Text style={[styles.profMail, styles.profId]}>
                                    <Feather name="smartphone" size={14} color="#858282" /> 7878787878
                                    </Text>
                                    <Text style={[styles.profMail, styles.profId]}>
                                   KabadPe
                                    </Text> */}
                </View>
              </View>

              <View style={styles.MenuLists}>
                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Dashboard"), handlePress();
                  }}
                  activeOpacity={0.87}
                  style={[styles.sideMenuBtn]}
                >
                  {menuBtn === "Dashboard" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <MaterialIcons name="dashboard" size={18} color="#91918e" />
                  <Text style={[styles.menuNameText]}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Transactions"), handlePress();
                  }}
                  activeOpacity={0.87}
                  style={styles.sideMenuBtn}
                >
                  {menuBtn === "Transactions" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <FontAwesome5 name="wallet" size={18} color="#91918e" />
                  <Text style={[styles.menuNameText]}>My Transactions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Appointments"), handlePress();
                  }}
                  activeOpacity={0.87}
                  style={styles.sideMenuBtn}
                >
                  {menuBtn === "Appointments" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <Feather name="edit" size={18} color="#91918e" />
                  <Text style={[styles.menuNameText]}>My Appointments</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Subscriptions"), handlePress();
                  }}
                  activeOpacity={0.87}
                  style={styles.sideMenuBtn}
                >
                  {menuBtn === "Subscriptions" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <FontAwesome5 name="user-check" size={18} color="#91918e" />
                  <Text style={[styles.menuNameText]}>Subscriptions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Details"), handlePress();
                  }}
                  activeOpacity={0.87}
                  style={styles.sideMenuBtn}
                >
                  {menuBtn === "Details" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <MaterialIcons name="details" size={18} color="#91918e" />
                  <Text style={[styles.menuNameText]}>My Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Waste"), handlePress(0);
                  }}
                  activeOpacity={0.87}
                  style={styles.sideMenuBtn}
                >
                  {menuBtn === "Waste" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <MaterialIcons
                    name="manage-accounts"
                    size={18}
                    color="#91918e"
                  />
                  <Text style={[styles.menuNameText]}>Manage Waste</Text>

                  <Animated.View style={[styles.arrowDown, iconStyles[0]]}>
                    <FontAwesome name="angle-down" size={18} color="#91918e" />
                  </Animated.View>
                </TouchableOpacity>

                {menuBtn === "Waste" && (
                  <View style={styles.subMenuBx}>
                    <TouchableOpacity style={styles.subMenuBtn}>
                      <Text style={[styles.menuNameText, styles.submenutext]}>
                        All Waste Pickups
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuBtn}>
                      <Text style={[styles.menuNameText, styles.submenutext]}>
                        Current Waste
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Safety & Skills"), handlePress(1);
                  }}
                  activeOpacity={0.87}
                  style={styles.sideMenuBtn}
                >
                  {menuBtn === "Safety & Skills" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <MaterialIcons
                    name="safety-check"
                    size={18}
                    color="#91918e"
                  />
                  <Text style={[styles.menuNameText]}>Safety & Skills</Text>

                  <Animated.View style={[styles.arrowDown, iconStyles[1]]}>
                    <FontAwesome name="angle-down" size={18} color="#91918e" />
                  </Animated.View>
                </TouchableOpacity>

                {menuBtn === "Safety & Skills" && (
                  <View style={styles.subMenuBx}>
                    <TouchableOpacity style={styles.subMenuBtn}>
                      <Text style={[styles.menuNameText, styles.submenutext]}>
                        Resource Material (सिखने का लिंक)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuBtn}>
                      <Text style={[styles.menuNameText, styles.submenutext]}>
                        Certificate Test
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => {
                    setMenuBtn("Reviews"), handlePress();
                  }}
                  activeOpacity={0.87}
                  style={styles.sideMenuBtn}
                >
                  {menuBtn === "Reviews" ? (
                    <View style={styles.activeBorder}></View>
                  ) : null}
                  <MaterialIcons name="reviews" size={18} color="#91918e" />
                  <Text style={[styles.menuNameText]}>My Reviews</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.87}
                style={[styles.sideMenuBtn, styles.logoutbtn]}
              >
                {menuBtn === "Transactions" ? (
                  <View style={styles.activeBorder}></View>
                ) : null}
                <SimpleLineIcons name="logout" size={18} color="#91918e" />
                <Text style={[styles.menuNameText]}>Log Out</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => closeMenu()}
                style={styles.closeMenuBtn}
              >
                <AntDesign name="close" size={20} color="#ff0000" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View
            style={{
              position: "relative",
              width: "100%",
              paddingHorizontal: 16,
              marginTop: 15,
            }}
          >
            <View style={styles.buywastetopprofileBx}>
              <View style={styles.leftbuywasteInfoBx}>
                <Image
                  style={{
                    width: 55,
                    height: 55,
                    objectFit: "cover",
                    borderRadius: 50,
                  }}
                  source={
                    userInfo?.profileImage
                      ? { uri: userInfo?.profileImage }
                      : require("../assets/images/profile-img.png")
                  }
                />

                <View style={styles.profileInfoBx}>
                  <Text style={styles.usernameText}>{userInfo?.fullname}</Text>
                  <Text style={styles.phoneNum}>
                    {userInfo?.phoneNumber ? (
                      <Text style={{ fontWeight: "500" }}>
                        +91 {userInfo?.phoneNumber}
                      </Text>
                    ) : null}
                  </Text>
                </View>
              </View>

              <View style={styles.recycleBg}>
                <Image
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  source={require("../assets/images/recycle-3.png")}
                />
              </View>
            </View>
          </View>

          <View style={styles.productChooseandweightBx}>
            <TouchableOpacity
              onPress={() => setShowBx(!showBx)}
              activeOpacity={0.76}
              style={[styles.chooseProdBx]}
            >
              <Text style={styles.chooseProdText}>
                {selectProd?.name || "Choose Product"}
              </Text>
              <FontAwesome name="angle-down" size={18} color="#7c7c7c" />
            </TouchableOpacity>

            {/* 
                        <TouchableOpacity activeOpacity={0.76} style={[styles.chooseProdBx, styles.addweightBx]}>
                            <Octicons name="law" size={18} color="#7c7c7c" />
                            <Text style={[styles.chooseProdText, styles.weightText]}>Add Weight</Text>
                        </TouchableOpacity> */}
          </View>
          {showBx && (
            <View style={styles.chooseProductMain}>
              <ScrollView
                style={styles.chooseProdListBx}
                nestedScrollEnabled={true}
              >
                {!rateList?.error
                  ? rateList?.map((item, id) => (
                      <TouchableOpacity
                        onPress={() => handleSelectBx(item)}
                        activeOpacity={0.76}
                        key={id}
                        style={[
                          styles.prodliBx,
                          {
                            backgroundColor:
                              selectProd?.productName === item?.productName
                                ? "#eee"
                                : "#fff",
                          },
                        ]}
                      >
                        <View style={styles.ProdIconBx}>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              objectFit: "cover",
                            }}
                            source={{ uri: item?.productImage }}
                          />
                        </View>

                        <Text style={styles.prodText}>
                          {" "}
                          {item?.productName}{" "}
                        </Text>
                      </TouchableOpacity>
                    ))
                  : null}
              </ScrollView>
            </View>
          )}

          <View style={styles.cartItemsListsBx}>
            {cart?.map((curElem, id) => (
              <View style={styles.cartitemBx} key={id}>
                <View style={styles.cartProdBx}>
                  <Text style={styles.cartProdText}>
                    {" "}
                    {curElem?.productName}{" "}
                  </Text>
                  <View style={styles.cartProdImgbx}>
                    <Image
                      style={{ width: 20, height: 20, objectFit: "cover" }}
                      source={{ uri: curElem?.productImage }}
                    />
                  </View>
                </View>

                <View style={styles.prodotherinfobx}>
                  <View style={styles.prodotherinfo}>
                    <Text style={styles.prodrelText}>
                      {curElem?.retailPrice} / {curElem?.unit}
                    </Text>
                    <Text style={styles.prodrelText2}>Retail Price</Text>
                  </View>

                  <View style={styles.prodotherinfo}>
                    <Text style={styles.prodrelText}>
                      {curElem?.bulkPrice} / {curElem?.unit}
                    </Text>
                    <Text style={styles.prodrelText2}>Bulk Price</Text>
                  </View>

                  <View style={styles.prodotherinfo}>
                    <Text style={styles.prodrelText}>
                      {curElem?.weight} {curElem?.unit}
                    </Text>
                    <Text style={styles.prodrelText2}>Quantity</Text>
                  </View>

                  <View style={styles.prodotherinfo}>
                    <Text style={styles.prodrelText}>{curElem?.ammount}</Text>
                    <Text style={styles.prodrelText2}>Amount</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={{ position: "relative", paddingHorizontal: 16 }}>
            <View style={styles.addmorebx}>
              <Text
                style={{ fontSize: 15, fontWeight: "500", color: "#026874" }}
              >
                Add More
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaProvider>

      <View>
        <ReactNativeModal
          isVisible={walletModal}
          animationIn={"fadeIn"}
          onBackButtonPress={() => setWalletModal(false)}
          onBackdropPress={() => setWalletModal(false)}
        >
          <View style={styles.apntCancelPopup}>
            <View style={styles.erroricon}>
              <Feather name="check-circle" size={28} color="#fff" />
            </View>
            <Text
              style={[
                styles.cancelApntText,
                { fontWeight: "600", fontSize: 15 },
              ]}
            >
              Payment has been made{" "}
            </Text>

            <Text style={styles.cancelApntText}>
              ₹{totalAmmount} has been sent to {userInfo?.fullname || "user"}{" "}
              wallet.
            </Text>
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          isVisible={cashPaidModal}
          animationIn={"fadeIn"}
          onBackButtonPress={() => setCashPaidModal(false)}
          onBackdropPress={() => setCashPaidModal(false)}
        >
          <View style={styles.apntCancelPopup}>
            <View style={styles.erroricon}>
              <Feather name="check-circle" size={28} color="#fff" />
            </View>
            <Text
              style={[
                styles.cancelApntText,
                { fontWeight: "600", fontSize: 15 },
              ]}
            >
              Payment has been made{" "}
            </Text>

            <Text style={styles.cancelApntText}>
              ₹{totalAmmount} paid to {userInfo?.fullname || "user"} in cash{" "}
            </Text>
          </View>
        </ReactNativeModal>

        {/* Error Popup (modal) */}
        <ReactNativeModal
          isVisible={errorModal}
          animationIn={"fadeIn"}
          onBackButtonPress={() => setCashPaidModal(false)}
          onBackdropPress={() => setCashPaidModal(false)}
        >
          <View style={styles.apntCancelPopup}>
            <View style={[styles.erroricon, { backgroundColor: "#ff0000" }]}>
              <FontAwesome name="close" size={28} color="#fff" />
            </View>
            <Text
              style={[
                styles.cancelApntText,
                { fontWeight: "600", fontSize: 15 },
              ]}
            >
              Insufficient fund{" "}
            </Text>

            <Text style={styles.cancelApntText}>
              Please check you wallet Balance, it seems you have insufficient
              fund to pay{" "}
            </Text>
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          isVisible={weightModal}
          animationIn={"fadeIn"}
          onBackButtonPress={() => setWeightModal(false)}
          onBackdropPress={() => setWeightModal(false)}
        >
          <View style={styles.WeightPopup}>
            <Text style={styles.prodText}>
              Product :{" "}
              <Text style={{ fontWeight: "500" }}>
                {" "}
                {selectProd?.productName}{" "}
              </Text>
            </Text>

            <View style={styles.prodInfoList}>
              <Text style={{ fontSize: 13, color: "#323232" }}>
                Retails Price/{selectProd?.unit}:{" "}
              </Text>
              <Text style={{ fontWeight: "500", color: "#242421" }}>
                ₹{selectProd?.retailPrice}
              </Text>
            </View>
            <View style={styles.prodInfoList}>
              <Text style={{ fontSize: 13, color: "#323232" }}>
                Bulk Price/{selectProd?.unit}:{" "}
              </Text>
              <Text style={{ fontWeight: "500", color: "#242421" }}>
                ₹{selectProd?.bulkPrice}
              </Text>
            </View>

            <View style={styles.weightInptBx}>
              <Text style={styles.weightlabel}>
                Weight ({selectProd?.unit})
              </Text>
              <View style={styles.weightInpt}>
                <TextInput
                  style={styles.textinputbx}
                  placeholder="Enter Product weight"
                  placeholderTextColor={"#7c7c7c"}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={(text) => setWeight(text)}
                />
                <TouchableOpacity
                  onPress={handleCart}
                  activeOpacity={0.676}
                  style={styles.cartBtn}
                >
                  <Text style={styles.cartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ReactNativeModal>
      </View>

      {+totalAmmount ? (
        <View style={styles.bottom_paywallet_cashPaid_amnt_bx}>
          {+wallet?.balance >= +totalAmmount ? (
            <TouchableOpacity
              onPress={handleConfirmButtonClick}
              style={styles.paywaletBtn}
            >
              <Text style={styles.waletText}>Pay to Wallet</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={handleCashPaidClick}
            style={styles.paywaletBtn}
          >
            <Text style={styles.waletText}>Cash Paid</Text>
          </TouchableOpacity>

          <View style={styles.totalAmnt_bx}>
            <Text style={styles.totalAmntText}>Total Amount</Text>
            <Text style={styles.amntNumber}>{totalAmmount}</Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default BuyWaste;

const styles = StyleSheet.create({
  cartProdText: {
    fontSize: 13,
    color: "#026874",
    fontWeight: "500",
  },

  addmorebx: {
    position: "relative",
    width: "100%",
    height: 80,
    marginBottom: 80,
    marginTop: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#026874",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  prodrelText2: {
    fontWeight: "400",
    fontSize: 11,
    color: "#5c5c5c",
  },

  prodrelText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    color: "#3c3c3c",
  },

  prodotherinfobx: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  cartitemBx: {
    position: "relative",
    width: "100%",
    backgroundColor: "#C7EAEB",
    paddingBlock: 14,
    paddingHorizontal: 10,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  cartProdBx: {
    gap: 4,
  },

  cartProdImgbx: {
    position: "relative",
    width: 35,
    height: 35,
    backgroundColor: "#026874",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },

  cartItemsListsBx: {
    position: "relative",
    marginTop: 20,
    paddingHorizontal: 14,
  },

  WeightPopup: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
    paddingBlock: 22,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  textinputbx: {
    height: "100%",
    fontSize: 13,
    color: "#323232",
  },

  cartText: {
    fontSize: 13,
    color: "#fff",
  },

  cartBtn: {
    position: "relative",
    width: "auto",
    paddingHorizontal: 10,
    height: "85%",
    backgroundColor: "#026874",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  weightInpt: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 43,
    marginTop: 10,
    paddingInlineEnd: 4,
    paddingInlineStart: 6,
  },

  weightlabel: {
    fontSize: 13,
    color: "#0f3642",
  },

  prodInfoList: {
    position: "relative",
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  prodText: {
    fontSize: 15,
    color: "#343231",
    marginBottom: 10,
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
    textAlign: "center",
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
    backgroundColor: "#026874",
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

  buyWasteComp: {
    position: "relative",
    width: "100%",
    flex: 1,
    marginBlockStart: "7%",
  },

  amntNumber: {
    fontSize: 13,
    color: "#f1f1f1",
  },

  totalAmntText: {
    fontSize: 14,
    color: "#ebebeb",
  },

  totalAmnt_bx: {
    alignItems: "flex-end",
  },

  waletText: {
    fontSize: 13,
    color: "#fff",
  },

  paywaletBtn: {
    position: "relative",
    width: 100,
    borderWidth: 0.87,
    borderColor: "#fff",
    alignItems: "center",
    height: 34,
    justifyContent: "center",
    borderRadius: 5,
  },

  bottom_paywallet_cashPaid_amnt_bx: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#026874",
    paddingHorizontal: 18,
    paddingBlock: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  prodliBx: {
    position: "relative",
    width: "100%",
    paddingBlock: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0.76,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  ProdIconBx: {
    position: "relative",
    width: 34,
    height: 34,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0ba3b5",
  },

  chooseProdListBx: {
    position: "relative",
    top: 5,
    width: "100%",
    maxHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 6,
  },

  chooseProdBx: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBlock: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 34,
  },

  addweightBx: {
    width: "35%",
  },

  chooseProdText: {
    fontSize: 13,
    color: "#7c7c7c",
    fontWeight: "400",
  },

  productChooseandweightBx: {
    position: "relative",
    width: "100%",
    marginTop: 14,
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: "4%",
  },

  chooseProductMain: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 14,
  },

  buywastetopprofileBx: {
    position: "relative",
    width: "100%",
    backgroundColor: "#C7EAEB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBlock: 10,
    overflow: "hidden",
  },

  recycleBg: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "32%",
    height: "135%",
    opacity: 0.3,
  },

  phoneNum: {
    fontSize: 13,
    color: "#454343",
  },

  usernameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242424",
  },

  leftbuywasteInfoBx: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  closeMenuBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
  },

  arrowDown: {
    position: "absolute",
    top: "34%",
    right: 15,
  },

  logoutbtn: {
    backgroundColor: "#f7f5f5",
  },

  subMenuBx: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 20,
    paddingBlockStart: 6,
    paddingBlockEnd: 6,
    borderBottomWidth: 1.6,
    // backgroundColor : "#fafcfc",
    borderBottomColor: "#fafcf7",
    borderLeftWidth: 1.6,
    borderLeftColor: "#e6e3e3",
    marginLeft: 5,
  },

  submenutext: {
    fontSize: 13.55,
    color: "#91918e",
  },

  subMenuBtn: {
    position: "relative",
    width: "100%",
    paddingBlock: 8,
  },

  profile_Infobx: {
    position: "relative",
    width: "100%",
    backgroundColor: "#f4f5f2",
    paddingBlock: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  activeBorder: {
    position: "absolute",
    top: "20%",
    left: 0,
    width: 5,
    height: "60%",
    borderLeftWidth: 4,
    borderLeftColor: "#0fa894",
  },

  menuNameText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#91918e",
  },

  sideMenuBtn: {
    position: "relative",
    width: "100%",
    height: 54,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    flexDirection: "row",
    borderBottomWidth: 1.6,
    borderBottomColor: "#fafcf7",
    paddingInline: 16,
  },

  MenuLists: {
    position: "relative",
    width: "100%",
    marginBlockStart: 10,
  },

  overlayBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: height,
    backgroundColor: "#010101",
    opacity: 0.67,
    zIndex: 8,
  },

  profileInfo: {
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },

  profId: {
    fontSize: 13,
    fontWeight: "400",
    color: "#858282",
  },

  profName: {
    fontSize: 20,
    color: "#000248",
    fontWeight: "600",
  },

  profileLog: {
    position: "relative",
    width: 80,
    height: 80,
    marginBottom: 6,
  },

  sidedrawerComp: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    backgroundColor: "#fff",
    height: height,
    zIndex: 10,
  },

  sidedrawerMenu: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  menuIcon: {
    width: 22,
    height: 22,
  },

  rightHeaderBx: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },

  username: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },

  topHeader: {
    position: "relative",
    width: "100%",
    backgroundColor: "#026874",
    paddingBlock: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  userImg: {
    width: 42,
    height: 42,
    objectFit: "cover",
    borderRadius: 50,
  },

  leftUserInfo: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  reddot: {
    position: "absolute",
    top: 1.5,
    right: 7,
    width: 5,
    height: 5,
    backgroundColor: "red",
    borderRadius: 50,
  },

  bellBtn: {
    position: "relative",
    width: 24,
  },
});
