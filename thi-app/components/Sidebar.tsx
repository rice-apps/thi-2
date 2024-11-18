import React, { createContext, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useSegments } from 'expo-router';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Pressable,
} from 'react-native';
import Animated, {
    SharedValue,
    useAnimatedStyle,
    interpolate,
    FadeInLeft,
    FadeOutLeft,
    Easing,
} from 'react-native-reanimated';
import {
    Entypo,
    FontAwesome,
    FontAwesome6,
    MaterialIcons,
    MaterialCommunityIcons
} from '@expo/vector-icons';

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
    buttonSize: 2.3, // in rem (1 rem = 16px)
})

// Customize transition settings
const TransitionCustomization = createContext({
    transitionEasing: Easing.out(Easing.cubic),
    transitionDuration: 400, // in ms
})

export const useScreenContext = () => useContext(ScreenContext);
export const useSidebarContext = () => useContext(SidebarContext);
export const useSidebarCustomization = () => useContext(SidebarCustomization);
export const useTransitionCustomization = () => useContext(TransitionCustomization);

const Sidebar = ({ animatedValue }: { animatedValue: SharedValue<number> }) => {
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

    // Sidebar slide interpolation
    const sidebarStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(animatedValue.value, [0, 1], [-openSidebarWidth, 0]) }
        ],
    }));
    // Button rotation interpolation (> when closed, < when open)
    const buttonStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: `${interpolate(animatedValue.value, [0, 0.5, 1], [0, -90, -180])}deg` }
        ],
    }));

    // Dynamic icon resizing
    function dynamicIconSize(): number {
        let size;
        const height = Dimensions.get('window').height;
        const outerContainerHeight = closedSidebarWidth;
        if ((height >= 800) && (height > outerContainerHeight)) {
            size = 32; // lg:text-2xl
        } else if ((height >= 600) && (height > outerContainerHeight)) {
            size = 24; // md:text-xl
        } else {
            size = 16; // default for small phones
        }
        return size;
    }

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
                <Pressable className="absolute top-[8%] items-center justify-center aspect-square rounded-full shadow-lg" style={{
                    width: buttonSize * 16,
                    backgroundColor: buttonColor,
                    left: openSidebarWidth + closedSidebarWidth - (buttonSize * 16 / 2)
                }} onPress={toggleSidebar}>
                    <Animated.View style={buttonStyle}>
                        <MaterialIcons name="keyboard-arrow-right" size={buttonSize * 10.4} color="white"/>
                    </Animated.View>
                </Pressable>
                
                {/* Sidebar */}
                <View className="flex-1 self-center justify-center items-center flex-col">

                    {/* App icon */}
                    {isSidebarOpen &&
                    (<Animated.View
                        entering={FadeInLeft.duration(transitionDuration / 1.5).easing(transitionEasing)}
                        exiting={FadeOutLeft.duration(transitionDuration).easing(transitionEasing)}>
                        <View className="justify-end" style={{ height: openSidebarWidth * .65 }}>
                            <Image className="flex-row justify-between self-center pt-5"
                            source={require('../assets/images/bb_icon.png')} style={{
                                height: openSidebarWidth * .60,
                                width: openSidebarWidth * .60,
                            }} />
                        </View>
                    </Animated.View>)}
                    
                    {/* Navigable screens */}
                    {isSidebarOpen &&
                    (<Animated.View style={{ zIndex: 2}}
                        entering={FadeInLeft.duration(transitionDuration / 1.5).easing(transitionEasing)}
                        exiting={FadeOutLeft.duration(transitionDuration).easing(transitionEasing)}>
                        <View className="flex-col items-start justify-between" style={{
                            height: Dimensions.get('window').height * 0.45,
                            width: openSidebarWidth,
                            }}>

                            {/* Home */}
                            <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                                <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    backgroundColor: currentScreen.includes('home') ? currentDrawerColor : defaultDrawerColor,
                                }} onPress={() => router.push('/(drawer)/home')}>
                                    <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                        <Entypo name="home" size={ dynamicIconSize() }
                                        style={{ color: currentScreen.includes('home') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1" style={{ height: closedSidebarWidth }}>
                                        <Text className="font-sans font-bold lg:text-2xl"
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
                                        <FontAwesome6 name="user-large" size={ dynamicIconSize() - 3 }
                                        style={{ color: currentScreen.includes('students') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold lg:text-2xl"
                                        style={{ color: currentScreen.includes('students') ? currentIconTextColor : defaultIconTextColor }}>Students</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Schedule */}
                            <View className="w-full items-start" style={{ height: Dimensions.get('window').height * 0.08 }}>
                                <TouchableOpacity className="w-full flex-row justify-start items-center rounded-xl pl-6" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    backgroundColor: currentScreen.includes('schedule') ? currentDrawerColor : defaultDrawerColor,
                                }} onPress={() => router.push('/schedule')}>
                                    <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                        <MaterialCommunityIcons name="calendar-multiple" size={ dynamicIconSize() }
                                        style={{ color: currentScreen.includes('schedule') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold lg:text-2xl"
                                        style={{ color: currentScreen.includes('schedule') ? currentIconTextColor : defaultIconTextColor }}>Schedule</Text>
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
                                        <MaterialCommunityIcons name="gamepad-square-outline" size={ dynamicIconSize() }
                                        style={{ color: currentScreen.includes('games') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold lg:text-2xl"
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
                                        <MaterialCommunityIcons name="timer-sand" size={ dynamicIconSize() }
                                        style={{ color: currentScreen.includes('timer') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold lg:text-2xl"
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
                                        <FontAwesome name="gear" size={ dynamicIconSize() }
                                        style={{ color: currentScreen.includes('settings') ? currentIconTextColor : defaultIconTextColor }}/>
                                    </View>
                                    <View className="justify-items-center items-center pl-2 pb-1">
                                        <Text className="font-sans font-bold lg:text-2xl" 
                                        style={{ color: currentScreen.includes('settings') ? currentIconTextColor : defaultIconTextColor }}>Settings</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        
                        </View>
                    </Animated.View>)}
                        
                        {/* Sign out */}
                        <View className="flex-1 flex-shrink-1" style={{
                            width: openSidebarWidth,
                            position:'relative',
                            zIndex: 1
                            }}>
                            <View className="flex-1 absolute bottom-0 justify-center items-center" style={{ height: Dimensions.get('window').height * 0.16 }}>
                                <TouchableOpacity className="flex-row" style={{
                                    height: Dimensions.get('window').height * 0.08,
                                    width: openSidebarWidth * .7,
                                }}
                                //TODO: Temporary login page redirect, impl sign out feature
                                onPress={() => router.push('/')}>
                                    {isSidebarOpen &&
                                    (<Animated.View
                                        entering={FadeInLeft.duration(transitionDuration / 1.5).easing(transitionEasing)}
                                        exiting={FadeOutLeft.duration(transitionDuration).easing(transitionEasing)}>
                                        <View className="flex-row justify-start-items-center pl-6" style={{width: openSidebarWidth * .7}}>
                                            <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                                                <Entypo name="log-out" size={ dynamicIconSize() - 1 } style={{ color: defaultIconTextColor }}/>
                                            </View>
                                            <View className="justify-items-center items-center pl-2 pb-1">
                                                <Text className="font-sans font-bold lg:text-2xl" style={{ color: defaultIconTextColor}}>Sign Out</Text>
                                            </View>
                                        </View>
                                    </Animated.View>)}
                                </TouchableOpacity>
                            </View>
                        </View>

                </View>
            </View>
        </Animated.View>
    );
}
export default Sidebar;