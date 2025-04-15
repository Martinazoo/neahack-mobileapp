import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  buttonText: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonText, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});
