import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';

const Logout = () => {
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      router.replace('/(auth)/login'); 
      Alert.alert('Logged out', 'You have successfully logged out.');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'There was an error logging you out.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Goodbye!</Text>
        <Text style={styles.subtitle}>You have been logged out.</Text>
      </View>

      <View style={styles.formWrapper}>
        <Button buttonText='Logout' onPress={handleLogout} />

        <View style={styles.spacer} />

        <Text style={styles.footer}>© neahack.edu</Text>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 4,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'left',
  },
  formWrapper: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  logoutButton: {
    backgroundColor: '#FF6347', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
  footer: {
    textAlign: 'center',
    marginTop: 40,
    color: '#444',
    fontSize: 13,
  },
});
