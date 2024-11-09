import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {Jost_500Medium} from '@expo-google-fonts/jost';

export type Student = {
  id: string;
  name: string;
  age: string;
  abcReports: number;
  durationReports: number;
};

interface StudentProps {
  student: Student;
}

const imageUrls = [
  "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODAtdi5qcGc.jpg",
  "https://images.rawpixel.com/image_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUteC5qcGc.jpg",
  "https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BkcG9zdGVyMS1sb2MyMDE0NjQ2NzY4Yy1pbWFnZS5qcGc.jpg",
  "https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMTJfM2RfcmVuZGVyX2NoYXJhY3Rlcl9vZl9wdXBweV9jdXRlX2NhcnRvb25fbmF0dV9jOGVlODQyOC1mM2EyLTQzYjEtODEyZi02MzgzNTcwOTY4YzZfMS5qcGc.jpg",
  "https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3N0YXJ0dXBpbWFnZXNfY2FydG9vbl9pbGx1c3RyYXRpb25fb2ZfYV9tb25zdGVyX2N1dGVfa2F3YWlpX2tpZF8zZDQyMWI5NC0yMDk3LTQwNWQtYmM2OS0xOWQxMzM0OWEzNWJfMi5qcGc.jpg",
  "https://img.freepik.com/premium-photo/figurine-cartoon-mammal-animal-ai-generated-image-by-rawpixel_53876-286403.jpg?w=360",
];

export const StudentCard = ({ student }: StudentProps) => {
  const { name, abcReports, durationReports } = student;
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return (
    <View style={styles.card}>
      {/* Blue Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: randomImageUrl }} style={styles.profileImage} />
      </View>

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
    alignItems: "center",
    overflow: "hidden",
    height: 200
  },
  header: {
    backgroundColor: "#17468F",
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    top: 35, // Position it to overlap the header and body
    borderWidth: 3,
    borderColor: "white",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30, // Extra margin to avoid overlap with profile image
  },
  divider: {
    borderBottomColor: "#D2D2D2",
    borderBottomWidth: 1,
    width: "80%",
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
  },
  statBlock: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
});
