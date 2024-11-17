import React, { createContext, useContext, useState } from 'react';
import { View, Image, Dimensions, ImageSourcePropType } from 'react-native';
import Animated, {
    SharedValue,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Easing,
} from 'react-native-reanimated';

// Context for timer animation state
export const AnimatedTimerContext = createContext({
    isTimerActive: false,
    toggleTimer: () => {},
});

// Customize animation settings
const ImageAnimationCustomization = createContext({
    transitionEasing: Easing.out(Easing.cubic),
    transitionDuration: 400, // in ms
    // Add more
})
  
export const useAnimatedTimerContext = () => useContext(AnimatedTimerContext);
export const useImageAnimationCustomization = () => useContext(ImageAnimationCustomization);

export default function ImageTimer({ imageName }: { imageName: string }, { animatedValue }: { animatedValue: SharedValue<number> }) {
    // Timer state and transition settings
    const { isTimerActive, toggleTimer } = useAnimatedTimerContext();
    const { transitionEasing, transitionDuration } = useImageAnimationCustomization();
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    // Init source image as null
    var image:ImageSourcePropType = require('../assets/images/tiger.png'); // Temporarily set to tiger
    // Init map of preloaded image requires
    const imageMap = {
        tiger: require('../assets/images/tiger.png'),
        // hippo: require('../assets/images/hippo.png')
        // Add more
    }
    const timerAnimatedValue = useSharedValue(isTimerActive ? 1 : 0);

    function checkImageExists(key: string): key is keyof typeof imageMap {
        return key in imageMap;
    }

    if (checkImageExists(imageName)) {
        image = imageMap[imageName as keyof typeof imageMap]
    } else {
        console.error(`${imageName} does not exist in the imageMap`);
    }

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
            <Image className="flex-1" source={image}/>
        </Animated.View>
    );
}