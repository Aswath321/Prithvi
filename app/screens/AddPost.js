import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const handleAddPost = () => {
    const { addPost } = route.params;
    if (addPost) {
      addPost(title, content);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
        multiline
      />
      <Button title="Add Post" onPress={handleAddPost} color='#1c6330' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#68b37d', // Use background color
  },
  input: {
    borderWidth: 1,
    borderColor: 'green', // Use border color
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    color: 'black', // Use text color
  },
});

export default AddPost;
