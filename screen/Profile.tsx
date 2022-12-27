import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/TabNavigation";
import useQuery from "../hooks/useQuery";
import { getData, removeData } from "../utils/storageManager";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "@rneui/themed";

type Props = BottomTabScreenProps<TabParamList, "Profile">;

const Profile = ({ navigation }: Props) => {
  const { data, isLoading } = useQuery<{
    user: { email: string; username: string };
  }>({
    path: "getUser",
    asyncParams: { email: () => getData("user") },
  });
  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
      <ScrollView style={{ height: "100%", padding: 10 }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            marginBottom: 10,
            fontSize: 30,
          }}
        >
          {data?.user.username} 님의 프로필
        </Text>
        <InfoView title="메일" value={data?.user.email} />
        <Button
          title="로그아웃"
          buttonStyle={{
            backgroundColor: "rgba(111, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            height: 50,
          }}
          onPress={async () => {
            await removeData("user");
            navigation.navigate("Login");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoView = ({ title, value }: { title: string; value?: string }) => {
  return (
    <View
      style={{
        padding: 10,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 10,
          color: "#fff",
        }}
      >
        {title}
      </Text>
      <Text style={{ color: "#fff" }}>{value}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
