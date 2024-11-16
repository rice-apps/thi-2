// import * as React from 'react';
import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Sidebar from '../../components/Sidebar';
import StudentForm from '../../components/StudentForm';
import StudentCard from '../../components/StudentCard';

import { Button } from 'react-native';



export default function HomePage() {
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    
    <View style={styles.container}>
      <View>
        {/* <Sidebar /> */}
        <StudentCard/>

      </View>

      
      



      <View style={styles.mainContent}>
        <Text>Placeholder home page content</Text>



        <View>
              <Button title="+ Add Data" onPress={() => setModalVisible(true)} />
              <StudentForm visible={isModalVisible} onClose={closeModal} />
      </View>
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
});