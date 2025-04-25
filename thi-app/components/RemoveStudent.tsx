import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RemoveStudentProps {
  toggleRemoveStudent: () => void;
}

export const RemoveStudent: React.FC<RemoveStudentProps> = ({ toggleRemoveStudent }) => {
  return (
    <View className="w-[444px] h-[196px] bg-white rounded-lg shadow-lg p-6">
      {/* Title */}
      <Text className="text-xl font-semibold">
        Would you like to delete this student?
      </Text>

      {/* Description */}
      <Text className="color-gray-500 text-lg font-light leading-snug pt-2">
        You will lose all history associated with this student. 
        You will not be able to undo this action.
      </Text>

      {/* Footer Actions */}
      <View className="absolute bottom-0 left-0 right-0 w-full h-[64px] flex flex-row items-center justify-end gap-4 px-4">
        <Text
          className="text-base text-[#105366] font-semibold"
          onPress={toggleRemoveStudent}
        >
          Cancel
        </Text>

        <TouchableOpacity
          className="bg-[#105366] rounded-lg px-6 py-2 shadow"
          onPress={toggleRemoveStudent}
        >
          <Text className="text-lg text-white font-semibold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
