import { NavigationContainer } from "@react-navigation/native";
import Login from "../screen/Login";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
