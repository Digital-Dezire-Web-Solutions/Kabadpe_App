import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import SugestionInpt from './Components/SugestionInpt';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import ReactNativeModal from 'react-native-modal';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Checkbox } from 'react-native-paper';

const KabadiCreateAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [pinValue, setPinValue] = useState('');
    const [areaName, setAreaName] = useState('');
    const [subAreaName, setSubAreaName] = useState('');
    const [selectedValue, setSelectedValue] = useState("Choose One");
    const [selectModal, setSelectModal] = useState(false);
    const [checked, setChecked] = useState(false);

    const pincodes = [
        "110031", "110059", "110002", "110004", "110025",
        "110009", "110035", "110006", "110015"
    ];
    const area = [
        "Seelumpur", "Krishna Nagar", "Gandhi Nagar", "Laxmi Nagar", "Anand Vihar",
        "Madhu Vihar", "Shanti Mohalla", "Daryanganj",
    ];

    const subarea = [
        "kanti Nagar", "Bihari Colony", "Azad Nagar", "Kundan Nagar", "Khureji",
        "Lal Quater", "Daryanganj",
    ];

    const selectBxData = [
        "कबाड़ी वाले",
        "सफाई करने वाले",
        "नाली साफ करने वाले",
        "सेप्टिक टैंक साफ करने वाले",
        "टॉयलेट क्लीनर",

    ]

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.newAcontComp} nestedScrollEnabled={true} >
                <ImageBackground style={styles.formBg} source={require('../assets/images/recycle.png')}></ImageBackground>
                
                          <ImageBackground style={[styles.formBg, styles.formBg2]} source={require('../assets/images/recycle.png')}></ImageBackground>
                <SafeAreaView style={styles.newAcontBx}>
                    <View style={styles.loginLogo}>
                        <Image
                            style={styles.logoImg}
                            source={require("../assets/images/kabadpe-logo.jpg")}
                        />
                    </View>

                    <Text style={styles.loginTitle}> SignUp as a Worker </Text>

                    <View style={styles.signUpForm}>
                        <View style={styles.InputBx}>
                            <Text style={styles.label}>Full Name / पूरा नाम</Text>
                            <View style={styles.input}>
                                <AntDesign
                                    style={styles.icon}
                                    name="user"
                                    size={15}
                                    color="#a6a4a4"
                                />
                                <TextInput
                                    style={styles.mainInput}
                                    name="name"
                                    placeholder="Enter your name..."
                                />
                            </View>
                        </View>

                        <View style={styles.InputBx}>
                            <Text style={styles.label}>WhatsApp No. / व्हाट्सएप नंबर</Text>
                            <View style={styles.input}>
                                <FontAwesome
                                    style={styles.icon}
                                    name="whatsapp"
                                    size={15}
                                    color="#a6a4a4"
                                />
                                <TextInput
                                    style={styles.mainInput}
                                    maxLength={10}
                                    name="whatsappnumber"
                                    keyboardType="numeric"
                                    placeholder="Enter your whatsapp no..."
                                />
                            </View>
                        </View>

                        <SugestionInpt data={pincodes} state={pinValue} setterFunc={setPinValue} labelTitle={'Work Area Pincode / कार्य क्षेत्र पिनकोड'} placeHolderText={'Enter your workarea pincode...'} iconName={'pin'} />

                        <SugestionInpt data={area} state={areaName} setterFunc={setAreaName} labelTitle={'Choose Area / क्षेत्र चुनें'} placeHolderText={'Enter your area...'} iconName={"location-pin"} />

                        <SugestionInpt data={subarea} state={subAreaName} setterFunc={setSubAreaName} labelTitle={'Choose Sub Area / उप क्षेत्र चुनें'} placeHolderText={'Enter your subarea...'} iconName={"location"} />

                        <View style={styles.InputBx}>
                            <Text style={styles.label}>Choose Work Type / कार्य का प्रकार चुनें</Text>
                            <TouchableOpacity onPress={() => setSelectModal(true)} activeOpacity={0.8} style={styles.input}>
                                <Feather
                                    style={styles.icon}
                                    name="type"
                                    size={15}
                                    color="#a6a4a4"
                                />


                                <Text style={styles.selectedText}> {selectedValue} </Text>
                                <View style={styles.downicon}>
                                    <FontAwesome name="angle-down" size={18}
                                        color="#858282" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ReactNativeModal isVisible={selectModal} animationIn={"fadeIn"} animationInTiming={100} 
                            onBackButtonPress={() => setSelectModal(false)}
                            onBackdropPress={() => setSelectModal(false)}>

                            <View style={styles.choseWorkTypeBx}>
                                <FlatList
                                    nestedScrollEnabled={true}
                                    data={selectBxData}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.2}
                                            style={[styles.dropdownItem]}
                                            onPress={() => {setSelectModal(false), setSelectedValue(item)}}

                                        >
                                            <Text style={styles.workText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>

                        </ReactNativeModal>


                       {selectedValue === "कबाड़ी वाले" &&  <View style={styles.InputBx}>
                            <Text style={styles.label}>Company Referral Code / कंपनी रेफरल कोड</Text>
                            <View style={styles.input}>
                            <AntDesign  style={styles.icon} name="codesquareo"  size={15}
                                    color="#a6a4a4" />
                                <TextInput
                                    style={styles.mainInput}
                                    name="companyreferralcode"
                                    placeholder="Enter company referral code..."
                                />
                            </View>
                        </View>}

                        <View style={styles.InputBx}>
                            <Text style={styles.label}>Enter Your Email / अपना ईमेल डालें</Text>
                            <View style={styles.input}>
                            <Feather  style={styles.icon} name="mail"  size={15}
                                    color="#a6a4a4" />
                                <TextInput
                                    style={styles.mainInput}
                                    name="useremail"
                                    placeholder="Enter your emai id..."
                                />
                            </View>
                        </View>


                        <View style={styles.InputBx}>
                            <Text style={styles.label}>Enter Your Password / अपना पासवर्ड डालें</Text>
                            <View style={styles.input}>
                                <Feather
                                    style={styles.icon}
                                    name="lock"
                                    size={15}
                                    color="#a6a4a4"
                                />
                                <TextInput
                                    style={styles.mainInput}
                                    name="userpassword"
                                    placeholder="Enter your password..."
                                />
                            </View>
                        </View>


                        <View style={styles.InputBx}>
                            <Text style={styles.label}>Emergency Contact No. / आपातकालीन संपर्क नंबर</Text>
                            <View style={styles.input}>
                               
                                <FontAwesome6  style={styles.icon} name="phone"  size={15}
                                    color="#a6a4a4" />
                                <TextInput
                                    style={styles.mainInput}
                                    name="usermobilenumber"
                                    placeholder="Enter your mobile no..."
                                />
                            </View>
                        </View>

                    </View>


                <View style={styles.chekbxCont}>
                
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                    color="#0594b0" // Checkbox checkmark color
                    uncheckedColor="#c2c0c0" // Border color when unchecked
                   
                    
                />

                <Text style={styles.notetext}>
              
                 Please Read   <Text style={{color : "#1cb8b2"}}>Team & Conditions </Text>  for Workers and Confirm before Clicking the Request Button / कृपया श्रमिकों के लिए  <Text style={{color : "#1cb8b2"}}> टर्म और शर्तें </Text> पढ़ें और अनुरोध बटन पर क्लिक करने से पहले पुष्टि करें
                </Text>                
                </View>

                <View style={styles.signupFormBtns}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.signInBtn}
                    >
                      <Text style={styles.formSignText}>Submit Request / रिक्वेस्ट सबमिट करें</Text>
                    </TouchableOpacity>

                  </View>
      
      {/* आपका अनुरोध सबमिट कर दिया गया है, और हम आपको शीघ्र ही सूचित करेंगे! / Your request has been submitted, and we will notify you soon! */}
                    
                </SafeAreaView>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default KabadiCreateAccount

