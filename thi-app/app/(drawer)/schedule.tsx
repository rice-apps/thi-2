import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal, TextInput, Button, Platform } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSidebarContext } from '@/components/Sidebar';
import { addDays, setHours, setMinutes } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';

export default function SchedulePage() {
  const { isSidebarOpen } = useSidebarContext();
  const cardWidth = isSidebarOpen ? "30%" : "22%";

  const [events, setEvents] = useState([
    {
      title: 'Activity Name',
      start: setMinutes(setHours(new Date(), 9), 0),  // 9:00 AM Today
      end: setMinutes(setHours(new Date(), 9), 50),   // 9:50 AM Today
    },
    {
      title: 'Activity Name',
      start: setMinutes(setHours(addDays(new Date(), 1), 10), 0),  // 10:00 AM Tomorrow
      end: setMinutes(setHours(addDays(new Date(), 1), 10), 50),   // 10:50 AM Tomorrow
    },
  ]);

  // State for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  // State for DateTimePicker
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Handle Adding Event
  const handleAddEvent = () => {
    const { title, start, end } = newEvent;
    if (!title || !start || !end) return;

    // Add new event to state
    setEvents([...events, { title, start, end }]);
    setModalVisible(false); // Close Modal
    setNewEvent({ title: '', start: new Date(), end: new Date() }); // Reset Form
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <View className="flex-row justify-between items-center p-16">
        <Text className="text-3xl font-bold">Schedule</Text>
        <TouchableOpacity
          className="bg-[#105366] p-2 rounded flex-row items-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white font-bold ml-1">+ Add Event</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-lg shadow-md overflow-hidden mx-4">
        <Calendar
          events={events}
          height={800}
          mode="week"
          weekStartsOn={0}
          locale="en"
          date={new Date()}
          swipeEnabled={true}
          eventCellStyle={{
            backgroundColor: '#105366',
            borderRadius: 8,
          }}
          headerContainerStyle={{
            backgroundColor: '#F5F5F5',
          }}
          dayHeaderHighlightColor="#105366"
          onPressEvent={(event) => {
            alert(`Event: ${event.title}`);
          }}
        />
      </View>

      {/* Add Event Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]"
          activeOpacity={1}
          onPress={() => setModalVisible(false)} // Close on backdrop press
        >
          <View className="bg-white rounded-lg p-4 w-[80%]" style={{ zIndex: 10, elevation: 10 }}>
            <Text className="text-xl font-bold mb-4">Add New Event</Text>

            <Text className="mb-2 font-bold">Event Title</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Event Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
            />

            <TouchableOpacity
              className="border border-gray-300 rounded p-2 mb-4"
              onPress={() => setShowStartPicker(true)}
            >
              <Text>Start Time: {newEvent.start.toLocaleString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-gray-300 rounded p-2 mb-4"
              onPress={() => setShowEndPicker(true)}
            >
              <Text>End Time: {newEvent.end.toLocaleString()}</Text>
            </TouchableOpacity>

            <Button title="Add Event" onPress={handleAddEvent} />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Date Picker for Start Time */}
      {showStartPicker && (
        <Modal
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowStartPicker(false)}
        >
          <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <View className="bg-white rounded-lg p-4 w-[80%]" style={{ zIndex: 20, elevation: 20 }}>
              <DateTimePicker
                value={newEvent.start}
                mode="datetime"
                display="default"
                onChange={(event, date) => {
                  setShowStartPicker(Platform.OS === 'ios');
                  if (date) setNewEvent({ ...newEvent, start: date });
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Date Picker for End Time */}
      {showEndPicker && (
        <Modal
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowEndPicker(false)}
        >
          <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <View className="bg-white rounded-lg p-4 w-[80%]" style={{ zIndex: 20, elevation: 20 }}>
              <DateTimePicker
                value={newEvent.end}
                mode="datetime"
                display="default"
                onChange={(event, date) => {
                  setShowEndPicker(Platform.OS === 'ios');
                  if (date) setNewEvent({ ...newEvent, end: date });
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};
