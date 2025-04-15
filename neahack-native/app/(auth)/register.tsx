import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Form from '../../components/Form';
import Button from '../../components/Button';
import { router } from 'expo-router';
import { registerUser } from '@/services/api';
export const options = {
  headerShown: false,
};

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !repeatPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    try {
      await registerUser(email, password);
      Alert.alert('Success', `Account created for ${email}`);
      router.replace('/(tabs)/model');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Registration failed');
    }
  };
  

  const goToLogin = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Please fill in the fields to register</Text>
      </View>

      <View style={styles.formWrapper}>
        <Form
          placeholder="Email"
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
        <View style={styles.spacer} />
        <Form
          placeholder="Repeat Password"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
        />

        <View style={styles.spacer} />
        <Button buttonText="Register" onPress={handleRegister} />

        <TouchableOpacity onPress={goToLogin} style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© neahack.edu</Text>
    </View>
  );
};

export default Register;

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
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#aaa',
    fontSize: 14,
  },
  loginLink: {
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
