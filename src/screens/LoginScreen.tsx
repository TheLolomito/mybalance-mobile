import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../navigation/RootNavigator';

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Balance</Text>
        <Text style={styles.subtitle}>Tu gestión personal empieza aquí</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Nombre o apodo</Text>
          <TextInput
            style={styles.input}
            placeholder="¿Cómo quieres que te llame?"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
          />
          <PrimaryButton label="Iniciar sesión" onPress={() => navigation.replace('Home')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2F455C',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#34F5C5',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6F9F5',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#1DCDFE',
    padding: 22,
    borderRadius: 20,
    gap: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F455C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2F455C',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2F455C',
    backgroundColor: '#E6F9F5',
  },
});
