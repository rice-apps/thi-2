import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(3661); // Start with 1 hour, 1 minute, 1 second
  const [isRunning, setIsRunning] = useState(false);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [isRunning]);

  return (
    <View className="flex-1 items-center bg-gray-10 "> 
    <View className="flex-1 items-center justify-center bg-gray-100">
        <View className="bg-white justify-center items-center shadow-md rounded-lg w-[877px] h-[323px] p-4">
            <View className="flex-row space-x-4">
                <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
                    <Text className="text-[70px] font-bold text-white">{formattedHours}</Text>
                </View>
                <View className="items-center justify-center"> 
                    <Text className="text-[20px] font-bold text-black">:</Text>
                </View>
                <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
                    <Text className="text-[70px] font-bold text-white">{formattedMinutes}</Text>
                </View>
                <View className="items-center justify-center"> 
                    <Text className="text-[20px] font-bold text-black">:</Text>
                </View>
                <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
                    <Text className="text-[70px] font-bold text-white">{formattedSeconds}</Text>
                </View>
            </View>
        </View>
    </View>
    
    <TouchableOpacity className="bg-[#105366] items-center justify-center w-[104px] h-[41px] p-2 rounded flex-row" onPress={() => setIsRunning(!isRunning)}>
        {!isRunning && (
            <FontAwesome name="play" size={12} color="white" />
        )}
        {isRunning && (
            <FontAwesome name="pause" size={12} color="white" />
        )}
        <Text className="text-white font-bold p-1">
            {isRunning ? 'Pause' : 'Start'}
        </Text>
    </TouchableOpacity>

    </View>
  );
};

export default Timer;
