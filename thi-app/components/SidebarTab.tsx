import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RelativePathString, useRouter, useSegments } from "expo-router";
import { View, Text, TouchableOpacity, Dimensions, DimensionValue, LayoutChangeEvent } from "react-native";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { useSidebarContext } from "@/components/Sidebar";

// Define props for sidebar tab
interface SidebarTabProps {
  iconSet: Icon<any, string>;
  iconName: string;
  iconSize?: number;
  iconSizeModifier?: number,
  label: string;
  useActiveColor?: boolean;
  tabWidth?: DimensionValue;
}

// Sidebar navigation tab
const SidebarTab = ({
  iconSet: Icon,
  iconName,
  iconSize,// = dynamicIconSize(),
  iconSizeModifier = 0,
  label,
  useActiveColor = true,
  tabWidth = "100%",
}: SidebarTabProps) => {

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
  const tabName = label === "Sign out" ? "" : label.toLowerCase();
  const directory = "/" + tabName;
  const isActive = currentScreen.includes(tabName);

  // Track dimensions
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  });
  
  // Listen for dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height
      });
    });
    
    return () => subscription.remove();
  }, []);
  
  // Sidebar tab details
  const tabHeight = dimensions.height * 0.11;
  const effectiveSidebarWidth = Math.max(closedSidebarWidth, dimensions.width * 0.02); // Ensure icons are properly sized in landscape
  const tabIconTextColor = useActiveColor && isActive ? activeIconTextColor : defaultIconTextColor;
  const tabButtonColor = useActiveColor && isActive ? activeTabColor : defaultTabColor;

  // Create state to measure actual container dimensions
  const [iconContainerSize, setIconContainerSize] = useState<number>(0);

  // Handle icon container layout to get actual dimensions
  const onIconContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const containerSize = Math.min(width, height);
    setIconContainerSize(containerSize);
  };
  
  // Calculate base icon size based on measured container dimensions
  const calculateBaseIconSize = () => {
    // If container size is not yet measured, use a safer estimate
    if (iconContainerSize === 0) {
      return Math.floor(effectiveSidebarWidth * 0.6);
    }
    // Use 83% of the container size for the icon
    return Math.floor(iconContainerSize * .83);
  };

  const baseSize = calculateBaseIconSize();
  const dynamicSize = iconSize !== undefined ? iconSize : baseSize + iconSizeModifier;

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
        onPress={() => router.push(directory as RelativePathString)}
      >
        <View
          className="justify-items-center items-center aspect-square"
          style={{ height: effectiveSidebarWidth }}
          onLayout={onIconContainerLayout}
        >
          <Icon name={iconName} size={dynamicSize} style={{ color: tabIconTextColor }} />
        </View>
        <View className="justify-items-center items-center pl-2 pb-1">
          <Text className="font-jost font-bold lg:text-2xl" style={{ color: tabIconTextColor }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default SidebarTab;
