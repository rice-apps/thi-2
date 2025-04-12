import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import Timer from '@/components/TimerComponent';
import { TimerContext } from "@/context/TimerContext";

export default function TimerPage() {
  const {
    timeLeft,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    inputHours,
    setInputHours,
    inputMinutes,
    setInputMinutes,
    inputSeconds,
    setInputSeconds,
    formatTime,
  } = useContext(TimerContext);

  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-12 py-8">
        <TimerContext.Provider
        value={{
          timeLeft,
          isRunning,
          isPaused,
          startTimer,
          pauseTimer,
          resumeTimer,
          resetTimer,
          inputHours,
          setInputHours,
          inputMinutes,
          setInputMinutes,
          inputSeconds,
          setInputSeconds,
          formatTime,
        }}>
          <Text className="text-3xl font-bold mb-8 text-left">Timer</Text>
          <View className="bg-red-500 flex-1 items-center justify-center mb-10">

            {/* Digital Clock */}
            <Timer />

            <View className="w-full mt-2">
              <Text className="text-2xl font-bold text-left">Pick a theme</Text>
            </View>

            {/* TODO Theme Selectors */}
            <View
              className="flex-1 justify-center bg-red-500 w-full"
              style={{ height: height * 0.10 }}
            >
              <View className="bg-white aspect-square justify-center items-center shadow-md rounded-lg mb-2 p-4"
              style={{ width: width * 0.1 }}>
                {/* <View className="flex-row space-x-4">

                </View> */}
              </View>
            </View>

            {/* Buttons */}
            <View className="flex-row gap-4 mt-4">

              {/* Can only pause when running */}
              {isRunning && !isPaused && (
                  <TouchableOpacity
                      className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
                      onPress={pauseTimer}
                  >
                      <FontAwesome name="pause" size={12} color="white" />
                      <Text className="text-white font-bold p-1">Pause</Text>
                  </TouchableOpacity>
              )}

              {/* Can only resume when paused */}
              {isPaused && (
                  <TouchableOpacity
                      className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
                      onPress={resumeTimer}
                  >
                      <FontAwesome name="play" size={12} color="white" />
                      <Text className="text-white font-bold p-1">Resume</Text>
                  </TouchableOpacity>
              )}

              {isRunning || isPaused ? (
                  <TouchableOpacity
                      className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
                      onPress={resetTimer}
                  >
                      <FontAwesome
                          name="rotate-left"
                          size={12}
                          color="white"
                      />
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

            </View>

          </View>

        </TimerContext.Provider>
      </ScrollView>
    </SafeAreaView>
  );
}