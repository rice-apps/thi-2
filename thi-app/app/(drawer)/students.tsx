import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Modal,
  GestureResponderEvent
} from "react-native";
import { StudentCard } from "@/components/StudentCard";
import EditAStudent from "@/screens/student_modals/EditAStudent";
import AddAStudent from "@/screens/student_modals/AddAStudent";
import { useRouter } from 'expo-router';


import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Student, imageUrls } from "@/types";



export const sampleStudents: Student[] = [
  { id: "1", firstName: "Alice", lastName: "Johnson",  abcReports: 1, durationReports: 0 },
  { id: "2", firstName: "Bob", lastName: "Smith",abcReports: 0, durationReports: 1 },
  { id: "3", firstName: "Charlie", lastName: "Brown",abcReports: 1, durationReports: 2 },
  { id: "4", firstName: "Daisy", lastName: "Miller", abcReports: 1, durationReports: 0 },
  { id: "5", firstName: "Ethan", lastName: "Green", abcReports: 3, durationReports: 2 },
  { id: "6", firstName: "Fiona", lastName: "White", abcReports: 0, durationReports: 2 },
  { id: "7", firstName: "George", lastName: "Taylor", abcReports: 0, durationReports: 2 },
];

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(sampleStudents);  //for current state of sampleStudents array
  const [deletesVisible, setDeletesVisible] = useState(false); //state for adding delete exs icons
  const [isEditStudentVisible, setEditStudentVisible] = useState(false); //state for delete modal
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isAddStudentVisible, setAddStudentVisible] = useState(false);  
  const [studentToAdd, setStudentToAdd] = useState<Student | null>(null);



  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);


  const router = useRouter();
  



  const navigateToIndividualStudent = (id: string, firstName: string, lastName: string) => {
    router.push(`/(drawer)/individual_student?id=${id}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`);
  };
  
  

  
  //deleting/editing students functionality
  const toggleDeleteIcons = () => {
    setDeletesVisible(prevState => !prevState); // Toggle the state
  }

  const handleEditStudent = (studentId: string) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId)); 
    setDeletesVisible(false)
    //ADD THE API CALL HERE TO DELETE STUDENT FROM DATABASE
  };

  const handleOpenEditModal = (student: Student) => {
    setStudentToDelete(student);
    setEditStudentVisible(true);
  };


  
  // const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
  //   const studentWithId: Student = {
  //     ...newStudent,
  //   };
  //   setStudents((prevStudents) => [...prevStudents, studentWithId]); 
  //   setAddStudentVisible(false); // Close the modal after adding the student
  // };

  const handleAddStudent = async (newStudent: Student) => {
    try{
      //do we need a token or smth here
      // const token = userToken;
      const token = "abc";

      const response = await fetch('some url here lololol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newStudent)
      });

      if (!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add student');
      }

      const savedStudent = await response.json();


      const formattedStudent: Student = {
        id: savedStudent.id, // are these from the backend???
        firstName: savedStudent.first_name,
        lastName: savedStudent.last_name,
        abcReports: savedStudent.abc_reports ?? 0,
        durationReports: savedStudent.duration_reports ?? 0,
        // avatar: 
      };
      setStudents((prevStudents) => [...prevStudents, formattedStudent]); 
      setAddStudentVisible(false); 
  
    } catch (error) {
      console.error('ERROR: Failed to add student');
    }
  };

  

  const closeAddStudent = () => {
    setAddStudentVisible(false);
  };

  //generate a random 6 digit id for any student added


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="px-12 py-8" showsVerticalScrollIndicator={true}>
        {/* Title Section */}
        <Text className="text-3xl font-bold mb-8 mt-8">Students</Text>
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-bold mb-8 mt-8">Current Students</Text>
          <View className="flex-row">

            
            <TouchableOpacity className="bg-[rgba(16,83,102,0.6)] p-2 rounded mr-2 flex-row items-center"
            onPress={() => toggleDeleteIcons()}>              
              <MaterialIcons name="edit" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Edit Students</Text>

              <EditAStudent visible = {isEditStudentVisible} onClose = {() => setEditStudentVisible(false)}
                                    student={studentToDelete} onDelete={() => 
                                      {if (studentToDelete) 
                                      {handleEditStudent(studentToDelete.id);
                                      setEditStudentVisible(false);
                                      }}
              } />
            </TouchableOpacity>


            <TouchableOpacity className="bg-[#105366] p-2 rounded mr-2 flex-row items-center"
            onPress={() => setAddStudentVisible(true)}>
              <AntDesign name="plus" size={16} color="white" />
              <Text className="text-white font-bold ml-1">Add Student</Text>

              <AddAStudent
                  visible={isAddStudentVisible}
                  onClose={closeAddStudent}
                  onAdd={handleAddStudent} // Pass handleAddStudent function as prop
                />


            </TouchableOpacity>
          </View>
        </View>


      {/* Student Cards Grid */}
      <View style={{ columnGap: 18 }} className="flex-row flex-wrap justify-start gap-y-8 mb-8">
        {students.map((student) => (
            <View key={student.id} style={{ width: 243 }} >
                <TouchableOpacity onPress={ () =>navigateToIndividualStudent(student.id, student.firstName, student.lastName)}>
                   <StudentCard student={student} />
                </TouchableOpacity>

              
          
            
            {/* code for deleting a student card */}
            {deletesVisible &&
              (<TouchableOpacity
                onPress={() => handleOpenEditModal(student)}
                style={{ position: 'absolute', top: -15, right: -15 }}
              >
                <View className="w-8 h-8 rounded-full bg-white justify-center items-center shadow-md">
                  <AntDesign name="close" size={18} color="#105366" />
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
