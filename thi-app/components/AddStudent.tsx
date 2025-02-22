import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

// Define props to accept the toggle function
interface AddStudentProps {
  toggleAddStudent: () => void;
}

export const AddStudent: React.FC<AddStudentProps> = ({ toggleAddStudent }) => {
  const screenWidth = Dimensions.get("window").width * 0.30;
  const [isTeachersVisible, setIsTeachersVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string[]>([]); // Track selected students

  // Sample student list
  const teachers = [
    "Anderson",
    "Brown",
    "Clifford",
    "Dean",
    "Elton",
    "Fitzgerald",
    "Gregory",
    "Hugh",
    "Ingram"
  ];

  const toggleTeachers = () => {
    setIsTeachersVisible((prev) => !prev); // Toggle dropdown visibility
  };

  // Function to toggle teacher selection
  const toggleSelection = (teacher: string) => {
    setSelectedTeacher((prevSelected) => 
      prevSelected.includes(teacher) 
        ? prevSelected.filter((s) => s !== teacher) // Remove if already selected
        : [...prevSelected, teacher] // Add if not selected
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        right: 0, // Ensure it slides in from the right
        width: screenWidth,
        backgroundColor: "white",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      <View className="flex flex-row bg-[#105366] h-[64px] items-center justify-between px-6">
        <Text className="text-white text-xl font-semibold">Add Student</Text>
        <FontAwesome6 name="xmark" size={22} color="white" onPress={toggleAddStudent} />
      </View>

      {/* Form Fields */}
      <View className="flex m-8 justify-between gap-4">
        {/* Student Name */}
        <View className="flex">
          <Text className="font-bold text-xl">Student Name</Text>
          <TextInput className="h-[48px] border rounded-lg mt-4 p-2.5 text-base" placeholder="Enter name" />
        </View>

        {/* Students Dropdown */}
        <View>
          <Text className="font-bold text-xl">Teachers Assigned To</Text>
          
          {/* Dropdown Button */}
          <TouchableOpacity 
            className="h-[48px] border rounded-lg mt-4 p-2.5 flex-row justify-between items-center" 
            onPress={toggleTeachers}
          >
            <Text className="text-base">Select Teacher</Text>
            <FontAwesome6 name={isTeachersVisible ? "angle-up" : "angle-down"} size={16} />
          </TouchableOpacity>

          {/* Dropdown List */}
          {isTeachersVisible && (
            <ScrollView 
              className="border border-gray-300 rounded-lg mt-2 bg-white shadow-md max-h-[248px]"
              nestedScrollEnabled={true}
            >
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <TouchableOpacity 
                    key={index} 
                    className="p-2 border-b last:border-b-0 flex-row justify-between items-center"
                    onPress={() => toggleSelection(teacher)} // Select/deselect student
                  >
                    <Text className="text-base">{teacher}</Text>
                    {selectedTeacher.includes(teacher) && ( // Show checkmark if selected
                      <FontAwesome6 name="check" size={16} />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="p-2 text-gray-500">No teachers available</Text>
              )}
            </ScrollView>
          )}
        </View>
      </View>
      {/* AddStudent Header */}
      <View className="absolute bottom-0 flex flex-row border-t w-full h-[64px] items-center justify-end gap-4 pr-4">
        <Text className="text-base color-[#105366] font-semibold" onPress={toggleAddStudent}>Cancel</Text>
        <TouchableOpacity className="shadow bg-[#105366] rounded-lg pt-2 pr-6 pl-6 pb-2" onPress={toggleAddStudent}>
            <Text className="text-lg color-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
