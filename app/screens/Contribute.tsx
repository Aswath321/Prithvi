import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Contribute = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = {
    greenInitiatives: [
      { title: 'The Nature Conservancy', content: 'This initiative focuses on planting trees in urban areas to improve air quality and provide shade.', image: 'https://img.freepik.com/free-psd/nature-vertical-podium-background_23-2150423272.jpg' },
      { title: 'Greenpeace', content: ' Focuses on environmental issues such as climate change, deforestation, overfishing, and pollution', image: 'https://example.com/donate2.jpg' },
      { title: 'Trees for the Future', content: 'Focuses on planting trees to combat deforestation and poverty.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg' },
    ],
    startups: [
      { title: 'Nori', content: 'Nori is innovative in addressing climate change by creating a transparent, scalable platform for carbon removal, which can contribute to reducing greenhouse gas emissions.', image: 'https://example.com/invest1.jpg' },
      { title: 'Oatly', content: 'Oatly is leading the plant-based beverage market with a strong environmental mission. Their products help reduce the carbon footprint associated with dairy farming and promote sustainable agriculture', image: 'https://example.com/invest2.jpg' },
      { title: 'Beyond Meat', content: 'Beyond Meat offers innovative products that reduce reliance on animal agriculture, thereby decreasing environmental impact, conserving water, and reducing greenhouse gas emissions.', image: 'https://example.com/invest3.jpg' },
    ],
    greenDeposits: [
      { title: ' Aspiration', content: 'Aspiration is committed to environmental sustainability by offering products that support clean energy projects and minimize carbon footprints. Their model appeals to environmentally conscious consumers looking for responsible banking options.', image: 'https://example.com/green1.jpg' },
      { title: 'Tomorrow', content: 'Tomorrow invests deposits in sustainable projects and companies, promoting ethical banking practices and transparency in how funds are used.', image: 'https://example.com/green2.jpg' },
      { title: 'Triodos Bank', content: 'Triodos Bank is known for its rigorous standards in financing only projects that have positive social and environmental impacts, making it a strong choice for those interested in green banking.', image: 'https://example.com/green3.jpg' },
    ],
  };

  const renderItem = ({ item }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Contribute to a Better Future</Text>

      <Text style={styles.sectionTitle}>
        <Icon name="nature-people" size={24} color="#007300" /> Donate in Green Initiatives
      </Text>
      <Carousel
        width={Dimensions.get('window').width - 40}
        height={250}
        data={data.greenInitiatives}
        renderItem={renderItem}
        loop={false}
        scrollAnimationDuration={300}
        autoplay
        autoplayInterval={5000}
        style={styles.carousel}
      />

      <Text style={styles.sectionTitle}>
        <Icon name="business" size={24} color="#007300" /> Invest in Startups
      </Text>
      <Carousel
        width={Dimensions.get('window').width - 40}
        height={250}
        data={data.startups}
        renderItem={renderItem}
        loop={false}
        scrollAnimationDuration={300}
        autoplay
        autoplayInterval={5000}
        style={styles.carousel}
      />

      <Text style={styles.sectionTitle}>
        <Icon name="attach-money" size={24} color="#007300" /> Invest in Green Deposits
      </Text>
      <Carousel
        width={Dimensions.get('window').width - 40}
        height={250}
        data={data.greenDeposits}
        renderItem={renderItem}
        loop={false}
        scrollAnimationDuration={300}
        autoplay
        autoplayInterval={5000}
        style={styles.carousel}
      />

      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedItem.title}</Text>
            <ScrollView>
              <Text style={styles.modalContent}>{selectedItem.content}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7e0',
    padding: 10,
  },
  headerText: {
    fontSize: 26,
    margin: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004d00',
  },
  sectionTitle: {
    fontSize: 22,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#007300',
    flexDirection: 'row',
    alignItems: 'center',
  },
  carousel: {
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    color: '#005000',
  },
  itemContent: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color: '#333',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#005000',
  },
  modalContent: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Contribute;
