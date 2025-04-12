import { useContext } from "react";
import { Text, TextInput, View, Dimensions } from "react-native";
import { TimerContext } from "@/context/TimerContext";

const Timer = () => {
    const {
        timeLeft,
        isRunning,
        isPaused,
        inputHours,
        setInputHours,
        inputMinutes,
        setInputMinutes,
        inputSeconds,
        setInputSeconds,
        formatTime,
      } = useContext(TimerContext);
    const { hours, minutes, seconds } = formatTime(timeLeft);
    const height = Dimensions.get("window").height;

    return (
        <View className="flex-1 items-center justify-center w-full mb-2">
            <View
                className="flex-1 bg-white justify-center items-center w-full shadow-md rounded-lg"
                style={{
                    height: height * .37,
                    minWidth: height * .90,
                }}>
                <View className="flex-row space-x-4">
                    {/* Hours Input */}
                    <View
                    className="bg-[rgba(16,83,102,0.6)] aspect-square rounded-lg justify-center items-center"
                    style={{
                        height: height * .24,
                    }}>
                        <TextInput
                            style={{
                                fontSize: 70,
                                fontWeight: "bold",
                                color: "white",
                                textAlign: "center",
                                width: 100,
                            }}
                            value={isRunning || isPaused ? hours : inputHours}
                            onChangeText={(text) =>
                                !isRunning && setInputHours(text)
                            }
                            keyboardType="numeric"
                            maxLength={2}
                            placeholder="00"
                            editable={!isRunning}
                        />
                    </View>

                    {/* Minutes Separator */}
                    <View className="items-center justify-center">
                        <Text className="text-[20px] font-bold text-black">
                            :
                        </Text>
                    </View>

                    {/* Minutes Input */}
                    <View
                    className="bg-[rgba(16,83,102,0.6)] aspect-square rounded-lg flex justify-center items-center"
                    style={{
                        height: height * .24
                    }}>
                        <TextInput
                            style={{
                                fontSize: 70,
                                fontWeight: "bold",
                                color: "white",
                                textAlign: "center",
                                width: 100,
                            }}
                            value={
                                isRunning || isPaused ? minutes : inputMinutes
                            }
                            onChangeText={(text) =>
                                !isRunning && setInputMinutes(text)
                            }
                            keyboardType="numeric"
                            maxLength={2}
                            placeholder="00"
                            editable={!isRunning}
                        />
                    </View>

                    {/* Seconds Separator */}
                    <View className="items-center justify-center">
                        <Text className="text-[20px] font-bold text-black">
                            :
                        </Text>
                    </View>

                    <View
                    className="bg-[rgba(16,83,102,0.6)] aspect-square rounded-lg flex justify-center items-center"
                    style={{
                        height: height * .24
                    }}>
                        <TextInput
                            style={{
                                fontSize: 70,
                                fontWeight: "bold",
                                color: "white",
                                textAlign: "center",
                                width: 100,
                            }}
                            value={
                                isRunning || isPaused ? seconds : inputSeconds
                            }
                            onChangeText={(text) =>
                                !isRunning && setInputSeconds(text)
                            }
                            keyboardType="numeric"
                            maxLength={2}
                            placeholder="00"
                            editable={!isRunning}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Timer;
