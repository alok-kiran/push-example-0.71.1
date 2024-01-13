import React, {useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import QRScanner from '../../components/QRCodeScanner';

const ScannerScreen: React.FC = ({navigation: {goBack}}) => {
  const handleScan = (data: string) => {
    if (data) {
      Alert.alert(data);
      goBack();
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

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
