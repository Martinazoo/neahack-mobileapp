import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Form from '../../components/Form';
import Button from '../../components/Button';
import { router } from 'expo-router';
import { loginUser } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const options = {
  headerShown: false,
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      const userData = await loginUser(email, password);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Alert.alert('Success', `Welcome ${email}`);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Login failed');
    }
  };

  const goToRegister = () => {
    router.replace('/(auth)/register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Please log in to your account</Text>
      </View>

      <View style={styles.formWrapper}>
        <Form
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.spacer} />
        <Form
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
        <Button buttonText="Login" onPress={handleLogin} />

        <TouchableOpacity onPress={goToRegister} style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© neahack.edu</Text>
    </View>
  );
};

export default Login;

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
  spacer: {
    height: 20,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    color: '#888',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#aaa',
    fontSize: 14,
  },
  registerLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  footer: {
    textAlign: 'center',
    marginTop: 40,
    color: '#444',
    fontSize: 13,
  },
});
