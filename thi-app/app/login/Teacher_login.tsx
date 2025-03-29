import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 

const Teacher_login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = () => {
        console.log('Email:', username);
        router.replace('/(drawer)/home');
    };

    
    const handleSocialLogin = () => {
        console.log(`Login`);
        router.replace('/(drawer)/home');
    };

    return (
        <View className="flex-1 justify-center bg-white px-4 items-center">
             {/* Logo */}
            <Image 
                className="self-center my-10"
                source={require('../../assets/images/bb_icon.png')}
                style={{
                    height: Dimensions.get('window').height * 0.2,
                    width: Dimensions.get('window').width * 0.18,
                }}
            />
             {/* Welcome */}
            <Text className="text-2xl font-bold text-center text-black mb-2">Welcome Back!</Text>
            
            <Text className="text-base text-center text-black-600 mb-6 mt-3">
                Please login to your account to continue.
            </Text>
            
            {/* Email Input */}
            <TextInput
        
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Enter Your Email Address"
                onChangeText={setUsername}
                value={username}
            />
            {/* Password Input */}
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Enter Your Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} className="bg-[#105366] h-10 rounded-md py-2 w-4/5 max-w-md mb-4 justify-center items-center">
                <Text className="text-white text-md font-bold text-center">Login</Text>
            </TouchableOpacity>
           
            {/* Divider */}
            <View className="flex-row items-center mb-4 w-4/5 max-w-md">
                <View className="flex-1 h-px bg-gray-300"></View>
                <Text className="px-4 text-black text-xl">Or</Text>
                <View className="flex-1 h-px bg-gray-300"></View>
            </View>

            {/* Social Media Logins */}
            <TouchableOpacity
                onPress={() => handleSocialLogin()}
                className="flex-row bg-white border border-gray-300 rounded-full py-3 w-11/12 max-w-md mb-3 items-center justify-center"
            >
                <FontAwesome name="google" size={20} color="#DB4437" className="mr-2" />
                <Text className="text-black text-base font-medium">Sign in with Google</Text>
            </TouchableOpacity>


            {/* Links: Create Account & Forgot Password */}
            {/* Links: Create Account & Forgot Password */}
<View className="w-4/5 max-w-md items-center mt-3">
    <Text className="text-black text-sm">
        Not Registered?{' '} <Text 
        className=" text-black font-md underline" 
        onPress={()  => router.push('/login/Create_Teacher_Account')}
        >Create An Account!</Text>
    </Text>

    <Text 
        className="text-black text-sm font-large mt-4 underline" 
        onPress={() => router.push('/login/Forgot_Password')} 
    >
        Forgot Password?
    </Text>

</View>


            {/* Go Back Button */}
            <TouchableOpacity 
                onPress={() => router.back()} 
                className="text-black mt-6 flex-row items-center justify-center"
            >
                <FontAwesome name="arrow-left" size={16} color="#105366" />
                <Text className="text-[#105366] ml-2 text-lg font-large">Go Back</Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default Teacher_login;