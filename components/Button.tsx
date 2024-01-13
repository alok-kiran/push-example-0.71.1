import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

const Button = ({onPress, title}: ButtonProps) => {
  return (
    <View style={styles.scanBtn}>
      <Pressable onPress={onPress}>
        <Text style={styles.scanText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  scanBtn: {
    backgroundColor: '#000',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 24,
  },
  scanText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default Button;
