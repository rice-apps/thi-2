import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { styles } from './StudentForm'; // Adjust the path as necessary


interface StudentFormProps {
  visible: boolean;
  onClose: () => void;
}

export function StudentForm({ visible, onClose }: StudentFormProps) {
  const [whichBehavior, setWhichBehavior]= useState('');
  const [whichForm, setWhichForm]= useState('');


  
  const [setting, setSetting] = useState('');
  const [preIncident, setPreIncident] = useState('');
  const [postIncident, setPostIncident] = useState('');
  const [behavior, setBehavior] = useState('');
  const [consequence, setConsequence] = useState('');

  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(0); // State to track the current step in the form





  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', { preIncident, postIncident, behavior, length, notes });
    onClose(); // Close the modal after submission
  };


  const handleNext = () => {
    if (step === 0) {
      handleBehavior();
    }
    setStep((prevStep) => prevStep + 1);

  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };


  const handleBehavior= () =>{
    setWhichForm(whichBehavior === 'ABC Behavior' ? 'A' : 'B');
  }






  const renderFirstStep = () => (
    <View style={styles.mcqContainer}>
      <ThemedText style={{ fontWeight: 'bold' }}>What type of data do you want to record?</ThemedText>
            <TouchableOpacity onPress={() => { setWhichBehavior('ABC Behavior'); handleBehavior(); }}>
                <View style= {styles.mcqOption}>
                    <View style = {[styles.bubble, whichBehavior === 'ABC Behavior' && styles.filledBubble]}></View>
                    <ThemedText>ABC Behavior Data</ThemedText>
                </View>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => { setWhichBehavior('Duration Data'); handleBehavior(); }}>
                    <View style= {styles.mcqOption}>
                        <View style = {[styles.bubble, whichBehavior === 'Duration Data' && styles.filledBubble]}></View>
                        <ThemedText> Duration Data</ThemedText>
                    </View>
              </TouchableOpacity>
    </View>
  );




  const renderFormA = () => (
    <ScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Setting</ThemedText>
          <TextInput
            style={styles.input}
            value={setting}
            onChangeText={setSetting}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Antecedent</ThemedText>
          <TextInput
            style={styles.input}
            value={preIncident}
            onChangeText={setPreIncident}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Behavior</ThemedText>
          <TextInput
            style={styles.input}
            value={behavior}
            onChangeText={setBehavior}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Consequence</ThemedText>
          <TextInput
            style={styles.input}
            value={consequence}
            onChangeText={setConsequence}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Notes</ThemedText>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Insert Any Pictures Here</ThemedText>
          <TouchableOpacity style={styles.imageContainer} onPress={() => console.log('Image chosen')}>
            <Image
              source={require('../assets/images/upload-image.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderFormB = () => (
    <ScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Time Started</ThemedText>
          <TextInput
            style={styles.input}
            value={setting}
            onChangeText={setSetting}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Time Ended</ThemedText>
          <TextInput
            style={styles.input}
            value={preIncident}
            onChangeText={setPreIncident}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Activity</ThemedText>
          <TextInput
            style={styles.input}
            value={postIncident}
            onChangeText={setPostIncident}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={{ fontWeight: 'bold' }}>Notes</ThemedText>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </View>
    </ScrollView>
  );







  return (
    
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

        <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>Student Data</ThemedText>
          </View>


        
          {step === 0 && renderFirstStep()}
          {step===1 && whichForm === 'A' && renderFormA()}
          {step=== 1 && whichForm === 'B' && renderFormB()}




      <View style={styles.buttonContainer}>
            {step > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
                <ThemedText style={styles.navButtonText}>Previous</ThemedText>
              </TouchableOpacity>
            )}
            {step < 1 ? (
              <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                <ThemedText style={styles.navButtonText}>Next</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.navButton} onPress={handleSubmit}>
                <ThemedText style={styles.navButtonText}>Save</ThemedText>
              </TouchableOpacity>
            )}
          </View> 



        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <ThemedText style={styles.cancelButtonText}> Cancel </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startButton} onPress={handleSubmit}>
            <ThemedText style={styles.startButtonText}> Save </ThemedText>
          </TouchableOpacity>
          

          </View> */}

        </View>
      </View>
    </Modal>
  );
}


