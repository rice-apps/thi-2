import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function Sidebar({ navigation }, props: DrawerContentComponentProps) {
    return(
        <View className="flex-1 justify-center bg-[#17468F] ">
            <View className="flex-1 w-[267px] h-[706px] self-center justify-evenly items-start flex-col">
                <View className="flex-row justify-between items-center">
                    <Image 
                        style={{ width: 44, height: 45 }}
                        source={require('../assets/images/thi_logo.png')}
                    />
                    <Text className="text-[#3BB4E4] font-sans font-bold text-[20px]">Texas Hearing Institute</Text>
                </View>
                <TouchableOpacity className="flex-row items-center">
                    <Image source={require('../assets/images/home_icon.png')} className="w-6 h-6" />
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
        // <View className="flex-1 justify-center bg-[#17468F]">
        //     {/* Spacer */}

        //     <View className="flex-1 self-center justify-evenly items-start flex-col pt-10">
        //         <View className="flex-row justify-between items-center">
        //             <Image 
        //                 style={{ width: 44, height: 45 }}
        //                 source={require('../assets/images/thi_logo.png')}
        //             />
        //             <Text className="text-[#3BB4E4] font-sans font-bold text-[20px]">Texas Hearing Institute</Text>
        //         </View>
                
        //         {/* Spacer */}
        //         <View style={{ flex: 1}} />

        //         { /* buttons */ }
        //         <TouchableOpacity
        //         className="flex-row items-center pt-10"
        //         onPress={() => props.navigation.navigate('Home')}
        //         >
        //             <Image source={require('../assets/images/home_icon.png')} className="w-6 h-6" />
        //             <Text className="text-white font-sans font-bold text-[20px] pl-2">Home</Text>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //         className="flex-row items-center pt-4"
        //         onPress={() => props.navigation.navigate('Students')}
        //         >
        //             <Image source={require('../assets/images/students_icon.png')} className="w-6 h-6" />
        //             <Text className="text-white font-sans font-bold text-[20px] pl-2">Students</Text>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //         className="flex-row items-center pt-4"
        //         onPress={() => props.navigation.navigate('Games')}
        //         >
        //             <Image source={require('../assets/images/games_icon.png')} className="w-6 h-6" />
        //             <Text className="text-white font-sans font-bold text-[20px] pl-2">Games</Text>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //         className="flex-row items-center pt-4"
        //         onPress={() => props.navigation.navigate('Timer')}
        //         >
        //             <Image source={require('../assets/images/timer_icon.png')} className="w-6 h-6" />
        //             <Text className="text-white font-sans font-bold text-[20px] pl-2">Timer</Text>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //         className="flex-row items-center pt-4"
        //         onPress={() => props.navigation.navigate('Settings')}
        //         >
        //             <Image source={require('../assets/images/settings_icon.png')} className="w-6 h-6" />
        //             <Text className="text-white font-sans font-bold text-[20px] pl-2">Settings</Text>
        //         </TouchableOpacity>

        //         {/* Spacer */}
        //         <View style={{ flex: 1, padding: 100}} />

        //         <TouchableOpacity
        //             className="flex-row items-center py-3" // Keep spacing consistent
        //             onPress={() => props.navigation.navigate('SignOut')}
        //         >
        //             <Image source={require('../assets/images/sign_out_icon.png')} className="w-6 h-6" />
        //             <Text className="text-white font-sans font-bold text-[20px] pl-2">Sign out</Text>
        //         </TouchableOpacity>

        //         {/* Spacer */}
        //         <View style={{ flex: 1}} />
        //     </View>
        // </View>
    );
}