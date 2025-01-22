import React, { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";

const SugestDropdown = ({
  data,
  labelText,
  value,
  setValue,
  placeholderText,
  onChange,
}) => {
  const [filterData, setFilterData] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const inputRef = useRef(null); // Ref for the input
  const dropdownRef = useRef(null); // Ref for the dropdown

  const handleInput = (text) => {
    onChange(text);
    setValue(text);
    const filtered = data?.filter((item) =>
      item?.toLowerCase()?.includes(text?.toLowerCase())
    );
    if (filtered?.length > 0) {
      setFilterData(filtered);
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  const handleTouchStart = () => {
    if (data?.length > 0) {
      setFilterData(data);
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  const handleSelection = (item) => {
    setValue(item);
    onChange(item);
    setDropdown(false);
  };

  const handleOutsideClick = () => {
    // Dismiss the keyboard and hide the dropdown when clicking outside
    Keyboard.dismiss();
    setDropdown(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.userInptBx}>
        <Text style={styles.labelText}> {labelText} </Text>
        <TextInput
          ref={inputRef} // Attach the ref to the input
          style={styles.inptBx}
          //   onFo={handleTouchStart}
          //   onTouchStart={handleTouchStart}
          value={value}
          mode="flat"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          onChangeText={handleInput}
          placeholder={placeholderText}
          placeholderTextColor="#7b7b7b"
        />

        {dropdown && (
          <View ref={dropdownRef} style={styles.sugestionDropdown}>
            <FlatList
              scrollEnabled={false}
              nestedScrollEnabled={true}
              style={styles.scrollbar}
              data={filterData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.2}
                  style={styles.dropdownItem}
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
    </TouchableWithoutFeedback>
  );
};

export default SugestDropdown;

const styles = StyleSheet.create({
  sugestionDropdown: {
    // position: "absolute",
    // top: "100%", // Ensure it appears below the input
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#ddd",
    zIndex: 9999,
    elevation: 10,
  },

  scrollbar: {
    height: 200,
  },

  itemText: {
    fontSize: 13,
    color: "#696868",
  },

  dropdownItem: {
    position: "relative",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: "#ddd",
    paddingHorizontal: 14,
  },

  inptBx: {
    width: "100%",
    height: 45,
    borderWidth: 0.5,
    borderColor: "#026874",
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 13.5,
    fontWeight: "500",
    color: "#026874",
    backgroundColor: "transparent",
  },

  userInptBx: {
    position: "relative",
    width: "100%",
    gap: 8,
    marginBottom: 14,
  },

  labelText: {
    fontSize: 13,
    color: "#8f898b",
  },
});
