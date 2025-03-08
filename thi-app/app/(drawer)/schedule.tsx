import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Modal, TextInput, Button } from "react-native";
import { Calendar } from 'react-native-big-calendar';
import { addWeeks, subWeeks, setHours, setMinutes, startOfWeek, format, parse } from "date-fns";
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { Event, grades } from "@/types";

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Track current week
  const [selectedGrade, setSelectedGrade] = useState("Grade 01");
  const [isFocus, setIsFocus] = useState(false);

  // Store events in state instead of modifying a constant object
  const [gradeEvents, setGradeEvents] = useState<Record<string, Event[]>>({
    "Grade 01": [
      {
        title: "Math Class",
        start: setMinutes(setHours(new Date(), 9), 0), // 9:00 AM Today
        end: setMinutes(setHours(new Date(), 10), 0), // 10:00 AM Today
      },
    ],
    "Grade 02": [
      {
        title: "Science Lab",
        start: setMinutes(setHours(new Date(), 11), 0),
        end: setMinutes(setHours(new Date(), 12), 0),
      },
    ],
    "Grade 03": [
      {
        title: "History Lecture",
        start: setMinutes(setHours(new Date(), 13), 0),
        end: setMinutes(setHours(new Date(), 14), 0),
      },
    ],
    "Grade 04": [
      {
        title: "English Writing",
        start: setMinutes(setHours(new Date(), 15), 0),
        end: setMinutes(setHours(new Date(), 16), 0),
      },
    ],
  });

  const events: Event[] = gradeEvents[selectedGrade] || [];

  // State for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  // Move to Today
  const handleGoToToday = () => {
    setCurrentDate(startOfWeek(new Date(), { weekStartsOn: 0 }));
  };

  // Move to Previous/Next Week
  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  // Handle Adding Event (Fixed)
  const handleAddEvent = () => {
    const { title, start, end } = newEvent;
    if (!title || !start || !end) return;

    // Ensure new event start & end are Date objects
    const newEventData: Event = {
      title,
      start: new Date(start),
      end: new Date(end),
    };

    // Add new event to the selected grade (IMMUTABLY update state)
    setGradeEvents((prev) => ({
      ...prev,
      [selectedGrade]: [...prev[selectedGrade], newEventData],
    }));

    setModalVisible(false); // Close Modal
    setNewEvent({ title: "", start: new Date(), end: new Date() }); // Reset Form
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5] px-16" >
      <View className="flex-row justify-between items-center p-16">
        <Text className="text-4xl font-bold">Schedule</Text>
      </View>

      <View className="flex-row justify-between items-center px-6 py-3 bg-[#F0F0F0] border-b border-gray-300">
        {/* Left: Today & Navigation */}
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleGoToToday}
            className="bg-[#6F97A2] px-4 py-2 rounded mr-3"
          >
            <Text className="text-white text-base font-bold">Today</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrevWeek} className="p-2 rounded mr-2">
            <AntDesign name="left" size={18} color="#6F97A2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek} className="p-2 rounded">
            <AntDesign name="right" size={18} color="#6F97A2" />
          </TouchableOpacity>
        </View>

        {/* Center: Current Date */}
        <Text className="text-lg font-bold">{format(currentDate, "EEEE, MMM d yyyy")}</Text>

        {/* Right: Grade Selection & Add Event */}
        <View className="flex-row items-center">
          {/* Grade Dropdown */}
          <View className="w-[120px] border border-gray-400 rounded bg-[#6F97A2] px-3 py-2 flex-row items-center">
            <Dropdown
              style={{ flex: 1 }} // Allow text to take space properly
              data={grades}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Grade' : '...'}
              value={selectedGrade}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedGrade(item.value);
                setIsFocus(false);
              }}
              containerStyle={{ backgroundColor: 'white', borderRadius: 8 }}
              selectedTextStyle={{ fontWeight: "bold", color: "white", fontSize: 14 }}
              placeholderStyle={{ fontWeight: "bold", color: "white", fontSize: 14 }}
              iconColor="#F6F6F6"
            />
          </View>

          {/* Add Event Button */}
          <TouchableOpacity
            className="bg-[#105366] px-4 py-2 ml-3 rounded flex-row items-center"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white text-base font-bold">+ Add Event</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Calendar */}
      <View className="bg-white rounded-lg shadow-md overflow-hidden mx-4 border border-gray-300">
        <Calendar
          events={events}
          height={800}
          mode="week"
          weekStartsOn={0}
          locale="en"
          date={currentDate}
          swipeEnabled={true}
          eventCellStyle={{
            backgroundColor: "#105366",
            borderRadius: 8,
            padding: 6,
          }}
          headerContainerStyle={{
            backgroundColor: "#FAFAFA",
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#D1D5DB",
          }}
          dayHeaderHighlightColor="#105366"
          onPressEvent={(event) => alert(`Event: ${event.title}`)}
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
              placeholder="Start Time (YYYY-MM-DD HH:mm)"
              value={format(newEvent.start, "yyyy-MM-dd HH:mm")}
              onChangeText={(text) => setNewEvent({ ...newEvent, start: parse(text, "yyyy-MM-dd HH:mm", new Date()) })}
            />

            <Text className="mb-2 font-bold">End Time</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="End Time (YYYY-MM-DD HH:mm)"
              value={format(newEvent.end, "yyyy-MM-dd HH:mm")}
              onChangeText={(text) => setNewEvent({ ...newEvent, end: parse(text, "yyyy-MM-dd HH:mm", new Date()) })}
            />

            <Button title="Add Event" onPress={handleAddEvent} />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
