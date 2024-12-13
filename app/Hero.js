// import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import ApntCard from './Components/ApntCard';
// import KabadTypeBx from './Components/KabadTypeBx';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import BigimpBx from './Components/BigimpBx';
// import ProdCard from './Components/ProdCard';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// // import * as Animatable from 'react-native-animatable';

// const Hero = () => {
//   const { height, width } = Dimensions.get('window');
//   // const AnimatedButton =  Animatable.createAnimatableComponent(TouchableOpacity);

  


//   const ApntData = [

//     {
//       id: 1,
//       image: require('@/assets/images/user-img.png'),
//       nameTitle: 'Kabadi Name',
//       name: 'Rajesh Verma',
//       date: '10-May-2024, 8 Am - 10 Pm'
//     },

//     {
//       id: 2,
//       image: require('@/assets/images/user-img.png'),
//       nameTitle: 'Kabadi Name',
//       name: 'Rahul Verma',
//       date: '15-Jul-2024, 8 Am - 10 Pm'
//     },


//     {
//       id: 3,
//       image: require('@/assets/images/user-img.png'),
//       nameTitle: 'Kabadi Name',
//       name: 'Ankit Desai',
//       date: '20-May-2024, 8 Am - 10 Pm'
//     },


//     {
//       id: 4,
//       image: require('@/assets/images/user-img.png'),
//       nameTitle: 'Kabadi Name',
//       name: 'Pankaj Tripati',
//       date: '05-June-2024, 8 Am - 10 Pm'
//     },



//     {
//       id: 5,
//       image: require('@/assets/images/user-img.png'),
//       nameTitle: 'Kabadi Name',
//       name: 'Rohan Mishra',
//       date: '24-May-2024, 8 Am - 10 Pm'
//     },


//   ]

//   const kabadListData = [

//     {
//       id: 1,
//       img: require('@/assets/images/kabad-type-img-1.png'),
//       title: 'Paper',
//       bgColor: "#cdce5a",
//     },

//     {
//       id: 2,
//       img: require('@/assets/images/kabad-type-img-2.png'),
//       title: 'Plastic',
//       bgColor: "#73c395",
//     },

//     {
//       id: 3,
//       img: require('@/assets/images/kabad-type-img-3.png'),
//       title: 'Clothes',
//       bgColor: "#9dbc6e",

//     },

//     {
//       id: 4,
//       img: require('@/assets/images/kabad-type-img-4.png'),
//       title: 'Vehicle',
//       bgColor: "#6abac1",

//     },

//     {
//       id: 5,
//       img: require('@/assets/images/kabad-type-img-5.png'),
//       title: 'Others',
//       bgColor: "#73c395",

//     },

//     {
//       id: 6,
//       img: require('@/assets/images/kabad-type-img-6.png'),
//       title: 'Wood',
//       bgColor: "#daa99e",

//     },

//     {
//       id: 7,
//       img: require('@/assets/images/kabad-type-img-7.png'),
//       title: 'Glass',
//       bgColor: "#48bbc1",

//     },

//     {
//       id: 8,
//       img: require('@/assets/images/kabad-type-img-8.png'),
//       title: 'Metal',
//       bgColor: "#9fdab8",

//     },

//     {
//       id: 9,
//       img: require('@/assets/images/kabad-type-img-9.png'),
//       title: 'E-waste',
//       bgColor: "#9dbc6e",

//     },


//   ]

//   const ImpData = [

//     {
//       id: 1,
//       icon: require('@/assets/images/img-1.png'),
//       textOne: '200',
//       kgText: "kg",
//       text: 'plastic we saved',
//     },

//     {
//       id: 2,
//       icon: require('@/assets/images/img-2.png'),
//       textOne: '40',
//       text: 'tree planted',
//     },


//     {
//       id: 3,
//       icon: require('@/assets/images/img-3.png'),
//       textOne: '1200',
//       kgText: "kg",
//       text: 'CO offset',
//     },


//     {
//       id: 4,
//       icon: require('@/assets/images/img-4.png'),
//       textOne: '469',
//       kgText: "kg",
//       text: 'plastic recycled',
//     },

//     {
//       id: 5,
//       icon: require('@/assets/images/img-5.png'),
//       textOne: '330',
//       text: 'aware climate',
//     },


