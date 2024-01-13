import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {
  requestUserPermission,
  NotificationListener,
} from './libs/PushNotificationManager';
import HomeScreen from './screens/home';
import ScannerScreen from './screens/scanner';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scanner" component={ScannerScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    return () => {};
  }, []);

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
