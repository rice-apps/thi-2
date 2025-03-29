import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

// Define props to accept the toggle function
interface FilterStudentsProps {
  toggleFilterStudents: () => void;
}

export const FilterStudents: React.FC<FilterStudentsProps> = ({ toggleFilterStudents }) => {
    const screenWidth = Dimensions.get("window").width * 0.30;
  const [isTeachersVisible, setIsTeachersVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string[]>([]); 

  const [isBehaviorDataVisible, setIsBehaviorDataVisible] = useState(false);
  const [selectedBehaviorData, setSelectedBehaviorData] = useState<string[]>([]); 

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

  const behaviorData = [
    "N/A",
    "1",
    "2",
    "3",
    "4",
  ];

  const toggleTeachers = () => {
    setIsTeachersVisible((prev) => !prev); 
  };

  const toggleBehaviorData = () => {
    setIsBehaviorDataVisible((prev) => !prev); 
  };

  // Teacher Selection
  const toggleTeacherSelection = (teacher: string) => {
    setSelectedTeacher((prevSelected) =>
      prevSelected.includes(teacher)
        ? prevSelected.filter((s) => s !== teacher)
        : [...prevSelected, teacher]
    );
  };

  // Behavior Data Selection
  const toggleBehaviorDataSelection = (data: string) => {
    setSelectedBehaviorData((prevSelected) =>
      prevSelected.includes(data)
        ? prevSelected.filter((s) => s !== data)
        : [...prevSelected, data]
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
      {/* Header */}
      <View className="flex flex-row bg-[#105366] h-[64px] items-center justify-between px-6">
        <Text className="text-white text-xl font-semibold">Filters</Text>
        <FontAwesome6 name="xmark" size={22} color="white" onPress={toggleFilterStudents} />
      </View>

      {/* Form Fields */}
      <View className="m-8 space-y-4">
        {/* Teacher Dropdown */}
        <View>
          <TouchableOpacity
            className="h-[48px] border border-gray-300 rounded-lg mt-2 p-2.5 flex-row justify-between items-center"
            onPress={toggleTeachers}
          >
            <Text className="text-base">Teacher Assigned To</Text>
            <FontAwesome6 name={isTeachersVisible ? "angle-up" : "angle-down"} size={16} />
          </TouchableOpacity>

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
                    onPress={() => toggleTeacherSelection(teacher)}
                  >
                    <Text className="text-base">{teacher}</Text>
                    {selectedTeacher.includes(teacher) && (
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

        {/* Behavior Data Dropdown */}
        <View>
          <TouchableOpacity
            className="h-[48px] border border-gray-300 rounded-lg mt-2 p-2.5 flex-row justify-between items-center"
            onPress={toggleBehaviorData}
          >
            <Text className="text-base">Behavior Data</Text>
            <FontAwesome6 name={isBehaviorDataVisible ? "angle-up" : "angle-down"} size={16} />
          </TouchableOpacity>

          {isBehaviorDataVisible && (
            <ScrollView
              className="border border-gray-300 rounded-lg mt-2 bg-white shadow-md max-h-[248px]"
              nestedScrollEnabled={true}
            >
              {behaviorData.length > 0 ? (
                behaviorData.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-2 border-b last:border-b-0 flex-row justify-between items-center"
                    onPress={() => toggleBehaviorDataSelection(data)}
                  >
                    <Text className="text-base">{data}</Text>
                    {selectedBehaviorData.includes(data) && (
                      <FontAwesome6 name="check" size={16} />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="p-2 text-gray-500">No behavior data available</Text>
              )}
            </ScrollView>
          )}
        </View>
      </View>

      {/* Footer */}
      <View className="absolute bottom-0 flex flex-row border-t border-gray-300 w-full h-[64px] items-center justify-end pr-4 space-x-4">
        <Text className="text-base text-[#105366] font-semibold" onPress={toggleFilterStudents}>
          Cancel
        </Text>
        <TouchableOpacity
          className="shadow bg-[#105366] rounded-lg pt-2 pr-6 pl-6 pb-2"
          onPress={toggleFilterStudents}
        >
          <Text className="text-lg text-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
