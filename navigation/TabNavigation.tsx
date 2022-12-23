import React from "react";
import Home from "../screen/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screen/Profile";

export type TabParamList = {
  Map: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { paddingBottom: 10, height: 70 } }}
    >
      <Tab.Screen
        name="Map"
        component={Home}
        options={{ headerShown: false, title: "위치정보" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, title: "프로필" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
