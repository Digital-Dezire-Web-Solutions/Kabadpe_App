import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';

const ChooseWeight = () => {
    const data = [
        { label: 'Less than 200 kg', value: '1' },
        { label: 'More than 200 kg', value: '2' },
    
      ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
  return (
    <View style={styles.userInptBx}>
    <Text style={styles.labelText}>Choose Weight</Text>
    <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#026874' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Choose Weight' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
            setValue(item.value);
            setIsFocus(false);
        }}

    />
</View>
  )
}

export default ChooseWeight
const styles = StyleSheet.create({
    userInptBx: {
        position: 'relative',
        width: '100%',
        gap: 8,
        marginBottom: 14,
    },


    labelText: {
        fontSize: 13,
        color: "#5c5c5c",
    },

    dropdown: {
        height: 45,
        borderColor: '#026874',
        borderWidth: 0.5,
        backgroundColor : "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 13.5,
        color: "#8f898b",
    },
    placeholderStyle: {
        fontSize: 13.5,
        color: "#8f898b",
        fontWeight: '500',
    },
    selectedTextStyle: {
        fontSize: 13.5,
        color: "#026874",
        fontWeight: '500',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 13.5,
        color: "#8f898b",

    },
});