import React, { createContext, useContext, useState } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import Sidebar, { SidebarContext, useSidebarContext } from '../../components/Sidebar';

// Customize transition settings
const TransitionCustomization = createContext({
  transitionEasing: Easing.out(Easing.cubic),
  transitionDuration: 400, // in ms
  // Add more
})

export const useTransitionCustomization = () => useContext(TransitionCustomization);

export default function Layout() {
  // Sidebar state, dimensions
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { openSidebarWidth, closedSidebarWidth } = useSidebarContext();
  // Tie animations to initial sidebar state (currently set to open)
  const sidebarAnimatedValue = useSharedValue(isSidebarOpen ? 1 : 0);
  const mainScreenWidth = useSharedValue(
    Dimensions.get('window').width - (openSidebarWidth + closedSidebarWidth));
  // Transition settings
  const { transitionEasing, transitionDuration } = useTransitionCustomization();
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Toggle sidebar state
  const toggleSidebar = async () => {
    // Perform transitions
    setIsTransitioning(true);
    setIsSidebarOpen(!isSidebarOpen);
    transitionMainScreen();
    transitionSidebar();
    // Allow swipes after 400ms duration
    await delay(transitionDuration);
    setIsTransitioning(false);
  };

  // Set main screen dynamic width
  const mainScreenAnimatedStyle = useAnimatedStyle(() => {
    return { width: mainScreenWidth.value };
  });

  // Transitions main screen for 400ms duration
  const transitionMainScreen = () => {
    mainScreenWidth.value = withTiming(
      (mainScreenWidth.value === Dimensions.get('window').width - (openSidebarWidth + closedSidebarWidth) && isSidebarOpen) ?
      Dimensions.get('window').width - closedSidebarWidth : 
      Dimensions.get('window').width - (openSidebarWidth + closedSidebarWidth),
        {
          duration: transitionDuration,
          easing: transitionEasing,
        }
    );
  };

  // Transitions sidebar for 400ms duration
  const transitionSidebar = () => {
    sidebarAnimatedValue.value = withTiming(
      sidebarAnimatedValue.value === 1 && isSidebarOpen ? 0 : 1, {
        duration: transitionDuration,
        easing: transitionEasing,
      }
    );
  };

  // Horizontal swipes trigger
  const swipeGesture = Gesture.Pan()
  .onUpdate((event) => {
    // Ignore swipes mid-transition
    if (isTransitioning) return;
    // Threshold horizontal distance in px for swipe to trigger
    if (event.translationX > 50 && !isSidebarOpen) {
      // Swipe right opens sidebar
      toggleSidebar();
    } else if (event.translationX < -50 && isSidebarOpen) {
      // Swipe left closes sidebar
      toggleSidebar();
    }
  });

  return (
    <SafeAreaView>
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, openSidebarWidth, closedSidebarWidth }}>
        <GestureDetector gesture={swipeGesture}>
          <View className="flex-1 flex-row" collapsable={false}>
            
            {/* Sidebar */}
            <Sidebar animatedValue={sidebarAnimatedValue} />
            
            {/* Main screen in ./(drawer)/ */}
            <Animated.View style={[
              mainScreenAnimatedStyle,
              {
                position: 'absolute',
                right: 0,
                height: Dimensions.get('window').height,
                zIndex: 0, // Covered by sidebar layer
              },
            ]}>
                <Slot />
            </Animated.View>

          </View>
          </GestureDetector>
      </SidebarContext.Provider>
    </SafeAreaView>
  );
}