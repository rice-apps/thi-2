import React, {useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';



export default function StudentCard(){

    const [name, setName]= useState('');


    return(
        
        <View style= {styles.container}>
            <View style = {styles.whiteContainer}>
            <Text> name </Text>
            <Text> ABC Behavioral Reports </Text>
            <Text> Duration Reports </Text>
        </View>
        </View>

    );

}


const styles= StyleSheet.create({
    container:{
        width: 250,
        height: 250,
        backgroundColor: '#105366',
        borderRadius: 10,
        fontSize: 30
    },
    whiteContainer: {
        width: 250,
        height: 200,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"

    }


})