import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/sign-in/",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                    }),
                }
            ).then((response) => response.json());
            console.log(response);
        } catch (error) {
            console.log("cant log in");
        }

        router.replace("/(drawer)/home"); // Temporary homepage redirect
    };

    const handleSocialLogin = () => {
        console.log(`Login`);
        router.replace("/(drawer)/home"); // Temporary homepage redirect
    };

    return (
        <View className="flex-1 justify-center bg-white px-4 items-center">
            {/* Logo */}
            <Image
                className="self-center my-10"
                source={require("../assets/images/bb_icon.png")}
                style={{
                    height: Dimensions.get("window").height * 0.2,
                    width: Dimensions.get("window").width * 0.18,
                }}
            />
            {/* Welcome */}
            <Text className="text-2xl font-bold text-center text-black mb-2">
                Welcome Back!
            </Text>

            <Text className="text-base text-center text-black-600 mb-6">
                Please login to your account to continue.
            </Text>

            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Enter Your Email Address"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Enter Your Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {/* Login Button */}
            <TouchableOpacity
                onPress={handleLogin}
                className="bg-[#105366] h-10 rounded-md py-2 w-4/5 max-w-md mb-4 justify-center items-center"
            >
                <Text className="text-white text-md font-bold text-center">
                    Login
                </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4 w-4/5 max-w-md">
                <View className="flex-1 h-px bg-gray-300"></View>
                <Text className="px-4 text-lg text-black-500">Or</Text>
                <View className="flex-1 h-px bg-gray-300"></View>
            </View>

            {/* Social Media Logins */}
            <TouchableOpacity
                onPress={() => handleSocialLogin()}
                className="flex-row bg-white border border-gray-300 rounded-md py-3 w-11/12 max-w-md mb-4 items-center justify-center"
            >
                <FontAwesome
                    name="google"
                    size={20}
                    color="#DB4437"
                    className="mr-2"
                />
                <Text className="text-black text-base font-medium text-center">
                    Sign in with Google
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleSocialLogin()}
                className="flex-row bg-white border border-gray-300 rounded-md py-3 w-11/12 max-w-md mb-4 items-center justify-center"
            >
                <FontAwesome
                    name="apple"
                    size={20}
                    color="#000"
                    className="mr-2"
                />
                <Text className="text-black text-base font-medium text-center">
                    Sign in with Apple
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleSocialLogin()}
                className="flex-row bg-white border border-gray-300 rounded-md py-3 w-11/12 max-w-md items-center justify-center"
            >
                <FontAwesome
                    name="facebook"
                    size={20}
                    color="#4267B2"
                    className="mr-2"
                />
                <Text className="text-black text-base font-medium text-center">
                    Sign in with Facebook
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
