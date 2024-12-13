import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CarouselSlider from '../Components/CarouselSlider';
import ShopProdCard from '../Components/ShopProdCard';
import { ShopDataOne } from '../Components/ShopProdData';
import { ShopDataTwo } from '../Components/ShopProdData';
import { ShopDataThree } from '../Components/ShopProdData';
import { ShopDataFour } from '../Components/ShopProdData';


const Shop = () => {
  const router  =  useRouter();

  const handleBackNavigate = () => {
      router.back();
  }

  const shopCateg = [

    {
      id : 1,
      img : require('../../assets/images/shop-type-1.png'),
      title : 'Beauty',
      bg : '#AEF48B',
    },

    {
      id : 2,
      img : require('../../assets/images/shop-type-2.png'),
      title : 'Food',
      bg : '#E5F48B',

    },

    {
      id : 3,
      img : require('../../assets/images/shop-type-3.png'),
      title : 'Living',
      bg : '#F2DD91',

    },

    {
      id : 4,
      img : require('../../assets/images/shop-type-4.png'),
      title : 'Style',
      bg : '#B1F4C8',

    },

    {
      id : 5,
      img : require('../../assets/images/shop-type-5.png'),
      title : 'Wellness',
      bg : '#F4F2BB',

    },
    
  ]
  
  return (
    <>
       <SafeAreaView style={styles.editprofileTopBx}>
    <ImageBackground style={styles.profTopBg} source={require('../../assets/images/prifBannerTop.png')} resizeMode='cover'> 
    </ImageBackground>
    <TouchableOpacity onPress={() => handleBackNavigate()} activeOpacity={0.7} style={styles.editprofleftTextBx} >
        <View style={styles.angleBx}>
    <FontAwesome name="angle-left" size={14} color="#fff" style={{paddingRight :2}} />
    </View>

    <Image style={styles.logo} source={require('../../assets/images/white-log.png')} />
    
    <Text style={styles.editProfText}>Green Saman Shop</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.bellBtn}>
                <AntDesign name="shoppingcart" size={20} color="#fff" />
                <View style={styles.greendot}></View>
              </TouchableOpacity>
    
</SafeAreaView>

    <SafeAreaProvider>
      <ScrollView style={styles.shopComp}>

        <View style={styles.searchShopBx}>
          <View style={styles.searchBx}>
          <AntDesign name="search1" size={20} color="#34e6ed" />
          <TextInput style={styles.searchColor} placeholder='Search Products' placeholderTextColor={"gray"} />
          </View>

          <TouchableOpacity activeOpacity={0.5} style={styles.filterBtn}>
            <Image style={styles.filterImg} source={require('../../assets/images/filter.png')} />
          </TouchableOpacity>
          
        </View>

        <SafeAreaView style={styles.shopCategLists}>
          <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={shopCateg}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={0.6} key={item.id} style={styles.categBtnBx}>
              <View style={[styles.categImgBx , {backgroundColor : item.bg}]} >
              <Image style={styles.categIcon} source={item.img} />
              </View>
              <Text style={styles.categText}> {item.title} </Text>
            </TouchableOpacity>
          )}
          />
        </SafeAreaView>

          <CarouselSlider />

          <SafeAreaView style={styles.shopProdSliderBx}>
          <View style={[styles.actApntFlexBx, styles.actApntFlexBx2]}>
            <Text style={styles.apntTitle}>
              Fragrance
            </Text>

            <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
              <Text style={styles.ViewText}> View All</Text>
            </TouchableOpacity>

          </View>

          <ShopProdCard data={ShopDataOne} />
          
          </SafeAreaView>


          <SafeAreaView style={styles.shopProdSliderBx}>
          <View style={[styles.actApntFlexBx, styles.actApntFlexBx2]}>
            <Text style={styles.apntTitle}>
              Food
            </Text>

            <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
              <Text style={styles.ViewText}> View All</Text>
            </TouchableOpacity>

          </View>
          
          <ShopProdCard data={ShopDataTwo} />
          
          </SafeAreaView>

          <View style={styles.advertiseBx}>
            <ImageBackground style={styles.advertiseBgImg} source={require('../../assets/images/alovera-bg.png')} resizeMode='cover'></ImageBackground>
          </View>

          <SafeAreaView style={styles.shopProdSliderBx}>
          <View style={[styles.actApntFlexBx, styles.actApntFlexBx2]}>
            <Text style={styles.apntTitle}>
              Home Essentials
            </Text>

            <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
              <Text style={styles.ViewText}> View All</Text>
            </TouchableOpacity>

          </View>

          <ShopProdCard data={ShopDataThree} />
          
          </SafeAreaView>

          <SafeAreaView style={[styles.shopProdSliderBx , {marginBottom : 110  }]}>
          <View style={[styles.actApntFlexBx, styles.actApntFlexBx2]}>
            <Text style={styles.apntTitle}>
              Decor
            </Text>

            <TouchableOpacity activeOpacity={0.67} style={styles.viewApntBtn}>
              <Text style={styles.ViewText}> View All</Text>
            </TouchableOpacity>

          </View>

          <ShopProdCard data={ShopDataFour} />
          
          </SafeAreaView>

      </ScrollView>
    </SafeAreaProvider>

    </>
    
  )
}

