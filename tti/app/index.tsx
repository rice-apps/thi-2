import { Text, View, Image } from "react-native";
import Login from "./login-componets/login";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login></Login>
    </View>
  );
}
