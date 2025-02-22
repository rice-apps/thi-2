import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

// Define props to accept the toggle function
interface AddTeacherProps {
  toggleAddTeacher: () => void;
}

export const AddTeacher: React.FC<AddTeacherProps> = ({ toggleAddTeacher }) => {
  const screenWidth = Dimensions.get("window").width * 0.30;
  const [isStudentsVisible, setIsStudentsVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]); // Track selected students

  // Sample student list
  const students = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Daisy Miller",
    "Ethan Green",
    "Fiona White",
    "Greg Davis",
    "Hannah Long",
    "Issac Smith"
  ];

  const toggleStudents = () => {
    setIsStudentsVisible((prev) => !prev); // Toggle dropdown visibility
  };

  // Function to toggle student selection
  const toggleSelection = (student: string) => {
    setSelectedStudents((prevSelected) => 
      prevSelected.includes(student) 
        ? prevSelected.filter((s) => s !== student) // Remove if already selected
        : [...prevSelected, student] // Add if not selected
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
      {/* AddTeacher Header */}
      <View className="flex flex-row bg-[#105366] h-[64px] items-center justify-between px-6">
        <Text className="text-white text-xl font-semibold">Add Teacher</Text>
        <FontAwesome6 name="xmark" size={22} color="white" onPress={toggleAddTeacher} />
      </View>

      {/* Form Fields */}
      <View className="flex m-8 justify-between gap-4">
        {/* Teacher Name */}
        <View className="flex">
          <Text className="font-bold text-xl">Teacher Name</Text>
          <TextInput className="h-[48px] border rounded-lg mt-4 p-2.5 text-base" placeholder="Enter name" />
        </View>

        {/* Teacher Email */}
        <View>
          <Text className="font-bold text-xl">Teacher Email</Text>
          <TextInput className="h-[48px] border rounded-lg mt-4 p-2.5 text-base" placeholder="Enter email" />
          <Text className="pt-1.5">Answer must be a valid email</Text>
        </View>

        {/* Students Dropdown */}
        <View>
          <Text className="font-bold text-xl">Students</Text>
          
          {/* Dropdown Button */}
          <TouchableOpacity 
            className="h-[48px] border rounded-lg mt-4 p-2.5 flex-row justify-between items-center" 
            onPress={toggleStudents}
          >
            <Text className="text-base">Select Students</Text>
            <FontAwesome6 name={isStudentsVisible ? "angle-up" : "angle-down"} size={16} />
          </TouchableOpacity>

          {/* Dropdown List */}
          {isStudentsVisible && (
            <ScrollView 
              className="border border-gray-300 rounded-lg mt-2 bg-white shadow-md max-h-[248px]"
              nestedScrollEnabled={true}
            >
              {students.length > 0 ? (
                students.map((student, index) => (
                  <TouchableOpacity 
                    key={index} 
                    className="p-2 border-b last:border-b-0 flex-row justify-between items-center"
                    onPress={() => toggleSelection(student)} // Select/deselect student
                  >
                    <Text className="text-base">{student}</Text>
                    {selectedStudents.includes(student) && ( // Show checkmark if selected
                      <FontAwesome6 name="check" size={16} />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="p-2 text-gray-500">No students available</Text>
              )}
            </ScrollView>
          )}
        </View>
      </View>
      {/* AddTeacher Header */}
      <View className="absolute bottom-0 flex flex-row border-t w-full h-[64px] items-center justify-end gap-4 pr-4">
        <Text className="text-base color-[#105366] font-semibold" onPress={toggleAddTeacher}>Cancel</Text>
        <TouchableOpacity className="shadow bg-[#105366] rounded-lg pt-2 pr-6 pl-6 pb-2" onPress={toggleAddTeacher}>
            <Text className="text-lg color-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
