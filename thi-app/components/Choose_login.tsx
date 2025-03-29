import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';


const LoginSelection = () => {
    const router = useRouter();

    
    const handleLogin = (userType: 'Admin' | 'Teacher') => {
        console.log(`Logging in as ${userType}`);
        router.push(`/login/${userType}_login`);
    };


    return (
        <View className="flex-1 justify-center bg-white px-4 items-center">
             {/* Logo */}
            <Image 
                className="self-center my-10"
                source={require('../assets/images/bb_icon.png')}
                style={{
                    height: Dimensions.get('window').height * 0.2,
                    width: Dimensions.get('window').width * 0.18,
                }}
            />
             {/* Welcome Message */}
            <Text className="text-2xl font-bold text-center text-black mb-2">Welcome back!</Text>
            <Text className="text-base text-center text-black-600 mb-6">
                Please select how you would like to login
            </Text>

             {/* Admin Login Button */}
            <TouchableOpacity 
                onPress={() => handleLogin('Admin')}
                className="bg-[#105366] h-10 rounded-md py-2 w-4/5 max-w-md mb-4 justify-center items-center">
                <Text className="text-white text-md font-bold text-center">Login As Admin</Text>
            </TouchableOpacity>
            
            {/* Teacher Login Button */}
            <TouchableOpacity 
                onPress={() => handleLogin('Teacher')}
                className="bg-[#105366] h-10 rounded-md py-2 w-4/5 max-w-md justify-center items-center">
                <Text className="text-white text-md font-bold text-center">Login As Teacher</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginSelection;