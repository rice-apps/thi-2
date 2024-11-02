import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, SafeAreaView } from "react-native";
import { StudentCard, Student } from "@/components/StudentCard";

// Sample student data
export const sampleStudents: Student[] = [
  { id: "1", name: "Alice Johnson", age: "20", abcReports: "Passed all subjects with distinction", durationReports: "3 hours" },
  { id: "2", name: "Bob Smith", age: "22", abcReports: "Average performance", durationReports: "4 hours" },
  { id: "3", name: "Charlie Brown", age: "21", abcReports: "Excelled in mathematics and science", durationReports: "3.5 hours" },
  { id: "4", name: "Daisy Miller", age: "23", abcReports: "Consistent improvements in all subjects", durationReports: "4 hours" },
  { id: "5", name: "Ethan Green", age: "19", abcReports: "High performance in extracurriculars", durationReports: "2 hours" },
  { id: "6", name: "Fiona White", age: "20", abcReports: "Outstanding leadership", durationReports: "3 hours" },
];

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // In this example, we're directly using the sampleStudents data.
    setStudents(sampleStudents);
  }, []);

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {students.map((student) => (
          <View key={student.id} style={styles.cardContainer}>
            <StudentCard student={student} />
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default StudentsPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "30%", // Each card takes up 30% of the row to fit three cards
    marginBottom: 16,
  },
});
