import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
const AddressScreen = () => {
    const [locMark , setLocMark] = useState('home-filled');
    const [fullName , setFullName] = useState('Suni Sharma');
    const router  =  useRouter();

    const LocMark = [
        {
            id :1,
            icon : "home-filled",
            text : "Home",
        },
        {
            id :2,
            icon : "work",
            text : "Work",
        },
        {
            id :3,
            icon : "home-work",
            text : "My Place",
        },
        {
            id :4,
            icon : "other-houses",
            text : "Other",
        },
    ] 

    const handleBackNavigate =() => {
        router.back();
    }
    
  return (

    <SafeAreaProvider>

<SafeAreaView style={styles.editprofileTopBx}>
        <ImageBackground style={styles.profTopBg} source={require('../assets/images/prifBannerTop.png')} resizeMode='cover'> 
        </ImageBackground>
        <TouchableOpacity onPress={() => handleBackNavigate()} activeOpacity={0.7} style={styles.editprofleftTextBx} >
            <View style={styles.angleBx}>
        <FontAwesome name="angle-left" size={14} color="#fff" style={{paddingRight :2}} />
        </View>
        <Text style={styles.editProfText}>Edit Profile</Text>
        </TouchableOpacity>
    </SafeAreaView>
        
        <View style={styles.AddressPage}>
            <ImageBackground style={styles.addrsbg} source={require('../assets/images/profileEdit-Bg.png')} resizeMode='cover'></ImageBackground>

        <View style={styles.addressComp}>

            <View style={styles.chooseAddressLocatList}>

                <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={LocMark}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => setLocMark(item.icon)} style={[styles.addresLocatBtn , {backgroundColor : locMark === item.icon ? "#cffdff" : "transparent" , borderColor : locMark === item.icon ? "#026874" : "#898f8b"}]} key={item.id}>
                    <MaterialIcons name={item.icon} size={18} style={{color : locMark === item.icon ? "#026874" : "#5c5c5c"}} />
                        <Text style={[styles.locateText , {color : locMark === item.icon ? "#026874" : "#5c5c5c" }]}> {item.text} </Text>
                    </TouchableOpacity>
                )}
                />
                
                
                
            </View>


            <SafeAreaView style={styles.userProfForm}>

            <View style={styles.userInptBx}>
            <Text style={styles.labelText}>Name</Text>
            <TextInput style={styles.inptBx}
            value={fullName}
            onChange={(text) => setFullName(text)}
          placeholder="Enter Name" placeholderTextColor="#7b7b7b" />
            </View>

            <View style={styles.userInptBx}>
            <Text style={styles.labelText}>Complete Address</Text>
            <TextInput style={styles.inptBx}
          placeholder="Address" placeholderTextColor="#7b7b7b" />
            </View>


            <View style={styles.userInptBx}>
            <Text style={styles.labelText}>Landmark</Text>
            <TextInput style={styles.inptBx}
          placeholder="Enter Landmark" placeholderTextColor="#7b7b7b" />
            </View>

            <View style={styles.userInptBx}>
            <Text style={styles.labelText}>Floor</Text>
            <TextInput style={styles.inptBx}
          placeholder="Enter Floor" placeholderTextColor="#7b7b7b" />
            </View>

            </SafeAreaView>

        
            <View style={styles.addsubmitbtn}>
            <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Submit</Text>
              </TouchableOpacity>
              </View>
        </View>

     
        </View>
        
    </SafeAreaProvider>
   
  )
}

export default AddressScreen

const styles = StyleSheet.create({

    saveBtnText:{
        fontSize : 15,
        color : "#fff",
        fontWeight : '500',
        letterSpacing : .3,
        
    },
    
  
    addsubmitbtn:{
        position : 'absolute',
        bottom : 16,
        left: 0,
        width : '100%',
    },

    saveBtn:{
        position : 'relative',
        marginHorizontal : 18,
        height : 50,
        backgroundColor : "#03acc0",
        borderRadius : 12,
        alignItems : 'center',
        justifyContent : 'center',
    },

    inptBx:{
        width : '100%',
        height : 45,
        borderWidth : .5,
        borderColor : "#026874",
        paddingHorizontal : 12,
        borderRadius : 8,
        fontSize : 13.5,
        fontWeight : '500',
        color : "#026874",
    },

    userInptBx:{
        position : 'relative',
        width : '100%',
        gap : 8,
        marginBottom: 14,

    },

    labelText:{
        fontSize : 13,
        color : "#8f898b",
      },

    userProfForm:{
        position : 'relative',
        marginTop : 20,
        paddingHorizontal : 18,
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
    
    addressComp:{
        position : 'relative',
        width : '100%',
        flex : 2,
    },

    chooseAddressLocatList:{
        position : 'relative',
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        gap : 10,
        paddingTop : 20,
        paddingLeft : 18,
        paddingRight : 6,

    },

    addresLocatBtn:{
        position : 'relative',
        width : 'auto',
        paddingHorizontal : 14,
        height : 30,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1.4,
        borderColor : "#898f8b",
        borderRadius : 4,
        gap : 5,
        marginRight : 12,
    },

    locateText:{
        fontSize : 13,
        fontWeight : '500',
        color : "#5c5c5c"
    },
    
    AddressPage:{
        position : 'relative',
        width : '100%',
        flex : 1,
        

    },

    addrsbg:{
        position : 'absolute',
        top : 0,
        left : 0,
        width: '100%',
        height : '100%',
        objectFit : 'cover'
    },
})