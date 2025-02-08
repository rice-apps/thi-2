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
  const [studentName, setStudentName] = useState('');
  

  const handleSubmit = () => {
    if (studentName.trim()) {
      const newStudent: Student = {
        id: Math.random().toString(),  
        name: studentName,
        age: "20", 
        abcReports: 0, 
        durationReports: 0,
      };
      onAdd(newStudent); 
      setStudentName('');
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
})