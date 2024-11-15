import React, { useState } from 'react';
import { View, Dimensions, SafeAreaView, Easing } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Slot } from 'expo-router';
import Sidebar, { SidebarContext, useSidebarContext } from '../../components/Sidebar';

export default function Layout() {
  // Sidebar state, dimensions
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { openSidebarWidth, closedSidebarWidth } = useSidebarContext();
  // Tie animations to sidebar state (init to when )
  const sidebarAnimatedValue = useSharedValue(isSidebarOpen ? 1 : 0);
  const mainScreenWidth = useSharedValue(
    Dimensions.get('window').width - (openSidebarWidth + closedSidebarWidth));

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    transitionMainScreen();
    transitionSidebar();
  };

  // Animated style with dynamic width
  const mainScreenAnimatedStyle = useAnimatedStyle(() => {
    return { width: mainScreenWidth.value, };
  });

  // Trigger animation to change width
  const transitionMainScreen = () => {
    mainScreenWidth.value = withTiming(
      Dimensions.get('window').width - (isSidebarOpen ? closedSidebarWidth : (
        openSidebarWidth + closedSidebarWidth)),
        {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        });
  };

  /*
   * Transitions sidebar according to current sidebar state
   * 'isSidebarOpen' for input duration or default 400ms.
   */
  const transitionSidebar = (duration: number = 400) => {
    sidebarAnimatedValue.value = withTiming(
      sidebarAnimatedValue.value === 0 ? 1 : 0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
  };

  return (
    <SafeAreaView>
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, openSidebarWidth, closedSidebarWidth }}>
        <View className="flex-1 flex-row">
          
          {/* Sidebar */}
          <Sidebar animatedValue={sidebarAnimatedValue} />
          
          {/* Main screen in ./(drawer) */}
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
      </SidebarContext.Provider>
    </SafeAreaView>
  );
}