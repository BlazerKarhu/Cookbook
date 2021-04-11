import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Single = () => {
  return (
    <View style={styles.container}>
      <Text>Single screen</Text>
    </View>
  );
};

export default Single;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
