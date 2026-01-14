import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../navigation/RootNavigator';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const cards = [
  { title: 'Balance General', subtitle: 'Resumen total', accent: '#1DCDFE' },
  { title: 'Ingresos', subtitle: 'Flujo positivo', accent: '#21D0B2' },
  { title: 'Gastos', subtitle: 'Salidas del mes', accent: '#34F5C5' },
  { title: 'Otros', subtitle: 'Notas y extras', accent: '#1DCDFE' },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSide} />
          <Text style={styles.title}>My Balance</Text>
          <Pressable style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Tu panel financiero en un vistazo</Text>
        <View style={styles.cards}>
          {cards.map((card) => (
            <View key={card.title} style={[styles.card, { borderColor: card.accent }]}>
              <View style={[styles.cardAccent, { backgroundColor: card.accent }]} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
        <PrimaryButton label="Cerrar sesión" onPress={() => navigation.replace('Login')} />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerSide: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#34F5C5',
    textAlign: 'center',
    flex: 1,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1DCDFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
    color: '#E6F9F5',
    marginBottom: 20,
    textAlign: 'center',
  },
  cards: {
    gap: 14,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#243849',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  cardAccent: {
    width: 10,
    height: 44,
    borderRadius: 6,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E6F9F5',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#BEEFE6',
  },
});
