import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import LearnScreen from '../screens/Learn';
import MissionsScreen from '../screens/Missions';
import ContributeScreen from '../screens/Contribute';
import BuyScreen from '../screens/Buy';
import CommunityStack from '../navigation/CommunityStack';
import MyProfileScreen from '../screens/MyProfile';
import Login from '../screens/Login';
import AddPost from '../screens/AddPost';
import Post from '../screens/Post';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon set you want to use

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Learn':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Missions':
              iconName = focused ? 'planet' : 'planet-outline';
              break;
            case 'Contribute':
              iconName = focused ? 'hand-heart' : 'hand-heart-outline';
              break;
            case 'Buy':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Community':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'MyProfile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#d4f7d6', // Light green background color
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Missions" component={MissionsScreen} />
      <Tab.Screen name="Contribute" component={ContributeScreen} />
      <Tab.Screen name="Buy" component={BuyScreen} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="MyProfile" component={MyProfileScreen} />
      {/* <Tab.Screen name="AddPost" component={AddPost} />
      <Tab.Screen name="Post" component={Post} /> */}

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
