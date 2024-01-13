import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  requestUserPermission,
  NotificationListener,
} from './libs/PushNotificationManager';
import HomeScreen from './screens/home';
import ScannerScreen from './screens/scanner';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Scanner',
          unmountOnBlur: true,
          tabBarIcon: ({color, size}) => (
            <Icon name="qrcode" color={color} size={size} />
          ),
        }}
      />
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
