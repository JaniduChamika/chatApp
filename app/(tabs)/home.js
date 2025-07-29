import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
      FlatList,
      Pressable,
      SafeAreaView,
      Text,
      TextInput,
      View
} from "react-native";
import styles from './style';
export default function Home() {
  const [data, setItem] = useState([]);
  async function loadusers() {
    const userJsonText = await AsyncStorage.getItem("user");
    const formData = new FormData();
    formData.append("userJsonText", userJsonText);
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if ((request.readyState == 4, request.status == 200)) {
        // console.log(request.responseText);
        setItem(JSON.parse(request.responseText));
      }
    };

    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/chatApp/backend-php/load_users.php",
      true
    );
    request.send(formData);
  }
  loadusers();
  // const data = [
  //   {
  //     id: "1",
  //     name: "Sahan Perera",
  //     message: "Hello",
  //     time: "9.30 pm",
  //     avatar: "sp",
  //     unread: false,
  //   },
  //   {
  //     id: "2",
  //     name: "Dinuka Dananjaya",
  //     message: "Will You Come Tomorrow",
  //     time: "9.45 pm",
  //     avatar: "DD",
  //     unread: false,
  //   },
  //   {
  //     id: "3",
  //     name: "Prabath Bandara",
  //     message: "Thank You",
  //     time: "10.00 pm",
  //     avatar: "pb",
  //     unread: false,
  //   },
  // ];
  const ChatItem = ({ item }) => (
    <Pressable style={styles.chatItem}>
      {/* Avatar */}
      <View style={styles.avatar2}>
        <Text style={styles.avatarText2}>{item.pic}</Text>
      </View>

      {/* Content */}
      <View style={styles.chatContent}>
        <View style={styles.chatContentHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatMessage}>{item.msg}</Text>
      </View>
    </Pressable>
  );
  const MakeConversation = ({ item }) => <ChatItem item={item} />;
  const ui = (
    <SafeAreaView style={styles.chatContainer}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderText}>Chat History</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search user"
            placeholderTextColor={"#999999"}
            style={styles.searchBarText}
          />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={MakeConversation}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );

  return ui;
}