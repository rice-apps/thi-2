import React, { createContext, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RelativePathString, useRouter, useSegments } from 'expo-router';
import { View, Text, TouchableOpacity, Image, Dimensions, Pressable, ViewStyle, DimensionValue } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, FadeInLeft, FadeOutLeft, Easing, AnimatedStyle } from 'react-native-reanimated';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Sidebar state, dimensions, and customization
export const SidebarContext = createContext({
    isSidebarOpen: true,
    toggleSidebar: () => {},
    openSidebarWidth: Dimensions.get('window').width * 0.18,
    closedSidebarWidth: Dimensions.get('window').width * 0.02,
    activeIconTextColor: 'white',
    defaultIconTextColor: 'black',
    activeTabColor: '#10536699',
    defaultTabColor: 'transparent',
    buttonColor: '#105366',
    buttonSize: 2.3, // in rem (1 rem = 16px)
});

// Customize transition settings
const TransitionCustomization = createContext({
    transitionEasing: Easing.out(Easing.cubic),
    transitionDuration: 400, // in ms
})

export const useSidebarContext = () => useContext(SidebarContext);
export const useTransitionCustomization = () => useContext(TransitionCustomization);

// Open/close sidebar button
const SidebarButton = ({ animatedStyle }: { animatedStyle: AnimatedStyle<ViewStyle> }) => {
    const {
        toggleSidebar,
        openSidebarWidth,
        closedSidebarWidth,
        buttonColor,
        buttonSize,
    } = useSidebarContext();

    return (
        <Pressable className="absolute top-[8%] items-center justify-center aspect-square rounded-full shadow-lg" style={{
            width: buttonSize * 16,
            backgroundColor: buttonColor,
            left: openSidebarWidth + closedSidebarWidth - (buttonSize * 16 / 2)
        }} onPress={toggleSidebar}>
            <Animated.View style={animatedStyle}>
                <MaterialIcons name="keyboard-arrow-right" size={buttonSize * 10.4} color="white"/>
            </Animated.View>
        </Pressable>
    );
}

// Define props for sidebar tab
interface SidebarTabProps {
    iconSet: typeof Entypo | typeof FontAwesome | typeof FontAwesome6 | typeof MaterialIcons | typeof MaterialCommunityIcons;
    iconName: string;
    iconSize?: number;
    label: string;
    useActiveColor?: boolean;
    tabWidth?: DimensionValue;
}

// Sidebar navigation tab
const SidebarTab = ({ iconSet: Icon, iconName, iconSize = dynamicIconSize(), label, useActiveColor = true, tabWidth = '100%' }: SidebarTabProps) => {
    // Sidebar details
    const {
        closedSidebarWidth,
        activeIconTextColor,
        defaultIconTextColor,
        activeTabColor,
        defaultTabColor,
    } = useSidebarContext();
    // Screen routing details
    const router = useRouter();
    const [currentScreen, setCurrentScreen] = useState<string>("");
    const segments: string[] = useSegments();
    const tabName = label === 'Sign out' ? '' : label.toLowerCase();
    const directory = '/' + tabName;
    const isActive = currentScreen.includes(tabName);
    // Sidebar tab details
    const tabHeight = Dimensions.get('window').height * 0.08;
    const tabIconTextColor = useActiveColor && isActive ? activeIconTextColor : defaultIconTextColor;
    const tabButtonColor = useActiveColor && isActive ? activeTabColor : defaultTabColor;

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
        <View className="w-full items-start" style={{ height: tabHeight }}>
            <TouchableOpacity
                className="flex-row justify-start items-center rounded-xl pl-6"
                style={{ height: tabHeight, backgroundColor: tabButtonColor, width: tabWidth }}
                //TODO: Temporary login page redirect for 'Sign out', impl sign out feature
                onPress={() => router.push(directory as RelativePathString)}>
                <View className="justify-items-center items-center aspect-square" style={{ height: closedSidebarWidth }}>
                    <Icon name={iconName} size={iconSize} style={{ color: tabIconTextColor }}/>
                </View>
                <View className="justify-items-center items-center pl-2 pb-1">
                    <Text className="font-jost font-bold lg:text-2xl" style={{ color: tabIconTextColor }}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

// Dynamic icon resizing
function dynamicIconSize(): number {
    const { closedSidebarWidth } = useSidebarContext();
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

const Sidebar = ({ animatedValue }: { animatedValue: SharedValue<number> }) => {
    // Sidebar and transition details
    const { transitionDuration, transitionEasing } = useTransitionCustomization();
    const { isSidebarOpen, openSidebarWidth, closedSidebarWidth } = useSidebarContext();
    const enteringAnimation = FadeInLeft.duration(transitionDuration / 1.5).easing(transitionEasing);
    const exitingAnimation = FadeOutLeft.duration(transitionDuration).easing(transitionEasing);

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

    return (
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
                <SidebarButton animatedStyle={buttonStyle}/>
                
                {/* Sidebar contents */}
                <View className="flex-1 self-center justify-center items-center flex-col">
                    {isSidebarOpen &&
                    (<Animated.View style={{ position:'relative', zIndex: 2}} entering={enteringAnimation} exiting={exitingAnimation}>

                        {/* App icon */}
                        <View className="justify-end" style={{ height: openSidebarWidth * .65 }}>
                            <Image className="flex-row justify-between self-center pt-5"
                            source={require('../assets/images/bb_icon.png')} style={{
                                height: openSidebarWidth * .60,
                                width: openSidebarWidth * .60,
                            }} />
                        </View>
                    
                        {/* Navigable screens */}
                        <View className="flex-col items-start justify-between" style={{
                            height: Dimensions.get('window').height * 0.45,
                            width: openSidebarWidth,
                            }}>

                            {/* Home */}
                            <SidebarTab iconSet={Entypo} iconName="home" label="Home"/>

                            {/* Students */}
                            <SidebarTab iconSet={FontAwesome6} iconName="user-large" iconSize={ dynamicIconSize() - 3 } label="Students"/>

                            {/* Schedule */}
                            <SidebarTab iconSet={MaterialCommunityIcons} iconName="calendar-multiple" label="Schedule"/>

                            {/* Games */}
                            <SidebarTab iconSet={MaterialCommunityIcons} iconName="gamepad-square-outline" label="Games"/>

                            {/* Timer */}
                            <SidebarTab iconSet={MaterialCommunityIcons} iconName="timer-sand" label="Timer"/>

                            {/* Settings */}
                            <SidebarTab iconSet={FontAwesome} iconName="gear" label="Settings"/>
                        
                        </View>

                    </Animated.View>)}
                        
                    {/* Spacer */}
                    <View className="flex-1 flex-shrink-2 relative justify-end items-start" style={{ width: openSidebarWidth, zIndex: 1 }}>
                        {isSidebarOpen &&
                        (<Animated.View entering={enteringAnimation} exiting={exitingAnimation}>

                            {/* Sign out */}
                            <SidebarTab iconSet={Entypo} iconName="log-out" iconSize={ dynamicIconSize() - 1 } label="Sign out" useActiveColor={false} tabWidth={openSidebarWidth * .7}/>

                        </Animated.View>)}
                    </View>

                    {/* Bottom padding */}
                    <View className="flex-1 flex-shrink-1" style={{ maxHeight: Dimensions.get('window').height * 0.06 }}/>
                        
                </View>
            </View>
        </Animated.View>
    );
}
export default Sidebar;