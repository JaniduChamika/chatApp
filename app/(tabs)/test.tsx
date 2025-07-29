
import { Button, Text, View } from "react-native";


export function m(){
      const ui=(<View><Text>Hello World</Text>
      <Button title="Press Me" onPress={() => alert("Button Pressed")} /></View>);
      return ui;
}