import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          router.replace('/(tabs)/model');
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        router.replace('/(auth)/login');
      }
    };

    checkUserSession();
  }, [router]);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default Index;
