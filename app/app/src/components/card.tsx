import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/constants/colors'; // Ensure this path is correct

export default function Card({ number, title, type} ) {
  // Define background color based on the type
  const backgroundColor = (() => {
    switch (type) {
      case 'connected':
        return Colors.blue; 
      case 'active':
        return Colors.green; 
      case 'inactive':
        return Colors.orange;
      default:
        return Colors.yellow; 
    }
  })();

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 130,
    width: 'auto', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: Colors.lightGray, 
    justifyContent: 'center', 
    padding: 10, 
    margin: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4, 
    elevation: 5, 
  },

  number: {
    color: 'white',
    fontSize: 35, 
    fontWeight:'bold',
    marginBottom:10,
  },
    title: {
    color: 'white',
    fontSize: 18, 
    fontWeight: 'bold',
  },
});
