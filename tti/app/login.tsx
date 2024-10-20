import { View, StyleSheet, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput} from 'react-native-paper';


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 100,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'sans-serif',
        color: '#6c757d',
    },
    inputBox: {
        marginBottom: 15,
        width: 300,
        alignSelf: 'center',
        backgroundColor: '#9fd2ed',
        height: 40,
    },
    button: {
        backgroundColor: '#154890',
        alignSelf: 'center',
    },
    image: {
        width: 250,
        height: 100,
        alignSelf: 'center',
        margin: 50,
    }
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email:', username);
        console.log('Password:', password);
      };

    return (
        <View style={styles.container}>
            <Image 
            style ={styles.image} 
            source = {{uri:'https://wp04-media.cdn.ihealthspot.com/wp-content/uploads/sites/151/2021/07/logo.png.webp'}}
            />
            <Text style ={styles.title}>Welcome to the Texas Hearing Institute!</Text>


            <TextInput 
            style = {styles.inputBox}
            placeholder="User Name"
            value={username}
            onChangeText={setUsername}
            />
             
            <TextInput 
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style = {styles.inputBox}
            secureTextEntry
            />

            <Button mode= "contained" onPress={handleLogin} style={styles.button}>
            Login
            </Button>
            
        </View>

        
);
};


export default Login;
