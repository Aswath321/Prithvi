import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutRight, BounceIn, BounceOut } from 'react-native-reanimated';

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [chapterRead, setChapterRead] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const modules = [
    { id: 1, title: 'Green Energy', icon: 'eco' },
    { id: 2, title: 'Sustainable Living', icon: 'nature-people' },
    { id: 3, title: 'Environmental Conservation', icon: 'park' },
  ];

  const chapters = {
    1: [
      { id: 1, title: 'Introduction to Green Energy' },
      { id: 2, title: 'Solar Energy' },
    ],
    2: [
      { id: 1, title: 'Introduction to Sustainable Living' },
      { id: 2, title: 'Reducing Carbon Footprint' },
    ],
    3: [
      { id: 1, title: 'Introduction to Environmental Conservation' },
      { id: 2, title: 'Protecting Biodiversity' },
    ],
  };

  const content = {
    1: {
      1: {
        text: 'Green energy is energy that is produced in such a way as to minimize its negative impact on the environment. It includes renewable energy sources such as wind, solar, and hydro power.',
        mcqs: [
          { id: 1, question: 'What is green energy?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
          { id: 2, question: 'Which is a renewable energy source?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
        ],
      },
      2: {
        text: 'Solar energy is the conversion of energy from sunlight into electricity. Solar power is a major renewable energy source with the potential to meet many of the challenges facing the world.',
        mcqs: [
          { id: 3, question: 'What is solar energy?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
          { id: 4, question: 'What is the benefit of solar energy?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
        ],
      },
    },
    2: {
      1: {
        text: 'Sustainable living is a lifestyle that attempts to reduce an individual\'s or society\'s use of the Earth\'s natural resources and personal resources.',
        mcqs: [
          { id: 5, question: 'What is sustainable living?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
          { id: 6, question: 'Which is a practice of sustainable living?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
        ],
      },
      2: {
        text: 'Reducing carbon footprint involves taking steps to minimize the greenhouse gases we emit into the atmosphere. This can be achieved through practices such as using energy-efficient appliances and reducing car travel.',
        mcqs: [
          { id: 7, question: 'What is carbon footprint?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
          { id: 8, question: 'How can we reduce carbon footprint?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
        ],
      },
    },
    3: {
      1: {
        text: 'Environmental conservation is the practice of protecting the natural environment for current and future generations. It involves the sustainable management of natural resources and ecosystems.',
        mcqs: [
          { id: 9, question: 'What is environmental conservation?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
          { id: 10, question: 'Why is conservation important?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
        ],
      },
      2: {
        text: 'Protecting biodiversity involves conserving the variety of species, habitats, and ecosystems on Earth. It is crucial for maintaining the balance of the planet\'s environment.',
        mcqs: [
          { id: 11, question: 'What is biodiversity?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
          { id: 12, question: 'How can we protect biodiversity?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
        ],
      },
    },
  };

  const handleAnswer = (mcqId, selectedOption) => {
    const chapterContent = content[selectedModule][selectedChapter];
    const mcq = chapterContent.mcqs.find(mcq => mcq.id === mcqId);

    if (mcq) {
      const isCorrect = mcq.answer === selectedOption;
      Alert.alert(isCorrect ? 'Correct!' : 'Incorrect', `The correct answer is ${mcq.answer}`);
      
      setSelectedAnswers(prevAnswers => ({
        ...prevAnswers,
        [mcqId]: selectedOption,
      }));
    }
  };

  const handleReadComplete = () => {
    setChapterRead(true);
  };

  const handleBackButtonPress = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setSelectedChapter(null);
      setSelectedModule(null);
      setIsContentVisible(true);
    }, 300); // Time should match animation duration
  };

  const renderModules = () => (
    <ScrollView>
      {modules.map((module) => (
        <TouchableOpacity
          key={module.id}
          style={styles.card}
          onPress={() => setSelectedModule(module.id)}
        >
          <Icon name={module.icon} size={30} color="#007300" />
          <Text style={styles.cardText}>{module.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderChapters = () => (
    <ScrollView>
      {chapters[selectedModule].map((chapter) => (
        <TouchableOpacity
          key={chapter.id}
          style={styles.card}
          onPress={() => setSelectedChapter(chapter.id)}
        >
          <Text style={styles.cardText}>{chapter.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackButtonPress}
      >
        <Text style={styles.backButtonText}>Back to Modules</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderContent = () => {
    const chapterContent = content[selectedModule][selectedChapter];
    return (
      <ScrollView style={styles.contentContainer}>
        <Animated.Text entering={SlideInLeft} exiting={SlideOutRight} style={styles.contentText}>{chapterContent.text}</Animated.Text>
        {chapterRead ? (
          <>
            {chapterContent.mcqs.map((mcq) => (
              <Animated.View key={mcq.id} style={styles.mcqContainer} entering={BounceIn} exiting={BounceOut}>
                <Text style={styles.mcqQuestion}>{mcq.question}</Text>
                {mcq.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.mcqOption,
                      selectedAnswers[mcq.id] === option && { backgroundColor: '#a5d6a7' },
                    ]}
                    onPress={() => handleAnswer(mcq.id, option)}
                  >
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            ))}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedChapter(null)}
            >
              <Text style={styles.backButtonText}>Back to Chapters</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.readButton}
            onPress={handleReadComplete}
          >
            <Text style={styles.readButtonText}>Mark as Read & Take Quiz</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {selectedModule === null ? (
        renderModules()
      ) : selectedChapter === null ? (
        renderChapters()
      ) : (
        isContentVisible && renderContent() // Render content only if visible
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7e0',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    marginLeft: 10,
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 15,
  },
  mcqContainer: {
    marginVertical: 10,
  },
  mcqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mcqOption: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  readButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  readButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#2eb053',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Learn;
