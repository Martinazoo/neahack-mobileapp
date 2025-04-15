import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageUploader from '@/components/ImageUploader'

const model = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ImageUploader />
    </SafeAreaView>
  )
}

export default model

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
})