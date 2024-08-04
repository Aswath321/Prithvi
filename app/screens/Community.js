import React, { useState } from 'react';
import { View, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { posts as initialPosts } from './posts';

const CommunityScreen = () => {
  const [posts, setPosts] = useState(initialPosts);
  const navigation = useNavigation();

  const renderPost = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Post', { postId: item.id })}>
      <View style={styles.post}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddPost = (title, content) => {
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      comments: [],
      upvotes: 0,
      downvotes: 0,
    };
    setPosts([...posts, newPost]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Add Post"
        onPress={() => navigation.navigate('AddPost', { addPost: handleAddPost })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  post: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
});

export default CommunityScreen;
