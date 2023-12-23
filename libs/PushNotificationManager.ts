import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    GetFCMToken();
  }
};
const GetFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(['error in token', error]);
    }
  }
  console.log(['fcmtoken', fcmtoken]);
};
export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log([
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    ]);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log([
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        ]);
      }
    });

  messaging().onMessage(async remotemessage => {
    console.log(['remote message', JSON.stringify(remotemessage)]);
  });

  messaging().onNotificationOpenedApp(remotemessage => {
    console.log(['remote message', JSON.stringify(remotemessage)]);
  });
};
