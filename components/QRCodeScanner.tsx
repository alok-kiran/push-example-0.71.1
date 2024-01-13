import React, {useCallback, useEffect, useRef} from 'react';
import {Camera, Code, useCodeScanner} from 'react-native-vision-camera';
import {View, StyleSheet, Vibration, Linking, Dimensions} from 'react-native';

interface QRCodeScannerProps {
  onCodeRead: (data: string) => void;
}

interface QRCodeSuccessProps {
  value: string;
  onDismissed: () => void;
}
const {width, height} = Dimensions.get('window');
const scannerSize = 300; // You can adjust the size of the scanner
const overlayColor = 'rgba(0,0,0,0.6)';

const QRCodeScanner = ({onCodeRead}: QRCodeScannerProps) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = Camera.getAvailableCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const cameraRef = useRef(false);

  const checkPermissions = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'granted') {
      setHasPermission(true);
    }
    if (permission === 'denied') {
      await Linking.openSettings();
    }
  };

  const onCodeScannedSuccess = ({value, onDismissed}: QRCodeSuccessProps) => {
    console.log(value);
    onCodeRead(value);
    Vibration.vibrate();
    onDismissed();
  };

  const onCodeScanned = useCallback((codes: Code[]) => {
    const value = codes[0]?.value;
    if (value == null) {
      return;
    }
    if (cameraRef.current) {
      return;
    }

    onCodeScannedSuccess({
      value,
      onDismissed: () => {
        cameraRef.current = false;
      },
    });
    cameraRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned,
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  if (!device) {
    return null;
  }

  console.log(hasPermission);
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={hasPermission}
        codeScanner={codeScanner}
      />
      <View style={styles.overlay}>
        <View
          style={[styles.overlaySection, {height: (height - scannerSize) / 3}]}
        />
        <View style={styles.scannerMiddle}>
          <View
            style={[styles.overlaySection, {width: (width - scannerSize) / 2}]}
          />
          <View style={styles.scanner} />
          <View
            style={[styles.overlaySection, {width: (width - scannerSize) / 2}]}
          />
        </View>
        <View
          style={[styles.overlaySection, {height: (height - scannerSize) / 2}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  overlaySection: {
    backgroundColor: overlayColor,
  },
  scanner: {
    width: scannerSize,
    height: scannerSize,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  scannerMiddle: {
    flexDirection: 'row',
  },
});

export default QRCodeScanner;
