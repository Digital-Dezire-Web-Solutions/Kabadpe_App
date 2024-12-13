import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

const CarouselSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const carouselRef = useRef(null); // Ref for the Carousel
  // Sample image data
  const images = [
    require('../../assets/images/slider-1.jpg'),
    require('../../assets/images/slider-2.jpg'),
    require('../../assets/images/slider-3.jpg'),
    require('../../assets/images/slider-4.jpg'),



  ];

  const handleDotPress = (index) => {
    setCurrentIndex(index); // Update the active dot
    setIsAutoPlayPaused(true); // Pause autoplay
    carouselRef.current.scrollTo({ index, animated: true }); // Navigate to the clicked dot

    setTimeout(() => {
      setIsAutoPlayPaused(false);
    }, 3000); // Adjust delay as needed (matches autoplay interval)
    
  };

  const handleSnapToItem = (index) => {
    setCurrentIndex(index);
  };
  
  return (
  <>
    <View style={styles.ShopImageSliderComp}>
    <Carousel
        ref={carouselRef}
      loop
      autoPlay={!isAutoPlayPaused} // Control autoplay
      autoPlayInterval={5000}
      width={width}
      height={width * 0.6} // Adjust the height as needed
      data={images}
      scrollAnimationDuration={800}
      onSnapToItem={handleSnapToItem}
      renderItem={({ item }) => (
        <View style={styles.ShopSliderImgBx}>
        <Image source={item} style={styles.image} />
        </View>
      )}
      onTouchStart={() => setIsAutoPlayPaused(true)} 
      style={styles.carousel} 
    />
    {/* Dot Navigation */}
    <View style={styles.dotContainer}>
      {images.map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleDotPress(index)}
          style={[
            styles.dot,
            currentIndex === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  </View>
  </>
  )
}

export default CarouselSlider

const styles = StyleSheet.create({

  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 20,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#026874',
  },

  ShopSliderImgBx:{
    position : 'relative',
    width : width - 40,
    height : 180,
    alignSelf : 'center',
    borderRadius : 8,

  },

  ShopImageSliderComp:{
    position : 'relative',
    width : '100%',
    marginTop : 25,
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center'
  },

  // carousel:{
  //   marginHorizontal : 18,

  // },

  image:{
    width : '100%',
    height : '100%',
    objectFit : 'cover',
    borderRadius : 8,
  },
  
})
