import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import Sidebar from '../../components/Sidebar';

// Track and toggle sidebar state across ./(drawer)/*
const DrawerContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});

export const useDrawerContext = () => useContext(DrawerContext);

export default function Layout(props: DrawerContentComponentProps) {
  
  // Track sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigation = useNavigation();
  
  // For toggling sidebar state
  const toggleSidebar = () => {
    if (isSidebarOpen) {
      navigation.dispatch(DrawerActions.closeDrawer());
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
    setIsSidebarOpen(!isSidebarOpen);
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
  //   // ensureSidebarState();
  // }, [isSidebarOpen, navigation]);  // Triggers upon sidebar state change or navigation

  return (
    <DrawerContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <Drawer
        screenOptions={{
          headerStyle: false,
          drawerType: isSidebarOpen ? 'permanent' : 'slide',
          drawerStyle: {
            width: Dimensions.get('window').width * 0.20,
          },
          swipeEnabled: false,
          overlayColor: 'transparent',
          headerShown: false, // Hides expo header including the default sidebar open/collapse button
        }}
        drawerContent={(props) => <Sidebar {...props} />}
      >
      </Drawer>
    </DrawerContext.Provider>
  );
}