import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
export default function app() {
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
            <Text style={styles.headerSubTitle}>Sahan Perera</Text>
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
          />
          <Pressable style={styles.sendButton}>
            <MaterialIcons name="send" size={24} color="#5E6EF6" />
          </Pressable>
        </View>
      </View>
      {/* Input area */}
    </SafeAreaView>
  );
  return ui;
 
}

function signIn() {
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
            <TextInput style={styles.mobileText} />
          </View>

          <View style={styles.inputContainer2}>
            <Ionicons
              name="lock-closed"
              size={20}
              color="#000"
              style={styles.mobileIcon}
            />
            <TextInput style={styles.mobileText} />
            <Pressable style={styles.eyeIcon}>
              <Ionicons name="eye-off-outline" color="#000" size={24} />
            </Pressable>
          </View>
          <Pressable style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </Pressable>

          <Pressable style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
  return signInUI;
}

function signUp() {
  const signUplui = (
    <ScrollView
      style={styles.Scrollcontainer}
      showsVerticalScrollIndicator={false} // Hide scroll indicator
    >
      <SafeAreaView style={styles.signUpContainer}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#ffff"} />

        {/* Select profile img */}
        <View style={styles.profileImageContainer}>
          <Pressable style={styles.imagePicker}>
            <Ionicons name="add" size={30} color={"#DB5ASA"} />
          </Pressable>
        </View>
        {/* Select profile img */}
        {/* sign up form */}
        <View style={styles.signUpFormContainer}>
          <View style={styles.nameInputContainer}>
            <View style={styles.nameIconContainer}>
              <Ionicons name="person" size={20} color={"#666"} />
            </View>
            <TextInput
              style={styles.nameInput}
              placeholder="Your name"
              placeholderTextColor={"#666"}
            />
          </View>

          <View style={styles.nameInputContainer}>
            <View style={styles.nameIconContainer}>
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color={"#666"}
              />
            </View>
            <TextInput
              style={styles.nameInput}
              placeholder="Mobile No"
              placeholderTextColor={"#666"}
            />
          </View>
          <View style={styles.nameInputContainer}>
            <View style={styles.nameIconContainer}>
              <Ionicons name="lock-closed" color="#666" size={24} />
            </View>
            <TextInput
              style={styles.nameInput}
              placeholder="Password"
              placeholderTextColor={"#666"}
            />
          </View>
          <View style={styles.nameInputContainer}>
            <View style={styles.nameIconContainer}>
              <Ionicons name="lock-closed" color="#666" size={24} />
            </View>
            <TextInput
              style={styles.nameInput}
              placeholder="Confirm Password"
              placeholderTextColor={"#666"}
            />
          </View>

          <View style={styles.nameInputContainer}>
            <View style={styles.nameIconContainer}>
              <Ionicons name="location" color="#666" size={24} />
            </View>
            {/* <TextInput
            style={styles.nameInput}
            placeholder="Confirm Password"
            placeholderTextColor={"#666"}
          /> */}
            <Pressable style={styles.nameInput}>
              <ModalDropdown
                textStyle={{ fontSize: 16 }}
                dropdownStyle={{ width: "100%" }}
                dropdownTextStyle={{ fontSize: 20 }}
                options={["Sri Lanka", "Canada", "Japan"]}
              />
            </Pressable>
          </View>
          {/* btn */}
          <View style={styles.signUpBtnContainer}>
            <Pressable style={styles.signUpBtn}>
              <Text style={styles.signUpBtnText}>Sign Up</Text>
            </Pressable>
            <Pressable style={[styles.signUpBtn, styles.backBtn]}>
              <Text style={styles.signUpBtnText}>Back</Text>
            </Pressable>
          </View>
          {/* btn */}
        </View>
        {/* sign up form */}
      </SafeAreaView>
    </ScrollView>
  );
  return signUplui;
}

function Chat() {
  const data = [
    {
      id: "1",
      name: "Sahan Perera",
      message: "Hello",
      time: "9.30 pm",
      avatar: "sp",
      unread: false,
    },
    {
      id: "2",
      name: "Dinuka Dananjaya",
      message: "Will You Come Tomorrow",
      time: "9.45 pm",
      avatar: "DD",
      unread: false,
    },
    {
      id: "3",
      name: "Prabath Bandara",
      message: "Thank You",
      time: "10.00 pm",
      avatar: "pb",
      unread: false,
    },
  ];
  const ChatItem = ({ item }) => (
    <Pressable style={styles.chatItem}>
      {/* Avatar */}
      <View style={styles.avatar2}>
        <Text style={styles.avatarText2}>{item.avatar}</Text>
      </View>

      {/* Content */}
      <View style={styles.chatContent}>
        <View style={styles.chatContentHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatMessage}>{item.message}</Text>
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
const styles = StyleSheet.create({
  messagesContentContainer: {
    paddingVertical: 10,
    flexGrow: 1,
  },

  chatList: {
    flex: 1,
  },
  chatMessage: {
    fontSize: 15,
    color: "#888888",
  },
  chatTime: {
    fontSize: 15,
    color: "#888888",
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },
  chatContentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  chatContent: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e1f5fe",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0288d1",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchBarText: {
    flex: 1,
    fontSize: 16, // Changed from 20 to more standard search text size
    color: "#333333",
    paddingVertical: 0,
    marginLeft: 8, // Added for better spacing after icon
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  chatHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },

  Scrollcontainer: {
    flex: 1,
    width: "100%",
  },
  backBtn: {
    backgroundColor: "#333333",
  },
  signUpBtnContainer: {
    marginTop: 40,
    marginBottom: 40,
    gap: 15,
  },
  signUpBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 70,
  },
  signUpBtnText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signUpContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  signUpFormContainer: {
    flex: 1,
    gap: 16,
  },
  nameInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: "85%",
  },
  nameIconContainer: {
    marginRight: 15,
  },
  nameInput: {
    flex: 1,
    fontSize: 20,
    color: "#333333",
  },
  signInButton: {
    backgroundColor: "#5E6EF6",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#2F2F2F",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signInContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 80,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    width: "100%",
    maxWidth: 300,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
  },

  mobileIcon: {
    marginRight: 15,
  },
  mobileText: {
    flex: 1,
    fontSize: 18,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  //------------------------------//

  // chat inteface start
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d7d4ff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#6358f5",
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  atomIcon: {
    width: 28,
    height: 28,
    position: "relative",
  },
  nucleus: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#00bcd4",
    position: "absolute",
    top: 12,
    left: 12,
    bottom: 12,
  },
  orbit: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#00bcd4",
    borderRadius: 10,
  },
  orbit1: {
    width: 20,
    height: 20,
    top: 4,
    left: 4,
  },
  orbit2: {
    width: 24,
    height: 12,
    top: 8,
    left: 2,
    transform: [{ rotate: "45deg" }],
  },
  orbit3: {
    width: 24,
    height: 12,
    top: 8,
    left: 2,
    transform: [{ rotate: "-45deg" }],
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontStyle: "italic",
    marginBottom: 2,
  },
  headerSubTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  moreButton: {
    marginLeft: 16,
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  messageContainer1: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#73bee3",
    alignSelf: "flex-end",
    borderBottomRightRadius: 6,
  },
  msgText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  msgTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    marginLeft: 8,
  },
  checkMark: {
    marginLeft: 4,
    color: "#D33291",
  },
  messageContainer2: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#51cf51",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 6,
  },

  inputContainer: {
    backgroundColor: "#8690c1",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#29325c",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#384293",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 20,
    backgroundColor: "#fff",
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
});
