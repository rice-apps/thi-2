import React from "react";
import { View } from "react-native";
import { StudentCard } from "./StudentCard";
import { Student } from "@/types";

export const StudentList = React.memo(({ students }: { students: Student[] }) => (
    <View className="flex-row flex-wrap justify-center gap-x-32 gap-y-8 mb-8">
      {students.map((student) => (
        <View key={student.id} style={{ width: 243 }}>
          <StudentCard student={student} />
        </View>
      ))}
    </View>
  ));