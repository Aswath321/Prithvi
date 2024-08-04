import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const MyProfile = () => {
  // Sample profile data
  const profile = {
    photo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQniilkAaUkRBXcLbnqUsePgRVPBMjx_vMICyCwr2NJ5uQJymdh', // Replace with actual photo URL or local image
    name: 'Aswath Venkatesh',
    role: 'Product Designer',
    location: 'India, IND',
    rating: '8.6',
    email: 'aswath2111001@ssn.edu.in',
    phone: '+91 7010348134',
    address: 'Chennai',
    website: 'www.prithviapp.com',
    birthday: 'March 6, 2003',
    gender: 'Male',
    work: [
      { place: 'Valasaravakkam', address: 'Alwarthirunagar, Chennai', primary: true },
      { place: 'SSN College', address: 'Kalavakkam, Chennai', primary: false },
    ],
    consumption: '450 kWh',
    savings: '$1200',
    carbonFootprint: '2.5 tons CO2',
    referrals: 15,
    greenTips: 25,
    achievements: 'Green Advocate of the Month',
    bio: 'A passionate individual focused on making sustainable choices and tracking financial growth.',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerOptions}>
          <Text style={styles.headerOption}>Find people</Text>
          <Text style={styles.headerOption}>Messages</Text>
        </View>
      </View>
      <View style={styles.profileCard}>
        <Image source={{ uri: profile.photo }} style={styles.photo} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>{profile.role}</Text>
        <Text style={styles.location}>{profile.location}</Text>
        <Text style={styles.rating}>{profile.rating} ★</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contacts</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Contact Information</Text>
          <Text style={styles.infoText}>Email: {profile.email}</Text>
          <Text style={styles.infoText}>Phone: {profile.phone}</Text>
          <Text style={styles.infoText}>Address: {profile.address}</Text>
          <Text style={styles.infoText}>Website: {profile.website}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Basic Information</Text>
          <Text style={styles.infoText}>Birthday: {profile.birthday}</Text>
          <Text style={styles.infoText}>Gender: {profile.gender}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Work</Text>
          {profile.work.map((work, index) => (
            <View key={index} style={styles.workItem}>
              <Text style={styles.infoText}>{work.place}</Text>
              <Text style={styles.workAddress}>{work.address}</Text>
              {work.primary && <Text style={styles.primaryWork}>Primary</Text>}
            </View>
          ))}
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Achievements</Text>
          <Text style={styles.infoText}>{profile.achievements}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Bio</Text>
          <Text style={styles.infoText}>{profile.bio}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#bce6c8',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    color: '#073815',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerOptions: {
    flexDirection: 'row',
  },
  headerOption: {
    color: '#073815',
    marginLeft: 15,
    fontSize: 16,
  },
  profileCard: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#6aba81',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    borderColor: '#031838',
    borderWidth: 2,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'black', // Green border for profile picture
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#ffa500',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#145c28',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#d6d6d6',
    fontSize: 14,
  },
  infoSection: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  workItem: {
    marginBottom: 8,
  },
  workAddress: {
    fontSize: 12,
    color: '#0d421c',
    marginBottom: 4,
  },
  primaryWork: {
    fontSize: 12,
    color: '#145c28',
  },
});

export default MyProfile;