export default Shop

const styles = StyleSheet.create({


  advertiseBx:{
    position : 'relative',
    marginTop : 22,
    marginHorizontal : 18,
    height : 150,
    borderRadius : 12,

  },

  advertiseBgImg:{
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
    objectFit : 'cover',
    borderRadius : 12,
  },

  shopProdSliderBx:{
    position : 'relative',
    width : '100%',
    marginTop : 20,
  },

  viewApntBtn: {
    position: 'relative',
    width: 70,
    height: 30,
    backgroundColor: "#57BC24",
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',

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
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 18,

  },

  categBtnBx:{
    position : 'relative',
    width : 65,
    marginRight : 12,
  },

  categText:{
    fontSize : 14,
    color : "#026874",
    marginTop : 6,
    textAlign : 'center',
    fontWeight : '400',
  },

  categIcon:{
    width : 40,
    height : 40,
    objectFit : "cover",
  },

  categImgBx:{
    position : 'relative',
    width : '100%',
    height : 65,
    borderRadius : 50,
    alignItems:'center',
    justifyContent : 'center',
  },

  shopCategLists:{
    position : 'relative',
    width : '100%',
    marginTop : 20,
    paddingLeft : 18,
    paddingRight : 6,
  },

  searchColor:{
    fontSize : 14,
    color : "#026874"
  },

  filterImg:{
    width : 20,
    height : 20,
    objectFit : 'cover',
  },

  searchBx:{
    position : 'relative',
    width : '80%',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap : 12,
    backgroundColor : "#fff",
    borderWidth : 1,
    borderColor : "#d9d9d9",
    borderRadius : 6,
    height :41,
    paddingHorizontal : 18,
  },

  filterBtn:{
    position : 'relative',
    width : '15%',
    height : 40,
    backgroundColor : "#026874",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius : 8,
  },

  searchShopBx:{
    position : 'relative',
    width : '100%',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  paddingHorizontal : 18,

  },

  shopComp:{
    position: 'relative',
    width : '100%',
  paddingTop : 20,
  flex : 1,
  },

  greendot: {
    position: "absolute",
    top: 9,
    right: 8,
    width: 5,
    height: 5,
    backgroundColor: "#57BC24",
    borderRadius: 50,
  },

  bellBtn: {
    position: "absolute",
    top  : '65%',
    right : 20,
    width : 38,
    height : 38,
    backgroundColor : "#025963",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius : 50,
    
  },

  logo:{
    width : 36,
    height : 36,
    objectFit : 'cover',
    marginLeft : 6,
    marginRight : 5,
  },

  editprofleftTextBx:{
    position : 'relative',
    paddingHorizontal : 20,
    height : '100%',
    justifyContent : 'flex-start',
    flexDirection : 'row',
    alignItems: 'center',
    gap : 8,
    marginTop : 6,
},

editProfText:{
fontSize : 14,
color : "#fff",
},

angleBx:{
position : 'relative',
width : 17,
height : 17,
borderWidth : 1,
borderColor : "#fff",
borderRadius : 40,
alignItems: 'center',
justifyContent : 'center',
},

editprofileTopBx:{
position : 'relative',
width : '100%',
height : 110,
backgroundColor : "#026874",
overflow : 'hidden',
},

profTopBg:{
position : 'absolute',
top : 0,
left : 0,
width : '100%',
height : '100%',
objectFit : 'cover',
},

  
})