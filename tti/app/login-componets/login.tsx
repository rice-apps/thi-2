import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email:', username);
    };

    const handleGoogleLogin = () => {
        console.log('Google Login');
    };

    const handleAppleLogin = () => {
        console.log('Apple Login');
    };

    const handleFacebookLogin = () => {
        console.log('Facebook Login');
    };

    return (
        <View className="flex-1 justify-center bg-white w-full">
            <Image 
                className="w-68 h-32 self-center my-12"
                source={require('../../assets/images/logo.png')}
            />
            <Text className="text-2xl font-bold text-center text-black mb-5">Welcome Back!</Text>
            <TextInput 
                className="text-lg text-center mb-5 text-black leading-6" 
                editable={false} 
                value="Please login to your account to continue."
            />
            <TextInput
                className="mb-4 w-72 self-center h-10 border border-gray-400 px-3 rounded"
                placeholder="Enter Your Email Address"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                className="mb-4 w-72 self-center h-10 border border-gray-400 px-3 rounded"
                placeholder="Enter Your Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={handleLogin} className="bg-blue-800 rounded mt-3 w-72 self-center">
                <Text className="text-white py-2 px-5 text-lg font-bold text-center">Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoogleLogin} className="bg-blue-800 rounded mt-3 w-72 self-center">
                <Text className="text-white py-2 px-5 text-lg font-bold text-center">Login with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAppleLogin} className="bg-blue-800 rounded mt-3 w-72 self-center">
                <Text className="text-white py-2 px-5 text-lg font-bold text-center">Login with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFacebookLogin} className="bg-blue-800 rounded mt-3 w-72 self-center">
                <Text className="text-white py-2 px-5 text-lg font-bold text-center">Login with Facebook</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
