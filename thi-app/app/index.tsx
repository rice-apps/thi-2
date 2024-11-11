import React from 'react';
import { View, Text, Button, } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();
  
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text>Placeholder login page</Text>
      <Button
        title="Go to home page"
        onPress={() => router.push('/(drawer)/home')}
      />
    </View>
  );
}