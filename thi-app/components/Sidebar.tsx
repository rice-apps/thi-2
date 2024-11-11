import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useDrawerContext } from '../app/(drawer)/_layout';

export default function Sidebar(props: DrawerContentComponentProps) {
  
  const router = useRouter();
  const { toggleSidebar } = useDrawerContext();

  return (
    <View className="flex-1 justify-center bg-[#17468F] ">
            <View className="flex-1 w-[267px] h-[706px] self-center justify-evenly items-start flex-col">
                <View className="flex-row justify-between items-center">
                    <Text className="text-[#3BB4E4] font-sans font-bold text-[32px]">THI Behaviors</Text>
                    <TouchableOpacity className="flex-row items-center space-around" onPress={toggleSidebar}>
                    <Image source={require('../assets/images/drawer_icon.png')} className="w-6 h-6 ml-9" />
                </TouchableOpacity>
                </View>
                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/(drawer)')}>
                    <Image source={require('../assets/images/home_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/students')}> 
                    <Image source={require('../assets/images/students_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Students</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/games')}>
                    <Image source={require('../assets/images/games_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Games</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/timer')}>
                    <Image source={require('../assets/images/timer_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/settings')}>
                    <Image source={require('../assets/images/settings_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Settings</Text>
                </TouchableOpacity>

                {/* Spacer */}
                <View className="h-[130px]" />

                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/')}>
                    <Image source={require('../assets/images/sign_out_icon.png')} className="w-6 h-6" />
                    <Text className="text-white font-sans font-bold text-[20px] pl-2">Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
}