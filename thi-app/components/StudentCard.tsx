import { imageUrls, Student, StudentProps } from "@/types";
import React from "react";
import { Text, View, Image } from "react-native";

export const StudentCard = ({ student }: StudentProps) => {
  const { name, abcReports, durationReports } = student;
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return (
    <View className="bg-white rounded-lg shadow-md shadow-black mb-4 items-center overflow-hidden h-[200px] elevation-3">
      {/* Blue Header Section */}
      <View className="bg-[#17468F] h-[70px] w-full items-center justify-center">
        <Image
          source={{ uri: randomImageUrl }}
          className="w-[60px] h-[60px] rounded-full absolute top-[35px] border-[3px] border-white"
        />
      </View>

      {/* Student Name */}
      <Text className="text-lg font-bold text-center mt-[30px]">{name}</Text>

      {/* Divider Line */}
      <View className="border-b border-gray-300 w-[80%] my-2" />

      {/* Report Stats */}
      <View className="flex-row justify-around w-full py-2">
        <View className="items-center">
          <Text className="text-base font-bold text-black">{durationReports}</Text>
          <Text className="text-xs text-gray-500 text-center">Duration Reports</Text>
        </View>
        <View className="items-center">
          <Text className="text-base font-bold text-black">{abcReports}</Text>
          <Text className="text-xs text-gray-500 text-center">ABC Behavioral Reports</Text>
        </View>
      </View>
    </View>
  );
};
