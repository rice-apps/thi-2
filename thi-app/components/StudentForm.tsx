import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface StudentFormProps {
  visible: boolean;
  onClose: () => void;
}

export function StudentForm({ visible, onClose }: StudentFormProps) {
  const [preIncident, setPreIncident] = useState('');
  const [postIncident, setPostIncident] = useState('');
  const [behavior, setBehavior] = useState('');
  const [length, setLength] = useState('');
  const [notes, setNotes] = useState('');



  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', { preIncident, postIncident, behavior, length, notes });
    onClose(); // Close the modal after submission
  };

  const chooseImage = () => {
    // Handle form submission logic here
    console.log('Image Chosen:');
    onClose(); // Close the modal after submission
  };
  

  return (
    
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

        <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>Student Data</ThemedText>
          </View>


        <View style= {styles.inputContainer}>


          <View style= {styles.inputGroup}>
          <ThemedText style={{fontWeight: 'bold' }}>What happened before the incident?</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="What happened before the incident?"
            value={preIncident}
            onChangeText={setPreIncident}
          />
          </View>


          <View style= {styles.inputGroup}>

          <ThemedText style={{fontWeight: 'bold' }}>What happened after the incident?</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="What happened after the incident?"
            value={postIncident}
            onChangeText={setPostIncident}
          />
          </View>


          <View style= {styles.inputGroup}>
          <ThemedText style={{fontWeight: 'bold' }}>What was the behavior?</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="What was the behavior?"
            value={behavior}
            onChangeText={setBehavior}
          />
          </View>

          <View style= {styles.inputGroup}>
          <ThemedText style={{fontWeight: 'bold' }}>How long did this behavior occur?</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="How long did this behavior occur?"
            value={length}
            onChangeText={setLength}
          />
          </View>



        <View style= {styles.inputGroup}>
          <ThemedText style={{fontWeight: 'bold' }}>Notes</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
          />
        </View>


        <View style= {styles.inputGroup}>
        <ThemedText style={{fontWeight: 'bold' }}> Insert Any Pictures Here </ThemedText>
        {/* <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/upload-image.png')} // Use require for local image
              style={styles.image}
            />
        </View> */}

        <TouchableOpacity style={styles.imageContainer} onPress={chooseImage}>
          <Image
              source={require('../assets/images/upload-image.png')} // Use require for local image
              style={styles.image}
            />
        </TouchableOpacity>
      
      
      </View>
      </View>









        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <ThemedText style={styles.cancelButtonText}> Cancel </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startButton} onPress={handleSubmit}>
            <ThemedText style={styles.startButtonText}> Save </ThemedText>
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
    width: '80%',
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    alignItems: 'flex-start',
    elevation: 5, // For Android shadow
  },

  titleContainer: {
    width: '100%',
    backgroundColor: '#17468F', // Blue background
    padding: 15,
    marginBottom: 10,
  
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
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
    width: '48%', // Set input group width to allow two in a row
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







