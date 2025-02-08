import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Modal } from "react-native";
import { StudentCard } from "@/components/StudentCard";
import EditAStudent from "@/screens/student_modals/EditAStudent";
import AddAStudent from "@/screens/student_modals/AddAStudent";
import { useRouter } from 'expo-router';


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
  const [students, setStudents] = useState<Student[]>(sampleStudents);  //state here for implementation later

  const [deletesVisible, setDeletesVisible] = useState(false); //state for adding delete exs icons
  const [isEditStudentVisible, setEditStudentVisible] = useState(false); //state for delete modal

  const [isAddStudentVisible, setAddStudentVisible] = useState(false);  
  const [IndividualStudentVisible, setIndividualStudentVisible] = useState(false);


  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);

  const router = useRouter();
  const navigateToIndividualStudent = () => {
    router.replace('/(drawer)/individual_student/'); // Pass the student ID as a parameter
  };

  
  //deleting/editing students functionality
  const toggleDeleteIcons = () => {
    setDeletesVisible(prevState => !prevState); // Toggle the state
  }

  const handleEditStudent = () => {
    setEditStudentVisible(true);
  }



  //adding students functionality
  const closeAddStudent = () => {
    setAddStudentVisible(false);
  };
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prevStudents => [...prevStudents, newStudent]); // Add the new student to the state
    setAddStudentVisible(false); // Close the modal after adding the student
  };




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="px-16" showsVerticalScrollIndicator={true}>
        {/* Title Section */}
        <Text className="text-3xl font-bold mb-8 mt-8">Students</Text>
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-bold mb-8 mt-8">Current Students</Text>
          <View className="flex-row">

            
            <TouchableOpacity className="bg-[rgba(16,83,102,0.6)] p-2 rounded mr-2 flex-row items-center"
            onPress={() => toggleDeleteIcons()}>              
              <MaterialIcons name="edit" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Edit Students</Text>

              <EditAStudent visible = {isEditStudentVisible} onClose = {() => setEditStudentVisible(false)} />
            </TouchableOpacity>


            <TouchableOpacity className="bg-[#105366] p-2 rounded mr-2 flex-row items-center"
            onPress={() => setAddStudentVisible(true)}>
              <AntDesign name="plus" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Add Student</Text>
              <AddAStudent visible = {isAddStudentVisible} onClose = {closeAddStudent} />
            </TouchableOpacity>
          </View>
        </View>


      {/* Student Cards Grid */}
      <View className="flex-row flex-wrap justify-start gap-x-24 gap-y-8 mb-8">
          {students.map((student) => (
            <View key={student.id} style={{ width: 243 }} >
                <TouchableOpacity onPress={navigateToIndividualStudent}>
                   <StudentCard student={student} />
                </TouchableOpacity>

              
                {deletesVisible &&
              (<TouchableOpacity  onPress={() => setEditStudentVisible(true)} 
                  style={{ position: 'absolute', top: -10, right: -10, 
                  }}>

                    <View style={{ position: 'relative' }}>
                      <AntDesign name="closecircle" size={30} color="white"
                        style={{
                          position: "absolute",
                          shadowColor: "black",
                          borderRadius: 200,
                          // shadowOffset: {width: 2, height: 1},
                          shadowRadius: 5
                        }}
                      />
                      <AntDesign name= "close" size = {30} color = "#105366" position= "absolute"></AntDesign>
                  </View>
              </TouchableOpacity>)}
              
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default StudentsPage;