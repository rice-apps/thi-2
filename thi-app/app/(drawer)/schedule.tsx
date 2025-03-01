import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Modal, TextInput, Button } from "react-native";
import { Calendar } from 'react-native-big-calendar';
import { addDays, subWeeks, addWeeks, setHours, setMinutes } from 'date-fns';
import { useSidebarContext } from '@/components/Sidebar';
import { AntDesign } from '@expo/vector-icons';

export default function SchedulePage() {
  const { isSidebarOpen } = useSidebarContext();
  const [currentDate, setCurrentDate] = useState(new Date()); // Track current week

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
    start: '',
    end: '',
  });

  // Handle Adding Event
  const handleAddEvent = () => {
    const { title, start, end } = newEvent;
    if (!title || !start || !end) return;

    setEvents([
      ...events,
      {
        title,
        start: new Date(start),
        end: new Date(end),
      }
    ]);
    setModalVisible(false); // Close Modal
    setNewEvent({ title: '', start: '', end: '' }); // Reset Form
  };

  // Move to Previous Week
  const handlePrevWeek = () => {
    setCurrentDate((prev) => subWeeks(prev, 1));
  };

  // Move to Next Week
  const handleNextWeek = () => {
    setCurrentDate((prev) => addWeeks(prev, 1));
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

      {/* Week Navigation Buttons */}
      <View className="flex-row justify-between items-center px-16 pb-4">
        <TouchableOpacity onPress={handlePrevWeek}>
          <AntDesign name="left" size={20} color="#6F97A2" />
        </TouchableOpacity>

        <Text className="text-lg font-bold">{currentDate.toDateString()}</Text>

        <TouchableOpacity onPress={handleNextWeek}>
          <AntDesign name="right" size={20} color="#6F97A2" />
        </TouchableOpacity>
      </View>

      {/* Calendar with Updated Week Navigation */}
      <View className="bg-white rounded-lg shadow-md overflow-hidden mx-4 border border-gray-300">
        <Calendar
          events={events}
          height={800}
          mode="week"
          weekStartsOn={0}
          locale="en"
          date={currentDate} // Controlled by state
          swipeEnabled={true} // Allow swiping if it starts working
          eventCellStyle={{
            backgroundColor: '#105366',
            borderRadius: 8,
            padding: 6,
          }}
          headerContainerStyle={{
            backgroundColor: '#E5E7EB',
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#D1D5DB',
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
          onPress={() => setModalVisible(false)}
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

            <Text className="mb-2 font-bold">Start Time</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Start Time (e.g., 2025-02-22T09:00:00)"
              value={newEvent.start}
              onChangeText={(text) => setNewEvent({ ...newEvent, start: text })}
            />

            <Text className="mb-2 font-bold">End Time</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="End Time (e.g., 2025-02-22T10:00:00)"
              value={newEvent.end}
              onChangeText={(text) => setNewEvent({ ...newEvent, end: text })}
            />

            <Button title="Add Event" onPress={handleAddEvent} />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
