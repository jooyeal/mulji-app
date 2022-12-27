import React from "react";
import Home from "../screen/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screen/Profile";
import { Icon } from "@rneui/themed";

export type TabParamList = {
  Map: undefined;
  Profile: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { height: 60, paddingTop: 10 } }}
    >
      <Tab.Screen
        name="Map"
        component={Home}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: (tabInfo) => (
            <Icon name="place" color={tabInfo.focused ? "#000" : "#757575"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: (tabInfo) => (
            <Icon name="person" color={tabInfo.focused ? "#000" : "#757575"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
