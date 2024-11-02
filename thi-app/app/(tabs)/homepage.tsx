import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import Sidebar from '../../components/Sidebar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text>Placeholder home page content</Text>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <View{...props} style={{ flex: 1 }}>
      <Sidebar navigation={props.navigation} />
    </View>
  );
}
      
export default function HomeScreen() {
  return (
      <Drawer.Navigator  
      screenOptions={{
        headerStyle: false,
        drawerStyle: {
          width: Dimensions.get('window').width * 0.25
        }
      }}
        initialRouteName="Home" 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomePage} />
      </Drawer.Navigator> 
  );
}

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Optional: you can change the background color
  },
});