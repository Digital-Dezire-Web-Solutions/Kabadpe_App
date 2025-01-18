import { Alert, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import WasteColectorType from '../Components/WasteColectorType'
import ChooseWeight from '../Components/ChooseWeight'
import { Calendar } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ReactNativeModal from 'react-native-modal'
import AddressChooseModal from '../Components/AddressChooseModal'
import { useRouter } from 'expo-router'
const Appointment = () => {
  const [step, setStep] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [dateBox, setDateBox] = useState('');
  const [selectedTodayDate, setSelectedTodayDate] = useState(null);
  const [modal , setModal] = useState(false);
  const router  = useRouter();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  const companies = [
    {id : 1, img : require('../../assets/images/kabadpe-logo.jpg'), name :  'KabadPe'},
    {id : 2, img : require('../../assets/images/cmp-4.jpg'), name :  'Extra Frames'},
    {id : 3, img : require('../../assets/images/kabadpe-logo.jpg'), name :  'KabadPe'},
    

    ];

  const slots = [
    {
      id : 1,
      time : '8:00 AM - 10:00 AM',
      
    },
    {
      id : 2,
      time : '10:00 AM - 12:00 PM',
      
    },
    {
      id : 3,
      time : '12:00 PM - 3:00 PM',
      
    },
    {
      id : 4,
      time : '3:00 PM - 5:00 PM',
      
    },
    {
      id : 5,
      time : '5:00 PM - 7:00 PM',
      
    },
    {
      id : 6,
      time : '7:00 PM - 9:00 PM',
      
    },
  ]

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setSelectedTodayDate(date.dateString);
    setStep(2);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1); // Go to the previous step
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setStep(3);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setDateBox(`${selectedDate} , ${slot} `);
    setModalVisible(false);
    Alert.alert('Success', `Added to Date Box: ${dateBox}`);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
                <View style={styles.choseCompanyTextBx}>
                <Text style={styles.AvailCompText}>Choose Appointment Date</Text>
              </View>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [today]: { selected: true, selectedColor: '#026874' },
              ...(selectedDate && {
                [selectedDate]: { selected: true, selectedColor: '#2196F3' }, // Highlight the selected date
              }),   
             }}
            theme={{
              backgroundColor: '#F3F4F6',
              calendarBackground: '#F9FAFB',
              textSectionTitleColor: '#03acc0',
              selectedDayBackgroundColor: '#026874',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#026874',
              dayTextColor: '#111827',
              textDisabledColor: '#D1D5DB',
              arrowColor: '#03acc0',
              monthTextColor: '#026874',
              indicatorColor: '#1E3A8A',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
          </View>
        );
      case 2:
        return (
          
             <View style={styles.chooseCompanyBx}>
              <View style={styles.choseCompanyTextBx}>
                <Text style={styles.AvailCompText}>Avaiable Companies</Text>
              </View>
              <SafeAreaProvider>

              <ScrollView style={styles.CompaniesList}  showsVerticalScrollIndicator={false}> 

                  <FlatList
                  data={companies}
                  renderItem={({item}) => (
                    <View style={styles.companyBx} key={item.id}>
                        <View style={styles.compLeftBx}>
                          <Image style={styles.compImg} source={item.img} />
                      <Text style={styles.nameText}> {item.name} </Text>
                        </View>

                        <TouchableOpacity style={styles.selectBtn} onPress={() => handleCompanySelect(item.name)}>
                          <Text style={styles.selText}>Select</Text>
                        </TouchableOpacity>
                        
                    </View>
                  )}
                  keyExtractor={item => item.id}

                   />
            
              </ScrollView>
              </SafeAreaProvider>
          
             </View>
        );
      case 3:
        return (
          <View style={[styles.chooseCompanyBx , styles.chooseSlotsBx]}>
          <View style={styles.choseCompanyTextBx}>
            <Text style={styles.AvailCompText}>Avaiable Slots</Text>
          </View>

          <SafeAreaProvider>
          <View style={[styles.CompaniesList , styles.slotsList]} showsVerticalScrollIndicator={false}>

          <FlatList 
          data={slots}
          renderItem={({item}) => (
              <View style={styles.slotBx} key={item.id}>
                <View style={styles.slotDateFlex}>
                  <View style={styles.slotsDate}>
                  <AntDesign name="calendar" size={16} color="#898f8b" />
                  <Text style={styles.timeText}> {item.time} </Text>
                  </View>
                  <Text style={styles.slotsAvaiText}>15 slots available</Text>
                </View>
              <TouchableOpacity style={styles.bookApntBtn} onPress={() => handleSlotSelect(item.time)}>
                <Text style={styles.bookApntBtnText}>Book Appointment</Text>
              </TouchableOpacity>
              </View>
          )}
          keyExtractor={item => item.id}

          />
          </View>
          </SafeAreaProvider>
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
   <>
   <SafeAreaProvider>
    <ScrollView style={styles.apntComp}>

      <ImageBackground style={styles.apntBg} source={require('../../assets/images/appnt-bg.png')} resizeMode='cover'></ImageBackground>

      <SafeAreaView style={styles.schedAppntMain}>
          <View style={styles.schedAppntBx}>
        <Text style={styles.schedApntText}>Schedule Your Appointment </Text>

        <View style={styles.schedApntForm}>

        <View style={styles.userInptBx}>
            <Text style={styles.labelText}>Name</Text>
            <TextInput style={styles.inptBx}
          placeholder="Enter Name" placeholderTextColor="#7b7b7b" />
            </View>

            <View style={styles.userInptBx}>
            <Text style={styles.labelText}>Mobile Number</Text>
            <TextInput style={styles.inptBx}
          placeholder="Enter Mobile Number" placeholderTextColor="#7b7b7b" />
            </View>

            <TouchableOpacity activeOpacity={0.6} onPress={() => router.navigate("MapScreen")}>
                <Text style={styles.addrssBtnText}> + Add Address</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModal(true)} style={styles.addrssBtnBx}>
                <View style={styles.addBtnFlex}>
                <FontAwesome6 name="location-dot" size={12} color="#026874" />
                <Text style={styles.placeText}>My Place</Text>
                </View>
                <Text style={styles.addrsText}>Near Civil lines Metro Station, Jaipur</Text>

                <FontAwesome name="angle-right" size={18} style={styles.arrowRight} color="8c8c8c" />
              </TouchableOpacity>

            <WasteColectorType />
            <ChooseWeight/>

            <View style={styles.userInptBx}>
            <Text style={styles.labelText}>Date and Time</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.6} style={styles.calendDateBtn}>

            <TextInput style={styles.inptBx}
            value={dateBox}
          editable={false}
          placeholder="Select Your Date and Time" placeholderTextColor="#7b7b7b" />

