import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import ApntCard from './Components/ApntCard';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import CommonModal from './Components/CommonModal';
import ReactNativeModal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import LocateAddress from './LocateAddress';
import { useRouter } from 'expo-router';


const { width, height } = Dimensions.get('window');

const Dashboard = () => {
    const [userName, setUserName] = useState('Nawaz Akhtar');
    const [menuOpen, setMenuOpen] = useState(true);
    const [menuBtn, setMenuBtn] = useState('Dashboard');
    const [cancelModal, setCancelModal] = useState(false);
    const [activeTodayPopup, setActiveTodayPopup] = useState(false);
    const [mobileNumber , setMobileNumber] =  useState(false);
    const [buyWaste, setBuyWaste] = useState(false);
    const [leaveReq, setLeaveReq] = useState(false);
        const [fromDate, setFromDate] = useState('');
        const [toDate, setToDate] = useState('');
        const [dateType, setDateType] = useState('');
        const [locateAddress , setLocateAddress] = useState(true);

        const [showCalendar, setShowCalendar] = useState(false);
        const [leaveReqSent, setLeaveReqSent] = useState(false);
    

    const ICON_LIBRARIES = {
        FontAwesome5: FontAwesome5,
        FontAwesome6: FontAwesome6,
        Feather: Feather
    };

    const xValue = useSharedValue(-400);
    const opacityMenu = useSharedValue(0);
    const overlayOpacity = useSharedValue(0);
    const overlayVisible = useSharedValue(false);
    const router =  useRouter();

    const slideMenuStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: xValue.value }],
            opacity: opacityMenu.value,
        }
    })

    const overlayStyle = useAnimatedStyle(() => {
        return {
            opacity: overlayOpacity.value,
            display: overlayVisible.value ? "flex" : 'none',
        }
    })

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

  const statusCard = [
    {
      id: 1,
      icon: require("../assets/images/apnt-icon.png"),
      name: "Appointments",
      number: 20,
    },

    {
      id: 2,
      icon: require("../assets/images/walet-icon.png"),
      name: "Wallet Balance",
      number: 1000.0,
    },

    {
      id: 3,
      icon: require("../assets/images/rupees-icon.png"),
      name: "Cash Paid",
      number: 3500.0,
    },

    {
      id: 4,
      icon: require("../assets/images/waste-icon.png"),
      name: "Waste Collected",
      number: 150,
      categ: "kg",
    },

    {
      id: 5,
      icon: require("../assets/images/waste-icon.png"),
      name: "Waste Sold",
      number: 150,
      categ: "kg",
    },
  ];

    const ApntData = [

        {
            id: 1,
            image: require('@/assets/images/user-img.png'),
            name: 'Rajesh Verma',
            date: '10-May-2024, 8 Am - 10 Pm',
            locat: 'Laxmi Nagar',
            dist: 2,
    
        },

    {
      id: 2,
      image: require("@/assets/images/user-img.png"),
      name: "Rahul Verma",
      date: "15-Jul-2024, 8 Am - 10 Pm",
      locat: "Kundan Nagar",
      dist: 10,
    },

    {
      id: 3,
      image: require("@/assets/images/user-img.png"),
      name: "Ankit Desai",
      date: "20-May-2024, 8 Am - 10 Pm",
      locat: "Gandhi Nagar",
      dist: 3,
    },

    {
      id: 4,
      image: require("@/assets/images/user-img.png"),
      name: "Pankaj Tripati",
      date: "05-June-2024, 8 Am - 10 Pm",
      locat: "Azad Nagar",
      dist: 8,
    },
  ];

  const actionsBtns = [
    {
      id: 1,
      name: "Active",
      iconName: "user",
      iconFrom: "Feather",
    },

        {
            id: 2,
            name: 'Waste Sale',
            iconName: 'coins',
            iconFrom: 'FontAwesome6',
        },

    {
      id: 3,
      name: "Buy Waste",
      iconName: "cart-plus",
      iconFrom: "FontAwesome6",
    },

    {
      id: 4,
      name: "Leave Request",
      iconName: "running",
      iconFrom: "FontAwesome5",
    },
  ];

    const handleSideMenuDrawer = () => {
        if (xValue.value !== 0) {
            xValue.value = withTiming(0, { duration: 400 }); // Slide in
            opacityMenu.value = withTiming(1, { duration: 400 }); // Fade in
            setMenuOpen(false)
        } else {
            xValue.value = withTiming(-400, { duration: 400 }); // Slide out
            opacityMenu.value = withTiming(0, { duration: 400 }); // Fade out
            setMenuOpen(true)

        }

        if (!overlayVisible.value) {
            overlayVisible.value = true;
            overlayOpacity.value = withTiming(0.67, { duration: 400 })
            setMenuOpen(false)
        } else {
            overlayOpacity.value = withTiming(0, { duration: 400 })
            overlayVisible.value = false;
            setMenuOpen(true)

        }

    }

    const closeMenu = () => {
        xValue.value = withTiming(-400, { duration: 400 }); // Slide out
        opacityMenu.value = withTiming(0, { duration: 400 }); // Fade out
        overlayOpacity.value = withTiming(0, { duration: 400 })
        overlayVisible.value = false;
        setMenuOpen(true)
    }

    const handleFunc = (value) => {
        if (value === 'Active') {
            setActiveTodayPopup(true)
        }else if(value === 'Buy Waste') {
            setBuyWaste(true)
        }else if(value  === "Leave Request"){
            setLeaveReq(true)

        }
        else {
            setActiveTodayPopup(false)

        }

    }

    const handleCalendarFunc = (dateType) => {
        if(dateType === 'FromDate'){
            setDateType(dateType)
            setShowCalendar(true)
        }else if (dateType === 'ToDate') {
            setDateType(dateType)
            setShowCalendar(true)
        }else{
            setShowCalendar(false)

        }
    }

    const handleDateSelect = (day) => {
        setFromDate(day.dateString);
        setShowCalendar(false); // Close calendar after selection
      };

      const handleDateSelectTwo = (day) => {
        // setFromDate(day.dateString);
        setToDate(day.dateString);
        setShowCalendar(false); // Close calendar after selection
      };


  return (
    <>
      <SafeAreaProvider>
        <ScrollView
          scrollEnabled={menuOpen}
          style={styles.dashboardScreen}
          nestedScrollEnabled={true}
        >
          <View style={styles.topHeader}>
            <View style={styles.leftUserInfo}>
              <Image
                style={styles.userImg}
                source={require("../assets/images/Ellipse-101.jpg")}
              />
              <View style={styles.userDet}>
                <Text style={styles.username}>Nawaz Akhtar</Text>
                <Text style={styles.userId}>KPW0000014</Text>
                <View style={styles.ratingFlex}>
                  <Entypo name="star" size={12} color="#facb3e" />
                  <Entypo name="star" size={12} color="#facb3e" />
                  <Entypo name="star" size={12} color="#facb3e" />
                  <Entypo name="star-outlined" size={12} color="#3c3c3c" />
                  <Entypo name="star-outlined" size={12} color="#3c3c3c" />
                </View>
              </View>
            </View>

            <View style={styles.rightHeaderBx}>
              <TouchableOpacity style={styles.bellBtn}>
                <FontAwesome5 name="bell" size={18} color="#026874" />
                <View style={styles.reddot}></View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => handleSideMenuDrawer()}
                style={styles.menuIcon}
              >
                <Image
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  source={require("../assets/images/menu-icon.png")}
                />
                {/* <Text>Menu</Text> */}
              </TouchableOpacity>
            </View>
          </View>

                    <View style={styles.actionsBtnsComp}>
                        <View style={styles.actionsBtnsFlex}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled={true}
                                data={actionsBtns}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    const IconComponent = ICON_LIBRARIES[item.iconFrom];
                                    return (
                                        <TouchableOpacity onPress={() => handleFunc(item.name)} activeOpacity={0.3} style={styles.actionBtn}>
                                            <Text style={styles.actionText}> {item.name} </Text>
                                            <View style={styles.actioniconBx}>
                                                {IconComponent && <IconComponent name={item.iconName} size={13} color="#fff" />}
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}

                            />




                        </View>
                    </View>

          <View style={styles.statusCardComp}>
            <Text style={styles.statusText}>
              {" "}
              Hey {userName},{" "}
              <Text style={{ fontWeight: "500" }}>Good Morning!</Text>{" "}
            </Text>

            <View style={styles.statusCardList}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={statusCard}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.statusCardBx}>
                    <View style={styles.iconBx}>
                      <Image
                        style={{ width: 16, height: 16, objectFit: "cover" }}
                        source={item.icon}
                      />
                    </View>
                    <Text style={styles.statusTitle}>{item.name}</Text>
                    <Text style={styles.statusdet}>
                      {item.number}
                      {item.categ ? (
                        <Text style={styles.kgtext}> kg </Text>
                      ) : null}
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.4}
                      style={styles.statusBtn}
                    >
                      <Text style={styles.viewalltext}>View All</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>

          <View style={styles.actApntFlexBx}>
            <Text style={styles.apntTitle}>Active Appointments</Text>

            <TouchableOpacity
              activeOpacity={0.67}
              style={[styles.viewApntBtn, styles.clicklocatBtn]}
            >
              <Text style={styles.ViewText}>Align Location</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
              <Text style={styles.ViewText}>View All</Text>
            </TouchableOpacity>
          </View>

                    <View style={styles.apntDataList}>
                        <FlatList
                            data={ApntData}
                            scrollEnabled=
                            {false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => <ApntCard apntCancelBtn={() => setCancelModal(true)} itemStart='flex-start' bgColor="#E5F2F2" item={item} index={index} />}
                        />
                    </View>




                    <View style={styles.noApntBx}>
                        <Text style={styles.noApntText}>No Appointments Available</Text>
                    </View>

                    <Animated.View style={[styles.overlayBg, overlayStyle]}></Animated.View>
                    <Animated.View style={[styles.sidedrawerComp, slideMenuStyle]}>
                        <View style={styles.sidedrawerMenu}>

                            <View style={styles.profile_Infobx}>
                                <View style={styles.profileLog}>
                                    <Image style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 50, }} source={require('../assets/images/nawaz-bhai.jpg')} />
                                </View>
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profName}>
                                        Nawaz Akhtar
                                    </Text>
                                    <Text style={styles.profId}>
                                        KPW0000014
                                    </Text>
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

                                <TouchableOpacity onPress={() => { setMenuBtn("Dashboard"), handlePress() }} activeOpacity={0.87} style={[styles.sideMenuBtn]}>
                                    {menuBtn === "Dashboard" ? <View style={styles.activeBorder}></View> : null}
                                    <MaterialIcons name="dashboard" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>Dashboard</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setMenuBtn("Transactions"), handlePress() }} activeOpacity={0.87} style={styles.sideMenuBtn}>
                                    {menuBtn === "Transactions" ? <View style={styles.activeBorder}></View> : null}
                                    <FontAwesome5 name="wallet" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>My Transactions</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setMenuBtn("Appointments"), handlePress() }} activeOpacity={0.87} style={styles.sideMenuBtn}>
                                    {menuBtn === "Appointments" ? <View style={styles.activeBorder}></View> : null}
                                    <Feather name="edit" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>My Appointments</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setMenuBtn("Subscriptions"), handlePress() }} activeOpacity={0.87} style={styles.sideMenuBtn}>
                                    {menuBtn === "Subscriptions" ? <View style={styles.activeBorder}></View> : null}
                                    <FontAwesome5 name="user-check" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>Subscriptions</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setMenuBtn("Details"), handlePress() }} activeOpacity={0.87} style={styles.sideMenuBtn}>
                                    {menuBtn === "Details" ? <View style={styles.activeBorder}></View> : null}
                                    <MaterialIcons name="details" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>My Details</Text>



                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => { setMenuBtn("Waste"), handlePress(0) }} activeOpacity={0.87} style={styles.sideMenuBtn}>
                                    {menuBtn === "Waste" ? <View style={styles.activeBorder}></View> : null}
                                    <MaterialIcons name="manage-accounts" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>Manage Waste</Text>


                                    <Animated.View style={[styles.arrowDown, iconStyles[0]]}>
                                        <FontAwesome name="angle-down" size={18} color="#91918e" />
                                    </Animated.View>

                                </TouchableOpacity>

                                {menuBtn === 'Waste' && <View style={styles.subMenuBx}>
                                    <TouchableOpacity style={styles.subMenuBtn}>
                                        <Text style={[styles.menuNameText, styles.submenutext]}>All Waste Pickups</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.subMenuBtn}>
                                        <Text style={[styles.menuNameText, styles.submenutext]}>Current Waste</Text>
                                    </TouchableOpacity>
                                </View>}


                                <TouchableOpacity onPress={() => { setMenuBtn("Safety & Skills"), handlePress(1) }} activeOpacity={0.87} style={styles.sideMenuBtn}>
                                    {menuBtn === "Safety & Skills" ? <View style={styles.activeBorder}></View> : null}
                                    <MaterialIcons name="safety-check" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>Safety & Skills</Text>

                                    <Animated.View style={[styles.arrowDown, iconStyles[1]]}>
                                        <FontAwesome name="angle-down" size={18} color="#91918e" />
                                    </Animated.View>

                                </TouchableOpacity>


                                {menuBtn === 'Safety & Skills' && <View style={styles.subMenuBx}>
                                    <TouchableOpacity style={styles.subMenuBtn}>
                                        <Text style={[styles.menuNameText, styles.submenutext]}>Resource Material (सिखने का लिंक)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.subMenuBtn}>
                                        <Text style={[styles.menuNameText, styles.submenutext]}>Certificate Test</Text>
                                    </TouchableOpacity>
                                </View>}

                                <TouchableOpacity onPress={() => { setMenuBtn("Reviews"), handlePress() }} activeOpacity={0.87} style={styles.sideMenuBtn}>
                                    {menuBtn === "Reviews" ? <View style={styles.activeBorder}></View> : null}
                                    <MaterialIcons name="reviews" size={18} color="#91918e" />
                                    <Text style={[styles.menuNameText]}>My Reviews</Text>

                                </TouchableOpacity>

                            </View>


                            <TouchableOpacity activeOpacity={0.87} style={[styles.sideMenuBtn, styles.logoutbtn]}>
                                {menuBtn === "Transactions" ? <View style={styles.activeBorder}></View> : null}
                                <SimpleLineIcons name="logout" size={18} color="#91918e" />
                                <Text style={[styles.menuNameText]}>Log Out</Text>

                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => closeMenu()} style={styles.closeMenuBtn}>
                                <AntDesign name="close" size={20} color="#ff0000" />
                            </TouchableOpacity>

                        </View>


                    </Animated.View>

                </ScrollView>
            </SafeAreaProvider>


            <View>
            <CommonModal state={"cancelApnt"} cancelApntPopup={cancelModal} setterFunc={setCancelModal} />
            <CommonModal state={"activeToday"} cancelApntPopup={activeTodayPopup} setterFunc={setActiveTodayPopup} />
            <CommonModal state={"leaveReqSent"} cancelApntPopup={leaveReqSent} setterFunc={setLeaveReqSent} />


            <ReactNativeModal isVisible={buyWaste} animationIn={'fadeIn'} 
            onBackButtonPress={() => setBuyWaste(false)}
            onBackdropPress={() => setBuyWaste(false)}
            >
                <View style={styles.buyWasteBx}>
                    <Text style={styles.titleText}>Buy Waste</Text>
                    <View style={styles.inputBx}>
                        <TextInput keyboardType='numeric' value={mobileNumber} onChangeText={(text) => setMobileNumber(text)} placeholder="Enter Mobile Number" placeholderTextColor={"#b0acac"} / >
                        <Feather name="search" size={18} style={styles.searchIcon} color="#026874" />
                    </View>

                    <Text style={styles.textstyle}>Customer Name: <Text style={{fontWeight : '500'}}> Nawaz Akhtar</Text></Text>

                    <View style={styles.btnsFlexBx}>
                        <TouchableOpacity onPress={() => {router.navigate("BuyWaste"), setBuyWaste(false)}} style={styles.buywasteBtn}>
                            <Text style={styles.buywasteBtnText}>Buy Waste</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buywasteBtn}>
                            <Text style={styles.buywasteBtnText}>View Customers History</Text>
                        </TouchableOpacity>
                        
                    </View>
                        
                </View>
            </ReactNativeModal>


            
            <ReactNativeModal isVisible={leaveReq} animationIn={'fadeIn'} 
            onBackButtonPress={() => setLeaveReq(false)}
            onBackdropPress={() => setLeaveReq(false)}
            >
                <View style={styles.buyWasteBx}>
                    <Text style={styles.titleText}>Leave Request</Text>

                    <Text style={styles.leaveperText}>Select Leave Period</Text>

                    <View style={styles.dateinptFlex}>

                    <View style={styles.inptWrap}>
                        <Text style={styles.leaveperText}>From</Text>
                    <TouchableOpacity onPress={() => handleCalendarFunc('FromDate')} activeOpacity={0.87} style={styles.inputBx}>
                        <TextInput style={{fontSize : 13, color : "#828181"}} keyboardType='numeric' value={fromDate}  placeholder="Select Your Date" editable={false} placeholderTextColor={"#b0acac"} / >
                        <AntDesign name="calendar" size={16} style={styles.searchIcon} color="#b0acac" />
                    </TouchableOpacity>
                    </View> 


                    <View style={styles.inptWrap}>
                        <Text style={styles.leaveperText}>To</Text>
                    <TouchableOpacity onPress={() => handleCalendarFunc('ToDate')}  activeOpacity={0.87} style={styles.inputBx}>
                        <TextInput style={{fontSize : 13, color : "#828181"}} keyboardType='numeric' value={toDate}  placeholder="Select Your Date" editable={false} placeholderTextColor={"#b0acac"} / >
                        <AntDesign name="calendar" size={16} style={styles.searchIcon} color="#b0acac" />
                    </TouchableOpacity>
                    </View>

                    </View>


                        <TouchableOpacity onPress={() => {setLeaveReqSent(true), setLeaveReq(false)}} style={[styles.buywasteBtn, {marginTop : 20, marginBottom : 5, width : '100%', marginHorizontal : 'auto'}]}>
                            <Text style={styles.buywasteBtnText}>Send Request</Text>
                        </TouchableOpacity>
                        
                        
                </View>
            </ReactNativeModal>


            <ReactNativeModal isVisible={showCalendar} animationIn={'fadeInUp'}  style={{margin : 0,}}
            onBackButtonPress={() => setShowCalendar(false)}
            onBackdropPress={() => setShowCalendar(false)}
            >
            <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
           {dateType === 'FromDate' ? <Calendar 
              current={fromDate || undefined} // Default to selected date
              onDayPress={handleDateSelect}
              markedDates={
                {
                [fromDate]: { selected: true, selectedColor: '#026874' },
                // [toDate]: { selected: true, selectedColor: '#026874' },

                
              }}
              theme={{
                backgroundColor: '#F3F4F6',
                calendarBackground: '#F9FAFB',
                textSectionTitleColor: '#03acc0',
                selectedDayBackgroundColor: '#026874',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#026874',
                dayTextColor: '#111827',
                textDisabledColor: '#D1D5DB',
                arrowColor: '#03acc0',
                monthTextColor: '#026874',
                indicatorColor: '#1E3A8A',
                // textDayFontFamily: 'Arial',
                // textMonthFontFamily: 'Arial',
                // textDayHeaderFontFamily: 'Arial',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
            /> : null}

{dateType === 'ToDate' ? <Calendar 
              current={fromDate || undefined} // Default to selected date
              onDayPress={handleDateSelectTwo}
              markedDates={
                {
                [toDate]: { selected: true, selectedColor: '#026874' },

                
              }}
              theme={{
                backgroundColor: '#F3F4F6',
                calendarBackground: '#F9FAFB',
                textSectionTitleColor: '#03acc0',
                selectedDayBackgroundColor: '#026874',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#026874',
                dayTextColor: '#111827',
                textDisabledColor: '#D1D5DB',
                arrowColor: '#03acc0',
                monthTextColor: '#026874',
                indicatorColor: '#1E3A8A',
                // textDayFontFamily: 'Arial',
                // textMonthFontFamily: 'Arial',
                // textDayHeaderFontFamily: 'Arial',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
            /> : null}
          
          </View>
        </View>
            </ReactNativeModal>

          </View>


          
        </>
    )
}

export default Dashboard;

const styles = StyleSheet.create({

modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    padding: 12,
    backgroundColor: '#026874',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },

dateinptFlex:{
    position : 'relative',
    alignItems : 'center',
    justifyContent: 'space-between',
    flexDirection : 'row',
    width : '100%',
},

inptWrap:{
    position: 'relative',
    width : '48%',
},

leaveperText:{
    fontSize : 13,
    color : '#fff',
    marginBottom : 10,
},

btnsFlexBx:{
    position : 'relative',
    marginTop : 16,
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'flex-start',
    gap : 14,
},

buywasteBtn:{
    position : 'relative',
    borderWidth : 1,
    borderColor : "#f5f5f5",
    paddingHorizontal : 12,
    height : 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius : 4,
},

buywasteBtnText:{
    fontSize : 12,
    color : "#fff",
},

    buyWasteBx:{
        position : 'relative',
        width : '100%',
        backgroundColor : "#026874",
        borderRadius : 12,
        paddingBlock : 14,
        paddingHorizontal : 10,
    },

    textstyle:{
        fontSize : 12,
        marginTop : 10,
        color : "#fff",
    },



    inputBx:{
            position : 'relative',
            width : '100%',
            backgroundColor : "#fff",
            borderRadius : 4,
            paddingHorizontal : 10,

    },

    searchIcon:{
        position : 'absolute',
        top : '25%',
        right : 11,

    },

    titleText:{
        textAlign : 'center',
        fontSize : 17,
        marginBottom : 18,
        color : "#fff",
    },

    closeMenuBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
    },

    arrowDown: {
        position: 'absolute',
        top: '34%',
        right: 15,

    },

    logoutbtn: {
        backgroundColor: "#f7f5f5",
    },

    subMenuBx: {
        position: 'relative',
        width: '100%',
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
        position: 'relative',
        width: '100%',
        paddingBlock: 8,
    },

    profile_Infobx: {
        position: 'relative',
        width: '100%',
        backgroundColor: "#f4f5f2",
        paddingBlock: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },


    activeBorder: {
        position: 'absolute',
        top: '20%',
        left: 0,
        width: 5,
        height: '60%',
        borderLeftWidth: 4,
        borderLeftColor: "#0fa894",
    },

    menuNameText: {
        fontSize: 15,
        fontWeight: '400',
        color: "#91918e",
    },

    sideMenuBtn: {
        position: 'relative',
        width: '100%',
        height: 54,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        flexDirection: 'row',
        borderBottomWidth: 1.6,
        borderBottomColor: "#fafcf7",
        paddingInline: 16,
    },

    MenuLists: {
        position: 'relative',
        width: '100%',
        marginBlockStart: 10,
    },


    overlayBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: height,
        backgroundColor: "#010101",
        opacity: 0.67,
        zIndex: 8,
    },

    profileInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
    },

    profId: {
        fontSize: 13,
        fontWeight: '400',
        color: "#858282",
    },

    profName: {
        fontSize: 20,
        color: '#000248',
        fontWeight: '600',
    },



    profileLog: {
        position: 'relative',
        width: 80,
        height: 80,
        marginBottom: 6,

    },

    sidedrawerComp: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '90%',
        backgroundColor: "#fff",
        height: height,
        zIndex: 10,
    },

    sidedrawerMenu: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },


    actionsBtnsComp: {
        position: 'relative',
        marginTop: 10,
        // bottom: 10,
        // left: 0,
        width: '100%',
        // paddingHorizontal: 20,
    },

    actioniconBx: {
        position: 'relative',
        width: 25,
        height: 25,
        backgroundColor: "#026874",
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionText: {
        fontSize: 13,
        color: "#026874",
        fontWeight: '500',
    },

    actionBtn: {
        position: 'relative',
        width: 'auto',
        backgroundColor: "#fff",
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        height: 34,
        borderRadius: 30,
        paddingInlineStart: 6,
        paddingInlineEnd: 4,
        borderWidth: .76,
        borderColor: "#bababa",
    },

    actionsBtnsFlex: {
        position: 'relative',
        width: '100%',
        // backgroundColor: '#026874',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll',
        gap: 20,
        paddingBlock: 5,
        paddingInlineStart: 12,
        paddingInlineEnd: 0,
        // borderRadius : 12,
    },

  noApntBx: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 20,
    marginBlockEnd: 20,
  },

  noApntText: {
    position: "relative",
    width: "100%",
    height: 120,
    backgroundColor: "#E5F2F2",
    textAlignVertical: "center",
    textAlign: "center",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: "400",
    color: "#7c7c7c",
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

  viewApntBtn: {
    position: "relative",
    width: "auto",
    height: 30,
    backgroundColor: "transparent",
    borderRadius: 6,
    borderWidth: 1.3,
    paddingHorizontal: 10,
    borderColor: "#026874",
    alignItems: "center",
    justifyContent: "center",
  },

  ViewText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#026874",
  },

  apntTitle: {
    fontSize: 14.4,
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
  },

  statusCardList: {
    position: "relative",
    marginTop: 16,
    width: "100%",
  },

  viewalltext: {
    fontSize: 12,
    fontWeight: "500",
    color: "#242424",
  },

  statusBtn: {
    position: "relative",
    width: "auto",
    paddingBlock: 4,
    paddingHorizontal: 12,
    borderWidth: 0.76,
    borderColor: "#026874",
    borderRadius: 6,
  },

  statusTitle: {
    fontSize: 13.5,
    color: "#3c3c3c",
    fontWeight: "500",
    marginBottom: 4,
  },

  statusdet: {
    fontSize: 12.76,
    fontWeight: "500",
    color: "#545454",
    marginBottom: 12,
  },

  iconBx: {
    position: "relative",
    width: 30,
    height: 30,
    backgroundColor: "#026874",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  statusCardBx: {
    position: "relative",
    width: 120,
    backgroundColor: "#C7EAEB",
    marginRight: 12,
    borderRadius: 6,
    paddingBlock: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  statusCardComp: {
    position: "relative",
    width: "100%",
    paddingBlock: 14,
    paddingLeft: 20,
    paddingRight: 8,
  },

  statusText: {
    fontSize: 13.5,
    color: "#5e5e5e",
    fontWeight: "400",
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
    fontSize: 13,
    fontWeight: "500",
    color: "#3C3C3C",
  },

  userId: {
    fontSize: 10,
    color: "#242424",
  },

  ratingFlex: {
    flexDirection: "row",
    alignItems: "center",
  },

  topHeader: {
    position: "relative",
    width: "100%",
    backgroundColor: "#C7EAEB",
    paddingBlock: 12,
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

  dashboardScreen: {
    position: "relative",
    width: "100%",
    flex: 1,
    marginBlockStart: "7.5%",
  },
});
