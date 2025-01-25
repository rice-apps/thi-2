import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Time remaining in seconds
  const [isRunning, setIsRunning] = useState(false); // If the timer is running
  const [inputHours, setInputHours] = useState(''); // Input field for hours
  const [inputMinutes, setInputMinutes] = useState(''); // Input field for minutes
  const [inputSeconds, setInputSeconds] = useState(''); // Input field for seconds

  useEffect(() => {
    if (!isRunning) return; // If timer is not running, do nothing

    // Set interval to count down every second
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval); // Stop the countdown when time reaches 0
          return 0;
        }
        return prev - 1; // Decrement the timer by 1 second
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount or when isRunning changes
  }, [isRunning]);

  const handleStart = () => {
    const hours = parseInt(inputHours, 10) || 0;
    const minutes = parseInt(inputMinutes, 10) || 0;
    const seconds = parseInt(inputSeconds, 10) || 0;

    // Convert the input time to total seconds
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalTimeInSeconds); // Set the initial time
    setIsRunning(true); // Start the timer
  };

  const handlePause = () => {
    setIsRunning(false); // Simply stop the timer without resetting the time
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
    <View className="flex-1 items-center bg-gray-10">
      <View className="flex-1 items-center justify-center bg-gray-100">
        <View className="bg-white justify-center items-center shadow-md rounded-lg w-[1000px] min-h-[323px] p-4">
          <View className="flex-row space-x-4">
            {/* Hours Input */}
            <View className="bg-[rgba(16,83,102,0.6)] w-[195px] h-[195px] rounded-lg flex justify-center items-center">
              <TextInput
                style={{ fontSize: 70, fontWeight: 'bold', color: 'white', textAlign: 'center', width: 100 }}
                value={isRunning ? hours : inputHours}
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
                value={isRunning ? minutes : inputMinutes}
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
                value={isRunning ? seconds : inputSeconds}
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

      {/* Start/Pause Button */}
      <TouchableOpacity
        className="bg-[#105366] items-center justify-center w-[104px] h-[41px] p-2 gap-2 rounded flex-row"
        onPress={isRunning ? handlePause : handleStart}
      >
        <FontAwesome name={isRunning ? 'rotate-left' : 'play'} size={12} color="white" />
        <Text className="text-white font-bold p-1">
          {isRunning ? 'Reset' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timer;
