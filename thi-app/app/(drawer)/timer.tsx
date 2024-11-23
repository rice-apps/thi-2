import React, { useState, useEffect } from 'react';
import { View, Text,ScrollView,SafeAreaView, TouchableOpacity, Image} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type Theme = {
  name: string;
  icon?: JSX.Element; 
  image?: any; // Path to the image
};

export default function TimerPage() {
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


  //Stuff for the theme cards for different Timer Themes 
  const [selectedTheme, setSelectedTheme] = useState<Theme['name']>('Default');

  const onThemeSelect = (theme: Theme['name']) => {
    setSelectedTheme(theme);
    console.log(`Theme selected: ${theme}`);
    // Implement Logic to change the theme here
  };

  const themes = [
    {
      name: 'Default',
      icon: <MaterialCommunityIcons name="timer-sand" size={40} color="black" />,
    },
    { name: 'Tiger', image: require('../../assets/images/tiger.png') },
    { name: 'Hippo', image: require('../../assets/images/hippo.png') },
    {  name:'Bunny', image: require('../../assets/images/bunny.png') },
    { name: 'Dog', image: require('../../assets/images/dog.png') },
  ];



  return (
    <SafeAreaView>
     
      <ScrollView className="px-16">
         {/* Title Section */}
        <Text className="text-4xl font-bold mb-8 mt-8">Timer</Text>
        
        {/* Timer Section */}
        <View className="flex-1 items-center justify-center bg-gray-100">
          <View className="bg-white justify-center items-center shadow-md rounded-lg w-[1050px] h-[323px] p-4">
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
      
        {/* Theme */}
      <Text className="text-2xl font-bold mb-8 mt-8">Pick a theme</Text>

      <View className="w-[1000px] h-[117px] justify-center">
        <View className="flex-row flex-wrap justify-evenly ">
          {themes.map((theme, index) => (
              <TouchableOpacity
              key={index}
              className={'p-4 rounded-lg  bg-white shadow-md w-[123px] h-[117px] justify-center items-center'}
              onPress={() => onThemeSelect(theme.name)}
            >
              <Image
                source={theme.image}
                style={{ width: 60, height: 60, marginBottom: 8 }}
                resizeMode="contain"
              />
              <Text className="text-[16px] text-black text-center">{theme.name}</Text>
            </TouchableOpacity>
              ))}
        </View>
      </View>


      {/* Buttons */}
      <View className="flex-row justify-center items-center space-x-4 mt-8">
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


    </ScrollView>

    </SafeAreaView>
  );
}