import { TimerProvider } from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(drawer)",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Jost: require("../assets/fonts/Jost-VariableFont_wght.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <TimerProvider>
            <GestureHandlerRootView className="flex-1">
                <View className="absolute inset-0">
                    <Stack>
                        <Stack.Screen
                            name="(drawer)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="index"
                            options={{ headerShown: false }}
                        />
                    </Stack>
                </View>
            </GestureHandlerRootView>
        </TimerProvider>
    );
}
