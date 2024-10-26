import * as React from 'react';
import { TouchableOpacity, Button, Text, View, Image, StyleSheet } from "react-native";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native'

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
        fontWeight: 700,
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
        fontWeight: 700,
        fontSize: 20,
        paddingLeft: 10,
    },
    spacer: {
        height: 130, // Takes up remaining space
    },
    pressedButtonText: {
        color: '#3BB4E4', // Pressed text color
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
                    source = {require('./sidebar/thi logo.png')}
                    />
                    <Text style ={styles.title}>Texas Hearing Institute</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('./sidebar/home.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('./sidebar/account.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Students</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('./sidebar/gamepad.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Games</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('./sidebar/hourglass.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('./sidebar/gear.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>

                {/* Spacer */}
                <View style={styles.spacer} />

                <TouchableOpacity style={styles.buttonContainer}>
                    <Image source={require('./sidebar/signout.png')} style={styles.image} />
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}