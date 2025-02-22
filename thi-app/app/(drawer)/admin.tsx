import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Student } from "@/types";
import { AddTeacher } from "../../components/AddTeacher";
import { AddStudent } from "../../components/AddStudent";

export const teacherName = "Jane Summers";
export const sampleStudents: Student[] = [
  { id: "1", name: "Alice Johnson", age: "20", abcReports: 1, durationReports: 2 },
  { id: "2", name: "Bob Smith", age: "22", abcReports: 0, durationReports: 1 },
  { id: "3", name: "Charlie Brown", age: "21", abcReports: 1, durationReports: 2 },
  { id: "4", name: "Daisy Miller", age: "23", abcReports: 1, durationReports: 0 },
  { id: "5", name: "Ethan Green", age: "19", abcReports: 3, durationReports: 2 },
  { id: "6", name: "Fiona White", age: "20", abcReports: 0, durationReports: 2 },
];

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddTeacherVisible, setIsAddTeacherVisible] = useState(false);
  const [isAddStudentVisible, setIsAddStudentVisible] = useState(false);

  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);

  const toggleAddTeacher = () => {
    setIsAddTeacherVisible((prev) => !prev); // Toggle visibility
  };

  const toggleAddStudent = () => {
    setIsAddStudentVisible((prev) => !prev); // Toggle visibility
  };

  return (
    <SafeAreaView className="flex-1 relative">
      {/* Sidebar for Adding Teacher */}
      {isAddTeacherVisible && (
        <View className="absolute right-0 top-0 h-full z-50">
          <AddTeacher toggleAddTeacher={toggleAddTeacher} />
        </View>
      )}

      {/* Sidebar for Adding Student */}
      {isAddStudentVisible && (
        <View className="absolute right-0 top-0 h-full z-50">
          <AddStudent toggleAddStudent={toggleAddStudent} />
        </View>
      )}

      <ScrollView className="px-12 py-8">
        <Text className="text-3xl font-bold mb-8">Welcome, {teacherName}!</Text>

        {/* Students Section */}
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-bold mb-8 mt-8">Students</Text>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-[#105366] p-2 rounded mr-2 flex-row items-center"
              onPress={toggleAddStudent} // Open "Add Student" modal
            >
              <AntDesign name="plus" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Add Student</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Students Table */}
        <View className="overflow-hidden">
          <View className="flex-row border-b border-gray-300 pb-2">
            <Text className="w-1/4 font-bold">Name</Text>
            <Text className="w-1/4 font-bold">Teacher Assigned To</Text>
            <Text className="w-1/4 font-bold">ABC Behavior Data</Text>
            <Text className="w-1/4 font-bold">Duration Data</Text>
          </View>
          {students.map((student) => (
            <View key={student.id} className="flex-row py-2 border-b border-gray-200">
              <Text className="w-1/4">{student.name}</Text>
              <Text className="w-1/4">{teacherName}</Text>
              <Text className="w-1/4">{student.abcReports}</Text>
              <Text className="w-1/4">{student.durationReports}</Text>
            </View>
          ))}
        </View>

        {/* Teachers Section */}
        <View className="flex-row justify-between items-center mb-5 mt-8">
          <Text className="text-lg font-bold">Teachers</Text>
          <View className="flex-row">
            <TouchableOpacity className="bg-[#105366] p-2 rounded mr-2 flex-row items-center">
              <Text className="text-white font-bold ml-1">Import Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#105366] p-2 rounded flex-row items-center"
              onPress={toggleAddTeacher} // Open "Add Teacher" modal
            >
              <AntDesign name="plus" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Add Teacher</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
