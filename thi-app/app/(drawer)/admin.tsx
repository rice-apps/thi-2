import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Student } from '@/types';

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
  
    useEffect(() => {
      setStudents(sampleStudents); // Load the sample students
    }, []);
        
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-12 py-8">
              <Text className="text-3xl font-bold mb-8">Welcome, {teacherName}!</Text>
      
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-bold mb-8 mt-8">Students</Text>
          <View className="flex-row">
            
            <TouchableOpacity className="bg-[#105366] p-2 rounded mr-2 flex-row items-center">
              <AntDesign name="plus" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Add Student</Text>
            </TouchableOpacity>
          </View>      
          </View>
          <table className="table-fixed">
          <thead>
                <tr>
                <th>Name</th>
                <th>Teacher Assigned To</th>
                <th>ABC Behavior Data</th>
                <th>Duration Data</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                                    <tr
                                    key={student.id}
                                  >
                                        <td>{student.name}</td>
                                        <td>{teacherName}</td>
                                        <td>{student.abcReports}</td>
                                        <td>{student.durationReports}</td>
                                    </tr>
                                  ))}
</tbody>
          </table>
          
          
          <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-bold mb-8 mt-8">Teachers</Text>
          <View className="flex-row">  
          <TouchableOpacity className="bg-[#105366] p-2 rounded mr-2 flex-row items-center">
              <Text className="text-white font-bold ml-1">Import Data</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#105366] p-2 rounded mr-2 flex-row items-center">
              <AntDesign name="plus" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Add Teacher</Text>
            </TouchableOpacity>
          </View>      
          </View>      

          
          </ScrollView>
    </SafeAreaView>
  );
}