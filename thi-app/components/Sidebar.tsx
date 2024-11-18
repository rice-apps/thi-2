import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, FadeIn, FadeOut } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useSegments } from 'expo-router';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTransitionCustomization } from '@/app/(drawer)/_layout';

// Context for current screen
export const ScreenContext = createContext({
    currentScreen: "",
    setCurrentScreen: () => {},
});

// Context for sidebar state and dimensions
export const SidebarContext = createContext({
    isSidebarOpen: true,
    toggleSidebar: () => {},
    openSidebarWidth: Dimensions.get('window').width * 0.18,
    closedSidebarWidth: Dimensions.get('window').width * 0.02,
});

// Customize sidebar
const SidebarCustomization = createContext({
    currentIconTextColor: 'white',
    defaultIconTextColor: 'black',
    currentDrawerColor: '#10536699',
    defaultDrawerColor: 'transparent',
    buttonColor: '#105366',
    buttonSize: 2.5, // in rem (1 rem = 16px)
    // Add more
})

export const useScreenContext = () => useContext(ScreenContext);
export const useSidebarContext = () => useContext(SidebarContext);
export const useSidebarCustomization = () => useContext(SidebarCustomization);

export default function Sidebar({ animatedValue }: { animatedValue: SharedValue<number> }) {
    // Sidebar state and screen details
    const router = useRouter();
    const { isSidebarOpen, toggleSidebar, openSidebarWidth, closedSidebarWidth } = useSidebarContext();
    const { transitionDuration, transitionEasing } = useTransitionCustomization();
    const [currentScreen, setCurrentScreen] = useState<string>("");
    const segments: string[] = useSegments();
    // Sidebar customizations
    const {
        currentIconTextColor,
        defaultIconTextColor,
        currentDrawerColor,
        defaultDrawerColor,
        buttonColor,
        buttonSize,
    } = useSidebarCustomization();

    /* Animation interpolations */

    // Sidebar slide
    const sidebarStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(animatedValue.value, [0, 1], [-openSidebarWidth, 0]) }
        ],
    }));
    // Button rotation (> when closed, < when open)
    const buttonStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: `${interpolate(animatedValue.value, [0, 0.5, 1], [0, -90, -180])}deg` }
        ],
    }));
    // Move current screen highlight off-screen when closed
    const currentHighlightStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(animatedValue.value, [0, 1], [-closedSidebarWidth * 0.5, 0]) }
        ],
    }));

    // Set current screen name (e.g. "students" for (drawer)/students)
    useFocusEffect(
        React.useCallback(() => {
            if (segments.length > 0) {
                // Set screen name to last segment of URL
                const screenName = segments[segments.length - 1];
                setCurrentScreen(screenName);
            }
        }, [segments])
    );

    return (
        // Animated sidebar container
        <Animated.View style={[
            sidebarStyle,
            {
                height: Dimensions.get('window').height,
                zIndex: 1, // Overlays over main content
            }]}>
            <View className="flex-1 justify-center bg-white" style={{
                height: Dimensions.get('window').height,
                width: openSidebarWidth + closedSidebarWidth,
            }}>

                {/* Open/collapse button */}
                <View className="absolute top-[10%] items-center justify-center aspect-square rounded-full shadow-lg" style={{
                    width: buttonSize * 16,
                    backgroundColor: buttonColor,
                    left: openSidebarWidth + closedSidebarWidth - (buttonSize * 16 / 2)
                }}>
                <TouchableOpacity onPress={toggleSidebar}>
                    <Animated.View style={buttonStyle}>
                        <MaterialIcons name="keyboard-arrow-right" size={buttonSize * 10.4} color="white"/>
                    </Animated.View>
                </TouchableOpacity>
                </View>
                
                {/* Sidebar */}
                <View className="flex-1 self-center justify-center items-center flex-col">

                    {/* App icon */}
                    <View style={{ height: openSidebarWidth * .70 }}>
                        <Image className="flex-row justify-between self-center pt-5"
                        source={require('../assets/images/bb_icon.png')} style={{
                            height: openSidebarWidth * .65,
                            width: openSidebarWidth * .65,
                        }} />
                    </View>
                    
                    {/* Navigable screens */}
                    <Animated.View style={currentHighlightStyle}
                    entering={FadeIn.duration(transitionDuration).easing(transitionEasing)} exiting={FadeOut.duration(transitionDuration).easing(transitionEasing)}>
                        <View className="flex-col items-start justify-between" style={{
                            height: Dimensions.get('window').height * 0.45,
                            width: openSidebarWidth
                            }}>

                            {/* Home */}
                            <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                                <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    backgroundColor: currentScreen.includes('home') ? currentDrawerColor : defaultDrawerColor,
                                }} onPress={() => router.push('/(drawer)/home')}>
                                    <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                        <Entypo name="home" size={26} style={{ color: currentScreen.includes('home') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1" style={{ height: closedSidebarWidth }}>
                                        <Text className="font-sans font-bold text-[23px]"
                                        style={{ color: currentScreen.includes('home') ? currentIconTextColor : defaultIconTextColor }}>Home</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Students */}
                            <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                                <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    backgroundColor: currentScreen.includes('students') ? currentDrawerColor : defaultDrawerColor,
                                }} onPress={() => router.push('/students')}>
                                    <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                        <FontAwesome6 name="user-large" size={23} style={{ color: currentScreen.includes('students') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold text-[23px]"
                                        style={{ color: currentScreen.includes('students') ? currentIconTextColor : defaultIconTextColor }}>Students</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Games */}
                            <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                                <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    backgroundColor: currentScreen.includes('games') ? currentDrawerColor : defaultDrawerColor,
                                }} onPress={() => router.push('/games')}>
                                    <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                        <MaterialCommunityIcons name="gamepad-square-outline" size={26} style={{ color: currentScreen.includes('games') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold text-[23px]"
                                        style={{ color: currentScreen.includes('games') ? currentIconTextColor : defaultIconTextColor }}>Games</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Timer */}
                            <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                                <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    backgroundColor: currentScreen.includes('timer') ? currentDrawerColor : defaultDrawerColor,
                                }} onPress={() => router.push('/timer')}>
                                    <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                        <MaterialCommunityIcons name="timer-sand" size={26} style={{ color: currentScreen.includes('timer') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold text-[23px]"
                                        style={{ color: currentScreen.includes('timer') ? currentIconTextColor : defaultIconTextColor }}>Timer</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Settings */}
                            <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                                <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    backgroundColor: currentScreen.includes('settings') ? currentDrawerColor : defaultDrawerColor,
                                }} onPress={() => router.push('/settings')}>
                                    <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                        <FontAwesome name="gear" size={26} style={{ color: currentScreen.includes('settings') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold text-[23px]" 
                                        style={{ color: currentScreen.includes('settings') ? currentIconTextColor : defaultIconTextColor }}>Settings</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        
                        </View>
                    </Animated.View>
                        
                        {/* Sign out */}
                        <View className="flex-1 flex-shrink-1" style={{ width: openSidebarWidth }}>
                            <View className="flex-1 absolute bottom-0" style={{ height: Dimensions.get('window').height * 0.16 }}>
                                <TouchableOpacity className="flex-1 flex-row justify-start items-center pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    width: openSidebarWidth * .7,
                                }}
                                onPress={() => router.push('/')}>
                                <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                    <Entypo name="log-out" size={25} style={{ color: defaultIconTextColor}}/>
                                </View>
                                <View className="justify-items-center items-center pl-2 pb-1">
                                    <Text className="font-sans font-bold text-[23px]" style={{ color: defaultIconTextColor}}>Sign Out</Text>
                                </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                </View>
            </View>
        </Animated.View>
    );
}