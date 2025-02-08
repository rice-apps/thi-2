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


interface EditStudentProps {
  visible: boolean;
  onClose: () => void;
}

export default function EditAStudent({ visible, onClose }: EditStudentProps) {
  const [studentName, setStudentName] = useState('');

  const handleDelete = () => {
    console.log('Student deleted');
    onClose();
  };

  return (
    <View>
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}> 
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50"> {/* overlay styling first */}
        <View style={{ width: '40%', backgroundColor: 'white', padding: 20, borderRadius: 5 }}> {/* box styling */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Would you like to delete this student? </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>You will lose all history associated with this student. You will not be able to undo this action. </Text>
          </View>
          
          <View style={{ marginTop: 20, flexDirection: 'row'}}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} > Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#105366', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} 
            onPress={handleDelete}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
</View>
 
  );
}