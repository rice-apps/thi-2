import {View, StyleSheet, Text, Image, TextInput, TouchableOpacity  } from 'react-native';
import React, { useState } from 'react';


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
    
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'sans-serif',
        color: 'black',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
        lineHeight: 24,
        
    },
    inputBox: {
        marginBottom: 15,
        width: 300,
        alignSelf: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#17468F',
        borderRadius: 5,
        marginTop: 10,
        width: 300,
    },
    buttonText: {
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 270,
        height: 121,
        alignSelf: 'center',
        margin: 50,
    }
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email:', username);
      };

    const handleGoogleLogin = () => {
        console.log('Google Login');

    }

    const handleAppleLogin = () => {
        console.log('Apple Login');
    }

    const handleFacebookLogin = () => {
        console.log('Facebook Login');
    }

    return (
        <View style={styles.container}>
            <Image 
            style ={styles.image} 
            source={require('../../assets/images/logo.png.png')}

            />
            <Text style ={styles.title}>Welcome Back!</Text>
            <TextInput style={styles.subTitle} editable={false} value="Please login to your account to continue."/>
            <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Email Address"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoogleLogin} style={styles.button}>    
                <Text style={styles.buttonText}>Login with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAppleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFacebookLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login with Facebook</Text>
            </TouchableOpacity>
        
        </View>
        
);
};


export default Login;
