import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
  requestUserPermission,
  NotificationListener,
} from './libs/PushNotificationManager';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    return () => {};
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text style={{color: 'white'}}>Test</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
