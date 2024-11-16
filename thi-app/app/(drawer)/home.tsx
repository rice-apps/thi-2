<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StudentCard } from "@/components/StudentCard";
import { Student } from "@/types";
import SmallTimer from "@/components/TimerSmallComponent";
import { TimerContext } from "@/context/TimerContext"; 
=======
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Student } from '@/types';
import { sampleStudents } from './students';
import { StudentCard } from '@/components/StudentCard';
>>>>>>> 8f8c2ab (Feat: display students on home page)

export const teacherName = "Jane Summers";

export const sampleStudents: Student[] = [
  { id: "1", name: "Alice Johnson", age: "20", abcReports: 1, durationReports: 2 },
  { id: "2", name: "Bob Smith", age: "22", abcReports: 0, durationReports: 1 },
  { id: "3", name: "Charlie Brown", age: "21", abcReports: 1, durationReports: 2 },
  { id: "4", name: "Daisy Miller", age: "23", abcReports: 1, durationReports: 0 },
  { id: "5", name: "Ethan Green", age: "19", abcReports: 3, durationReports: 2 },
  { id: "6", name: "Fiona White", age: "20", abcReports: 0, durationReports: 2 },
];

const homePage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);

<<<<<<< HEAD
  const {
    timeLeft,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  } = useContext(TimerContext);

=======
>>>>>>> 8f8c2ab (Feat: display students on home page)
  return (
    <SafeAreaView className="flex-1 scrollabale">
      <ScrollView className="px-12 py-8">
        <Text className="text-3xl font-bold mb-8">Welcome, {teacherName}!</Text>
        
        <View className="mb-5">
        <Text className="text-lg font-bold mb-8">Timer</Text>
          {timeLeft != 0 ? (<SmallTimer />) : (<>
              <View className="p-8 h-[164px] mb-4 bg-white rounded-lg shadow-md justify-center items-center flex-col">
                <MaterialCommunityIcons name="timer-sand" size={40} color="#10536699" />
                <Text className="text-lg font-bold">
                  There is no timer currently active
                </Text>
              </View>
            </>)}
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
<<<<<<< HEAD
          <View className="flex-row flex-wrap justify-center gap-x-32 gap-y-8 mb-8">
          {students.map((student) => (
              <View
              key={student.id}
              style={{
                width: 243,
              }}
            >
                <StudentCard student={student} />
              </View>
            ))}
            </View>
=======
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
>>>>>>> 8f8c2ab (Feat: display students on home page)
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default homePage;