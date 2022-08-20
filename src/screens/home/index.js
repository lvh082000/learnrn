import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f4f6',
    flex: 1,
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
    </View>
  );
}
