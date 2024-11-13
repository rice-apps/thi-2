import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSidebarContext } from '../app/(drawer)/_layout';

export default function Sidebar({ animatedValue }: { animatedValue: Animated.Value }) {
    // For sidebar interaction
    const router = useRouter();
    const { toggleSidebar, openSidebarWidth, closedSidebarWidth } = useSidebarContext();
    
    // Interpolate sliding sidebar
    const translateSidebar = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-openSidebarWidth, 0],
    });

    // Interpolate button rotation (> when closed, < when open)
    const rotateButton = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '-90deg', '-180deg'],
    });

    return (
        // Animated container
        <Animated.View style={{
            height: Dimensions.get('window').height,
            zIndex: 1, // Overlays over main content
            transform:[{ translateX: translateSidebar}]}}>
        <View className="flex-1 justify-center bg-white" style={{
            height: Dimensions.get('window').height,
            width: openSidebarWidth + closedSidebarWidth,
        }}>

            {/* Open/collapse button */}
            <View className="items-center justify-center w-10 h-10 rounded-full shadow-lg bg-[#105366]" style={{
            position: 'absolute',
            top: '10%',
            left: openSidebarWidth + (Dimensions.get('window').width * 0.01),
            }}>
            <TouchableOpacity onPress={toggleSidebar}>
                <Animated.View style={{ transform: [{ rotate: rotateButton }]}}>
                <MaterialIcons name="keyboard-arrow-right" size={26} color="white"/>
                </Animated.View>
            </TouchableOpacity>
            </View>
            
            {/* Sidebar */}
            <View className="flex-1 self-center justify-evenly items-start flex-col">

                {/* App icon */}
                <View style={{ height: Dimensions.get('window').height * 1/4.5 }}>
                    <View className="flex-row justify-between items-center">
                        <Image source={require('../assets/images/bb_icon.png')} className="w-6 h-6" style={{
                            height: openSidebarWidth * .75,
                            width: openSidebarWidth * .75,
                        }} />
                    </View>
                </View>

                {/* Home */}
                <View style={{ height: Dimensions.get('window').height * 1/12.5 }}>
                    <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/(drawer)')}>
                        <Entypo name="home" size={20}/>
                        <Text className="text-black font-sans font-bold text-[20px] pl-2">Home</Text>
                    </TouchableOpacity>
                </View>

                {/* Students */}
                <View style={{ height: Dimensions.get('window').height * 1/12.5 }}>
                    <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/students')}> 
                        <FontAwesome6 name="user-large" size={17}/>
                        <Text className="text-black font-sans font-bold text-[20px] pl-2">Students</Text>
                    </TouchableOpacity>
                </View>

                {/* Games */}
                <View style={{ height: Dimensions.get('window').height * 1/12.5 }}>
                    <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/games')}>
                        <MaterialCommunityIcons name="gamepad-square-outline" size={20}/>
                        <Text className="text-black font-sans font-bold text-[20px] pl-2">Games</Text>
                    </TouchableOpacity>
                </View>

                {/* Timer */}
                <View style={{ height: Dimensions.get('window').height * 1/12.5 }}>
                    <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/timer')}>
                        <MaterialCommunityIcons name="timer-sand" size={20}/>
                        <Text className="text-black font-sans font-bold text-[20px] pl-2">Timer</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings */}
                <View style={{ height: Dimensions.get('window').height * 1/12.5 }}>
                    <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/settings')}>
                        <FontAwesome name="gear" size={20}/>
                        <Text className="text-black font-sans font-bold text-[20px] pl-2">Settings</Text>
                    </TouchableOpacity>
                </View>

                {/* Spacer */}
                <View style={{ height: Dimensions.get('window').height * .25 }} />
                
                {/* Sign out */}
                <View style={{ height: Dimensions.get('window').height * 1/12.5 }}>
                    <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/')}>
                        <Entypo name="log-out" size={20}/>
                        <Text className="text-black font-sans font-bold text-[20px] pl-2">Sign out</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>

        </Animated.View>
    );
}