import React from "react";
import Chat from "./chat";
import Home from "./home";
import SignIn from "./signin";
import SignUp from "./signup";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
function App({ navigation }) {
  async function checkUser() {
    const user = await AsyncStorage.getItem("user");
    return user;
  }
  const ui = (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={checkUser() != null ? "Home" : "SignIn"}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}

export default App;
