import { View, Text, Image, ImageBackground } from "react-native";
import { styles } from '@/components/new'

export default function App() {
  return
  <View style={{ flex: 1, backgroundColor: "plum", padding: 60 }}>
    <Text style={{ fontSize: 30, color: "white" }}>Hello World</Text>
    {/*     <ImageBackground source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={{ width: 50, height: 50 }}>
      <Text style={{ color: "white" }}>Hello World</Text>
    </ImageBackground> */}
    <View style={styles.container}></View>
  </View>
}