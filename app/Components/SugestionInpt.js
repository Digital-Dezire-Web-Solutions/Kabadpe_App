import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const SugestionInpt = ({ data, state, setterFunc, labelTitle, placeHolderText, iconName }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const handlePinValue = (text) => {
        setterFunc(text);

        if (text.length > 0) {
            const filtered = data.filter((item) => item.toLowerCase().includes(text.toLowerCase())); // Better filtering method
            setFilteredData(filtered);
            setShowDropdown(filtered.length > 0); // Show dropdown only if results exist
        } else {
            setShowDropdown(false);
        }
    };

    const handleSelection = (item) => {
        setterFunc(item);
        setShowDropdown(false);
    };

    return (
        <>
            <View style={styles.InputBx}>
                <Text style={styles.label}>{labelTitle} </Text>
                <View style={styles.sugestionInputBx}>
                    <View style={styles.input}>
                        <Entypo
                            style={styles.icon}
                            name={iconName}
                            size={15}
                            color="#a6a4a4"
                        />
                        <TextInput
                            style={styles.mainInput}
                            value={state}
                            onChangeText={handlePinValue}
                            name="pincode"
                            placeholder={placeHolderText}
                        />
                    </View>
                    {showDropdown && (
                        <View style={styles.sugestDrondownBx}>
                            <FlatList 
                                nestedScrollEnabled={true}
                                style={styles.scrollbar}
                                data={filteredData}
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
                        </View>
                    )}

                </View>
            </View>
        </>
    )
}

export default SugestionInpt

const styles = StyleSheet.create({
    icon: {
        position: "absolute",
        top: "33%",
        left: 10,
    },

    input: {
        position: "relative",
        width: "100%",
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 50,
        borderWidth: 0.15,
        borderColor: "#242421",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
    },

    mainInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 35,
        fontSize: 13,
        color: "#212121",
    },

    label: {
        color: "#0d0d0d",
        letterSpacing: 0.55,
        fontSize: 13.4,
        color: "#242424",
    },

    InputBx: {
        position: "relative",
        width: "100%",
        gap: 8,
        marginTop: 25,
    },

    itemText: {
        fontSize: 13,
        color: "#6e6d6d",
    },

    dropdownItem: {
        position: 'relative',
        width: '100%',
        paddingBlock: 6,
        paddingHorizontal: 10,
        borderBottomWidth: .4,
        borderBottomColor: "#ddd",
        borderRadius: 10,


    },

    sugestDrondownBx: {
        // position: 'absolute',
        // top: '115%',
        // left: 0,
        backgroundColor: "#fff",
        width: '100%',
        borderWidth: .45,
        borderColor: "#ddd",
        borderRadius: 10,
        zIndex: 100,

    },

    scrollbar: {
        height: 157,
    },
})