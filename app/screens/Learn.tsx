import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentMcqId, setCurrentMcqId] = useState(null);

  const modules = [
    { id: 1, title: 'Module 1' },
    { id: 2, title: 'Module 2' },
    { id: 3, title: 'Module 3' },
  ];

  const chapters = {
    1: [
      { id: 1, title: 'Chapter 1.1' },
      { id: 2, title: 'Chapter 1.2' },
    ],
    2: [
      { id: 1, title: 'Chapter 2.1' },
      { id: 2, title: 'Chapter 2.2' },
    ],
    3: [
      { id: 1, title: 'Chapter 3.1' },
      { id: 2, title: 'Chapter 3.2' },
    ],
  };

  const content = {
    1: {
      1: {
        text: 'Content for Chapter 1.1',
        mcqs: [
          { id: 1, question: 'Question 1?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
          { id: 2, question: 'Question 2?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
        ],
      },
      2: {
        text: 'Content for Chapter 1.2',
        mcqs: [
          { id: 3, question: 'Question 3?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
          { id: 4, question: 'Question 4?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
        ],
      },
    },
    2: {
      1: {
        text: 'Content for Chapter 2.1',
        mcqs: [
          { id: 5, question: 'Question 5?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
          { id: 6, question: 'Question 6?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
        ],
      },
      2: {
        text: 'Content for Chapter 2.2',
        mcqs: [
          { id: 7, question: 'Question 7?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
          { id: 8, question: 'Question 8?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
        ],
      },
    },
    3: {
      1: {
        text: 'Content for Chapter 3.1',
        mcqs: [
          { id: 9, question: 'Question 9?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
          { id: 10, question: 'Question 10?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
        ],
      },
      2: {
        text: 'Content for Chapter 3.2',
        mcqs: [
          { id: 11, question: 'Question 11?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
          { id: 12, question: 'Question 12?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
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
      setSelectedAnswer(selectedOption);
      setCurrentMcqId(mcqId);
    }
  };

  const renderModules = () => (
    <ScrollView>
      {modules.map((module) => (
        <TouchableOpacity
          key={module.id}
          style={styles.card}
          onPress={() => setSelectedModule(module.id)}
        >
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
        onPress={() => setSelectedModule(null)}
      >
        <Text style={styles.backButtonText}>Back to Modules</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderContent = () => {
    const chapterContent = content[selectedModule][selectedChapter];
    return (
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>{chapterContent.text}</Text>
        {chapterContent.mcqs.map((mcq) => (
          <View key={mcq.id} style={styles.mcqContainer}>
            <Text style={styles.mcqQuestion}>{mcq.question}</Text>
            {mcq.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.mcqOption,
                  selectedAnswer === option && { backgroundColor: '#e0e0e0' },
                ]}
                onPress={() => handleAnswer(mcq.id, option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedChapter(null)}
        >
          <Text style={styles.backButtonText}>Back to Chapters</Text>
        </TouchableOpacity>
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
        renderContent()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
  },
  contentContainer: {
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    marginBottom: 20,
  },
  mcqContainer: {
    marginBottom: 20,
  },
  mcqQuestion: {
    fontSize: 16,
    marginBottom: 10,
  },
  mcqOption: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  backButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Learn;
