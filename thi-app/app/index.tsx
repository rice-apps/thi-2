import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Placeholder login page</Text>
      <Button
        title="Go to Home page"
        onPress={() => router.push('/drawer/homepage')}
        // onPress={() => navigation.navigate('drawer/homepage')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});