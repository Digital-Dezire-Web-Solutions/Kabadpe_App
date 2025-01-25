import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Entypo from '@expo/vector-icons/Entypo'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import Octicons from '@expo/vector-icons/Octicons';

const { width, height } = Dimensions.get('window');

const BuyWaste = () => {
    
    const [menuOpen, setMenuOpen] = useState(true);
    const [menuBtn, setMenuBtn] = useState('Dashboard');
  const xValue = useSharedValue(-400);
    const opacityMenu = useSharedValue(0);
    const overlayOpacity = useSharedValue(0);
    const overlayVisible = useSharedValue(false);
    const [selectProd , setSelectProd] = useState('Choose Product')
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

            const products  = [

                {
                    id : 1,
                    name : 'Paper',
                    icon : require('../assets/images/kabad-type-img-1.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 2,
                    name : 'Plastic',
                    icon : require('../assets/images/kabad-type-img-2.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 3,
                    name : 'Clothes',
                    icon : require('../assets/images/kabad-type-img-3.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 4,
                    name : 'Vehicles',
                    icon : require('../assets/images/kabad-type-img-4.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 5,
                    name : 'Others',
                    icon : require('../assets/images/kabad-type-img-5.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 6,
                    name : 'Wood',
                    icon : require('../assets/images/kabad-type-img-6.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 7,
                    name : 'Glass',
                    icon : require('../assets/images/kabad-type-img-7.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 8,
                    name : 'Metal',
                    icon : require('../assets/images/kabad-type-img-8.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },

                {
                    id : 9,
                    name : 'Electronics',
                    icon : require('../assets/images/kabad-type-img-9.png'),
                    retPrice : '15.00',
                    bulkPrice : '12.00',
                    
                },


           

                
            ]
        
        
  return (
    <>

    <SafeAreaProvider>
        <ScrollView style={styles.buyWasteComp}>

        <View style={styles.topHeader}>

                        <View style={styles.leftUserInfo}>
                        <Text style={styles.username}>Buy Waste</Text>
                          
                        </View>

                        <View style={styles.rightHeaderBx}>
                            <TouchableOpacity style={styles.bellBtn}>
                                <FontAwesome5 name="bell" size={18} color="#fff" />
                                <View style={styles.reddot}></View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.2} onPress={() => handleSideMenuDrawer()} style={styles.menuIcon}>
                                <Image style={{ width: '100%', height: '100%', objectFit: 'cover' ,  }} source={require('../../KabadpeApp/assets/images/menu-2.png')} />
                                {/* <Text>Menu</Text> */}
                            </TouchableOpacity>
                        </View>

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
                    
                    <View style={{position : 'relative', width : '100%' , paddingHorizontal : 16, marginTop : 15,}}> 
                    <View style={styles.buywastetopprofileBx}>
                        <View style={styles.leftbuywasteInfoBx}>
                            <Image style={{width : 55, height : 55, objectFit : 'cover', borderRadius : 50,}} source={require('../assets/images/user-img-4.jpg')} />

                            <View style={styles.profileInfoBx}>
                                <Text style={styles.usernameText}>Priyamvada Kumari</Text>
                                <Text style={styles.phoneNum}>Phone: <Text style={{fontWeight : '500'}}>+91 9292929292</Text></Text>

                            </View>
                            
                        </View>
                        
                       <View style={styles.recycleBg} >
                        <Image style={{width : '100%', height : '100%', objectFit : 'cover'}} source={require('../assets/images/recycle-3.png')} />
                       </View>
                        
                    </View>
                    </View>

                    <View style={styles.productChooseandweightBx}>

                        <View style={styles.chooseProductMain}>
                                <TouchableOpacity activeOpacity={0.76} style={styles.chooseProdBx}>
                                    <Text style={styles.chooseProdText}> {selectProd} </Text>
                                <FontAwesome name="angle-down" size={18} color="#7c7c7c" />

                                </TouchableOpacity>

                            <ScrollView style={styles.chooseProdListBx} >
                                {products.map((item,id) => (
                                    <View style={styles.prodliBx}> 
                            <View style={styles.ProdIconBx}>
                                <Image source={item.icon} />
                                </View>

                                <Text style={styles.prodText}> {item.name} </Text>
                                        </View>
                                ))}
                            </ScrollView>
                                
                        </View>
                                        
                        <TouchableOpacity activeOpacity={0.76} style={[styles.chooseProdBx, styles.addweightBx]}>
                        <Octicons name="law" size={18} color="#7c7c7c" /> 
                        <Text style={[styles.chooseProdText,styles.weightText]}>Add Weight</Text>
                        </TouchableOpacity>
                        
                        </View>
    
        </ScrollView>
    </SafeAreaProvider>

    
    </>
  )
}

export default BuyWaste

const styles = StyleSheet.create({

    chooseProdListBx:{
        position : 'absolute',
        top : 20,
        left : 0,
        width : '100%',
        maxHeight : 200,
        overflow : 'scroll',
    },
    
    chooseProdBx:{
        position : 'relative',
        width : '100%',
        backgroundColor : "#fff",
        borderRadius : 5,
        paddingBlock : 6,
        paddingHorizontal : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },

    addweightBx:{
        width : '35%',
    },

    chooseProdText:{
        fontSize : 13,
        color : "#7c7c7c",
        fontWeight : '400',
    },

    productChooseandweightBx:{
        position : 'relative',
        width : '100%',
        marginTop : 14,
        flexDirection : 'row',
        paddingHorizontal : 12,
        gap : '4%',
    },

    chooseProductMain:{
        position : 'relative',
        width: '60%'
    },

    buywastetopprofileBx:{
        position : 'relative',
        width : '100%',
        backgroundColor : "#C7EAEB",
        borderRadius : 10,
        paddingHorizontal : 10,
        paddingBlock : 10,
        overflow : 'hidden',

    },

    recycleBg:{
        position : 'absolute',
        top : 0,
        right : 0,
        width : '32%',
        height : '135%',
        opacity : 0.3,
    },

    phoneNum:{
        fontSize : 13,
        color : "#454343"
    },

    usernameText:{
        fontSize : 14,
        fontWeight : '600',
        color : "#242424",
    },

    leftbuywasteInfoBx:{
        position : 'relative',
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap : 10,
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

    buyWasteComp:{
        position : 'relative',
        width : '100%',
        flex : 1,
        marginBlockStart: '7%',

    },
    
  

    menuIcon: {
        width: 22,
        height: 22,
    },

    rightHeaderBx: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
    },

    username: {
        fontSize: 15,
        fontWeight: '500',
        color: "#fff",
    },

   

    topHeader: {
        position: 'relative',
        width: '100%',
        backgroundColor: "#026874",
        paddingBlock: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    userImg: {
        width: 42,
        height: 42,
        objectFit: 'cover',
        borderRadius: 50,
    },

    leftUserInfo: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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

})