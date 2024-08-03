import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import LearnScreen from '../screens/Learn';
import MissionsScreen from '../screens/Missions';
import ContributeScreen from '../screens/Contribute';
import BuyScreen from '../screens/Buy';
import CommunityScreen from '../screens/Community';
import MyProfileScreen from '../screens/MyProfile';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Missions" component={MissionsScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Contribute" component={ContributeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Buy" component={BuyScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="MyProfile" component={MyProfileScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Main' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
