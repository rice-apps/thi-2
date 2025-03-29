import { View, Text, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const CreateTeacherAccount = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [Tpassword, setTPassword] = useState('');
    const router = useRouter();

    const handleCreateAccount = () => {
        console.log('Creating Account for:', username);
        router.replace('/(drawer)/home'); // Temporary redirect
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

            {/* Header */}
            <Text className="text-3xl font-bold text-center text-black mb-1">Create an Account</Text>
            <Text className="text-base text-center text-gray-600 mb-6">
                Sign up by creating an account below
            </Text>

            {/* Name Input */}
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Name"
                onChangeText={setName}
                value={name}
            />

            {/* Email Input */}
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Enter your email address"
                onChangeText={setUsername}
                value={username}
            />

            {/* Password Input */}
            <TextInput
                className="mb-4 h-12 border border-gray-300 px-3 rounded-md text-black w-4/5 max-w-md"
                placeholder="Create your temporary password"
                onChangeText={setTPassword}
                value={Tpassword}
                secureTextEntry={true}
            />

            {/* Create Account Button */}
            <TouchableOpacity 
                onPress={handleCreateAccount} 
                className="bg-[#105366] h-12 rounded-md py-2 w-4/5 max-w-md mb-4 justify-center items-center"
            >
                <Text className="text-white text-lg text-center">Create Account</Text>
            </TouchableOpacity>

            {/* Already Have an Account? */}
            <View className="w-4/5 max-w-md items-center ">
                <Text className="text-black text-sm">
                    Already Have An Account?{' '}
                    <Text 
                        className="text-black font-md underline"
                        onPress={() => router.push('/login/Teacher_login')} 
                    >
                        Login!
                    </Text>
                </Text>
            </View>
        </View>
    );
}

export default CreateTeacherAccount;