const styles = StyleSheet.create({

    formBg:{
        position : 'absolute',
        top : '1%',
        left : '45%',
        width : '85%',
        height : '50%',
        objectFit : 'cover',
        opacity : 0.03,
      },
    
      formBg2:{
        top : '80%',
        left : '-20%',
        width : '80%',
        height : '45%',

      },
  
    chekbxCont:{
        position: 'relative',
        alignItems: 'flex-start',
        justifyContent : 'flex-start',
        flexDirection : 'row',
        marginTop : 14,
        gap : 4,
    },

    notetext:{
        position : 'relative',
        top : 5,
        fontSize : 13,
        width : 270,
        lineHeight : 20,
    },

    text: {
        fontSize: 16,
        marginLeft: 10,
        color: 'black', // Text color when unchecked
    },
    checkedText: {
        color: 'white', // Text color when checked
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },


    choseWorkTypeBx:{
        position : 'relative',
        backgroundColor : "#fff",
        paddingInline : 14,
        borderRadius : 10,

    },

    workText:{
        position : 'relative',
        fontSize : 16,
        fontWeight : '600',
        paddingBlock : 10,
        borderBottomWidth : .4,
        borderBottomColor : "#ddd",

    },

    downicon: {
        position: 'absolute',
        top: '29%',
        right: 16,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    menuItem: {
        fontSize: 18,
        color: 'blue', // Custom font color for Android
    },

    signUpForm: {
        position: "relative",
        width: "100%",
        marginTop: 30,
    },


    googleText: {
        fontSize: 16,
        color: "#026874",
        fontWeight: "600",
        letterSpacing: 0.55,
    },

    googleBtn: {
        position: "relative",
        width: "100%",
        marginTop: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        borderRadius: 50,
        borderWidth: 1.2,
        borderColor: "#026874",
        flexDirection: "row",
        gap: 8,
    },

    alrhveAcnt: {
        position: "relative",
        width: "100%",
        alignItems: "center",
    },

    alrhveacntext: {
        textDecorationLine: "underline",
        color: "#026874",
        fontSize: 15,
        fontWeight: "500",
    },

    newAcntBtn: {
        height: "max-content",
        backgroundColor: "transparent",
        borderWidth: 12,
        borderColor: "red",
    },

    signupFormBtns: {
        position: "relative",
        width: "100%",
        marginTop: 50,
    },

    formSignText: {
        fontSize: 15,
        color: "#fff",
    },

    passwordtoggleBtn: {
        position: "absolute",
        top: "28%",
        right: 10,
    },

    newAcontComp: {
        // position: "relative",
        width: "100%",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },

    newAcontBx: {
        position: "relative",
        marginBottom: 60,
    },

    signInBtn: {
        position: "relative",
        width: "100%",
        height: 46,
        backgroundColor: "#026874",
        borderWidth: 1.2,
        borderColor: "#026874",
        borderRadius: 30,
        marginBottom: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        position: "absolute",
        top: "33%",
        left: 10,
    },

    input: {
        position: "relative",
        width: "100%",
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 50,
        borderWidth: 0.15,
        borderColor: "#242421",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },

    mainInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 35,
        fontSize: 13,
        color: "#212121",
    },

    selectedText: {
        paddingHorizontal: 35,
        fontSize: 13,
        color: "#212121",
    },

    label: {
        color: "#0d0d0d",
        letterSpacing: 0.55,
        fontSize: 13.4,
        color: "#242424",
    },

    InputBx: {
        position: "relative",
        width: "100%",
        gap: 8,
        marginTop: 25,
    },

    loginLogo: {
        position: "relative",
        width: 75,
        height: 75,
        alignSelf: "center",
    },

    logoImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 50,
    },

    loginTitle: {
        fontSize: 25,
        marginTop: 25,
        textAlign: "center",
        fontWeight: "500",
        color: "#224242",
    },

})