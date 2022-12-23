import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Button, Input } from "@rneui/themed";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: Props) => {
  const passwordRef = useRef<any>(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>물지어플에 오신걸 환영합니다</Text>

      <Input
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#fff"
        onEndEditing={() => {
          if (passwordRef) {
            passwordRef.current?.focus();
          }
        }}
      />
      <Input
        ref={passwordRef}
        style={styles.input}
        placeholder="패스워드"
        placeholderTextColor="#fff"
      />
      <Button
        title="로그인"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
        onPress={() => navigation.push("Home")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 90,
  },
  input: {
    color: "#fff",
    fontSize: 18,
  },
});
