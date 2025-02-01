import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StudentForm from "@/screens/student_modals/StudentForm";
import { useRouter } from 'expo-router';

const IndividualStudent = () => {
  const [isModalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    
    const backToStudentsPage = () => {
      router.replace('/(drawer)/students'); // Pass the student ID as a parameter
    };
  

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="flex-1 p-8">
     <TouchableOpacity onPress={backToStudentsPage} className="p-2 flex-row items-center">
          <AntDesign name="left" size={24} color="#105366" />
          
          <Text className="ml-2 text-lg font-bold text-[#105366]">Students</Text>
      </TouchableOpacity>

      {/* Title and Add Data Button */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-3xl font-bold">Student Placeholder Name</Text>
        <TouchableOpacity
          className="bg-[#105366] p-2 rounded flex-row items-center"
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="plus" size={16} color="white" />
          <Text className="text-white font-bold ml-1">Add Data</Text>
        </TouchableOpacity>
      </View>

      {/* ABC Behavior Data Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-4">ABC Behavior Data</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity
            className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center"
          >
            <MaterialIcons name="download" size={16} color="white" />
            <Text className="text-white font-bold ml-1">Import Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center"
          >
            <MaterialIcons name="download" size={16} color="white" />
            <Text className="text-white font-bold ml-1">Export To Excel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Placeholder */}
      <View className="mb-8">
        <Text className="text-lg text-gray-500">Table Placeholder</Text>
      </View>

      {/* Duration Data Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-4">Duration Data</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity
            className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center"
          >
            <MaterialIcons name="download" size={16} color="white" />
            <Text className="text-white font-bold ml-1">Import Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center"
          >
            <MaterialIcons name="download" size={16} color="white" />
            <Text className="text-white font-bold ml-1">Export To Excel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Placeholder */}
      <View>
        <Text className="text-lg text-gray-500">Table Placeholder</Text>
      </View>

      {/* Modal */}
      <StudentForm visible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

export default IndividualStudent;
