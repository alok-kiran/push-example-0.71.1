import React, {useCallback, useEffect, useRef} from 'react';
import {Camera, Code, useCodeScanner} from 'react-native-vision-camera';
import {
  View,
  StyleSheet,
  Vibration,
  Linking,
  Dimensions,
  Animated,
} from 'react-native';

interface QRCodeScannerProps {
  onCodeRead: (data: string) => void;
}

interface QRCodeSuccessProps {
  value: string;
  onDismissed: () => void;
}

const overlayColor = 'rgba(0,0,0,0.6)';
const scannerBarHeight = 4;
const scannerSize = 300;

const QRCodeScanner = ({onCodeRead}: QRCodeScannerProps) => {
  const scannerBarPosition = useRef(new Animated.Value(0)).current;
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = Camera.getAvailableCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const cameraRef = useRef(false);
  const {width, height} = Dimensions.get('window');
  const animationDuration = 1500;

  const startScannerAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scannerBarPosition, {
          toValue: scannerSize,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(scannerBarPosition, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startScannerAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPermissions = async () => {
    console.log(['mounted']);
    const permission = await Camera.requestCameraPermission();
    if (permission === 'granted') {
      setHasPermission(true);
    }
    if (permission === 'denied') {
      await Linking.openSettings();
    }
  };

  const onCodeScannedSuccess = ({value, onDismissed}: QRCodeSuccessProps) => {
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
          <View style={styles.scanner}>
            <Animated.View
              style={[
                styles.scannerBar,
                {transform: [{translateY: scannerBarPosition}]},
              ]}
            />
          </View>
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
  scannerMiddle: {
    flexDirection: 'row',
  },
  scanner: {
    width: scannerSize,
    height: scannerSize,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerBar: {
    position: 'absolute',
    width: scannerSize,
    height: scannerBarHeight,
    backgroundColor: 'green', // Color of the scanner bar
  },
});

export default QRCodeScanner;
