import { StudentCard } from "@/components/StudentCard";
import SmallTimer from "@/components/TimerSmallComponent";
import { TimerContext } from "@/context/TimerContext";
import { Student } from "@/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { sampleStudents } from "./students";

export const teacherName = "Jane Summers";

const homePage = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        setStudents(sampleStudents); // Load the sample students
    }, []);

    const {
        timeLeft,
        isRunning,
        isPaused,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
    } = useContext(TimerContext);

    return (
        <SafeAreaView className="flex-1 scrollabale">
            <ScrollView className="px-12 py-8">
                <Text className="text-3xl font-bold mb-8">
                    Welcome, {teacherName}!
                </Text>

                <View className="mb-5">
                    <Text className="text-lg font-bold mb-8">Timer</Text>
                    {timeLeft != 0 ? (
                        <SmallTimer />
                    ) : (
                        <>
                            <View className="p-8 h-[164px] mb-4 bg-white rounded-lg shadow-md justify-center items-center flex-col">
                                <MaterialCommunityIcons
                                    name="timer-sand"
                                    size={40}
                                    color="#10536699"
                                />
                                <Text className="text-lg font-bold">
                                    There is no timer currently active
                                </Text>
                            </View>
                        </>
                    )}
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold mb-8">
                        Recent History
                    </Text>
                    <View className="p-8 h-[59px] mb-4 bg-white rounded-lg shadow-md justify-center items-center">
                        <Text>There Is No Data To Currently Display</Text>
                    </View>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold mb-8">Students</Text>
                    <View className="flex-row flex-wrap justify-center gap-x-32 gap-y-8 mb-8">
                        {students.map((student) => (
                            <View
                                key={student.id}
                                style={{
                                    width: 243,
                                }}
                            >
                                <StudentCard student={student} />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default homePage;
