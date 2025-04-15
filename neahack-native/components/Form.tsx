import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const Form: React.FC<Props> = ({ placeholder, value, onChangeText, secureTextEntry = false }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
});
