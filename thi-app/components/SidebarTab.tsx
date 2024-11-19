import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RelativePathString, useRouter, useSegments } from 'expo-router';
import { View, Text, TouchableOpacity, Dimensions, DimensionValue } from 'react-native';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSidebarContext } from '@/components/Sidebar';

// Dynamic icon resizing
export function dynamicIconSize(): number {
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
export default SidebarTab;