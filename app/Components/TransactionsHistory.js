import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const TransactionsHistory = ({trnsctHistData, trnstnSearch , setTrnstnSearch}) => {
    const [trnstnValue , setTrnstnValue] = useState('');
    const [filterData, setFilterData] = useState(trnsctHistData || []);
    const [condText, setCondText] = useState(false);

    const handleInputValue = (text) => {
        setTrnstnValue(text);
        
        if(text.length >= 3){
            setCondText(false);

            const filtered =  trnsctHistData.filter((curElem,id) => curElem.title.toLowerCase().includes(text.toLowerCase()));
            setFilterData(filtered)
            
        }else{
            setFilterData(trnsctHistData);
            setCondText(true)
        }


    }

  return (
      <ReactNativeModal isVisible={trnstnSearch} animationIn={'fadeInUpBig'} animationInTiming={600} style={{justifyContent:'flex-end', margin: 0,}}
      onBackButtonPress={() => setTrnstnSearch(false)}
      onBackdropPress={() => setTrnstnSearch(false)}
      >
   
                   <View style={styles.transactionHistorySearching}>
        
                       <Text style={{fontSize : 20, color : "#2B2527", fontWeight : '500'}}>Transaction</Text>
   
                       <View activeOpacity={0.76} style={[styles.trnstn_searchBx, styles.trnstn_searchBx2]}>
                               <AntDesign name="search1" size={18} color="#026874" />
                               <TextInput value={trnstnValue} onChangeText={handleInputValue}  style={styles.searchInput} placeholder='Search by Name/Number' placeholderTextColor='##8F898B' />
                               </View>
                              {condText && <Text style={{fontSize : 12, color : "#979797", marginTop : 3,}}>Enter minimum 3 characters to load suggestions </Text>}

                               <View style={styles.trnsctnHistList}>
                               <FlatList 
                               nestedScrollEnabled={true}
                data={filterData}
                        renderItem={({item}) => (
                            <>
                               <View style={styles.trnsctBx} key={item.id}>
                                <View style={styles.trnLeftBx}>
                                    <View style={styles.trnIconBx}>
                                    <MaterialCommunityIcons name={item.arrowRecv} size={20} color={item.arrowRecv === "arrow-bottom-right" ? "#4CC36D" : "#f10000"} />
                                    </View>
                                    <View style={styles.trnInfo}>
                                        <Text style={styles.trnTitleText}> {item.title} </Text>
                                        <Text style={styles.trnText}> {item.text} </Text>
                                    </View>
                                </View>

                                <Text style={[styles.amntText , {color : item.arrowRecv === "arrow-bottom-right" ? "#4CC36D" : "#f10000" }]}> {item.amnt} </Text>

                            </View>
                            </>

                        )}
                
                />
                </View>
                   </View>
             
                
                           
               </ReactNativeModal>
  )
}

export default TransactionsHistory

const styles = StyleSheet.create({

    trnsctnHistList:{
        position : 'relative',
        marginTop : 30,
        width : '100%',
    },
    
    amntText:{
        fontSize : 14,
        fontWeight : '500',
        letterSpacing : .3,
    },

    trnTitleText:{
        fontSize : 15,
        color : "#0d0d0d",
        letterSpacing : .2,
        marginBottom: 3,
    },

    trnText:{
        fontSize : 12.5,
        color : "#7c7c7c",
    },

    trnsctBx:{
        position : 'relative',
        width : '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection : 'row',
        marginBottom: 16,
    },

    trnInfo:{
        position : 'relative',
        width : 'auto',
    },

    trnLeftBx:{
        position : 'relative',
        width : 'auto',
        flexDirection :'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap : 12,
    },

    trnIconBx:{
        position : 'relative',
        width : 45,
        height : 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : "#edfaf8",
        borderRadius : 8,
    },
    
    trnstn_searchBx2:{
        width : '100%',
        marginTop : 15,
    },

    transactionHistorySearching:{
        position : 'relative',
        width:'100%',
        height : '100%',
        backgroundColor : "#fff",
        paddingHorizontal : 20,
        paddingBlock : 20,
    },

    barBtn:{
        position : 'relative',
        width : '10%',
        height : 35,
        alignItems: 'center',
        borderRadius : 6,
        justifyContent: 'center',
    },

    searchInput:{
        width:'100%',
        height: 40,
    },

    trnstn_searchBx:{
        position : 'relative',
        width : '80%',
        flexDirection : 'row',
        alignItems :'center',
        justifyContent : 'flex-start',
        gap : 5,
        borderWidth : 1,
        height : 35,
        paddingHorizontal : 10,
        borderColor : "#026874",
        borderRadius : 6,
    },
})