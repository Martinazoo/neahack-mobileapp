import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Index = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      console.log("Usuario desde ggggg storage:", userData); 
      setUser(userData ? JSON.parse(userData) : null);
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user && <Text style={styles.emailText}>Hey, {user.email} </Text>}
      </View>
      <Text style={{ color: '#fff' }}>Bienvenido a la app</Text>
    </View>
  );
};


export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  header: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  emailText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
