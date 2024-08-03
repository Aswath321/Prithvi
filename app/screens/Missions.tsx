import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // For date manipulation

const enrolledMissionsData = [
  {
    id: '1',
    title: 'Tree Planting',
    description: 'Plant a tree and submit periodic photos to adjust green coins based on CO2 absorption.',
    coins: 10, // Coins per mission
    lastUploadDate: moment().subtract(10, 'days').format('YYYY-MM-DD'), // Example last upload date
    canUpload: true, // Whether photo upload is allowed
  },
  {
    id: '2',
    title: 'Beach Cleanup',
    description: 'Clean up the beach and submit photos to earn green coins.',
    coins: 15,
    lastUploadDate: moment().subtract(5, 'days').format('YYYY-MM-DD'), // Example last upload date
    canUpload: false, // No photo upload allowed
  },
  {
    id: '3',
    title: 'Recycle Plastic',
    description: 'Recycle plastic and submit photos to track your progress and earn coins.',
    coins: 20,
    lastUploadDate: moment().subtract(10, 'days').format('YYYY-MM-DD'),
    canUpload: true,
  },
];

const availableMissionsData = [
  {
    id: '4',
    title: 'Community Garden',
    description: 'Help plant and maintain a community garden to earn green coins.',
  },
  {
    id: '5',
    title: 'Forest Conservation',
    description: 'Participate in forest conservation activities and earn green coins.',
  },
  {
    id: '6',
    title: 'Wildlife Protection',
    description: 'Support wildlife protection efforts and earn green coins.',
  },
];

const Missions = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [missions, setMissions] = useState(enrolledMissionsData);
  const [totalCoins, setTotalCoins] = useState(0);
  const [availableMissions, setAvailableMissions] = useState(availableMissionsData);

  useEffect(() => {
    // Calculate total coins based on mission data
    const calculateTotalCoins = () => {
      const total = missions.reduce((sum, mission) => sum + (mission.canUpload && calculateDaysLeft(mission.lastUploadDate) < 10 ? mission.coins : 0), 0);
      setTotalCoins(total);
    };
    calculateTotalCoins();
  }, [missions]);

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
  };

  const calculateDaysLeft = (lastUploadDate) => {
    const today = moment();
    const lastUpload = moment(lastUploadDate);
    return Math.max(0, 10 - today.diff(lastUpload, 'days'));
  };

  const handlePhotoSubmit = (missionId) => {
    const today = moment().format('YYYY-MM-DD');
    const updatedMissions = missions.map((mission) => {
      if (mission.id === missionId && mission.canUpload) {
        const daysLeft = calculateDaysLeft(mission.lastUploadDate);
        if (daysLeft >= 0) {
          return { ...mission, coins: mission.coins + 10, lastUploadDate: today }; // Update last upload date
        } else {
          alert('You can only upload a photo every 10 days.');
        }
      }
      return mission;
    });
    setMissions(updatedMissions);
  };

  const handleCheckProgress = (mission) => {
    alert(`Progress for "${mission.title}":\nCoins: ${mission.coins}\nDays left to upload: ${calculateDaysLeft(mission.lastUploadDate)}`);
  };

  const handleEnroll = (missionId) => {
    const newMission = availableMissions.find(mission => mission.id === missionId);
    if (newMission) {
      setMissions([...missions, { ...newMission, lastUploadDate: moment().subtract(10, 'days').format('YYYY-MM-DD'), canUpload: true, coins: 0 }]);
      setAvailableMissions(availableMissions.filter(mission => mission.id !== missionId));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={handleDateChange}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
        style={styles.calendar}
      />
      <Text style={styles.totalCoins}>Total Coins: {totalCoins}</Text>
      
      <Text style={styles.sectionTitle}>Enrolled Missions</Text>
      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const daysLeft = calculateDaysLeft(item.lastUploadDate);
          return (
            <View style={styles.missionBox}>
              <Text style={styles.missionTitle}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.details}>Days left to upload next photo: {daysLeft}</Text>
              <Text style={styles.details}>Coins obtained for this mission: {item.coins}</Text>
              {item.canUpload ? (
                daysLeft < 10 ? (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter photo URI"
                    />
                    <Button title="Submit Photo" onPress={() => handlePhotoSubmit(item.id)} />
                  </>
                ) : (
                  <Text style={styles.disabled}>You can only upload a photo every 10 days.</Text>
                )
              ) : (
                <Text style={styles.disabled}>Photo upload is not allowed for this mission.</Text>
              )}
              <TouchableOpacity style={styles.checkProgressButton} onPress={() => handleCheckProgress(item)}>
                <Text style={styles.checkProgressButtonText}>Check Progress</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <Text style={styles.sectionTitle}>Available Missions</Text>
      <FlatList
        data={availableMissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.missionBox}>
            <Text style={styles.missionTitle}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity style={styles.enrollButton} onPress={() => handleEnroll(item.id)}>
              <Text style={styles.enrollButtonText}>Enroll</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#639cf2',
  },
  calendar: {
    marginBottom: 20,
  },
  totalCoins: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#031838',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#031838',
  },
  missionBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#bdd2f2',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#031838',
  },
  description: {
    marginVertical: 10,
    color: '#7f8c8d',
  },
  details: {
    marginVertical: 5,
    color: '#34495e',
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff',
  },
  disabled: {
    color: 'red',
    marginVertical: 10,
  },
  checkProgressButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#031838',
    borderRadius: 5,
    alignItems: 'center',
  },
  checkProgressButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  enrollButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#031838',
    borderRadius: 5,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Missions;
