import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StudentForm from "@/screens/student_modals/StudentForm";
import Filter from "@/screens/student_modals/Filter";
import ExcelExport from "@/screens/student_modals/ExcelExport";
import { useRouter } from 'expo-router';
// import { useParams } from 'react-router-dom';





const IndividualStudent = ({studentId}: {studentId: string}, {name}: {name: String}) => {
  // const { id } = useParams();
  const router = useRouter();
  
  // const { studentId, name } = router.query;


  const [studentData, setStudentData] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isExportVisible, setExportVisible] = useState(false);



  //fetch from API whenever backend is done
  useEffect(() => {
    setStudentData({
      id: studentId,
      name: name,
    });
  }, [studentId, name]);




  const backToStudentsPage = () => {
    router.replace('/(drawer)/students'); // Pass the student ID as a parameter
  };
  

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };
  const closeFilter = () => {
    setFilterVisible(false);
  };
  const closeExport = () => {
    setExportVisible(false);
  };


  return (
    <View className="flex-1 p-8">
     <TouchableOpacity onPress={backToStudentsPage} className="p-2 flex-row items-center">
          <AntDesign name="left" size={24} color="#105366" />
          <Text className="ml-2 text-lg font-bold text-[#105366]">Back To Students</Text>
      </TouchableOpacity>

      {/* Title and Add Data Button */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-3xl font-bold"> {studentData.id}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}
          className="bg-[#105366] p-2 rounded flex-row items-center"
        >
          <AntDesign name="plus" size={16} color="white" />
          <Text className="text-white font-bold ml-1">Add Data</Text>
        </TouchableOpacity>
      </View>

      {/* ABC Behavior Data Section */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold mb-4">ABC Behavior Data <Text> 2 Reports </Text></Text>
        <View className="flex-row space-x-4">

          {/* Filter Button */}
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <AntDesign name="filter" size={24} color="#105366" />
          </TouchableOpacity>

          <TouchableOpacity onPress= {() => setExportVisible(true)} className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center">
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
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold mb-4">Duration Data <Text> 5 Reports </Text></Text>

        <View className="flex-row space-x-4">
          {/* Filter Button */}
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <AntDesign name="filter" size={24} color="#105366" />
          </TouchableOpacity>

          <TouchableOpacity onPress= {() => setExportVisible(true)}
            className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center">
            <MaterialIcons name="download" size={16} color="white" />
            <Text className="text-white font-bold ml-1">Export To Excel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Placeholder */}
      <View>
        <Text className="text-lg text-gray-500">Table Placeholder</Text>
      </View>

      {/* Modals */}
      <StudentForm visible={isModalVisible} onClose={closeModal} />
      <Filter visible={isFilterVisible} onClose={closeFilter} />
      <ExcelExport visible={isExportVisible} onClose={closeExport} />


    </View>
  );
};

export default IndividualStudent;
