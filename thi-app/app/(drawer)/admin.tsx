import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { imageUrls, Student, Teacher } from '@/types';
import { AddTeacher } from "../../components/AddTeacher";
import { AddStudent } from "../../components/AddStudent";
import { EditTeacher } from "../../components/EditTeacher";
import { EditStudent } from "../../components/EditStudent";
import { RemoveStudent } from '@/components/RemoveStudent';
import { RemoveTeacher } from '@/components/RemoveTeacher';
import { FilterStudents } from '@/components/FilterStudents';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const teacherName = "Jane Summers";
export const sampleStudents: Student[] = [
  { id: "1", name: "Alice Johnson", age: "20", abcReports: 1, durationReports: 2 },
  { id: "2", name: "Bob Smith", age: "22", abcReports: 0, durationReports: 1 },
  { id: "3", name: "Charlie Brown", age: "21", abcReports: 1, durationReports: 2 },
  { id: "4", name: "Daisy Miller", age: "23", abcReports: 1, durationReports: 0 },
  { id: "5", name: "Ethan Green", age: "19", abcReports: 3, durationReports: 2 },
  { id: "6", name: "Fiona White", age: "20", abcReports: 0, durationReports: 2 },
];
export const sampleTeachers: Teacher[] = [
    { name: "Jane Summer", email:"summersjm@bbc.edu", students: sampleStudents },
  ];

const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isAddTeacherVisible, setIsAddTeacherVisible] = useState(false);
  const [isAddStudentVisible, setIsAddStudentVisible] = useState(false);
  const [isEditTeacherVisible, setIsEditTeacherVisible] = useState(false);
  const [isEditStudentVisible, setIsEditStudentVisible] = useState(false);
  const [isRemoveStudentVisible, setIsRemoveStudentVisible] = useState(false);
  const [isRemoveTeacherVisible, setIsRemoveTeacherVisible] = useState(false);
  const [isFilterStudentsVisible, setIsFilterStudentsVisible] = useState(false);

  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);

  useEffect(() => {
    setTeachers(sampleTeachers); // Load the sample students
  }, []);

  const toggleAddTeacher = () => {
    setIsAddTeacherVisible((prev) => !prev); // Toggle visibility
  };

  const toggleAddStudent = () => {
    setIsAddStudentVisible((prev) => !prev); // Toggle visibility
  };

  const toggleEditTeacher = () => {
    setIsEditTeacherVisible((prev) => !prev); // Toggle visibility
  };

  const toggleEditStudent = () => {
    setIsEditStudentVisible((prev) => !prev); // Toggle visibility
  };

  const toggleRemoveStudent = () => {
    setIsRemoveStudentVisible((prev) => !prev); // Toggle visibility
  };

  const toggleRemoveTeacher = () => {
    setIsRemoveTeacherVisible((prev) => !prev); // Toggle visibility
  };

  const toggleFilterStudents = () => {
    setIsFilterStudentsVisible((prev) => !prev); // Toggle visibility
  };

  return (
    <SafeAreaView className="flex-1 relative">
      {/* Sidebar for Adding Teacher */}
      {isAddTeacherVisible && (
        <View className="absolute right-0 top-0 h-full z-50 inset-0 bg-black/50">
          <AddTeacher toggleAddTeacher={toggleAddTeacher} />
        </View>
      )}

      {/* Sidebar for Adding Student */}
      {isAddStudentVisible && (
        <View className="absolute right-0 top-0 h-full z-50 inset-0 bg-black/50">
          <AddStudent toggleAddStudent={toggleAddStudent} />
        </View>
      )}

      {/* Sidebar for Adding Student */}
      {isEditStudentVisible && (
        <View className="absolute right-0 top-0 h-full z-50 inset-0 bg-black/50">
          <EditStudent toggleEditStudent={toggleEditStudent} />
        </View>
      )}

      {/* Sidebar for Editing Teacher */}
      {isEditTeacherVisible && (
        <View className="absolute right-0 top-0 h-full z-50 inset-0 bg-black/50">
          <EditTeacher toggleEditTeacher={toggleEditTeacher} />
        </View>
      )}

        {/* Sidebar for Filtering Students */}
      {isFilterStudentsVisible && (
        <View className="absolute right-0 top-0 h-full z-50 inset-0 bg-black/50">
          <FilterStudents toggleFilterStudents={toggleFilterStudents} />
        </View>
      )}

    
    {/* Popup for Removing Student */}
    {isRemoveStudentVisible && (
  <View className="absolute inset-0 items-center z-50 justify-center bg-black/50">
    <RemoveStudent toggleRemoveStudent={toggleRemoveStudent} />
  </View>
)}

        {/* Popup for Removing Student */}
    {isRemoveTeacherVisible && (
  <View className="absolute inset-0 items-center z-50 justify-center bg-black/50">
    <RemoveTeacher toggleRemoveTeacher={toggleRemoveTeacher} />
  </View>
)}


      <ScrollView className="px-12 py-8">
      <Text className="text-3xl font-bold mb-8">Welcome, {teacherName}!</Text>
      
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-lg font-bold mb-8 mt-8">Students</Text>
        <View className="flex-row justify-between gap-4">
        <TouchableOpacity onPress={toggleFilterStudents}>
            <FontAwesome name="filter" size={24} color="#6F97A2" />
        </TouchableOpacity>
            <TouchableOpacity
                className="bg-[#105366] p-2 rounded flex-row items-center"
                onPress={toggleAddStudent} 
                >
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
                                      <View className="flex-row pt-4 gap-4">
                                        <TouchableOpacity>
                                            <MaterialIcons name="mode-edit" size={24} color="black" onPress={toggleEditStudent}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Foundation name="trash" size={24} color="black" onPress={toggleRemoveStudent}/>
                                        </TouchableOpacity>
                                        </View>

                        
                                  </tr>
                                  
                                ))}
</tbody>
        </table>

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
              {teachers.map((teachers) => (
                
                                  <tr
                                  className="bg-white"
                                >
                                      <td className="p-[16px]">
                                        <View className="flex-row items-center">
                                        <Image
                                                source={{ uri: randomImageUrl }}
                                                className="w-[16px] h-[16px] rounded-full mr-[10px]"
                                              />{teachers.name}
                                              </View>
                                              </td>
                                      <td className="p-[16px]">{teacherName}</td>
                                    

                                      <View className="flex-row pt-4 gap-4">
                                        <TouchableOpacity>
                                            <MaterialIcons name="mode-edit" size={24} color="black" onPress={toggleEditTeacher}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Foundation name="trash" size={24} color="black" onPress={toggleRemoveTeacher}/>
                                        </TouchableOpacity>
                                        </View>
                                  </tr>
                                  
                                ))}
</tbody>
        </table>
      </ScrollView>
    </SafeAreaView>
  );
}