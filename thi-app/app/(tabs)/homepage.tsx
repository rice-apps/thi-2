import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Sidebar from '../../components/Sidebar';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View>
        <Sidebar />
      </View>
      <View style={styles.mainContent}>
        <Text>Placeholder home page content</Text>
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