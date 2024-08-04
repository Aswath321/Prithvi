import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityScreen from '../screens/Community';
import PostScreen from '../screens/Post';
import AddPostScreen from '../screens/AddPost';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#226b37' }, // Use primary color
        headerTintColor: 'black', // Use button text color
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyle: { backgroundColor: '#74b586' } // Example background color for screens
      }}
    >
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen 
        name="AddPost" 
        component={AddPostScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15, backgroundColor: '#ff5722', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: '#fff' }}>Add Post</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;
