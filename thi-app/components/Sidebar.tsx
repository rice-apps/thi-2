import React , { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter , useSegments } from 'expo-router';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSidebarContext } from '../app/(drawer)/_layout';

// Init type for declaring screen context
type ScreenContextType = {
    currentScreen: string;
    setCurrentScreen: (screen: string) => void;
  };
  
// Context for current screen
const ScreenContext = createContext<ScreenContextType>({
    currentScreen: "",
    setCurrentScreen: () => {},
});

export const useScreenContext = () => useContext(ScreenContext);

export default function Sidebar({ animatedValue }: { animatedValue: Animated.Value }) {
    // Sidebar interaction, detail(s)
    const router = useRouter();
    const { toggleSidebar, openSidebarWidth, closedSidebarWidth } = useSidebarContext();
    // Screen detail(s)
    const [currentScreen, setCurrentScreen] = useState<string>("");
    // To check ./(drawer)/* screens
    const segments: string[] = useSegments();
    
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
    // Interpolate putting navigable screens off-screen when closed
    const hideCurrentColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-openSidebarWidth * 0.1, 0]
    });

    // Set current screen's name when a new screen is focused
    useFocusEffect(
        React.useCallback(() => {
        if (segments.length > 0) {
            // Set screen name to last segment of URL
            const screenName = segments[segments.length - 1];
            setCurrentScreen(screenName);
            // console.log(screenName);
        }
        }, [segments])
    );

    return (
        // Animated sidebar container
        <Animated.View style={{
            height: Dimensions.get('window').height,
            zIndex: 1, // Overlays over main content
            transform:[{ translateX: translateSidebar }]}}>
        <View className="flex-1 justify-center bg-white" style={{
            height: Dimensions.get('window').height,
            width: openSidebarWidth + closedSidebarWidth,
        }}>

            {/* Open/collapse button */}
            <View className="absolute top-[10%] items-center justify-center w-10 h-10 rounded-full shadow-lg bg-[#105366]" style={{
                left: openSidebarWidth + closedSidebarWidth - 20 // anchored on edge of sidebar
            }}>
            <TouchableOpacity onPress={toggleSidebar}>
                <Animated.View style={{ transform: [{ rotate: rotateButton }] }}>
                    <MaterialIcons name="keyboard-arrow-right" size={26} color="white"/>
                </Animated.View>
            </TouchableOpacity>
            </View>
            
            {/* Sidebar */}
            <View className="flex-1 self-center justify-center items-center flex-col">

                {/* App icon */}
                <View className="self-center justify-center items-center" style={{ height: openSidebarWidth * .70 }}>
                    <Image className="flex-row justify-between self-center pt-5 w-6 h-6"
                    source={require('../assets/images/bb_icon.png')} style={{
                        height: openSidebarWidth * .65,
                        width: openSidebarWidth * .65,
                    }} />
                </View>
                
                {/* Navigable screens */}
                <Animated.View style={{ transform:[{ translateX: hideCurrentColor }] }}>
                    <View className="flex-col items-start justify-between" style={{
                        height: Dimensions.get('window').height * 0.45,
                        width: openSidebarWidth
                        }}>

                        {/* Home */}
                        <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                            <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                height: Dimensions.get('window').height * 0.08,
                                backgroundColor: currentScreen.includes('home') ? '#10536699' : 'transparent',
                            }} onPress={() => router.push('/(drawer)')}>
                                <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                    <Entypo name="home" size={26} style={{ color: currentScreen.includes('home') ? 'white' : 'black' }}/>
                                </View>
                                <View className="justify-items-center items-center pl-2 pb-1" style={{ height: closedSidebarWidth }}>
                                    <Text className="text-black font-sans font-bold text-[23px]"
                                    style={{ color: currentScreen.includes('home') ? 'white' : 'black' }}>Home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Students */}
                        <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                            <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                height: Dimensions.get('window').height * 0.08,
                                backgroundColor: currentScreen.includes('students') ? '#10536699' : 'transparent',
                            }} onPress={() => router.push('/students')}>
                                <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                    <FontAwesome6 name="user-large" size={23} style={{ color: currentScreen.includes('students') ? 'white' : 'black' }}/>
                                </View>
                                <View className="justify-items-center items-center pl-2 pb-1">
                                    <Text className="text-black font-sans font-bold text-[23px]"
                                    style={{ color: currentScreen.includes('students') ? 'white' : 'black' }}>Students</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Games */}
                        <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                            <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                height: Dimensions.get('window').height * 0.08,
                                backgroundColor: currentScreen.includes('games') ? '#10536699' : 'transparent',
                            }} onPress={() => router.push('/games')}>
                                <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                    <MaterialCommunityIcons name="gamepad-square-outline" size={26} style={{ color: currentScreen.includes('games') ? 'white' : 'black' }}/>
                                </View>
                                <View className="justify-items-center items-center pl-2 pb-1">
                                    <Text className="text-black font-sans font-bold text-[23px]"
                                    style={{ color: currentScreen.includes('games') ? 'white' : 'black' }}>Games</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Timer */}
                        <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                            <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                height: Dimensions.get('window').height * 0.08,
                                backgroundColor: currentScreen.includes('timer') ? '#10536699' : 'transparent',
                            }} onPress={() => router.push('/timer')}>
                                <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                    <MaterialCommunityIcons name="timer-sand" size={26} style={{ color: currentScreen.includes('timer') ? 'white' : 'black' }}/>
                                </View>
                                <View className="justify-items-center items-center pl-2 pb-1">
                                    <Text className="text-black font-sans font-bold text-[23px]"
                                    style={{ color: currentScreen.includes('timer') ? 'white' : 'black' }}>Timer</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Settings */}
                        <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                            <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                height: Dimensions.get('window').height * 0.08,
                                backgroundColor: currentScreen.includes('settings') ? '#10536699' : 'transparent',
                            }} onPress={() => router.push('/settings')}>
                                <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                    <FontAwesome name="gear" size={26} style={{ color: currentScreen.includes('settings') ? 'white' : 'black' }}/>
                                </View>
                                <View className="justify-items-center items-center pl-2 pb-1">
                                    <Text className="text-black font-sans font-bold text-[23px]" 
                                    style={{ color: currentScreen.includes('settings') ? 'white' : 'black' }}>Settings</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </Animated.View>
                    
                    {/* Sign out */}
                    <View className="flex-1 flex-shrink-0" style={{ width: openSidebarWidth }}>
                        <View className="flex-1 absolute bottom-0" style={{ height: Dimensions.get('window').height * 0.16 }}>
                            <TouchableOpacity className="flex-1 flex-row justify-start items-center pl-6" style={{
                                height: Dimensions.get('window').height * 0.08,
                                width: openSidebarWidth * .7,
                            }}
                            onPress={() => router.push('/')}>
                            <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                <Entypo name="log-out" size={25}/>
                            </View>
                            <View className="justify-items-center items-center pl-2 pb-1">
                                <Text className="text-black font-sans font-bold text-[23px]">Sign Out</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>

            </View>

        </View>
        </Animated.View>
    );
}