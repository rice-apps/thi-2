import React, { useState } from "react";
import { View, Dimensions, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import Sidebar, {
  SidebarContext,
  useSidebarContext,
  useTransitionCustomization,
} from "@/components/Sidebar";

const DrawerLayout = () => {
  // Sidebar state, dimensions, and transition settings
  const { transitionEasing, transitionDuration } = useTransitionCustomization();
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const {
    openSidebarWidth,
    closedSidebarWidth,
    activeIconTextColor,
    defaultIconTextColor,
    activeTabColor,
    defaultTabColor,
    buttonColor,
    buttonSize,
  } = useSidebarContext();
  // Tie animations to initial sidebar state (currently set to open)
  const sidebarAnimatedValue = useSharedValue(isSidebarOpen ? 1 : 0);
  const mainScreenWidth = useSharedValue(
    Dimensions.get("window").width - (openSidebarWidth + closedSidebarWidth)
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
        ? Dimensions.get("window").width - closedSidebarWidth
        : Dimensions.get("window").width - (openSidebarWidth + closedSidebarWidth),
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
          isSidebarOpen,
          toggleSidebar,
          openSidebarWidth,
          closedSidebarWidth,
          activeIconTextColor,
          defaultIconTextColor,
          activeTabColor,
          defaultTabColor,
          buttonColor,
          buttonSize,
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
                  height: Dimensions.get("window").height,
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
