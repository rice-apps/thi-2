import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { TimerContext } from "../context/TimerContext"; 

const SmallTimer = () => {
  const {
    timeLeft,
  } = useContext(TimerContext);


  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <View >
      <View className="p-8 h-[164px] mb-4 bg-white rounded-lg shadow-md justify-center items-center flex-col">
        <View className="flex-row gap-4">
            {/* Hours Input */}
            <View className="bg-[rgba(16,83,102,0.6)] w-[100px] h-[100px] rounded-lg flex justify-center items-center">
                <Text style={{ fontSize: 48, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                    {hours}
                </Text>
            </View>

            {/* Minutes Separator */}
            <View className="items-center justify-center">
                <Text className="text-[20px] font-bold text-black">:</Text>
            </View>

            {/* Minutes Input */}
            <View className="bg-[rgba(16,83,102,0.6)] w-[100px] h-[100px] rounded-lg flex justify-center items-center">
                <Text style={{ fontSize: 48, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                    {minutes}
                </Text>
            </View>

            {/* Seconds Separator */}
            <View className="items-center justify-center">
                <Text className="text-[20px] font-bold text-black">:</Text>
            </View>

            <View className="bg-[rgba(16,83,102,0.6)] w-[100px] h-[100px] rounded-lg flex justify-center items-center">
                <Text style={{ fontSize: 48, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                    {seconds}
                </Text>
            </View>
        </View>
      </View>
    </View>
  );
};

export default SmallTimer;
