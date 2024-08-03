import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const Contribute = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = {
    greenInitiatives: [
      { title: 'Donate 1', content: 'Information about Donate 1...', image: 'https://example.com/donate1.jpg' },
      { title: 'Donate 2', content: 'Information about Donate 2...', image: 'https://example.com/donate2.jpg' },
      { title: 'Donate 3', content: 'Information about Donate 3...', image: 'https://example.com/donate3.jpg' },
    ],
    startups: [
      { title: 'Invest 1', content: 'Information about Invest 1...', image: 'https://example.com/invest1.jpg' },
      { title: 'Invest 2', content: 'Information about Invest 2...', image: 'https://example.com/invest2.jpg' },
      { title: 'Invest 3', content: 'Information about Invest 3...', image: 'https://example.com/invest3.jpg' },
    ],
    greenDeposits: [
      { title: 'Invest 1', content: 'Information about Invest 1...', image: 'https://example.com/green1.jpg' },
      { title: 'Invest 2', content: 'Information about Invest 2...', image: 'https://example.com/green2.jpg' },
      { title: 'Invest 3', content: 'Information about Invest 3...', image: 'https://example.com/green3.jpg' },
    ],
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Donate in Green Initiatives</Text>
      <Carousel
        width={Dimensions.get('window').width}
        height={200}
        data={data.greenInitiatives}
        renderItem={renderItem}
        loop={false}
        scrollAnimationDuration={1000}
      />

      <Text style={styles.sectionTitle}>Invest in Startups</Text>
      <Carousel
        width={Dimensions.get('window').width}
        height={200}
        data={data.startups}
        renderItem={renderItem}
        loop={false}
        scrollAnimationDuration={1000}
      />

      <Text style={styles.sectionTitle}>Invest in Green Deposits</Text>
      <Carousel
        width={Dimensions.get('window').width}
        height={200}
        data={data.greenDeposits}
        renderItem={renderItem}
        loop={false}
        scrollAnimationDuration={1000}
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
          <View style={styles.modalView}>
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
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 26,
    margin: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 'bold',
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
    height: 100,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
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
  },
  modalContent: {
    fontSize: 18,
    marginBottom: 20,
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
