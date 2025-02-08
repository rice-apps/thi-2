import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Student } from '@/types';
import { sampleStudents } from './students';
import { StudentCard } from '@/components/StudentCard';

export const teacherName = "Jane Summers";

const homePage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-12 py-8">
        <Text className="text-3xl font-bold mb-8">Welcome, {teacherName}!</Text>
        <View className="mb-5">
          <Text className="text-lg font-bold mb-8">Timer</Text>
          <View className="p-8 h-[164px] mb-4 bg-white rounded-lg shadow-md justify-center items-center flex-col">
            <MaterialCommunityIcons name="timer-sand" size={40} color="#10536699" />
            <Text className="text-lg font-bold">
            There is no timer currently active
            </Text>
        </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-bold mb-8">Recent History</Text>
          <View className="p-8 h-[59px] mb-4 bg-white rounded-lg shadow-md justify-center items-center">
            <Text>
            There Is No Data To Currently Display
            </Text>
        </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-bold mb-8">Students</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
          {students.map((student) => (
            <View
            key={student.id}
            style={{
              width: "28%",
            }}
          >
              <StudentCard student={student} />
            </View>
          ))}
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default homePage;
