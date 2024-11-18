import React from 'react';
import { View, Text } from 'react-native';
import ImageTimer from '@/components/AnimatedImageTimer';
import { useSharedValue } from 'react-native-reanimated';

export default function TimerPage() {
  // Tie animations to initial sidebar state (currently set to open)
  const timerAnimatedValue = useSharedValue(1);
  
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <ImageTimer imageName={"tiger"}, animatedValue={timerAnimatedValue} />
      {/* <Text>Placeholder timer page</Text> */}
    </View>
  );
}