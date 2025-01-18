import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'

const SugestDropdown = ({ data, labelText, value, setValue, placeholderText }) => {
    const [filterData , setFilterData] =  useState([]);
    const [dropdown , setDropdown] =  useState(false);

    const handleInput = (text) => {
        setValue(text)

        if(text.length > 0){
            const filtered = data.filter((item) => item.toLowerCase().includes(text.toLowerCase()));
            setFilterData(filtered);
            setDropdown(true)
        }else{
            setDropdown(false);
        }
        
    }

    const handleSelection = (item) => {
        setValue(item);
        setDropdown(false);
    }

    return (
        <>
            <View style={styles.userInptBx}>
                <Text style={styles.labelText}> {labelText} </Text>
                <TextInput style={styles.inptBx}
                    value={value}
                    mode="flat"  // ✅ Use outlined mode instead of default
                    underlineColor="transparent"  // ✅ Removes bottom underline
                    activeUnderlineColor="transparent" 
                    onChangeText={handleInput}
                    placeholder={placeholderText} placeholderTextColor="#7b7b7b" />

               {dropdown && <View style={styles.sugestionDropdown}>
                    <FlatList
                        nestedScrollEnabled={true}
                        style={styles.scrollbar}
                        data={filterData}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.2}
                                style={[styles.dropdownItem]}
                                onPress={() => handleSelection(item)}

                            >
                                <Text style={styles.itemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View> }

            </View>
            
        </>
    )
}

export default SugestDropdown

const styles = StyleSheet.create({

    sugestionDropdown:{
        position : 'absolute',
        top : '105%',
        left : 0,
        width : '100%',
        backgroundColor : "#fff",
        borderRadius : 5,
        borderWidth : 2,
        borderColor : "#ddd",
        zIndex : 100,
    },

    scrollbar:{
        height : 200,
    },

    itemText:{
        fontSize : 13,
        color : "#696868",
    },

    dropdownItem:{
        position : 'relative',
        width : '100%',
        paddingBlock : 10,
        borderBottomWidth : .4,
        borderBottomColor : "#ddd",
        paddingInline : 14,

    },
    
    inptBx: {
        width: '100%',
        height: 45,
        borderWidth: .5,
        borderColor: "#026874",
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 13.5,
        fontWeight: '500',
        color: "#026874",
        backgroundColor: "transparent",
        
    },

    userInptBx: {
        position: 'relative',
        width: '100%',
        gap: 8,
        marginBottom: 14,

    },

    labelText: {
        fontSize: 13,
        color: "#8f898b",
    },

})