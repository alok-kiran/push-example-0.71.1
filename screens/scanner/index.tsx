import React, {useEffect} from 'react';
import {StyleSheet, View, Alert, Linking} from 'react-native';
import QRScanner from '../../components/QRCodeScanner';

const ScannerScreen: React.FC = ({navigation: {goBack}}) => {
  const handleScan = (data: string) => {
    if (data) {
      Alert.alert(
        'Congratulations',
        `You can open this link to identify yourself at the POS:\n ${data}`,
        [
          {text: 'Close', onPress: () => console.log('Close Pressed')}, // Close button
          {
            text: 'Open URL',
            onPress: () => {
              const urlToOpen = data;
              Linking.openURL(urlToOpen);
            },
          },
        ],
        {cancelable: false},
      );
      goBack();
    }
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
