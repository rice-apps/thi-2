import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StudentForm from "@/screens/student_modals/StudentForm";
import Filter from "@/screens/student_modals/Filter";
import ExcelExport from "@/screens/student_modals/ExcelExport";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';




type ItemProps = {date: string};
const Item = ({date}: ItemProps) => (
  <View>
    <Text> {date}</Text>
  </View>
);



const IndividualStudent = () => {
  const router = useRouter();
  const { id, name} = useLocalSearchParams<{ id: string, name: string}>();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isExportVisible, setExportVisible] = useState(false);
  const [dataEntriesABC, setDataEntriesABC] = useState<any[]>([]);
  const [dataEntriesDuration, setDataEntriesDuration] = useState<any[]>([]);




  //this will eventually be a API fetch call
  const handleAddData = (newData: any) => {
    if (newData.hasOwnProperty('behavior')) {
      setDataEntriesABC((prevEntries) => [...prevEntries, newData]);
    }
    else{
      setDataEntriesDuration((prevEntries) => [...prevEntries, newData]);
    }

    setModalVisible(false); 
  };





  const backToStudentsPage = () => {
    router.replace('/(drawer)/students'); // Pass the student ID as a parameter
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeFilter = () => {
    setFilterVisible(false);
  };
  const closeExport = () => {
    setExportVisible(false);
  };



  const renderABCHeader = () => (
    <View style={{ flexDirection: "row", justifyContent: "flex-start", padding: 10, paddingTop: 15, paddingBottom: 15,  backgroundColor: "#F0F0F0",
        shadowColor: "#000",  
        shadowOffset: { width: 0, height: -4},  
        shadowOpacity: 0.3,  
        shadowRadius: 4,  
        elevation: 5,  
     }}>
      <Text style={{ fontWeight: "bold", width: 75 }}>Date</Text> 
      <Text style={{ fontWeight: "bold", width: 75 }}>Time</Text> 
      <Text style={{ fontWeight: "bold", width: 150 }}>Teacher</Text> 
      <Text style={{ fontWeight: "bold", width: 100 }}>Setting</Text> 
      <Text style={{ fontWeight: "bold", width: 225 }}>Antecedent</Text> 
      <Text style={{ fontWeight: "bold", width: 125 }}>Behavior</Text> 
      <Text style={{ fontWeight: "bold", width: 100 }}>Consequence</Text> 
    </View>
  );
  const renderABCItem = ({ item }: { item: any }) => (
    <View style={{ flexDirection: "row", justifyContent: "flex-start", padding: 10, paddingTop: 15, paddingBottom: 15,  backgroundColor: "#FAFAFA",
      // shadowColor: "#000",  
      // shadowOffset: { width: 0, height:1},  
      // shadowOpacity: 0.5,  
      // shadowRadius: 4,  
      // elevation: 5,  
   }}>
      <Text style={{width: 75 }}>3/1/2025</Text> 
      <Text style={{width: 75 }}>3:15 PM</Text> 
      <Text style={{width: 150 }}>Jane Summers</Text> 
      <Text style={{width: 100 }}>{item.setting}</Text> 
      <Text style={{width: 225 }}>{item.preIncident}</Text> 
      <Text style={{width: 125 }}>{item.behavior}</Text> 
      <Text style={{width: 100 }}>{item.consequence}</Text> 
    </View>
  );
  
  const renderDurationHeader = () => (
    <View style={{ flexDirection: "row", justifyContent: "flex-start", padding: 10, paddingTop: 15, paddingBottom: 15, backgroundColor: "#F0F0F0",
        shadowColor: "#000",  
        shadowOffset: { width: 0, height: -4},  
        shadowOpacity: 0.3,  
        shadowRadius: 4,  
        elevation: 5,  
     }}>
      <Text style={{ fontWeight: "bold", width: 100 }}>Date</Text> 
      <Text style={{ fontWeight: "bold", width: 150 }}>Time Started</Text> 
      <Text style={{ fontWeight: "bold", width: 150 }}>Time Ended</Text> 
      <Text style={{ fontWeight: "bold", width: 150 }}>Total Time</Text> 
      <Text style={{ fontWeight: "bold", width: 200 }}>Activity</Text> 
      <Text style={{ fontWeight: "bold", width: 300 }}>Notes</Text> 
    </View>
  );
  const renderDurationItem = ({ item }: { item: any }) => (
    <View style={{ flexDirection: "row", justifyContent: "flex-start", padding: 10, paddingTop: 15, paddingBottom: 15, backgroundColor: "#FAFAFA",}}>
      <Text style={{width: 100 }}>3/1</Text> 
      <Text style={{width: 150 }}>{item.setting}</Text> 
      <Text style={{width: 150 }}>{item.preIncident} </Text> 
      <Text style={{width: 150 }}> {item.setting} - {item.preIncident} </Text> 
      <Text style={{width: 200 }}>{item.postIncident}</Text> 
      <Text style={{width: 300 }}>{item.notes}</Text> 
    </View>
  );



  return (
    <ScrollView>
    <View className="flex-1 p-8">
     <TouchableOpacity onPress={backToStudentsPage} className="p-2 flex-row items-center">
          <AntDesign name="left" size={24} color="#105366" />
          <Text className="ml-2 text-lg font-bold text-[#105366]">Back To Students</Text>
      </TouchableOpacity>

      {/* Title and Add Data Button */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-3xl font-bold">#{id}: {name}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}
          className="bg-[#105366] p-2 rounded flex-row items-center"
        >
          <AntDesign name="plus" size={16} color="white" />
          <Text className="text-white font-bold ml-1">Add Data</Text>
        </TouchableOpacity>
      </View>

      {/* ABC Behavior Data Section */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold mb-4">ABC Behavior Data 
          <Text className= "text-sm  text-black font-normal px-2"> {dataEntriesABC.length} Reports </Text>
        </Text>
        <View className="flex-row space-x-4">

          {/* Filter Button */}
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <AntDesign name="filter" size={24} color="#105366" />
          </TouchableOpacity>

          <TouchableOpacity onPress= {() => setExportVisible(true)} className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center">
            <MaterialIcons name="download" size={16} color="white" />
            <Text className="text-white font-bold ml-1">Export To Excel</Text>
          </TouchableOpacity>
        </View>
      </View>

          {/* ABC Data Table*/}
          <View className="mb-8">
            {renderABCHeader()}
            <FlatList
            data={dataEntriesABC}
            renderItem={renderABCItem}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>

      {/* Duration Data Section */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold mb-4">Duration Data 
          <Text className= "text-sm  text-black font-normal px-2"> {dataEntriesDuration.length} Reports </Text>
        </Text>

        <View className="flex-row space-x-4">
          {/* Filter Button */}
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <AntDesign name="filter" size={24} color="#105366" />
          </TouchableOpacity>

          <TouchableOpacity onPress= {() => setExportVisible(true)}
            className="bg-[rgba(16,83,102,0.6)] p-3 rounded flex-row items-center">
            <MaterialIcons name="download" size={16} color="white" />
            <Text className="text-white font-bold ml-1">Export To Excel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Duration Data Table*/}
      <View>
        {renderDurationHeader()}
        <FlatList
        data={dataEntriesDuration}
        renderItem={renderDurationItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>


      {/* Modals */}
      <StudentForm visible={isModalVisible} onClose={closeModal} onSubmit={handleAddData} />
      <Filter visible={isFilterVisible} onClose={closeFilter} />
      <ExcelExport visible={isExportVisible} onClose={closeExport} />


    </View>
    </ScrollView>
  );
};

export default IndividualStudent;
