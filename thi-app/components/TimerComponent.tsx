import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TimerContext } from "../context/TimerContext"; 

const Timer = () => {
  const {
    timeLeft,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  } = useContext(TimerContext);

  const [inputHours, setInputHours] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");

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
    <View className="flex-1 items-center justify-center bg-gray-100 mb-2">
      <View className="bg-white justify-center items-center shadow-md rounded-lg w-[1000px] min-h-[323px] p-4">
        <View className="flex-row space-x-4">
          {/* Hours Input */}
          <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
            <TextInput
              style={{ fontSize: 70, fontWeight: 'bold', color: 'white', textAlign: 'center', width: 100 }}
              value={isRunning || isPaused ? hours : inputHours}
              onChangeText={(text) => !isRunning && setInputHours(text)}
              keyboardType="numeric"
              maxLength={2}
              placeholder="00"
              editable={!isRunning}
            />
          </View>

          {/* Minutes Separator */}
          <View className="items-center justify-center">
            <Text className="text-[20px] font-bold text-black">:</Text>
          </View>

          {/* Minutes Input */}
          <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
            <TextInput
              style={{ fontSize: 70, fontWeight: 'bold', color: 'white', textAlign: 'center', width: 100 }}
              value={isRunning || isPaused ? minutes : inputMinutes}
              onChangeText={(text) => !isRunning && setInputMinutes(text)}
              keyboardType="numeric"
              maxLength={2}
              placeholder="00"
              editable={!isRunning}
            />
          </View>

          {/* Seconds Separator */}
          <View className="items-center justify-center">
            <Text className="text-[20px] font-bold text-black">:</Text>
          </View>

          <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
            <TextInput
              style={{ fontSize: 70, fontWeight: 'bold', color: 'white', textAlign: 'center', width: 100 }}
              value={isRunning || isPaused ? seconds : inputSeconds}
              onChangeText={(text) => !isRunning && setInputSeconds(text)}
              keyboardType="numeric"
              maxLength={2}
              placeholder="00"
              editable={!isRunning}
            />
          </View>
        </View>
      </View>

      <View className="flex flex-row gap-4 mt-4">
        {isRunning || isPaused ? (
          <TouchableOpacity className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row" onPress={resetTimer}>
            <FontAwesome name="rotate-left" size={12} color="white" />
            <Text className="text-white font-bold p-1">Reset</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row" 
            onPress={() =>
              startTimer(
                parseInt(inputHours, 10) || 0,
                parseInt(inputMinutes, 10) || 0,
                parseInt(inputSeconds, 10) || 0
              )
            }
          >
            <FontAwesome name="play" size={12} color="white" />
            <Text className="text-white font-bold p-1">Start</Text>
          </TouchableOpacity>
        )}

        {/* Can only pause when running */}
        {isRunning && !isPaused && (
          <TouchableOpacity className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row" onPress={pauseTimer}>
            <FontAwesome name="pause" size={12} color="white" />
            <Text className="text-white font-bold p-1">Pause</Text>
          </TouchableOpacity>
        )}

        {/* Can only resume when paused */}
        {isPaused && (
          <TouchableOpacity className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row" onPress={resumeTimer}>
            <FontAwesome name="play" size={12} color="white" />
            <Text className="text-white font-bold p-1">Resume</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Timer;
