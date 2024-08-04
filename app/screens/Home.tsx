import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: 'https://img.freepik.com/free-psd/nature-vertical-podium-background_23-2150423272.jpg',
    proverb: 'The best time to plant a tree was 20 years ago. The second best time is now.',
  },
  {
    id: '2',
    image: 'https://img.freepik.com/premium-photo/green-embrace-human-hand-protects-tree-world-environment-day-vertical-mobile-wallpaper_896558-37946.jpg',
    proverb: 'Look deep into nature, and then you will understand everything better.',
  },
  {
    id: '3',
    image: 'https://as2.ftcdn.net/v2/jpg/05/75/73/47/1000_F_575734728_s3HoL71nWG7KJVUPZnolz7q6v2twtK0m.jpg',
    proverb: 'In every walk with nature, one receives far more than he seeks.',
  },
];

const Home = () => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={true}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.image}
            >
              <View style={styles.overlay}>
                <Text style={styles.proverb}>{item.proverb}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Plant a tree</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',  // Center the overlay vertically
    alignItems: 'center',
  },
  overlay: {
    width: '80%',  // Adjust the width of the overlay
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    borderRadius: 10,  // Rounded corners for the overlay
  },
  proverb: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6B8E23',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
