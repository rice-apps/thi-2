import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  useEffect(() => {
    let interval: number;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setIsRunning(false); // Stop the timer when it reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval); // Clean up interval when the component unmounts or when paused
  }, [isRunning, isPaused]);

  const handlePause = () => {
    setIsPaused(true); // Set paused to true
    setIsRunning(false); // Stop the interval without resetting timeLeft
  };

  const handleResume = () => {
    setIsPaused(false); // Unpause the timer
    setIsRunning(true); // Start the interval again
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0); // Reset time left to 0
  };

  const handleStart = () => {
    // Parse the input string into numbers
    const hours = parseInt(inputHours, 10) || 0;
    const minutes = parseInt(inputMinutes, 10) || 0;
    const seconds = parseInt(inputSeconds, 10) || 0;

    // Total time that gets counted down from
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalTimeInSeconds);
    setIsRunning(true); // Start the timer
    setIsPaused(false); // Make sure the timer is not paused
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-16 py-8">
        {/* Title Section */}
        <Text className="flex-1 text-4xl font-bold mb-8 mt-8 gap-15">Timer</Text>
        <View className="flex-1 items-center bg-gray-10">
          <View className="flex-1 items-center justify-center bg-gray-100 mb-20">
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
                    editable={!isRunning} // Disable editing when timer is running
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
                    editable={!isRunning} // Disable editing when timer is running
                  />
                </View>

                {/* Seconds Separator */}
                <View className="items-center justify-center">
                  <Text className="text-[20px] font-bold text-black">:</Text>
                </View>

                {/* Seconds Input */}
                <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
                  <TextInput
                    style={{ fontSize: 70, fontWeight: 'bold', color: 'white', textAlign: 'center', width: 100 }}
                    value={isRunning || isPaused ? seconds : inputSeconds}
                    onChangeText={(text) => !isRunning && setInputSeconds(text)}
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="00"
                    editable={!isRunning} // Disable editing when timer is running
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex flex-row gap-8 mt-12 justify-center">
            {/* Start/Reset Button */}
            {isRunning || isPaused ? (
              <TouchableOpacity
                className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
                onPress={handleReset}
              >
                <FontAwesome name={'rotate-left'} size={12} color="white" />
                <Text className="text-white font-bold p-1">Reset</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
                onPress={handleStart}
              >
                <FontAwesome name={'play'} size={12} color="white" />
                <Text className="text-white font-bold p-1">Start</Text>
              </TouchableOpacity>
            )}

            {/* Pause Button (Visible only when running and not paused) */}
            {isRunning && !isPaused && (
              <TouchableOpacity
                className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
                onPress={handlePause}
              >
                <FontAwesome name={'pause'} size={12} color="white" />
                <Text className="text-white font-bold p-1">Pause</Text>
              </TouchableOpacity>
            )}

            {/* Resume Button (Visible only when paused) */}
            {isPaused && (
              <TouchableOpacity
                className="bg-[#105366] shadow-md items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
                onPress={handleResume}
              >
                <FontAwesome name={'play'} size={12} color="white" />
                <Text className="text-white font-bold p-1">Resume</Text>
              </TouchableOpacity>
            )}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
