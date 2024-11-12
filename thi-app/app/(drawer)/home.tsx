import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function HomePage() {
  
  // const navigation = useNavigation();
  // useEffect(() => {
  //   // Open drawer upon loading the homepage
  //   navigation.dispatch(DrawerActions.openDrawer());
  // }, [navigation]);

  return (
    <View className="flex-1 flex-column m-4 bg-gray-100">
      <View className="flex-row flex-start bg-gray-100">
        <Text>Welcome</Text>
      </View>
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text>Placeholder home page</Text>
      </View>
    </View>
  );
}