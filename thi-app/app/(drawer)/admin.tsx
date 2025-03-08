import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { imageUrls, Student } from '@/types';

export const teacherName = "Jane Summers";
export const sampleStudents: Student[] = [
  { id: "1", name: "Alice Johnson", age: "20", abcReports: 1, durationReports: 2 },
  { id: "2", name: "Bob Smith", age: "22", abcReports: 0, durationReports: 1 },
  { id: "3", name: "Charlie Brown", age: "21", abcReports: 1, durationReports: 2 },
  { id: "4", name: "Daisy Miller", age: "23", abcReports: 1, durationReports: 0 },
  { id: "5", name: "Ethan Green", age: "19", abcReports: 3, durationReports: 2 },
  { id: "6", name: "Fiona White", age: "20", abcReports: 0, durationReports: 2 },
];
const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

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
          <table className="table-relative text-left w-full">
          <thead>
                <tr className="bg-[#f0f0f0]"
                >
                  
                <th className="p-[16px]">Name</th>
                <th className="p-[16px]">Teacher Assigned To</th>
                <th className="p-[16px]">ABC Behavior Data</th>
                <th className="p-[16px]">Duration Data</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                  
                                    <tr
                                    key={student.id}
                                    className="bg-white"
                                  >
                                        <td className="p-[16px]">
                                          <View className="flex-row items-center">
                                          <Image
                                                  source={{ uri: randomImageUrl }}
                                                  className="w-[16px] h-[16px] rounded-full mr-[10px]"
                                                />{student.name}
                                                </View>
                                                </td>
                                        <td className="p-[16px]">{teacherName}</td>
                                        <td className="p-[16px]">{ ((student.abcReports == 0) ? "N/A" : ((student.abcReports > 1)) ? student.abcReports+" Reports" : student.abcReports+" Report")}</td>
                                        <td className="p-[16px]">{ ((student.durationReports == 0) ? "N/A" : ((student.durationReports > 1)) ? student.durationReports+" Reports" : student.durationReports+" Report")}</td>
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
          <table className="table-relative text-left w-full">
          <thead>
                <tr className="bg-[#f0f0f0]"
                >
                  
                <th className="p-[16px]">Name</th>
                <th className="p-[16px]">Email</th>
                <th className="p-[16px]">Students</th>
                </tr>
                </thead>
                <tbody>
                <tr
                                    key={"teacher"}
                                    className="bg-white"
                                  >
                                    <td className="p-[16px]">{teacherName}</td>
                                    <td className="p-[16px]">summersjm@bbc.edu</td>
                                    <td className="p-[16px]">
                                    <table className="table-relative text-left w-full">
                                    {students.map((student) => (
                                      <tr>
                                        <td>
                                        <View className="flex-row items-center">
                                          <Image
                                                  source={{ uri: randomImageUrl }}
                                                  className="w-[16px] h-[16px] rounded-full mr-[10px]"
                                                />{student.name}
                                                </View>
                                        </td>
                                      </tr>
                                    ))}
                                    </table>
                                    </td>

                                  </tr>
                {/* {students.map((student) => (
                  
                                    <tr
                                    key={student.id}
                                    className="bg-white"
                                  >
                                        <td className="p-[16px]">
                                          <View className="flex-row items-center">
                                          <Image
                                                  source={{ uri: randomImageUrl }}
                                                  className="w-[16px] h-[16px] rounded-full mr-[10px]"
                                                />{student.name}
                                                </View>
                                                </td>
                                        <td className="p-[16px]">{teacherName}</td>
                                        <td className="p-[16px]">{ ((student.abcReports == 0) ? "N/A" : ((student.abcReports > 1)) ? student.abcReports+" Reports" : student.abcReports+" Report")}</td>
                                        <td className="p-[16px]">{ ((student.durationReports == 0) ? "N/A" : ((student.durationReports > 1)) ? student.durationReports+" Reports" : student.durationReports+" Report")}</td>
                                    </tr>
                                  ))} */}
</tbody>
          </table>
          
          </ScrollView>
    </SafeAreaView>
  );
}