import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { posts } from './posts';

const Post = () => {
  const route = useRoute();
  const { postId } = route.params;

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Button title="Upvote" onPress={() => {}} />
      <Button title="Downvote" onPress={() => {}} />
      <Text style={styles.commentsTitle}>Comments:</Text>
      {post.comments.map(comment => (
        <Text key={comment.id} style={styles.comment}>{comment.text}</Text>
      ))}
      {/* Add comment functionality */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginVertical: 8,
  },
  commentsTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  comment: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default Post;