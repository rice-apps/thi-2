
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface EditStudentProps {
  visible: boolean;
  onClose: () => void;
  student: { id: string; name: string } | null;
  onDelete: () => void;
}

export default function EditAStudent({ visible, onClose, student, onDelete }: EditStudentProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={{ width: '40%', backgroundColor: 'white', padding: 20, borderRadius: 5 }}>
          {student && (
            <>
              <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>Delete {student.name}?</Text>
              <Text style={{ fontSize: 15 }}>
                You will lose all history associated with this student. This action cannot be undone.
              </Text>
            </>
          )}
        

          <View style={{ marginTop: 20, flexDirection: 'row'}}>
            <TouchableOpacity onPress={onClose}>
            <Text style={{paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} > Cancel </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{ backgroundColor: '#105366', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} 
            onPress={onDelete}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
