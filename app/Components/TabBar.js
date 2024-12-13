import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const TabBar = ({ state, descriptors, navigation }) => {

    const icons = {
        index : (props) => <AntDesign name="home" size={18} color="#fff" {...props} />,
        Appointment : (props) => <AntDesign name="calendar" size={18} color="#fff" {...props} />,
        Shop : (props) => <FontAwesome5 name="shopping-basket" size={18} color="#fff" {...props} />,
        Profile : (props) => <AntDesign name="user" size={18} color="#fff" {...props} />,

    }

  return (
    <View style={styles.tabbar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

          if(['_sitemap', '+not-found'].includes(route.name)) return null;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
        key={route.name}
        style={styles.tabbarItem}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
        >

           { icons[route.name]({
                color : isFocused ? "#34E6ED" : "#fff"
            })}
            
          <Text style={[ styles.tabitemText, { color: isFocused ? '#34E6ED' : '#fff' }]}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
  )
}

const styles  =  StyleSheet.create({

    tabbar:{
        position : 'absolute',
        bottom  : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems: 'center',
        backgroundColor : "#026874",
        paddingVertical : 14,
        marginHorizontal : 18,
        borderRadius : 12,
        borderCurve : 'continuous',
        shadowColor : "#000",
        shadowRadius : 3,
        shadowOpacity : 0.1,
        shadowOffset : {width : 120, height : 110},

    },

    tabitemText:{
        fontSize : 12,
        letterSpacing : .3,
        fontWeight : '500',
    },

    tabbarItem:{
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap : 4,
    },
    
})

export default TabBar


