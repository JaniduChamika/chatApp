import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View
} from "react-native";
import styles from './style';

export default function Chat() {
  const [name, setName] = useState(null);
  const [chatText, setChatText] = useState("");
  async function loadName() {
    var userJsonText = await AsyncStorage.getItem("user");
    var userJsObject = JSON.parse(userJsonText);
    setName(userJsObject.name);
  }
  loadName();

  const [loaddata, setChat] = useState([]);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var response = request.responseText;

      var responseJSONText = JSON.parse(response);
      setChat(responseJSONText);
    }
  };

  request.open(
    "GET",
    "http://10.0.2.2:8080/React-Native/chatApp/backend-php/load-chat.php"
  );
  request.send();

  // Sample messages data
  // const loaddata = [
  //   {
  //     id: "1",
  //     text: "Good Morning",
  //     time: "08.41 pm",
  //     side: "left",
  //     status: "seen",
  //   },
  //   {
  //     id: "2",
  //     text: "Same to you",
  //     time: "08.41 pm",
  //     side: "right",
  //     status: "seen",
  //   },
  //   {
  //     id: "3",
  //     text: "Whatsup?",
  //     time: "08.41 pm",
  //     side: "left",
  //     status: "seen",
  //   },
  // ];

  // Function to render each message item
  const renderMessage = ({ item }) => {
    const messageStyle =
      item.side === "right"
        ? styles.messageContainer1
        : styles.messageContainer2;

    return (
      <View style={messageStyle}>
        <Text style={styles.msgText}>{item.msg}</Text>
        <Text style={styles.msgTime}>{item.time}</Text>
        {item.side === "right" && (
          <Ionicons name="checkmark-done" size={20} style={styles.checkMark} />
        )}
      </View>
    );
  };

  const ui = (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} />
        </Pressable>

        <View style={styles.headerCenter}>
          {/* icon */}
          <View style={styles.avatar}>
            <View style={styles.atomIcon}>
              <View style={styles.nucleus} />
              <View style={[styles.orbit, styles.orbit1]} />
              <View style={[styles.orbit, styles.orbit2]} />
              <View style={[styles.orbit, styles.orbit3]} />
            </View>
          </View>
          {/* icon */}
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Chat</Text>
            <Text style={styles.headerSubTitle}>{name}</Text>
          </View>

          <Pressable style={styles.moreButton}>
            <MaterialIcons name="more-vert" color="#333" size={24} />
          </Pressable>
        </View>
      </View>
      {/* Header */}

      {/* Messages with FlatList */}
      <FlatList
        data={loaddata}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContentContainer}
        showsVerticalScrollIndicator={false}
        inverted={false} // Set to true if you want newest messages at bottom
      />

      {/* Input area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your message"
            placeholderTextColor="#F6685E"
            onChange={(e) => setChatText(e.nativeEvent.text)}
          />
          <Pressable style={styles.sendButton} onPress={saveChat}>
            <MaterialIcons name="send" size={24} color="#5E6EF6" />
          </Pressable>
        </View>
      </View>
      {/* Input area */}
    </SafeAreaView>
  );
  async function saveChat() {
    var userJSONText = await AsyncStorage.getItem("user");
    var fromUserObject = JSON.parse(userJSONText);
    var requestObject = {
      msg: chatText,
      from_user_id: fromUserObject.id,
      to_user_id: "2",
    };
    var form = new FormData();
    form.append("requestJSON", JSON.stringify(requestObject));
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
      "http://10.0.2.2:8080/React-Native/chatApp/backend-php/save_chat.php",
      true
    );
    request.send(form);
  }
  return ui;
}
