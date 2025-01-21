import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    Dimensions,
  } from "react-native";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  import Feather from "@expo/vector-icons/Feather";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { LinearGradient } from "expo-linear-gradient";
  import Entypo from "@expo/vector-icons/Entypo";
  import { useRouter } from "expo-router";
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  // import * as Animatable from 'react-native-animatable';
  // const AnimatedButton =  Animatable.createAnimatableComponent(TouchableOpacity);
  
  
const Splash = () => {
  const {height , width} = Dimensions.get('window');
  const router  = useRouter();
  
  const onRedirectPage = () => {
    router.navigate("(tabs)");
  }

  return (
    <ScrollView style={styles.splashComp}>
        <View style={styles.topHeaderFlex}>
          <View style={styles.leftHeaderBx}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#026874" />

            <Text style={styles.location}>Vaishali Nagar</Text>
          </View>

          <View style={styles.rightHeaderIcons}>
            <TouchableOpacity>
              <Feather name="search" size={20} color="#026874" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.bellBtn}>
              <AntDesign name="shoppingcart" size={20} color="#026874" />
              <View style={styles.greendot}></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bellBtn}>
              <FontAwesome5 name="bell" size={20} color="#026874" />
              <View style={styles.reddot}></View>
            </TouchableOpacity>
          </View>
        </View>

        <View animation={'fadeIn'} duration={1000} delay={200} style={styles.mainTitleInfo}>
          <Text style={styles.mainTitle}>
            Hi Sustainability Champion, Sunil Sharma{" "}
          </Text>
          <Text style={styles.paraText}>
            Let’s make our environment cleaner
          </Text>
        </View>
        
        <SafeAreaView style={styles.screensImgFlex}>
          <TouchableOpacity animation={'fadeInUp'} duration={1000} delay={400} style={styles.mainScreenImgBx} onPress={() => onRedirectPage()}>
            <Image
              style={styles.mainImg}
              source={require("@/assets/images/kabad-img.jpg")}
            />

            <LinearGradient
              colors={["#026874", "#1f929f", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.overlayGradient}
            ></LinearGradient>

            <View style={styles.screenTitleBx}>
              <Text style={styles.screenTitle}>KabadPe</Text>
              <Text style={styles.screenPara}>Let’s recycle for nature</Text>

              <TouchableHighlight style={styles.buton}>
                <Text style={styles.btntext}>Earn by recycling</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity animation={'fadeInUp'} duration={1000} delay={600} style={styles.mainScreenImgBx}>
            <Image
              style={styles.mainImg}
              source={require("@/assets/images/ecom-img.jpg")}
            />

            <LinearGradient
              colors={["#20350D", "#385d19", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.overlayGradient}
            ></LinearGradient>

            <View style={styles.screenTitleBx}>
              <Text style={styles.screenTitle}>Green Saman</Text>
              <Text style={styles.screenPara}>Plastic free shopping</Text>

              <TouchableHighlight style={[styles.buton, styles.butonTwo]}>
                <Text style={styles.btntext}>Shop Eco-friendly</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>

          <TouchableOpacity animation={'fadeInUp'} duration={1000} delay={800} style={styles.mainScreenImgBx}>
            <Image
              style={styles.mainImg}
              source={require("@/assets/images/green-img.jpg")}
            />

            <LinearGradient
              colors={["#026874", "#1f929f", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.overlayGradient}
            ></LinearGradient>

            <View style={styles.screenTitleBx}>
              <Text style={styles.screenTitle}>ClimConnect</Text>
              <Text style={styles.screenPara}>Tell others about climate</Text>

              <TouchableHighlight style={styles.buton}>
                <Text style={styles.btntext}>Blogging</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.waletProfFlexBx}>
          <TouchableOpacity onPress={() => router.navigate("WalletScreen")} style={styles.WaletProfBtn}>
            <Entypo name="wallet" size={20} color="#2ccce3" />
            <View >
              <Text style={styles.waletText}> Wallet </Text>
              <Text style={styles.waletAmnt}> 2100.00 </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.WaletProfBtn}>
            <FontAwesome5 name="user-alt" size={18} color="#2ccce3" />
            <TouchableOpacity onPress={() => router.navigate('Profile')}>
              <Text style={styles.waletText}> Profile </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
  )
}

export default Splash

const styles = StyleSheet.create({

    waletText:{
      fontSize : 17,
      fontWeight : '600',
      color : "#fff",
      marginBottom : 4,
    },
  
    waletAmnt:{
      fontSize : 13,
      color : "#f1f1f1",
    },
  
    WaletProfBtn:{
      position : 'relative',
      width : '48%',
      backgroundColor :"#026874",
      borderRadius : 14,
      height : 60,
      paddingHorizontal : 14,
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent: 'flex-start',
      gap : 12,
  
    },
    
    waletProfFlexBx: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
      paddingBottom: 80,
    },
  
    screenPara: {
      fontSize: 14,
      color: "#f5f5f5",
      marginBottom: 12,
    },
  
    buton: {
      position: "relative",
      backgroundColor: "#21b5c6",
      paddingHorizontal: 20,
      borderRadius: 12,
      paddingVertical: 4,
    },
  
    butonTwo: {
      backgroundColor: "#539815",
    },
  
    btntext: {
      fontSize: 13,
      color: "#fff",
    },
  
    screenTitleBx: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
  
    screenTitle: {
      fontSize: 20,
      color: "#fff",
      letterSpacing: 0.67,
      fontWeight: "700",
      marginBottom: 5,
    },
  
    mainScreenImgBx: {
      position: "relative",
      width: '100%',
      height: hp('20.4%'),
      // height : 150,
      marginBottom: 14,
    },
  
    overlayGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "90%",
      height: "100%",
      borderRadius: 12,
    },
  
    screensImgFlex: {
      position: "relative",
      width: "100%",
      marginTop: 10,
    },
  
    mainImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 12,
    },
  
    mainTitleInfo: {
      position: "relative",
      width: "100%",
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
    },
  
    mainTitle: {
      fontSize: 20,
      textAlign: "center",
      maxWidth: 250,
      lineHeight: 26,
      fontWeight: "600",
      color: "#026874",
      marginBottom: 8,
    },
  
    paraText: {
      fontSize: 15,
      fontWeight: "400",
      color: "#7C7C7C",
    },
  
    greendot: {
      position: "absolute",
      top: 2,
      right: 1,
      width: 5,
      height: 5,
      backgroundColor: "#57BC24",
      borderRadius: 50,
    },
  
    reddot: {
      position: "absolute",
      top: 2,
      right: 2,
      width: 5,
      height: 5,
      backgroundColor: "red",
      borderRadius: 50,
    },
  
    bellBtn: {
      position: "relative",
    },
  
    splashComp: {
      position: "relative",
      width: "100%",
      flex: 1,
      backgroundColor: "#eff7cf",
      paddingHorizontal: 18,
      paddingTop: 30,
    },
  
    topHeaderFlex: {
      position: "relative",
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  
    leftHeaderBx: {
      position: "relative",
      width: "auto",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: 10,
    },
  
    location: {
      fontSize: 15,
      color: "#026874",
      fontWeight: "500",
    },
  
    rightHeaderIcons: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 13,
    },
    
  });