import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useRouter } from "expo-router";


const Profile = () => {
  const router =  useRouter();

  const RedirectPage = () => {
    router.navigate("ProfileEdit")
  }
  
  return (

      <SafeAreaView style={styles.profileMain}>
        <View style={styles.profileBanner}>
          <ImageBackground style={styles.bgImageProfile} source={require('../assets/images/Mask-group.png')} resizeMode='cover'></ImageBackground>

          
          
        </View>
        <View style={styles.profileImgBx}>
            <Image style={styles.profImg} source={require('../assets/images/profile-img.png')} />
          </View>

          <SafeAreaProvider>  
            <ScrollView style={styles.userProfileSec}>

              <View style={styles.userProfileInfoData}>

                <View style={styles.userProfInfoBx}>
                <Text style={styles.labelText}>Name</Text>
                <Text style={styles.userDetText}>Sunil Sharma</Text>
                </View>

                <View style={styles.userProfInfoBx}>
                <Text style={styles.labelText}>Email</Text>
                <Text style={styles.userDetText}>sunilsharma@gmail.com</Text>
                </View>

                <View style={styles.userProfInfoBx}>
                <Text style={styles.labelText}>Phone</Text>
                <Text style={styles.userDetText}>+91 9876543210</Text>
                </View>

                <View style={styles.userProfInfoBx}>
                <Text style={styles.labelText}>Gender</Text>
                <Text style={styles.userDetText}>Male</Text>
                </View>


                <View style={styles.userProfInfoBx}>
                <Text style={styles.labelText}>Date of Birth</Text>
                <Text style={styles.userDetText}>10/4/2001</Text>
                </View>

                <View style={styles.userProfInfoBx}>
                <Text style={styles.labelText}>Address</Text>
                <Text style={styles.userDetText}>Near Civil lines Metro Station, Jaipur</Text>
                </View>

                
      
              </View>

              <TouchableOpacity style={styles.editProfBtn} activeOpacity={0.4} onPress={() => RedirectPage()}>
                <Text style={styles.editprofText}>Edit Profile</Text>
              </TouchableOpacity>
        
            </ScrollView>
          </SafeAreaProvider>

     
        
      </SafeAreaView>
   
  )
}



export default Profile

const styles = StyleSheet.create({

  editProfBtn:{
    position : 'relative',
    marginTop : 15,
    marginBottom : 30,
    width : 120,
    backgroundColor : '#066D71',
    paddingVertical : 12,
    borderRadius : 20,
    marginHorizontal : 'auto',
  },

  editprofText:{
    textAlign : 'center',
    fontSize : 14,
    color : "#fff",
    letterSpacing : .3,
  },
  
  userProfInfoBx:{
    position : 'relative',
    width : '100%',
    gap : 6,
    marginBottom : 20,
  },

  userDetText:{
    fontSize : 15,
    paddingBottom : 7,
    color : "#026874",
    fontWeight : '500',
    borderBottomWidth : 1,
    borderBottomColor : "#8f898b"
  },

  labelText:{
    fontSize : 13,
    color : "#8f898b",
  },

  userProfileInfoData:{
    position : 'relative',
    width : '100%',
    paddingTop : 24,
    paddingHorizontal : 18,
  },

  userProfileSec:{
    position : 'relative',
    flex : 1,
    width : '100%',
    marginBottom: 70,
  },

  profileImgBx:{
    position : 'relative',
    marginTop : -55,
    width : 100,
    marginHorizontal : 'auto'
  },

  profImg:{
    width : '90%',
    height : 90,
    objectFit : 'cover',
  },

  bgImageProfile:{
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
  },

  profileMain:{
    position : 'relative',
    width : '100%',
    flex : 1,
  },

  profileBanner:{
    position : 'relative',
    width : '100%',
    height : 200,
    backgroundColor : "#066D71",
    borderBottomRightRadius : 120,
    overflow : 'hidden',
  },
  
})