import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ApntCard from './Components/ApntCard'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const ApntList = () => {
    const router =  useRouter();
    const handleBackNavigate = () => {
        router.back();
    }
    const ApntData = [
        
        {
            id: 1,
            image: require('@/assets/images/user-img.png'),
            nameTitle: 'Kabadi Name',
            name: 'Rajesh Verma',
            date: '10-May-2024, 8 Am - 10 Pm'
        },

        {
            id: 2,
            image: require('@/assets/images/user-img.png'),
            nameTitle: 'Kabadi Name',
            name: 'Rahul Verma',
            date: '15-Jul-2024, 8 Am - 10 Pm'
        },


        {
            id: 3,
            image: require('@/assets/images/user-img.png'),
            nameTitle: 'Kabadi Name',
            name: 'Ankit Desai',
            date: '20-May-2024, 8 Am - 10 Pm'
        },


        {
            id: 4,
            image: require('@/assets/images/user-img.png'),
            nameTitle: 'Kabadi Name',
            name: 'Pankaj Tripati',
            date: '05-June-2024, 8 Am - 10 Pm'
        },



        {
            id: 5,
            image: require('@/assets/images/user-img.png'),
            nameTitle: 'Kabadi Name',
            name: 'Rohan Mishra',
            date: '24-May-2024, 8 Am - 10 Pm'
        },


    ]

    return (

        <>

<SafeAreaView style={styles.editprofileTopBx}>
        <ImageBackground style={styles.profTopBg} source={require('../assets/images/prifBannerTop.png')} resizeMode='cover'> 
        </ImageBackground>
        <TouchableOpacity onPress={() => handleBackNavigate()} activeOpacity={0.7} style={styles.editprofleftTextBx} >
            <View style={styles.angleBx}>
        <FontAwesome name="angle-left" size={14} color="#fff" style={{paddingRight :2}} />
        </View>
        <Text style={styles.editProfText}>Appointments</Text>
        </TouchableOpacity>
    </SafeAreaView>

            <SafeAreaProvider style={styles.kabadListMain}>
                <View style={styles.actApntFlexBx}>
                    <Text style={styles.apntTitle}>
                        All Appointments
                    </Text>


                </View>

                <View style={styles.apntDataList}>
                    <FlatList
                        data={ApntData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => <ApntCard bgColor="#eff7cf" item={item} index={index} />}
                    />
                </View>
            </SafeAreaProvider>
        </>
    )
}

export default ApntList

const styles = StyleSheet.create({

    editprofleftTextBx:{
        position : 'relative',
        paddingHorizontal : 20,
        height : '100%',
        justifyContent : 'flex-start',
        flexDirection : 'row',
        alignItems: 'center',
        gap : 8,
        marginTop : 10,
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
    height : 80,
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

    kabadListMain:{
        position : 'relative',
        width : '100%',
        marginTop : 25,
    },

    viewApntBtn: {
        position: 'relative',
        width: 80,
        height: 30,
        backgroundColor: "#026874",
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
        marginBottom : 10,

    },

    apntDataList: {
        position: 'relative',
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 18,
    },

})