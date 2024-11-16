import React, { createContext, useContext, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Animated, {
    SharedValue,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Easing,
  } from 'react-native-reanimated';

// Customize animation settings
const ImageAnimationCustomization = createContext({
    transitionEasing: Easing.out(Easing.cubic),
    transitionDuration: 400, // in ms
    // Add more
  })
  
  export const useImageAnimationCustomization = () => useContext(ImageAnimationCustomization);

export default function ImageTimer({ imageName }: { imageName: (id: string) => any }, { animatedValue }: { animatedValue: SharedValue<number> }) {
    // Animation settings
    const { transitionEasing, transitionDuration } = useImageAnimationCustomization();
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const images = { image: require(imageName), }

    /* Animation interpolations */

    // Rotation
    const imageTimerStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: `${interpolate(animatedValue.value, [0, 0.5, 1], [0, -90, -180])}deg` }
        ],
    }));

    return (
        // Animated container
        <Animated.View className="flex-1 justify-center " style={imageTimerStyle}>
            <Image className="flex-1" source={require=("../assets/images/" + imageName)}/>
        </Animated.View>
    );
}