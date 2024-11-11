import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDrawerContext } from './_layout';

export default function GamesPage() {
  
  const { toggleSidebar, isSidebarOpen } = useDrawerContext();
  
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text>Placeholder games page</Text>
      <Button
        title={isSidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}
        onPress={toggleSidebar}
      />
    </View>
  );
}