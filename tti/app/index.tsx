import { Text, View, Image } from "react-native";
import Login from "../components/login";



export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Login />
    </View>
  );
}
