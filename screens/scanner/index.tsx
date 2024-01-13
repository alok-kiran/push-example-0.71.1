import React from 'react';
import {StyleSheet, View} from 'react-native';
import QRScanner from '../../components/QRCodeScanner';

const ScannerScreen: React.FC = () => {
  const handleScan = (data: string) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <QRScanner onCodeRead={handleScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScannerScreen;
