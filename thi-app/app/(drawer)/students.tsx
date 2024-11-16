import {useState} from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import StudentForm from '../../components/StudentForm';
import StudentCard from '../../components/StudentCard';
import AddStudentModal from '../../components/AddStudentModal';

import { TouchableOpacity, Button } from 'react-native';



export default function StudentsPage() {
  const [isAddStudentVisible, setAddStudentVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);



  const closeAddStudent = () => {
    setAddStudentVisible(false);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    
    <View style={styles.container}>
      <View>
        {/* <Sidebar /> */}

      </View>

      
      


      <ScrollView contentContainerStyle = {styles.mainContent}>
        <Text className="text-3xl font-bold mb-[30px]"> Students </Text>


        <View style = {styles.optionRow}>
        <Text className="text-2xl font-bold mb-[30px]"> Current Students </Text>


        <TouchableOpacity  style= {styles.button}>
            <Text style={{ color: 'white' }}> Edit Students </Text>
        </TouchableOpacity>








        <TouchableOpacity style= {styles.button} onPress={() => setAddStudentVisible(true)}>
            <Text style={{ color: 'white' }}>+ Add Student </Text>
            <AddStudentModal visible = {isAddStudentVisible} onClose = {closeAddStudent} />
        </TouchableOpacity>



        <TouchableOpacity  style= {styles.button} onPress={() => setModalVisible(true)}>
            <Text style={{ color: 'white' }}>+ Add Data </Text>
            <StudentForm visible={isModalVisible} onClose={closeModal} />

        </TouchableOpacity>



        </View>
        
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 50}}>
        <StudentCard ></StudentCard>
        <StudentCard ></StudentCard>

        <StudentCard ></StudentCard>
        <StudentCard ></StudentCard>
        <StudentCard ></StudentCard>
        <StudentCard ></StudentCard>


        </View>

      







        
        
        





      </ScrollView>
      
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
    // backgroundColor: '#f5f5f5', // Optional: you can change the background color
    margin: 50,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },
  optionRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button:{
    backgroundColor: '#105366',
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: '17%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',

  }
});
