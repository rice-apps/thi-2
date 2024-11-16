import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native';
import { styles } from './StudentFormStyles';
import StudentCard from './StudentCard';


interface AddStudentProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddStudentModal({ visible, onClose }: AddStudentProps) {
  const [studentName, setStudentName] = useState('');

  const handleSubmit = () => {
    if (studentName.trim()) {
      console.log('Student submitted:', { studentName });
      onClose(); // close the modal
    } else {
      console.log('Please enter a student name');
    }
  };

  return (
    <View>
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}> 
    
      <View style={styles.overlay}> {/* overlay styling first */}
        <View style={{ width: '40%', backgroundColor: 'white', padding: 20, borderRadius: 5 }}> {/* box styling */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Would you like to add a student? </Text>
            
          </View>





          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, paddingLeft: 10, borderRadius: 5 }}
            placeholder="Student Name"
            value={studentName}
            onChangeText={setStudentName}
          />




          <View style={{ marginTop: 20, flexDirection: 'row'}}>

          <TouchableOpacity onPress={onClose}>
              <Text style={{paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} > Cancel </Text>
            </TouchableOpacity>


            <TouchableOpacity style={{ backgroundColor: '#105366', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} onPress={handleSubmit}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
            
            
        
          </View>
        </View>
      </View>
      
    </Modal>



</View>


    
  );
}
