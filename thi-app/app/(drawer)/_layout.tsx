import React, { createContext, useContext, useState, useRef } from 'react';
import { View, Dimensions, TouchableOpacity, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import Sidebar from '../../components/Sidebar';

// Context for managing sidebar state across ./(drawer)/*
const DrawerContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export const useDrawerContext = () => useContext(DrawerContext);

/*
 * Construct animated sliding segment anchored off the main
 * sidebar that stays visible when the 'drawer' is closed
 */
function PartialSidebarSegment({ animatedValue }: { animatedValue: Animated.Value }) {
  const { toggleSidebar } = useDrawerContext();

  // Interpolate sliding segment
  const translatePSS = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-(Dimensions.get('window').width * 0.18), 0],
  });

  // Interpolate button rotation (point right when closed, left when open)
  const rotateButton = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-90deg', '-180deg'],
  });

  return(
    <Animated.View style={{
      position: 'absolute',
      zIndex: 0, // Below main sidebar layer-wise
      transform:[{ translateX: translatePSS}]}}>

      {/* Sidebar 'overflow' segment */}
      <View className="flex-column bg-white" style={{
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width * 0.20,
      }}>

        {/* Spacer */}
        <View style={{
          height: Dimensions.get('window').height * 0.1
          }}/>

        {/* Open/collapse sidebar button */}
        <View className="items-center justify-center w-10 h-10 rounded-full shadow-lg bg-[#105366]" style={{
          right:-Dimensions.get('window').width * 0.19,
          }}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Animated.View style={{ transform: [{ rotate: rotateButton }]}}>
              <MaterialIcons name="keyboard-arrow-right" size={26} color="white"/>
            </Animated.View>
          </TouchableOpacity>
        </View>

      </View>

    </Animated.View>
  );
}

export default function Layout(props: DrawerContentComponentProps) {
  
  // Track sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();

  // Base animation on sidebar state
  const animatedValue = useRef(new Animated.Value(isSidebarOpen ? 1 : 0)).current;
  
  // Toggle sidebar state and animate slide
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      navigation.dispatch(DrawerActions.closeDrawer());
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
    Animated.timing(animatedValue, {
      toValue: isSidebarOpen ? 0 : 1,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  // // For ensuring the sidebar is correctly opened/closed according to its state
  // const ensureSidebarState = () => {
  //   if (isSidebarOpen) {
  //     navigation.dispatch(DrawerActions.openDrawer());
  //   } else {
  //     navigation.dispatch(DrawerActions.closeDrawer());
  //   }
  // };

  // // Ensure sidebar state at every ./drawer/* page load
  // useEffect(() => {
  //   ensureSidebarState();
  // }, [isSidebarOpen, navigation]);  // Triggers upon sidebar state change or navigation

  return (
    <SafeAreaView>
      <DrawerContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        <View className="flex-1 items-end">
          <PartialSidebarSegment animatedValue={animatedValue} />
          <Drawer
            screenOptions={{
              headerStyle: false,
              drawerType: 'slide',
              drawerStyle: {
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width * 0.18,
                zIndex: 2, // On top of PartialSidebarSegment layer-wise
              },
              swipeEnabled: false,
              overlayColor: 'transparent',
              headerShown: false, // Hides expo header including its default open/collapse sidebar button
            }}
            drawerContent={(props) => <Sidebar {...props} />}
          >
          </Drawer>
        </View>
      </DrawerContext.Provider>
    </SafeAreaView>
  );
}