<AntDesign name="calendar" size={18} style={styles.calednIcon} color="#898f8b" />
</TouchableOpacity>

            </View>
      
      
            <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Submit</Text>
              </TouchableOpacity>

              <ReactNativeModal isVisible={isModalVisible} animationIn="fadeInUp" 
               onBackButtonPress={() => setModalVisible(false)}
               onBackdropPress={() => setModalVisible(false)}
               >
                  <View style={styles.modal}>
          {renderStep()}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <AntDesign name="closecircle" size={22} color="#fff" />
          </TouchableOpacity>

          {step > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={goBack}>
<FontAwesome name="angle-left" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          
        </View>

              </ReactNativeModal>

      
        </View>
        
        </View>

        
      
      </SafeAreaView>
      
    </ScrollView>

    
   </SafeAreaProvider>

   <AddressChooseModal modal={modal} setModal={setModal} />
   
   </>
  )
}

export default Appointment

const styles = StyleSheet.create({

  
  selctAddrsText:{
    fontSize : 15,
    fontWeight : '500',
    paddingTop : 22,
    paddingHorizontal : 20,

},

arrowRight:{
    position : 'absolute',
    top : '50%',
    right : 10,

},

ChooseAddressBx:{
    position : 'relative',
    width : '100%',
    height : '62%',
    backgroundColor : "#fff",
    borderTopRightRadius : 50,
    borderTopLeftRadius : 50,
    paddingTop : 12,
},

addressList:{
    position : 'relative',
    width : '100%',
    paddingHorizontal : 20,
    marginBottom: 80,
    marginTop : 5,
},

addrsText:{
    fontSize : 13,
    fontWeight : '500',
    color : "#026874",
},

placeText:{
    fontSize : 12,
    color : "#5b5b5b",
    fontWeight : '400',
},

addrssBtnText:{
    fontWeight : '500',
    color : "#026874",
    fontSize : 14,
},

addrssBtnBx2:{
    marginBottom : 0,
},

addrssBtnBx:{
    position : 'relative',
    marginTop : 15,
    backgroundColor : "#F9FAFB",
    borderWidth : 1,
    borderColor : "#03acc0",
    borderRadius : 8,
    padding : 10,
    marginBottom: 80,
},


  addBtnFlex:{
    position : 'relative',
    flexDirection : 'row',
    alignItems : 'center',
    gap : 6,
    marginBottom: 4,
},

addrsText:{
    fontSize : 13,
    fontWeight : '500',
    color : "#026874",
},

arrowRight:{
  position : 'absolute',
  top : '50%',
  right : 10,

},

addrssBtnText:{
  fontWeight : '500',
  color : "#026874",
  fontSize : 14,
},

addrssBtnBx:{
  position : 'relative',
  marginTop : 15,
  backgroundColor : "#F9FAFB",
  borderWidth : 1,
  borderColor : "#03acc0",
  borderRadius : 8,
  padding : 10,
  marginBottom: 20,
},

  backButton:{
    position : 'absolute',
    top : 14,
    left : 6,
    width : 30,
    height : 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  choseCompanyTextBx:{
    position : 'relative',
    width : '100%',
    paddingVertical : 20,
    backgroundColor : "#026874",
    borderTopRightRadius : 8,
    borderTopLeftRadius : 8,
  },

  AvailCompText:{
    fontSize : 16,
    textAlign : 'center',
    color : "#fff",
    fontWeight : '500',
  },

  slotDateFlex:{
    position : 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection : 'row',
  },

  bookApntBtnText:{
    fontSize : 14,
    color : "#04e1ea",
    fontWeight : '400',
  },

  bookApntBtn:{
    position : 'relative',
    marginTop : 10,
    borderWidth : 1.4,
    borderColor : "#04e1ea",
    height : 38,
    justifyContent : 'center',
    alignItems: 'center',
    borderRadius : 8,
    
  },

  timeText:{
    fontSize : 13,
    fontWeight : '500',
    color : "#0d0d0d"
  },

  slotsDate:{
    flexDirection : 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start',
    gap : 5,
  },

  slotsAvaiText:{
    fontSize : 12,
    color : "#4A9524",
    fontWeight : '500',
  },

  closeButton:{
    position : 'absolute',
    top : 16,
    right: 10,
  },

  slotBx:{
    position : 'relative',
    width : '100%',
    marginBottom: 22,

  },

  companyBx:{
    position : 'relative',
    width : '100%',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  selectBtn:{
    position : 'relative',
    paddingHorizontal : 10,
    height : 25,
    borderWidth : 1.4,
    borderColor : "#026874",
    alignItems: 'center',
    justifyContent : 'center',
    borderRadius : 4,
  },

  selText:{
    fontSize : 12,
    fontWeight : '500',
    color : "#026874",
  },

  nameText:{
    fontWeight : '500',
    fontSize : 14,
    color : '#0d0d0d'
  },

  compImg:{
    width : 50,
    height : 50,
    objectFit : 'cover',
    borderRadius : 50,
  
  },

  compLeftBx:{
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap : 8,
  },

  
  chooseSlotsBx:{
    height : 500,
  },

  chooseCompanyBx:{
    position : 'relative',
    width : '100%',
    height : 300,
    backgroundColor : "#fff",
    borderRadius : 8,

  },



  CompaniesList:{
    position : 'relative',
    width : '100%',
    height : '100%',
    marginTop : 12,
    paddingHorizontal : 18,
  },

  choseCompanyTextBx:{
    position : 'relative',
    width : '100%',
    paddingVertical : 20,
    backgroundColor : "#026874",
    borderTopRightRadius : 8,
    borderTopLeftRadius : 8,
  },

  AvailCompText:{
    fontSize : 16,
    textAlign : 'center',
    color : "#fff",
    fontWeight : '500',
  },

  saveBtnText:{
    fontSize : 15,
    color : "#fff",
    fontWeight : '500',
    letterSpacing : .3,
    
},


saveBtn:{
    position : 'relative',
    marginTop : 20,
    height : 50,
    width : '100%',
    backgroundColor : "#03acc0",
    borderRadius : 12,
    alignItems : 'center',
    justifyContent : 'center',
},


  calednIcon:{
    position : 'absolute',
    top : '30%',
    right : 10,
  },

  schedAppntMain:{
    position : 'relative',
    width : '100%',
    paddingHorizontal : 18,
  },

  schedAppntBx:{
    position : 'relative',
    width : '100%',
    marginTop : 1,
    paddingHorizontal : 18,
    paddingTop : 20,
    paddingBottom : 16,
    borderCurve : 'continuous',
    borderRadius : 8,
    backgroundColor: "#e5f7f4",
    marginBottom:90,
  },

  schedApntText:{
    fontSize : 16,
    textAlign : 'center',
    color : "#026874",
    fontWeight : '500',
    marginBottom: 15,
  },

  inptBx:{
    width : '100%',
    height : 45,
    borderWidth : .5,
    borderColor : "#026874",
    backgroundColor : "#fff",
    paddingHorizontal : 18,
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
    color : "#5c5c5c",
  },
  
  
  apntBg:{
    position : 'relative',
    width : '100%',
    height : 240,
    objectFit : 'cover',
  },
  
  apntComp:{
    position : 'relative',
    width : '100%',
    flex : 1,

  },
})