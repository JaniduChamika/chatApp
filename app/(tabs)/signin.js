import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View
} from "react-native";
import styles from './style';

export default function SignIn({ navigation }) {
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);
  const signInUI = (
    <SafeAreaView style={styles.signInContainer}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer2}>
            <Ionicons
              name="phone-portrait-outline"
              size={20}
              color="#000"
              style={styles.mobileIcon}
            />
            <TextInput
              style={styles.mobileText}
              onChangeText={(text) => setMobile(text)}
            />
          </View>

          <View style={styles.inputContainer2}>
            <Ionicons
              name="lock-closed"
              size={20}
              color="#000"
              style={styles.mobileIcon}
            />
            <TextInput
              style={styles.mobileText}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable style={styles.eyeIcon}>
              <Ionicons name="eye-off-outline" color="#000" size={24} />
            </Pressable>
          </View>
          <Pressable style={styles.signInButton} onPress={signinProcess}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </Pressable>

          <Pressable style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
  return signInUI;
  async function signinProcess() {
    var jsRequestObject = { mobile: mobile, password: password };
    var jsonRequestText = JSON.stringify(jsRequestObject);
    var form = new FormData();
    form.append("jsonRequestText", jsonRequestText);
    var request = new XMLHttpRequest();
    request.onreadystatechange = async function () {
      if (this.readyState == 4 && request.status == 200) {
        var jsonResponseText = request.responseText;
        var jsResponseObject = JSON.parse(jsonResponseText);
        console.log(jsResponseObject.user.mobile);
        if (jsResponseObject.msg == "Error") {
          Alert.alert("Response", "Invalid Details");
        } else {
          var userObject = jsResponseObject.user;
          AsyncStorage.setItem("user", JSON.stringify(userObject));
          navigation.navigate("Home");
          // const uname = await AsyncStorage.getItem("user");
          // Alert.alert("Response", JSON.parse(uname).name);
        }
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/chatApp/backend-php/signin.php",
      true
    );
    request.send(form);
  }
}

