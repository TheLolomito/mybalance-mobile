import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'NewMovement'>;

const NewMovementScreen = (_props: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>MyBalance</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>BETA</Text>
        </View>
        <View style={styles.placeholderWrapper}>
          <Text style={styles.placeholderText}>New Movement (coming soon)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  badge: {
    position: 'absolute',
    left: 253,
    top: 70,
    width: 59,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#FF8181',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  placeholderWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export { NewMovementScreen };
export default NewMovementScreen;
