import React, { useState } from 'react';
import {
  Image,
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

const sanitizeName = (value: string) => value.replace(nameFilter, '').slice(0, 24);
const characters = require('../assets/characters.png');

export function StartScreen({ navigation }: StartScreenProps) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isDayFocused, setIsDayFocused] = useState(false);
  const [isMonthFocused, setIsMonthFocused] = useState(false);
  const [isYearFocused, setIsYearFocused] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    day: false,
    month: false,
    year: false,
  });
  const minYear = 1900;
  const maxYear = 2026;

  const isLeapYear = (value: number) =>
    (value % 4 === 0 && value % 100 !== 0) || value % 400 === 0;

  const daysInMonth = (monthValue: number, yearValue: number) => {
    if (monthValue === 2) {
      return isLeapYear(yearValue) ? 29 : 28;
    }

    if ([4, 6, 9, 11].includes(monthValue)) {
      return 30;
    }

    return 31;
  };

  const isValidYear = (value: string) => {
    if (value.length !== 4) {
      return false;
    }

    const yearValue = Number.parseInt(value, 10);
    return !Number.isNaN(yearValue) && yearValue >= minYear && yearValue <= maxYear;
  };

  const isValidMonth = (value: string) => {
    if (value.length !== 2) {
      return false;
    }

    const monthValue = Number.parseInt(value, 10);
    return !Number.isNaN(monthValue) && monthValue >= 1 && monthValue <= 12;
  };

  const isValidDay = (value: string, monthValue: string, yearValue: string) => {
    if (value.length !== 2 || !isValidMonth(monthValue) || !isValidYear(yearValue)) {
      return false;
    }

    const dayValue = Number.parseInt(value, 10);
    const monthNumber = Number.parseInt(monthValue, 10);
    const yearNumber = Number.parseInt(yearValue, 10);

    if (Number.isNaN(dayValue) || dayValue < 1) {
      return false;
    }

    return dayValue <= daysInMonth(monthNumber, yearNumber);
  };

  const isFormValid = name.trim().length > 0 && isValidDay(day, month, year);

  const handleStart = () => {
    const nameValid = name.trim().length > 0;
    const yearValid = isValidYear(year);
    const monthValid = isValidMonth(month);
    const dayValid = isValidDay(day, month, year);

    setErrors({
      name: !nameValid,
      day: day.trim().length === 0 || (monthValid && yearValid ? !dayValid : false),
      month: !monthValid,
      year: !yearValid,
    });

    if (nameValid && dayValid) {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.container}>
          <Text style={styles.title}>MyBalance</Text>
          <View style={[styles.betaBadge, styles.cardShadow]}>
            <Text style={styles.betaText}>BETA</Text>
          </View>

          <Image source={characters} style={styles.heroImage} resizeMode="contain" />

          <Text style={styles.sectionTitle}>Your Name</Text>
          <View
            style={[
              styles.input,
              styles.cardShadow,
              styles.inputContainer,
              errors.name ? styles.inputError : styles.inputDefault,
            ]}
          >
            {name.length === 0 ? (
              <Text style={styles.namePlaceholder}>Enter your name here</Text>
            ) : null}
            <TextInput
              style={styles.nameInput}
              placeholder=""
              cursorColor="#000000"
              selectionColor="#000000"
              value={name}
              onChangeText={(value) => {
                const nextValue = sanitizeName(value);
                setName(nextValue);
                if (nextValue.trim().length > 0) {
                  setErrors((prev) => ({ ...prev, name: false }));
                }
              }}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.birthdateLabel}>Birthdate</Text>
          <View
            style={[
              styles.dateBox,
              styles.cardShadow,
              errors.day ? styles.inputError : styles.inputDefault,
            ]}
          >
            {!isDayFocused && day.length === 0 ? (
              <Text style={styles.datePlaceholder}>Day</Text>
            ) : null}
            <TextInput
              style={styles.dateInput}
              placeholder=""
              keyboardType="number-pad"
              cursorColor="#000000"
              selectionColor="#000000"
              underlineColorAndroid="transparent"
              value={day}
              onFocus={() => setIsDayFocused(true)}
              onChangeText={(value) => {
                const numericValue = value.replace(/\D/g, '').slice(0, 2);
                setDay(numericValue);
                if (numericValue.length === 2 && isValidDay(numericValue, month, year)) {
                  setErrors((prev) => ({ ...prev, day: false }));
                } else if (numericValue.length > 0) {
                  setErrors((prev) => ({ ...prev, day: false }));
                }
              }}
              onBlur={() => {
                setIsDayFocused(false);
                const dayValue = Number.parseInt(day, 10);
                if (Number.isNaN(dayValue)) {
                  return;
                }
                const monthValue = Number.parseInt(month, 10);
                const yearValue = Number.parseInt(year, 10);
                const hasValidMonth = isValidMonth(month);
                const hasValidYear = isValidYear(year);
                const maxDay =
                  hasValidMonth && hasValidYear ? daysInMonth(monthValue, yearValue) : 31;
                const clampedDay = Math.max(1, Math.min(dayValue, maxDay));
                const formattedDay = clampedDay.toString().padStart(2, '0');
                setDay(formattedDay);
                setErrors((prev) => ({ ...prev, day: false }));
              }}
              maxLength={2}
            />
          </View>
          <View
            style={[
              styles.dateBox,
              styles.cardShadow,
              styles.dateBoxMiddle,
              errors.month ? styles.inputError : styles.inputDefault,
            ]}
          >
            {!isMonthFocused && month.length === 0 ? (
              <Text style={styles.datePlaceholder}>Month</Text>
            ) : null}
            <TextInput
              style={styles.dateInput}
              placeholder=""
              keyboardType="number-pad"
              cursorColor="#000000"
              selectionColor="#000000"
              underlineColorAndroid="transparent"
              value={month}
              onFocus={() => setIsMonthFocused(true)}
              onChangeText={(value) => {
                const numericValue = value.replace(/\D/g, '').slice(0, 2);
                setMonth(numericValue);
                if (numericValue.length === 2 && isValidMonth(numericValue)) {
                  setErrors((prev) => ({ ...prev, month: false }));
                } else if (numericValue.length > 0) {
                  setErrors((prev) => ({ ...prev, month: false }));
                }
              }}
              onBlur={() => {
                setIsMonthFocused(false);
                const monthValue = Number.parseInt(month, 10);
                if (Number.isNaN(monthValue)) {
                  return;
                }
                const clampedMonth = Math.max(1, Math.min(monthValue, 12));
                const formattedMonth = clampedMonth.toString().padStart(2, '0');
                setMonth(formattedMonth);
                setErrors((prev) => ({ ...prev, month: false }));
                if (day.length > 0 && isValidYear(year)) {
                  const dayValue = Number.parseInt(day, 10);
                  const maxDay = daysInMonth(clampedMonth, Number.parseInt(year, 10));
                  const clampedDay = Math.max(1, Math.min(dayValue, maxDay));
                  const formattedDay = clampedDay.toString().padStart(2, '0');
                  setDay(formattedDay);
                  setErrors((prev) => ({ ...prev, day: false }));
                }
              }}
              maxLength={2}
            />
          </View>
          <View
            style={[
              styles.dateBox,
              styles.cardShadow,
              styles.dateBoxRight,
              errors.year ? styles.inputError : styles.inputDefault,
            ]}
          >
            {!isYearFocused && year.length === 0 ? (
              <Text style={styles.datePlaceholder}>Year</Text>
            ) : null}
            <TextInput
              style={styles.dateInput}
              placeholder=""
              keyboardType="number-pad"
              cursorColor="#000000"
              selectionColor="#000000"
              underlineColorAndroid="transparent"
              value={year}
              onFocus={() => setIsYearFocused(true)}
              onChangeText={(value) => {
                const numericValue = value.replace(/\D/g, '').slice(0, 4);
                setYear(numericValue);
                if (numericValue.length === 4 && isValidYear(numericValue)) {
                  setErrors((prev) => ({ ...prev, year: false }));
                } else if (numericValue.length > 0) {
                  setErrors((prev) => ({ ...prev, year: false }));
                }
              }}
              onBlur={() => {
                setIsYearFocused(false);
                const yearValue = Number.parseInt(year, 10);
                if (Number.isNaN(yearValue)) {
                  return;
                }
                const clampedYear = Math.max(minYear, Math.min(yearValue, maxYear));
                const formattedYear = clampedYear.toString().padStart(4, '0');
                setYear(formattedYear);
                setErrors((prev) => ({ ...prev, year: false }));
                if (day.length > 0 && isValidMonth(month)) {
                  const dayValue = Number.parseInt(day, 10);
                  const maxDay = daysInMonth(Number.parseInt(month, 10), clampedYear);
                  const clampedDay = Math.max(1, Math.min(dayValue, maxDay));
                  const formattedDay = clampedDay.toString().padStart(2, '0');
                  setDay(formattedDay);
                  setErrors((prev) => ({ ...prev, day: false }));
                }
              }}
              maxLength={4}
            />
          </View>

          <Pressable style={[styles.startButton, styles.cardShadow]} onPress={handleStart}>
            <Text
              style={[
                styles.startButtonText,
                { color: isFormValid ? '#000000' : '#6E6E6E' },
              ]}
            >
              START
            </Text>
          </Pressable>

          <Text style={styles.footerText}>Take control of your finances</Text>
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
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  title: {
    position: 'absolute',
    left: 117,
    top: 84,
    fontSize: 36,
    fontWeight: '700',
    color: '#000000',
  },
  betaBadge: {
    position: 'absolute',
    left: 253,
    top: 70,
    width: 59,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#FF8181',
    justifyContent: 'center',
    alignItems: 'center',
  },
  betaText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  heroImage: {
    position: 'absolute',
    left: 112,
    top: 154,
    width: 207,
    height: 311,
  },
  sectionTitle: {
    position: 'absolute',
    left: 49,
    top: 430,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  input: {
    position: 'absolute',
    left: 49,
    top: 461,
    width: 328,
    height: 37,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    justifyContent: 'center',
  },
  nameInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#000000',
  },
  namePlaceholder: {
    position: 'absolute',
    left: 12,
    right: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#A6A6A6',
  },
  birthdateLabel: {
    position: 'absolute',
    left: 49,
    top: 528,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  dateBox: {
    position: 'absolute',
    left: 49,
    top: 559,
    width: 96,
    height: 37,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBoxMiddle: {
    left: 161,
  },
  dateBoxRight: {
    left: 273,
  },
  dateInput: {
    flex: 1,
    width: '100%',
    height: '100%',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
    paddingHorizontal: 0,
    paddingVertical: 0,
    includeFontPadding: false,
  },
  datePlaceholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#A6A6A6',
    fontSize: 15,
    fontWeight: '700',
    includeFontPadding: false,
    pointerEvents: 'none',
  },
  startButton: {
    position: 'absolute',
    left: 95,
    top: 668,
    width: 231,
    height: 85,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: 40,
    fontWeight: '700',
  },
  footerText: {
    position: 'absolute',
    left: 73,
    top: 820,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#FF8181',
  },
  inputDefault: {
    borderColor: '#B3B3B3',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
