import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

/* React native styling impl */
const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#17468F',
        width: 339,
        height: 834,
    },
    title: {
        color: '#3BB4E4',
        fontFamily: 'sans-serif',
        fontWeight: "700",
        fontSize: 20,
    },
    headerContainer: {
        width: 267,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 
    contentContainer: {
        flex: 1,
        width: 267,
        height: 706,
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    buttonText: {
        color: 'white',
        fontFamily: 'sans-serif',
        fontWeight: "700",
        fontSize: 20,
        paddingLeft: 10,
    },
    spacer: {
        height: 130, // Takes up remaining space
    },
    pressedButtonText: {
        color: '#3BB4E4', // Pressed text color
    },
    image: {
        height: 20,
        width: 21,
    },
}
);

export default function Sidebar() {
    return(
        <View style={styles.background}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Image 
                    style = {{
                        width: 44,
                        height: 45,
                    }}
                    source = {require('../assets/images/thi_logo.png')}
                    />
                    <Text style ={styles.title}>Texas Hearing Institute</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('../assets/images/home_icon.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('../assets/images/students_icon.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Students</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('../assets/images/games_icon.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Games</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('../assets/images/timer_icon.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('../assets/images/settings_icon.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>

                {/* Spacer */}
                <View style={styles.spacer} />

                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('../assets/images/sign_out_icon.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

/* Nativewind styling impl (broken) */
// export default function Sidebar() {
//     return(
//         <View className="flex-1 justify-center bg-[#17468F] w-[339px] h-[834px]">
//             <View className="flex-1 w-[267px] h-[706px] self-center justify-evenly items-start flex-col">
//                 <View className="flex-row justify-between items-center w-[267px] h-[45px]">
//                     <Image
//                         style={{ width: 44, height: 45 }}
//                         source={require('../assets/images/thi_logo.png')}
//                     />
//                     <Text className="text-[#3BB4E4] font-sans font-bold text-[20px]">Texas Hearing Institute</Text>
//                 </View>
//                 <TouchableOpacity className="flex-row items-center">
//                     <Image source={require('../assets/images/home_icon.png')} className="w-6 h-6" />
//                     <Text className="text-white font-sans font-bold text-[20px] pl-2">Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="flex-row items-center">
//                     <Image source={require('../assets/images/students_icon.png')} className="w-6 h-6" />
//                     <Text className="text-white font-sans font-bold text-[20px] pl-2">Students</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="flex-row items-center">
//                     <Image source={require('../assets/images/games_icon.png')} className="w-6 h-6" />
//                     <Text className="text-white font-sans font-bold text-[20px] pl-2">Games</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="flex-row items-center">
//                     <Image source={require('../assets/images/timer_icon.png')} className="w-6 h-6" />
//                     <Text className="text-white font-sans font-bold text-[20px] pl-2">Timer</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="flex-row items-center">
//                     <Image source={require('../assets/images/settings_icon.png')} className="w-6 h-6" />
//                     <Text className="text-white font-sans font-bold text-[20px] pl-2">Settings</Text>
//                 </TouchableOpacity>

//                 {/* Spacer */}
//                 <View className="h-[130px]" />

//                 <TouchableOpacity className="flex-row items-center">
//                     <Image source={require('../assets/images/sign_out_icon.png')} className="w-6 h-6" />
//                     <Text className="text-white font-sans font-bold text-[20px] pl-2">Sign Out</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }