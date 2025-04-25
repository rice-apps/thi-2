import Sidebar, {
    SidebarContext,
    useSidebarContext,
    useTransitionCustomization,
    useDimensions,
    calculateSidebarWidths,
} from "@/components/Sidebar";
import { Slot } from "expo-router";
import { useState, useEffect } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const DrawerLayout = () => {
    // Get reactive dimensions
    const dimensions = useDimensions();
    // Calculate sidebar widths based on current dimensions
    const { openWidth, closedWidth } = calculateSidebarWidths(dimensions);
    // Sidebar state, dimensions, and transition settings
    const { transitionEasing, transitionDuration } =
        useTransitionCustomization();
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const contextValues = useSidebarContext();
    // Tie animations to initial sidebar state (currently set to open)
    const sidebarAnimatedValue = useSharedValue(isSidebarOpen ? 1 : 0);
    const mainScreenWidth = useSharedValue(
        dimensions.width - (openWidth + closedWidth)
    );

    const toggleSidebar = async () => {
        if (
            (sidebarAnimatedValue.value === 1 && isSidebarOpen) ||
            (sidebarAnimatedValue.value === 0 && !isSidebarOpen)
        ) {
            setIsTransitioning(true);
            setIsSidebarOpen(!isSidebarOpen);
            transitionSidebar();
            transitionMainScreen();
            // Allow swipes after complete transition
            await delay(transitionDuration);
            setIsTransitioning(false);
        }
    };

    // Set main screen dynamic width
    const mainScreenAnimatedStyle = useAnimatedStyle(() => {
        return { width: mainScreenWidth.value };
    });

    // Transitions sidebar for 400ms duration
    const transitionSidebar = () => {
        sidebarAnimatedValue.value = withTiming(isSidebarOpen ? 0 : 1, {
            duration: transitionDuration,
            easing: transitionEasing,
        });
    };

    // Transitions main screen for 400ms duration
    const transitionMainScreen = () => {
        mainScreenWidth.value = withTiming(
            isSidebarOpen
                ? Dimensions.get("window").width - closedWidth
                : Dimensions.get("window").width -
                      (openWidth + closedWidth),
            {
                duration: transitionDuration,
                easing: transitionEasing,
            }
        );
    };

    // Horizontal swipe triggers sidebar toggle
    const swipeGesture = Gesture.Pan().onUpdate((event) => {
        // Ignore swipes mid-transition
        if (isTransitioning) return;
        // Threshold horizontal distance is 50 px to trigger
        if (
            (event.translationX > 50 && !isSidebarOpen) ||
            (event.translationX < -50 && isSidebarOpen)
        ) {
            runOnJS(toggleSidebar)();
        }
    });

    return (
        <SafeAreaView>
            <SidebarContext.Provider
                value={{
                    ...contextValues,
                    isSidebarOpen,
                    toggleSidebar,
                    openSidebarWidth: openWidth,
                    closedSidebarWidth : closedWidth,
                }}
            >
                <GestureDetector gesture={swipeGesture}>
                    <View className="flex-1 flex-row" collapsable={false}>
                        {/* Sidebar */}
                        <Sidebar animatedValue={sidebarAnimatedValue} />

                        {/* Main screen in ./(drawer)/ */}
                        <Animated.View
                            style={[
                                mainScreenAnimatedStyle,
                                {
                                    position: "absolute",
                                    right: 0,
                                    height: dimensions.height,
                                    zIndex: 0, // Covered by sidebar layer
                                },
                            ]}
                        >
                            <Slot />
                        </Animated.View>
                    </View>
                </GestureDetector>
            </SidebarContext.Provider>
        </SafeAreaView>
    );
};
export default DrawerLayout;
