import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.text}>
        Welcome to Simple QR code scanner Demo app
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 24,
  },
});

export default HomeScreen;