//     {
//       id: 6,
//       icon: require('@/assets/images/img-6.png'),
//       textOne: '13.8',
//       crText: "cr.",
//       text: 'litres water saved',
//     },


//     {
//       id: 7,
//       icon: require('@/assets/images/img-7.png'),
//       textOne: '5.65',
//       kwhText: "kwh",
//       text: 'plastic recycled',
//     },


//     {
//       id: 8,
//       icon: require('@/assets/images/img-8.png'),
//       textOne: '469',
//       thText: "th.",
//       text: 'plastic recycled',
//     },

//   ]

//   const shopProData = [

//     {
//       id : 1,
//       prodImg : require('@/assets/images/prod-img-1.png'),
//       prodName : 'Hand Sanitizer',
//       prodPrice : 200.00,
//       oldPrice : '30.00',
//       rating : '4.0',
//     },

//     {
//       id : 2,
//       prodImg : require('@/assets/images/prod-img-2.png'),
//       prodName : 'Virgin Olive Oil',
//       prodPrice : 200.00,
//       oldPrice : '30.00',
//       rating : '4.5',
//     },


//     {
//       id : 3,
//       prodImg : require('@/assets/images/prod-img-3.png'),
//       prodName : 'Olive Oil',
//       prodPrice : 180.00,
//       oldPrice : '50.00',
//       rating : '4.2',
//     },


//     {
//       id : 4,
//       prodImg : require('@/assets/images/prod-img-4.png'),
//       prodName : 'Tomato Ketchup',
//       prodPrice : 140.00,
//       oldPrice : '60.00',
//       rating : '3.6',
//     },
    
    
//   ]
  
//   return (

//     <SafeAreaProvider>
//       <ScrollView style={styles.homeComp}>
//         <ImageBackground source={require('@/assets/images/kabadpe-bg.png')} resizeMode="cover"
//           style={styles.bgImage}>
//           <View style={styles.topHomeFlex}>


//             <Text style={styles.kabadText}>
//               Kabadpe
//             </Text>

//             <View style={styles.rightHeaderIcons}>
//               <TouchableOpacity>
//                 <Feather name="search" size={20} color="#fff" />
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.bellBtn}>
//                 <AntDesign name="shoppingcart" size={20} color="#fff" />
//                 <View style={styles.greendot}></View>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.bellBtn}>
//                 <FontAwesome5 name="bell" size={20} color="#fff" />
//                 <View style={styles.reddot}></View>
//               </TouchableOpacity>
//             </View>

//           </View>
//         </ImageBackground>

//         <SafeAreaView style={styles.actAppntMain}>
      
//           <View  style={styles.actApntFlexBx}>
//             <Text style={styles.apntTitle}>
//               Active Appointments
//             </Text>

//             <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
//               <Text style={styles.ViewText}>View All</Text>
//             </TouchableOpacity>

//           </View>

//           <View style={styles.apntDataList}>
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={ApntData}
//               keyExtractor={item => item.id}
//               renderItem={({ item , index}) => <ApntCard item={item} index={index} />}
//             />
//           </View>

//           <View style={styles.kabadTypeLists}>
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={kabadListData}
//               renderItem={({ item }) => <KabadTypeBx kabadItem={item} />}
//               keyExtractor={item => item.id}
//             />
//           </View>

//           <View style={styles.checkRateMain}>

//             <TouchableOpacity style={styles.checkTodTextBx}>
//               <Text style={styles.checkRateText}> Check Today's Rate </Text>

//               <View style={styles.arowBorder}>
//                 <FontAwesome name="angle-right" size={16} color="#57BC24" />
//               </View>
//             </TouchableOpacity>

//             <View style={styles.adervBgBx}>

//               <Image style={styles.adervBgImg} source={require('@/assets/images/check-tod-bg.jpg')}
//               />
//               <View style={styles.overlayImg}></View>

//               <View style={styles.checkTodInfo}>
//                 <Text style={styles.checkTodText}>Schedule Your Appointment
//                 </Text>
//                 <TouchableOpacity style={styles.bookApntBtn}>
//                   <Text style={styles.bookApntText}>
//                     Book Appointment
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//             </View>

