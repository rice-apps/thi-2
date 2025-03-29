import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 
import { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSendEmail = () => {
        console.log('Password reset email sent to:', email);
        // Add functionality to send reset password email
    };

    return (
        <View className="flex-1 justify-center bg-white px-4 items-center">
            {/* Logo */}
            <Image 
                className="self-center my-8"
                source={require('../../assets/images/bb_icon.png')}
                style={{
                    height: Dimensions.get('window').height * 0.18,
                    width: Dimensions.get('window').width * 0.18,
                }}
            />

            {/* Title */}
            <Text className="text-2xl font-bold text-center text-black mb-2">Forgot your Password?</Text>

            {/* Instructions */}
            <Text 
                className="text-base text-center text-gray-600 mb-6 px-6 w-4/5 max-w-md"
            >
                Please enter your email address associated with your login. 
                An email will be sent to you that will allow you to reset your password.
            </Text>

            {/* Email Input */}
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Enter your email address"
                onChangeText={setEmail}
                value={email}
            />

            {/* Send Email Button */}
            <TouchableOpacity 
                onPress={handleSendEmail} 
                className="bg-[#105366] h-12 rounded-md py-2 w-4/5 max-w-md mb-4 justify-center items-center"
            >
                <Text className="text-white text-lg font-bold text-center">Send Email</Text>
            </TouchableOpacity>

            {/* Go Back Button */}
            <TouchableOpacity 
                onPress={() => router.back()} 
                className="mt-4 flex-row items-center justify-center"
            >
                <FontAwesome name="arrow-left" size={16} color="#105366" />
                <Text className="text-[#105366] ml-2 text-lg font-bold">Go Back</Text>
            </TouchableOpacity>
        </View>
      
    );
};

export default ForgotPassword