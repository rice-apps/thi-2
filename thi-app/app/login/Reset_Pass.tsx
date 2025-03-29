import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';

const ResetPassword = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    const handleResetPassword = () => {
        if (password === confirmPassword && password.length >= 6) {
            setModalVisible(true); // Show confirmation modal
        } else {
            //Handel this better 
            alert("Passwords must match and be at least 6 characters long!");
        }

    };

    const handleReturnToLogin = () => {
        setModalVisible(false); 
        setTimeout(() => {
            router.push('/');
        }, 300); 
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
            
            {/* Reset Password Heading */}
            <Text className="text-2xl font-bold text-center text-black mb-2">Reset your Password</Text>
            <Text className="text-base text-center text-black-600 mb-5 leading-tight">

                Strong passwords include numbers, letters, and punctuation marks.
            </Text>

            {/* Password Inputs */}
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Enter your new password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Confirm your new password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

             {/* Reset Password Button */}
             <TouchableOpacity 
                onPress={handleResetPassword}
                className="bg-[#105366] h-10 rounded-md py-2 w-4/5 max-w-md mb-4 justify-center items-center"
            >
                <Text className="text-white text-md font-bold text-center">Reset Password</Text>
            </TouchableOpacity>


             {/* Modal for Confirmation */}
             <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white p-6 rounded-lg w-4/5 max-w-md shadow-lg">
                        <Text className="text-lg font-semibold text-center mb-2">
                            Your password has been reset!
                        </Text>
                        <Text className="text-sm text-center text-gray-600 mb-4">
                            Click the button below to return to the login page. 
                            Make sure to remember your password for future use.
                        </Text>

                        <View className="flex-row justify-between">
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)}
                                className="px-4 py-2 border border-gray-400 rounded-md"
                            >
                                <Text className="text-gray-600">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            onPress={handleReturnToLogin}
                                
                                className="bg-[#105366] px-4 py-2 rounded-md"
                            >
                                <Text className="text-white">Return to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default ResetPassword;