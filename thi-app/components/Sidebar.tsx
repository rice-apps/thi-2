import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

export default function Sidebar() {
    return(
        <View className="flex-1 justify-center bg-[#17468F] w-[339px] h-[834px]">
            <View className="flex-1 w-[267px] h-[706px] self-center justify-evenly items-start flex-col">
                <View className="flex-row justify-between items-center w-[267px] h-[45px]">
                    <Image 
                        style={{ width: 44, height: 45 }} // Keeping this inline since it is not a tailwind property
                        source={require('../assets/images/thi_logo.png')}
                    />
                    <Text className="text-[#3BB4E4] font-sans font-bold text-[20px]">Texas Hearing Institute</Text>
                </View>
                <TouchableOpacity className="flex-row items-center">
                    <Image source={require('../assets/images/home_icon.png')} className="w-6 h-6" /> {/* Adjust size as needed */}
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <Image source={require('../assets/images/students_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Students</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <Image source={require('../assets/images/games_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Games</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <Image source={require('../assets/images/timer_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <Image source={require('../assets/images/settings_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Settings</Text>
                </TouchableOpacity>

                {/* Spacer */}
                <View className="h-[130px]" />

                <TouchableOpacity className="flex-row items-center">
                    <Image source={require('../assets/images/sign_out_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}