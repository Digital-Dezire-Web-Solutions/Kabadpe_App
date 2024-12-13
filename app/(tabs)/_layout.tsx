import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../Components/TabBar";

const _layout = () => {
  // console.log("Hello")
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="Appointment"
        options={{
          title: "Appointment",
        }}
      />

      <Tabs.Screen
        name="Shop"
        options={{
          title: "Shop",
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default _layout;
