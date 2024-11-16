import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { StudentCard } from "@/components/StudentCard";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Student } from "@/types";

export const sampleStudents: Student[] = [
  { id: "1", name: "Alice Johnson", age: "20", abcReports: 1, durationReports: 2 },
  { id: "2", name: "Bob Smith", age: "22", abcReports: 0, durationReports: 1 },
  { id: "3", name: "Charlie Brown", age: "21", abcReports: 1, durationReports: 2 },
  { id: "4", name: "Daisy Miller", age: "23", abcReports: 1, durationReports: 0 },
  { id: "5", name: "Ethan Green", age: "19", abcReports: 3, durationReports: 2 },
  { id: "6", name: "Fiona White", age: "20", abcReports: 0, durationReports: 2 },
];

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);

  return (
    <SafeAreaView>
      <ScrollView className="px-16">
        {/* Title Section */}
        <Text className="text-3xl font-bold mb-8 mt-8">Students</Text>
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-bold mb-8 mt-8">Current Students</Text>
          <View className="flex-row">
            <TouchableOpacity className="bg-[rgba(16,83,102,0.6)] p-2 rounded mr-2 flex-row items-center">              
              <MaterialIcons name="edit" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Edit Students</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#105366] p-2 rounded mr-2 flex-row items-center">
              <AntDesign name="plus" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Add Student</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Student Cards Grid */}
        <View className="flex-row flex-wrap justify-start gap-x-24 gap-y-8 mb-8">
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default StudentsPage;