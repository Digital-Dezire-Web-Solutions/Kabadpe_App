import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'

const FilterTrnsctn = ({trnsctnModal, setTrnsctnModal}) => {
    const [filterBtn , serFilterBtn]= useState('');

    const filterTime = [
        "Last Month", "Last 3 Month", "Last 6 Month", "Last Year", "2024", "2023", "2022", "All",
    ]
    
  return (
    <>
    <ReactNativeModal isVisible={trnsctnModal}  animationIn={'slideInUp'} animationInTiming={600} style={{justifyContent: 'flex-end', margin : 0}}  
    onBackButtonPress={() => setTrnsctnModal(false)}
    onBackdropPress={() => setTrnsctnModal(false)}

    >

        <View style={styles.filtertrnsctnModalBx}>
                
            <Text style={{fontSize : 20, color : "#026874" , fontWeight : '500', letterSpacing :.4}} >Filter</Text>

            <View style={{flexDirection : 'row',  marginTop : 10,  alignItems: 'center', justifyContent: 'space-between', width : '100%', marginBottom : 18,}}>
            <Text style={{fontSize : 14,color : "#2B2527", fontWeight : '400'}}>Sort Transaction By</Text>

            <TouchableOpacity activeOpacity={0.76}>
                <Text style={{fontSize : 14,color : "#34E6ED", fontWeight : '300'}}>Clear Filter</Text>
            </TouchableOpacity>
          {/* <TouchableOpacity style={{width : 'auto'}}>  <Text style={{fontSize : 14,color : "#34E6ED", fontWeight : '300'}}>Clear Filter</Text> </TouchableOpacity> */}
            </View>
    

        <View style={styles.trnsctn_btns_flex}>
            <TouchableOpacity style={styles.trnsctn_btn}>
                <Text style={styles.trnsctnText}>Online Transactions</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.trnsctn_btn}>
                <Text style={styles.trnsctnText}>Cart Transactions</Text>
            </TouchableOpacity> 
            
        </View>

      <Text style={{fontSize : 14,color : "#2B2527", fontWeight : '400', marginTop : 20,}}>Sort Transaction By Time</Text>

        <View style={styles.filter_timeData}>
            {filterTime.map((curData,id) => (
                <TouchableOpacity activeOpacity={0.6} style={styles.filterTimeBtn} onPress={() => serFilterBtn(curData)}>
                    <View style={styles.dotCircle}>
                    {filterBtn === curData ? <View style={styles.dotActive}></View> : null}
                    </View>
                    <Text> {curData} </Text>
                </TouchableOpacity>
            ))}
        </View>
        
        <View style={styles.applyBtnBx}>
        <TouchableOpacity activeOpacity={0.76} style={styles.applyBtn} onPress={() => setTrnsctnModal(false)}>
            <Text style={{fontSize : 16, color : "#fff", letterSpacing: .4, fontWeight : '500'}}>Apply</Text>
        </TouchableOpacity>
        </View>
      
        </View>

    </ReactNativeModal>
    
    </>
  )
}

export default FilterTrnsctn

const styles = StyleSheet.create({

    applyBtnBx:{
        position: 'absolute',
        bottom : 10,
        left : 0,
        width : '100%',
        marginHorizontal : 13,

    },

    applyBtn:{
        position : 'relative',
        width : '100%',
        backgroundColor : "#34E6ED",
        width : '100%',
        height : 40,
        borderRadius : 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    filter_timeData:{
        position : 'relative',
        marginTop : 12,
    },

    filterTimeBtn:{
        position : 'relative',
        width : '100%',
        paddingBlock : 8,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap : 5,
    },

  

    dotCircle:{
        position : 'relative',
        width : 15,
        height : 15,
        borderRadius : 30,
        borderWidth : 1,
        borderColor : "#026874",
        padding : 1,
    },

    dotActive:{
        position : 'relative',
        width : '100%',
        height : '100%',
        borderRadius : 30,
        backgroundColor : "#026874",
    },

    trnsctn_btns_flex:{
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap : 14,
        paddingBottom : 16,
        borderBottomWidth : 1,
        borderBottomColor : "#026874",
    },

    trnsctnText:{
        fontSize : 13,
        color : "#1E1E1E",
    },

    trnsctn_btn:{
        position : 'relative',
        width : 'auto',
        paddingHorizontal : 14,
        height : 30,
        alignItems : 'center',
        justifyContent: 'center',
        borderWidth : .87,
        borderColor : "#026874",
        borderRadius : 5,
    },
    
    filtertrnsctnModalBx:{
        position : 'relative',
        width : '100%',
        height: '80%',
        backgroundColor : "#fff",
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        paddingHorizontal : 18,
        paddingBlock : 20,
    },

    
})