// import * as React from 'react';
import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Sidebar from '../../components/Sidebar';
import StudentForm from '../../components/StudentForm';
import { TouchableOpacity, Button } from 'react-native';
import StudentCard from '../../components/StudentCard';




export default function StudentPage() {
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    
    <View style={styles.container}>
      <View>
        <Sidebar />

      </View>

      
      


      <View style={styles.mainContent}>
        <Text className="text-3xl font-bold mb-[30px]"> Students </Text>


        <View style = {styles.optionRow}>
        <Text className="text-2xl font-bold mb-[30px]"> Current Students </Text>


        <TouchableOpacity style= {styles.button}>
            <Text>+ Add Student </Text>
        </TouchableOpacity>


        <TouchableOpacity  style= {styles.button}>
            <Text> Edit Students </Text>
        </TouchableOpacity>


        <TouchableOpacity  style= {styles.button} onPress={() => setModalVisible(true)}>
            <Text>+ Add Data </Text>
            <StudentForm visible={isModalVisible} onClose={closeModal} />

        </TouchableOpacity>
    
        </View>

        <StudentCard></StudentCard>


        





      </View>
      
    </View>
  );
}

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Optional: you can change the background color
  },
  optionRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button:{
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: '20%',
    height: '10%'
  

  }
});