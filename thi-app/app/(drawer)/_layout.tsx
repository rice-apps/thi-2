import React, { useState, useRef } from 'react';
import { View, Dimensions, SafeAreaView, Animated, LayoutAnimation, Easing } from 'react-native';
import { Slot } from 'expo-router';
import Sidebar, { SidebarContext, useSidebarContext } from '../../components/Sidebar';

export default function Layout() {
  // Sidebar state, dimensions
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { openSidebarWidth, closedSidebarWidth } = useSidebarContext();
  // Animated value for smooth width transition
  const [mainScreenWidth, setMainScreenWidth] = useState(Dimensions.get('window').width - openSidebarWidth);
  // Tie transitions to sidebar state
  const animatedValue = useRef(new Animated.Value(isSidebarOpen ? 1 : 0)).current;

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    transitionSidebar();
    transitionMainScreen();
  };

  /*
  * Transitions main screen for input duration or default 400ms.
  */
  const transitionMainScreen = (duration: number = 400) => {
    LayoutAnimation.configureNext({
      duration,
      create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleX,
      },
      update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          springDamping: 0.7,
      },
    });
    // Adjust width based on sidebar state
    setMainScreenWidth(isSidebarOpen ? Dimensions.get('window').width - closedSidebarWidth :
    Dimensions.get('window').width - openSidebarWidth);
  };

  /*
  * Transitions sidebar according to current sidebar state
  * 'isSidebarOpen' for input duration or default 400ms.
  */
  const transitionSidebar = (duration: number = 400) => {
    Animated.timing(animatedValue, {
    toValue: isSidebarOpen ? 0 : 1,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView>
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, openSidebarWidth, closedSidebarWidth }}>
        <View className="flex-1 flex-row">
          
          {/* Sidebar */}
          <Sidebar animatedValue={animatedValue} />
          
          {/* Main screen in ./(drawer) */}
          <View style={{
            position: 'absolute',
            right: 0,
            width: mainScreenWidth,
            height: Dimensions.get('window').height,
            zIndex: 0, // Covered by sidebar layer
            }}>
              <Slot />
          </View>

        </View>
      </SidebarContext.Provider>
    </SafeAreaView>
  );
}