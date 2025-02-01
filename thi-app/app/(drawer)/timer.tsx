import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Timer from '@/components/TimerComponent';

export default function TimerPage() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-12 py-8">
        <Text className="text-3xl font-bold mb-8 text-left">Timer</Text>
        <View className="flex-1 items-center justify-center">
          <Timer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
