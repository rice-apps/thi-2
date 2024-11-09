// import React, { useState, useEffect } from 'react';
// import { Dimensions, View, TouchableOpacity, Text } from 'react-native';
// import { createDrawerNavigator, DrawerNavigationProp, DrawerContentComponentProps } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import Sidebar from '../../components/Sidebar';

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props: DrawerContentComponentProps) {
//   return (
//     <View style={{ flex: 1 }}>
//       <Sidebar {...props} />
//     </View>
//   );
// }

// export default function DrawerLayout(props: DrawerContentComponentProps) {
//   // This automatically opens the drawer when the component is mounted
//   const navigation = useNavigation<DrawerNavigationProp<any>>();
//   useEffect(() => {
//     navigation.openDrawer();
//   }, [navigation]);

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   // Toggle the drawer open/close
//   const toggleDrawer = () => {
//     if (isDrawerOpen) {
//       navigation.closeDrawer();
//     } else {
//       navigation.openDrawer();
//     }
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerType: 'slide', // Slide to show the drawer
//         drawerStyle: {
//           width: Dimensions.get('window').width * 0.25,
//         },
//         overlayColor: 'transparent',
//         headerShown: false,
//       }}
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={Stack}
//         options={{
//           header: () => (
//             <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#17468F', height: 60 }}>
//               {/* Blue bar always visible */}
//               <TouchableOpacity onPress={toggleDrawer} style={{ paddingLeft: 20 }}>
//                 {/* Button to toggle drawer */}
//                 <Text style={{ color: 'white', fontSize: 24 }}>☰</Text>
//               </TouchableOpacity>
//               <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>THI Behaviors</Text>
//             </View>
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }


import React from 'react';
import { Dimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import Sidebar from '../../components/Sidebar';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <View style={{ flex: 1 }}>
      <Sidebar {...props} />
    </View>
  );
}

export default function DrawerLayout() {
    
    return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          width: Dimensions.get('window').width * 0.25,
        },
        overlayColor: 'transparent',
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* This Stack component acts as a placeholder for child routes */}
      <Drawer.Screen name="Home" component={Stack} />
    </Drawer.Navigator>
  );
}