import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { View, Dimensions, SafeAreaView, Animated, Easing } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSegments, Slot } from 'expo-router';
import Sidebar from '../../components/Sidebar';

// Context for managing sidebar state and interaction
const SidebarContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  transitionSidebar: (duration: number) => {},
  openSidebarWidth: Dimensions.get('window').width * 0.18,
  closedSidebarWidth: Dimensions.get('window').width * 0.02,
});

export const useSidebarContext = () => useContext(SidebarContext);

export default function Layout() {
  // Sidebar state, details
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { openSidebarWidth, closedSidebarWidth } = useSidebarContext();
  // Tie transitions to sidebar state
  const animatedValue = useRef(new Animated.Value(isSidebarOpen ? 1 : 0)).current;
  // To check ./(drawer)/* screens
  const segments: string[] = useSegments();
  
  // Toggle sidebar state and animate slide
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    transitionSidebar();
  };

  /*
   * Transitions the sidebar, button, and main content according to the current
   * sidebar state given by isSidebarOpen at input duration or the default 400ms.
   */
  const transitionSidebar = (duration: number = 400) => {
    Animated.timing(animatedValue, {
      toValue: isSidebarOpen ? 0 : 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  // Interpolate main content width (fill screen except sidebar)
  const mainContentWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width - closedSidebarWidth,
      Dimensions.get('window').width + openSidebarWidth]
  });

  // Instantly trigger correct transition when a `(drawer)` screen is focused / page load
  useFocusEffect(
    React.useCallback(() => {
      if (segments.includes('(drawer)')) {
        transitionSidebar(0);
      }
    }, [segments])
  );

  // // Load saved sidebar state on mount
  // useEffect(() => {
  //   const loadSidebarState = async () => {
  //     const storedState = await AsyncStorage.getItem('sidebarState');
  //     if (storedState !== null) {
  //       setIsSidebarOpen(storedState === 'open');
  //       animatedValue.setValue(storedState === 'open' ? 1 : 0);
  //     }
  //   };
  //   loadSidebarState();
  // }, []);

  return (
    <SafeAreaView>
      <SidebarContext.Provider value={{
        isSidebarOpen, toggleSidebar, transitionSidebar, openSidebarWidth, closedSidebarWidth
      }}>
        <View className="flex-1 flex-row">
          
          {/* Sidebar */}
          <Sidebar animatedValue={animatedValue} />
          
          {/* Main screen in ./(drawer)/* */}
          <Animated.View style={{
            position: 'absolute',
            width: mainContentWidth,
            height: Dimensions.get('window').height,
            zIndex: 0, // Covered by sidebar layer
          }}>
            <Slot />
          </Animated.View>

        </View>
      </SidebarContext.Provider>
    </SafeAreaView>
  );
}