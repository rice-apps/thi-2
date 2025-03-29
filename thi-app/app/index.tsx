import LoginSelection from '@/components/Choose_login';
import React from 'react';
import { View } from 'react-native';
// import LoginSelection from '../components/Choose_login';


const LoginPage = () => {
    return (
        <View className="flex-1 justify-center bg-white">
            <LoginSelection />
        </View>
    ); 
};

export default LoginPage; // Don't call the function

