import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { StudentCard, Student } from "@/components/StudentCard";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Jost_500Medium} from '@expo-google-fonts/jost';


// Sample student data
export const sampleStudents: Student[] = [
  { id: "1", name: "Alice Johnson", age: "20", abcReports: 1, durationReports: 2},
  { id: "2", name: "Bob Smith", age: "22", abcReports: 0, durationReports: 1 },
  { id: "3", name: "Charlie Brown", age: "21", abcReports: 1, durationReports: 2},
  { id: "4", name: "Daisy Miller", age: "23", abcReports: 1, durationReports: 0},
  { id: "5", name: "Ethan Green", age: "19", abcReports: 3, durationReports: 2},
  { id: "6", name: "Fiona White", age: "20", abcReports: 0, durationReports: 2},
];

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(sampleStudents); // Load the sample students
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title Section */}
        <Text style={styles.title}>Students</Text>
        <View style={styles.actionsContainer}>
          <Text style={styles.subtitle}>Current Students</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton}>
              <AntDesign name="plus" size={16} color="white" style={{paddingRight: 5}}/>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <MaterialIcons name="edit" size={16} color="white" style={{paddingRight: 5}}/>
              <Text style={styles.buttonText}>Edit Students</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Student Cards Grid */}
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
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    fontFamily: "Jost_500Medium"
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Jost_500Medium"
  },
  buttonContainer: {
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: "#17468F",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#17468F",
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  grid: {
    paddingTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "30%", // Each card takes up 30% of the row to fit three cards
    marginVertical: 16
  },
});
