import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import styles from './style';
import styles2 from './style2';
export default function SignUp() {
  const [mobileNumber, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const countries = [
    { label: "Sri Lanka", value: "1" },
    { label: "India", value: "2" },
    { label: "Pakistan", value: "3" },
    { label: "Bangladesh", value: "4" },
  ];
  const signUplui = (
    <ScrollView
      style={styles.Scrollcontainer}
      showsVerticalScrollIndicator={false} // Hide scroll indicator
    >
      <SafeAreaView style={styles.signUpContainer}>
        <View style={styles2.view1}>
          <Text style={styles2.text1}>Mobile</Text>
          <TextInput
            style={styles2.input1}
            autoCorrect={false}
            maxLength={10}
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobile}
          />
        </View>
        <View style={styles2.view1}>
          <Text style={styles2.text1}>Name</Text>
          <TextInput
            style={styles2.input1}
            autoCorrect={false}
            maxLength={20}
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles2.view1}>
          <Text style={styles2.text1}>Password</Text>
          <TextInput
            style={styles2.input1}
            autoCorrect={false}
            maxLength={10}
            keyboardType="visible-password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles2.view1}>
          <Text style={styles2.text1}>Confirm Password</Text>
          <TextInput
            style={styles2.input1}
            autoCorrect={false}
            maxLength={10}
            keyboardType="visible-password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <Button title="Select Profile Image" onPress={test} />
        <View style={styles2.view1}>
          <Text style={styles2.text1}>Country</Text>
          <Picker
            // selectedValue={"country"}
            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
            style={styles2.dropdown}
          >
            {countries.map((item) => (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
          </Picker>
        </View>
        <Button title="Sign up" onPress={signInupReq} />
      </SafeAreaView>
    </ScrollView>
  );
  return signUplui;

  async function test() {
    const options = {
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
    const result = await ImagePicker.launchImageLibraryAsync(options);
    if (result.canceled) {
      Alert.alert("User cancelled image picker");
    } else {
      const content = result.assets[0].uri;
      // Alert.alert("Message ", content);
      const imgObject = {
        uri: result.assets[0].uri,
        name: "profileImage.png",
        type: "image/png",
      };
      setProfileImage(imgObject);
    }
  }
  function signInupReq() {
    var mobile = mobileNumber;
    var username = name;
    var pw = password;
    var confirmPw = confirmPassword;
    var profile_pic = profileImage;
    var usercountry = country;
    var formData = new FormData();
    formData.append("mobile", mobile);
    formData.append("username", username);
    formData.append("password", pw);
    formData.append("confirm_password", confirmPw);
    formData.append("country", usercountry);
    formData.append("profile_pic", profile_pic);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        console.log(response);
        Alert.alert("Response", response);
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/chatApp/backend-php/signup.php",
      true
    );

    request.send(formData);
  }
}

