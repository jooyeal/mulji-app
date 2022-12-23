import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/TabNavigation";

type Props = BottomTabScreenProps<TabParamList, "Profile">;

const Profile = (props: Props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
