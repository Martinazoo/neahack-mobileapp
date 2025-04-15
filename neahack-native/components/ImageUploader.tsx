import React, { useState } from 'react';
import { Image, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../services/api';
import Button from './Button';
const ImageUploader: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Permiso requerido", "Necesitamos acceso a tu galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      try {
        setLoading(true);
        await uploadImage(uri);
        Alert.alert("Éxito", "Imagen subida correctamente.");
      } catch (error: any) {
        Alert.alert("Error", "No se pudo subir la imagen.");
        console.error("Error al subir la imagen:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button buttonText="Select your model" onPress={pickImage} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {imageUri && !loading && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default ImageUploader;
