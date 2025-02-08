import React, { useState} from 'react';

import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Easing,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';




interface FilterProps {
  visible: boolean;
  onClose: () => void;
}


export default function Filter({ visible, onClose }: FilterProps){
  const [date, setDate]= useState('');
  const [type, setType]= useState('');


  const handleSubmit = () => {
    console.log('Form submitted:', { date, type });
    onClose(); // Close the modal after submission
  };



    return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose = {onClose}>
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Filters</Text>
          {/* <TouchableOpacity onPress={onClose}>
            <Text style= {{color: 'white'}}>x</Text>
         </TouchableOpacity> */}
        </View>

        {/* <Dropdown
        // data={data}
        labelField="label"
        valueField="value"
        // value={selectedValue}
        // onChange={item => setSelectedValue(item.value)}
        renderRightIcon={() => <AntDesign name="down" size={20} color="black" />}
      /> */}



          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}> Cancel </Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.navButton} onPress={handleSubmit}>
            <Text style={styles.navButtonText}>Apply</Text>
          </TouchableOpacity>
          </View> 

      </View>
    </View>
  </Modal>
    );
  }
  
  


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '35%',
    height: '100%',
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    alignItems: 'flex-start',
    elevation: 5, // For Android shadow
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#105366', // Green background
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  mcqContainer: {
    flexDirection: 'column', // Align inputs in a row
    flexWrap: 'wrap', // Allow wrapping to next line
    width: '90%', // Ensure container takes full width
    margin: 20,
    marginBottom: 15, // Space between inputs and buttons
  },

  mcqOption: {
    flexDirection: 'row', // Align inputs in a row
    flexWrap: 'wrap', // Allow wrapping to next line
    width: '90%', // Ensure container takes full width
    margin: 20,
    color: 'red', 
    marginBottom: 15, // Space between inputs and buttons
  },


  bubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#17468F',
    marginRight: 10,
  },
  filledBubble: {
    backgroundColor: '#105366',
  },

  inputContainer: {
    flexDirection: 'row', // Align inputs in a row
    flexWrap: 'wrap', // Allow wrapping to next line
    justifyContent: 'space-around', // Space between input groups
    width: '90%', // Ensure container takes full width
    margin: 20,
    marginBottom: 15, // Space between inputs and buttons
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    paddingBottom: 70, //FIX TIHS 
    borderRadius: 0,
    marginBottom: 15,
  },
  inputGroup: {
    width: '100%', // Set input group width to allow two in a row
    marginBottom: 15, // Space below each input group
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '50%', // Width of the image
    height: 100, // Height of the image
  },
  navButton: {
    backgroundColor: '#105366',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: '20%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,    
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons side by side
    justifyContent: 'flex-end', // Space buttons evenly
    margin: 10,
    width: '95%', // Ensure container takes full width
  },
  startButton: {
    backgroundColor: '#17468F',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: '20%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,    
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: '20%',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#17468F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
