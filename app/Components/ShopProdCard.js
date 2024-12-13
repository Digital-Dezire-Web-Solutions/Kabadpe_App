import {FlatList, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';

const ShopProdCard = ({data}) => {
    const [isHeartActive , setIsHeartActive] = useState(false);

  return (
   <>
         <View style={styles.shopCardFlex}>
              <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item , index}) => (
                <View style={styles.prodCardBx}>
                <View style={styles.prodImgBx}>
                    <Image style={styles.prodImg} source={item.prodImg} />
        
                </View>
        
                <View style={styles.prodDet}>
                    <Text style={styles.prodName}> {item.prodName.slice(0,20) + "..."} </Text>
        
                    <View style={styles.prodDetPriceFlex}>
                        <View style={styles.prodPriceFlex}>
                            <Text style={styles.prodPriceText}> ₹ {item.prodPrice}.00 </Text>
                            <Text style={styles.prodPriceOld}> ₹ {item.oldPrice} </Text>
        
                        </View>
        
                        <View style={styles.ratBx}>
                        <AntDesign name="star" size={10} color="#fff" />
                            <Text style={styles.ratingText}> {item.rating  } </Text>
                        </View>
                        
                    </View>
        
                    
        
                </View>
        
                <View style={styles.prodBuyWishListFlex}>
        
                        <TouchableOpacity activeOpacity={0.5} style={styles.prodBuyBtn}>
                            <Text style={styles.buyText}>Buy Now</Text>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setIsHeartActive(!isHeartActive)} activeOpacity={0.6} style={[styles.heartBtn , {backgroundColor : isHeartActive ? "#026874" : 'transparent'}]}>
                        <AntDesign name="hearto" size={16} color={isHeartActive ? "#fff" : "#026874"} />
                        </TouchableOpacity>
                            
                    </View>
        
            </View>
              )}
        
               />
          </View> 
   </>
  )
}

export default ShopProdCard

const styles = StyleSheet.create({

 

    shopCardFlex:{
        position : 'relative',
        width : '100%',
        flex : 1,
        marginTop : 20,
        paddingLeft : 18,
        paddingRight : 6,
      },

    heartBtn:{
        position : 'relative',
        width : '25%',
        borderWidth : 1.5,
        height : 33,
        borderColor : "#026874",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 6,
    },

    prodBuyWishListFlex:{
        position : 'relative',
        width : '100%',
        marginTop : 22,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        gap : 6,
        paddingBottom : 5,
    },

    buyText:{
        color : "#fff",
        fontWeight : '500',
        fontSize : 14,
        letterSpacing : .3,
    },

    prodBuyBtn:{
        position : 'relative',
        width : '70%',
        height : 33,
        backgroundColor : "#026874",
        borderRadius : 6,
        alignItems: 'center',
        justifyContent : 'center',
    },

    ratingText:{
        fontSize : 10,
        color : "#fff",
        fontWeight : '500',
    },

    ratBx:{
        position : 'relative',
        alignItems: 'center',
        justifyContent : 'center',
        flexDirection : 'row',
        backgroundColor : "#57BC24",
        borderRadius : 20,
        paddingHorizontal : 6,
        paddingVertical : 1.5,
    },

    prodPriceText:{
        fontSize : 12,
        fontWeight : '500',
        color : "#0d0d0d",
    },

    prodPriceOld:{
        fontSize : 11,
        fontWeight : '500',
        color : "#7c7c7c",
        textDecorationLine : 'line-through',
    },
    
    prodDet:{
        position : 'relative',
        width : '100%',
        paddingTop : 8,
    },

    prodPriceFlex:{
        alignItems : 'center',
        justifyContent : 'flex-start',
        gap : 0,
        flexDirection : 'row',
    },

    prodDetPriceFlex:{
        position : 'relative',
        width : '100%',
        justifyContent : 'space-between',
        alignItems: 'center',
        flexDirection : 'row',
    },

    prodName:{
        textAlign : 'center',
        fontSize : 15,
        fontWeight : '600',
        color : "#026874",
        paddingBottom : 6,
    },

    prodCardBx:{
        position : 'relative',
        width : wp('44.2%') ,
        backgroundColor : "#E5F7F4",
        borderRadius : 10,
        padding : 10,
        marginRight : 12,

    },

    prodImg:{
        width : '100%',
        height : '100%' ,
        objectFit : 'cover',
        borderRadius : 10,

    },

    prodImgBx:{
        position : 'relative',
        width : '100%',
        height : hp('14%'),
        backgroundColor :"#fff",
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,

    },
    
})