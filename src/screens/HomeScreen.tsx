import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../navigation/RootNavigator';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Hola, Ana 👋</Text>
        <Text style={styles.subtitle}>Tu balance está al día.</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumen del mes</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Ingresos</Text>
            <Text style={styles.value}>$2,450</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gastos</Text>
            <Text style={styles.value}>$1,120</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ahorro</Text>
            <Text style={styles.value}>$1,330</Text>
          </View>
        </View>
        <PrimaryButton label="Cerrar sesión" onPress={() => navigation.replace('Login')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0B1B2B',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#52606D',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2933',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#52606D',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B6EF3',
  },
});