//           </View>

//           <View style={[styles.actApntFlexBx, styles.actApntFlexBx2]}>
//             <Text style={styles.apntTitle}>
//               Your Offers
//             </Text>

//             <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
//               <Text style={styles.ViewText}> All Offers</Text>
//             </TouchableOpacity>

//           </View>

//           <View style={[styles.adervBgBx, styles.offerBgBx]}>

//             <Image style={styles.adervBgImg} source={require('@/assets/images/offer-bg.png')}
//             />

//           </View>

//         </SafeAreaView>

//         <View style={styles.bigImpComp}>
//           <View style={styles.headingBx}>
//             <Image style={styles.leafImg} source={require('@/assets/images/leaf-left.png')} />
//             <Text style={styles.headingText}>Big Impact</Text>
//             <Image style={styles.leafImg} source={require('@/assets/images/leaf-right.png')} />

//           </View>

//           <View style={styles.bigImpList}>
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={ImpData}
//               renderItem={({ item }) => <BigimpBx impData={item} />}
//               keyExtractor={item => item.id}
//             />
//           </View>


//         </View>


//         <View style={styles.regCalendarMain}>

//           <View style={[styles.actApntFlexBxx]}>
//             <Text style={styles.apntTitle}>
//               Register with us
//             </Text>


//           </View>

//           <View style={styles.regCalendBx}>

//             <View style={styles.leftcalendinfo}>
//                 <Text style={styles.calendText}>
//                   Be a waste management champion!
//                 </Text>

//                 <TouchableOpacity style={styles.regBusBtn}>
//                   <Text style={styles.BussText}>Register your business</Text>
//                 </TouchableOpacity>
                
//             </View>

//             <Image style={styles.calendImg} source={require('@/assets/images/calendar.png')} />
        
//           </View>
        
//         </View>

//         <View style={styles.shopComp}>

//         <View style={[styles.actApntFlexBx, styles.actApntFlexBx2]}>
//             <Text style={styles.apntTitle}>
//               Shop Now
//             </Text>

//             <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
//               <Text style={styles.ViewText}> All Product</Text>
//             </TouchableOpacity>

//           </View>

//           <View style={styles.shopCardFlex}>
//               <FlatList
//               numColumns={2}
//               data={shopProData}
//               keyExtractor={item => item.id}
//               renderItem={({item , index}) => <ProdCard prodItem={item} index={index} />}
//               columnWrapperStyle={styles.columnWrapper} // Add gap between columns
//               contentContainerStyle={styles.listContent}
//                />
//           </View> 


          
//         </View>
        
//       </ScrollView>
//     </SafeAreaProvider>

//   )
// }

// export default Hero

// const styles = StyleSheet.create({

//   shopCardFlex:{
//     position : 'relative',
//     width : '100%',
//     flex : 1,
//     marginTop : 20,
//   },

//   columnWrapper: {
//     justifyContent: 'space-between', // Ensures spacing between columns
//     marginBottom: 12, // Add spacing between rows
//   },
//   listContent: {
//     paddingLeft : 12,
//     paddingRight : 18,
//   },

//   calendImg:{
//     width : 110,
//     height : 74,
//     objectFit : 'cover',
//   },

//   calendText:{
//     fontSize : 17,
//     fontWeight : '600',
//     maxWidth : wp('60%'),
//     lineHeight : 22,
//     marginBottom: 20,
//   },

//   BussText:{
//     fontSize : 14,
//     fontWeight : '500',
//     color : "#fff",
//   },

//   regBusBtn:{
//     position : 'relative',
//     width : wp('45%'),
//     height : hp('5.5%'),
//     backgroundColor : "#03989E",
//     borderRadius : 5,
//     alignItems: 'center',
//     justifyContent : 'center',
//   },

//   regCalendBx:{
//     position : 'relative',
//     width : '100%',
//     marginTop : 20,
//     backgroundColor : '#EFF7CF',
//     borderRadius : 8,
//     paddingVertical : 18,
//     paddingHorizontal : 16,
//     flexDirection : 'row',
//     alignItems: 'center',
//     justifyContent : 'space-between',

//   },

//   leftcalendinfo:{
//     position : 'relative',
//     width : 'auto',
//   },

