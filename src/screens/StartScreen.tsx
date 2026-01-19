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

  const handleStart = () => {
    navigation.navigate('Dashboard');
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
          <TextInput
            style={[styles.input, styles.cardShadow]}
            placeholder="Enter your name here"
            placeholderTextColor="#A6A6A6"
            value={name}
            onChangeText={(value) => setName(sanitizeName(value))}
            autoCapitalize="words"
          />

          <Text style={styles.birthdateLabel}>Birthdate</Text>
          <View style={[styles.dateBox, styles.cardShadow]}>
            <Text style={styles.dateBoxText}>Day</Text>
          </View>
          <View style={[styles.dateBox, styles.cardShadow, styles.dateBoxMiddle]}>
            <Text style={styles.dateBoxText}>Month</Text>
          </View>
          <View style={[styles.dateBox, styles.cardShadow, styles.dateBoxRight]}>
            <Text style={styles.dateBoxText}>Year</Text>
          </View>

          <Pressable style={[styles.startButton, styles.cardShadow]} onPress={handleStart}>
            <Text style={styles.startButtonText}>START</Text>
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
    borderColor: '#B3B3B3',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#FFFFFF',
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
    borderColor: '#B3B3B3',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBoxMiddle: {
    left: 161,
  },
  dateBoxRight: {
    left: 273,
  },
  dateBoxText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#A6A6A6',
    textAlign: 'center',
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
    color: '#000000',
  },
  footerText: {
    position: 'absolute',
    left: 73,
    top: 849,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
