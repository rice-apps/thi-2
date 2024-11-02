import React from "react";
import { Text, View, StyleSheet } from "react-native";

export type Student = {
  id: string;
  name: string;
  age: string;
  abcReports: string;
  durationReports: string;
};

interface StudentProps {
  student: Student;
}

export const StudentCard = ({ student }: StudentProps) => {
  const { name, abcReports, durationReports } = student;

  return (
    <View style={styles.card}>
      {/* Blue Header Section */}
      <View style={styles.header}></View>

      {/* Student Name */}
      <Text style={styles.name}>{name}</Text>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Report Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>{durationReports}</Text>
          <Text style={styles.statLabel}>Duration Reports</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>{abcReports}</Text>
          <Text style={styles.statLabel}>ABC Behavioral Reports</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#1E3A8A", // Blue header color
    height: 80,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  divider: {
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  statBlock: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
});