//   regCalendarMain: {
//     position: 'relative',
//     width: '100%',
//     marginTop: -8,
//     paddingLeft : 14,
//     paddingRight : 16,


//   },

//   bigImpList: {
//     position: 'relative',
//     width: '100%',
//     paddingLeft: 18,
//     paddingRight: 6,
//   },

//   headingText: {
//     fontSize: 18,
//     color: "#026874",
//     fontWeight: "600",
//   },

//   bigImpComp: {
//     position: 'relative',
//     width: '100%',
//   },

//   leafImg: {
//     width: 34,
//     height: 34,
//     objectFit: "cover",
//   },

//   headingBx: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     gap: 6,
//     marginBottom: 20,
//     paddingHorizontal: 18,


//   },

//   offerBgBx: {
//     position: 'relative',
//     height: 190,
//     paddingLeft: 14,
//     paddingRight: 18,
//     paddingBottom: 20,
//     marginTop: 15,
//   },

//   checkTodInfo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 14,
//     zIndex: 10,
//   },

//   actApntFlexBx2: {
//     marginTop: 25,
//   },

//   bookApntText: {
//     fontSize: 14,
//     fontWeight: '500',
//     textAlign: 'center',
//     color: "#fff",
//   },

//   bookApntBtn: {
//     position: 'relative',
//     width: 160,
//     paddingVertical: 10,
//     backgroundColor: "#03989E",
//     borderRadius: 8,
//   },

//   checkTodText: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: '500',
//   },

//   adervBgBx: {
//     position: 'relative',
//     width: '100%',
//     height: 140,
//     marginTop: 10,
//     zIndex: 10,

//   },

//   overlayImg: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: "#0d0d0d",
//     opacity: 0.5,
//     borderRadius: 16,
//     zIndex: 1,

//   },

//   adervBgImg: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     borderRadius: 16,


//   },

//   checkRateText: {
//     fontSize: 15,
//     color: "#57BC24",
//     fontWeight: '500',
//   },

//   arowBorder: {
//     position: 'relative',
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderRadius: 20,
//     borderColor: "#57BC24",
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   checkTodTextBx: {
//     position: 'relative',
//     marginLeft: 'auto',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 5,
//   },

//   checkRateMain: {
//     position: 'relative',
//     width: '100%',
//     marginTop: 30,
//     paddingLeft: 14,
//     paddingRight: 18,
//   },

//   kabadTypeLists: {
//     position: 'relative',
//     width: '100%',
//     marginTop: 20,
//     paddingLeft: 18,
//     paddingRight: 4,
//   },

//   apntDataList: {
//     position: 'relative',
//     width: '100%',
//     marginTop: 15,
//     paddingLeft: 18,
//     paddingRight: 6,
//   },

//   viewApntBtn: {
//     position: 'relative',
//     width: 75,
//     height: 30,
//     backgroundColor: "#026874",
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',

//   },

//   ViewText: {
//     fontSize: 13,
//     color: "#fff",
//   },

//   apntTitle: {
//     fontSize: 17,
//     color: "#3C3C3C",
//     fontWeight: "600",
//   },

//   actAppntMain: {
//     position: 'relative',
//     width: '100%',

//   },

//   actApntFlexBx: {
//     position: 'relative',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     paddingHorizontal: 18,

//   },

//   kabadText: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: '600',
//     letterSpacing: .67,
//   },

//   homeComp: {
//     position: 'relative',
//     width: '100%',
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   topHomeFlex: {
//     position: 'relative',
//     top: 20,
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 18,

//   },

//   bgImage: {
//     width: '100%',
//     height: hp('17.5%'),
//     // height : 130
//   },

//   rightHeaderIcons: {
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 13,
//   },
//   greendot: {
//     position: "absolute",
//     top: 2,
//     right: 1,
//     width: 5,
//     height: 5,
//     backgroundColor: "#57BC24",
//     borderRadius: 50,
//   },

//   reddot: {
//     position: "absolute",
//     top: 2,
//     right: 2,
//     width: 5,
//     height: 5,
//     backgroundColor: "red",
//     borderRadius: 50,
//   },

//   bellBtn: {
//     position: "relative",
//   },
// })