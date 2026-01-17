import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/RootNavigator';

export type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Start'>;

const nameFilter = /[^\p{L} ]+/gu;
const digitsOnly = /[^0-9]+/g;

const sanitizeName = (value: string) => value.replace(nameFilter, '').slice(0, 24);
const sanitizeDigits = (value: string, maxLength: number) =>
  value.replace(digitsOnly, '').slice(0, maxLength);

const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getMaxDays = (month: number, year: number) => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
};

const isValidDate = (day: string, month: string, year: string) => {
  if (!day || !month || !year) {
    return false;
  }
  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);
  if (
    Number.isNaN(dayNumber) ||
    Number.isNaN(monthNumber) ||
    Number.isNaN(yearNumber)
  ) {
    return false;
  }
  if (yearNumber < 1900 || yearNumber > 2100) {
    return false;
  }
  if (monthNumber < 1 || monthNumber > 12) {
    return false;
  }
  const maxDays = getMaxDays(monthNumber, yearNumber);
  return dayNumber >= 1 && dayNumber <= maxDays;
};

export function StartScreen({ navigation }: StartScreenProps) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const isFormValid = useMemo(() => {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length > 24) {
      return false;
    }
    return isValidDate(day, month, year);
  }, [name, day, month, year]);

  const handleStart = () => {
    if (!isFormValid) {
      return;
    }
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, styles.textShadow]}>MyBalance</Text>
            <View style={styles.betaBadge}>
              <Text style={[styles.betaText, styles.textShadow]}>BETA</Text>
            </View>
          </View>

          <View style={[styles.heroImage, styles.heroPlaceholder, styles.cardShadow]}>
            <Text style={styles.placeholderText}>Add characters.png</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.textShadow]}>Your Name</Text>
            <TextInput
              style={[styles.input, styles.cardShadow, styles.textShadow]}
              placeholder="Enter your name here"
              placeholderTextColor="#A6A6A6"
              value={name}
              onChangeText={(value) => setName(sanitizeName(value))}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.textShadow]}>Birthdate</Text>
            <View style={styles.birthdateRow}>
              <TextInput
                style={[styles.smallInput, styles.cardShadow, styles.textShadow]}
                placeholder="Day"
                placeholderTextColor="#A6A6A6"
                keyboardType="number-pad"
                value={day}
                onChangeText={(value) => setDay(sanitizeDigits(value, 2))}
                maxLength={2}
              />
              <TextInput
                style={[styles.smallInput, styles.cardShadow, styles.textShadow]}
                placeholder="Month"
                placeholderTextColor="#A6A6A6"
                keyboardType="number-pad"
                value={month}
                onChangeText={(value) => setMonth(sanitizeDigits(value, 2))}
                maxLength={2}
              />
              <TextInput
                style={[styles.smallInput, styles.cardShadow, styles.textShadow]}
                placeholder="Year"
                placeholderTextColor="#A6A6A6"
                keyboardType="number-pad"
                value={year}
                onChangeText={(value) => setYear(sanitizeDigits(value, 4))}
                maxLength={4}
              />
            </View>
          </View>

          <Pressable
            style={[
              styles.startButton,
              styles.cardShadow,
              !isFormValid && styles.disabledButton,
            ]}
            disabled={!isFormValid}
            onPress={handleStart}
          >
            <Text style={[styles.startButtonText, styles.startButtonShadow]}>
              START
            </Text>
          </Pressable>

          <Text style={[styles.footerText, styles.textShadow]}>
            Take control of your finances
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
  },
  betaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#FF8181',
    borderWidth: 1,
    borderColor: '#FF8181',
    justifyContent: 'center',
    alignItems: 'center',
  },
  betaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
  },
  heroImage: {
    width: 220,
    height: 200,
    marginTop: 18,
    marginBottom: 14,
  },
  heroPlaceholder: {
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  placeholderText: {
    fontSize: 12,
    color: '#A6A6A6',
    fontFamily: 'Inter',
  },
  section: {
    alignSelf: 'stretch',
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
  },
  birthdateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  smallInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  startButton: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 44,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
  },
  startButtonShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  footerText: {
    marginTop: 28,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.45,
  },
});
