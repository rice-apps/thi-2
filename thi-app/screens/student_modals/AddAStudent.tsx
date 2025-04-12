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
import {Student} from "./types"


interface AddStudentProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newStudent: Student) => void; // Accept onAdd as a prop
}

export default function AddAStudent({ visible, onClose, onAdd }: AddStudentProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const handleSubmit = () => {
    if (firstName && lastName) {
      const newStudent: Student = {
        id: Math.random().toString(),  
        firstName: firstName,
        lastName: lastName,
        abcReports: 0, 
        durationReports: 0,
      };
      onAdd(newStudent); 
      setFirstName('');
      setLastName('');
    } else {
      console.log('Please enter a student name');
    }
  };




  return (
    <View>
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}> 
      <View style= {styles.overlay} > {/* overlay styling first */}
        <View style={{ width: '40%', backgroundColor: 'white', padding: 20, borderRadius: 5 }}> {/* box styling */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Would you like to add a student? </Text>
          </View>

          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, paddingLeft: 10, borderRadius: 5 }}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, paddingLeft: 10, borderRadius: 5 }}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
})