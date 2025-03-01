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


interface ExcelExportProps {
  visible: boolean;
  onClose: () => void;
}

export default function ExcelExport({ visible, onClose }: ExcelExportProps) {
  const [studentName, setStudentName] = useState('');

  const handleExport = () => {
    console.log('Data exported to excel');
    onClose();
  };

  return (
    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}> 
      <View style={styles.overlay}>
        <View style={{ width: '40%', backgroundColor: 'white', padding: 20, borderRadius: 5 }}> {/* box styling */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Would you like to export this data to Excel?</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>This data will be downloaded into an .xls document that can be viewed in Excel.</Text>
          </View>
          
          <View style={{ marginTop: 20, flexDirection: 'row'}}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} > Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#105366', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} 
            onPress={handleExport}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Export</Text>
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