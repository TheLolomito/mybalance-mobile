import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>MyBalance</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>BETA</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Dashboard</Text>

        <View style={styles.balanceCard} />
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>$0.00</Text>
        <Text style={styles.balanceMeta}>+0% month ever month</Text>

        <View style={styles.monthlyIncomeCard} />
        <Text style={styles.monthlyIncomeTitle}>Monthly income</Text>
        <Text style={styles.monthlyIncomeValue}>$0.00</Text>
        <Text style={styles.monthlyIncomeMeta}>+0% month ever month</Text>

        <View style={styles.monthlyExpensesCard} />
        <Text style={styles.monthlyExpensesTitle}>Monthly expenses</Text>
        <Text style={styles.monthlyExpensesValue}>$0.00</Text>
        <Text style={styles.monthlyExpensesMeta}>-0% month ever month</Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('NewMovement')}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
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
  settingsButton: {
    position: 'absolute',
    left: 351,
    top: 77,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F4F4F4',
    borderWidth: 2,
    borderColor: '#B3B3B3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 22,
    color: '#B3B3B3',
  },
  sectionTitle: {
    position: 'absolute',
    left: 37,
    top: 178,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  balanceCard: {
    position: 'absolute',
    left: 37,
    top: 218,
    width: 356,
    height: 131,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  balanceLabel: {
    position: 'absolute',
    left: 64,
    top: 237,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  balanceValue: {
    position: 'absolute',
    left: 64,
    top: 264,
    fontSize: 40,
    fontWeight: '700',
    color: '#000000',
  },
  balanceMeta: {
    position: 'absolute',
    left: 64,
    top: 319,
    fontSize: 15,
    fontWeight: '700',
    color: '#767676',
  },
  monthlyIncomeCard: {
    position: 'absolute',
    left: 37,
    top: 377,
    width: 170,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  monthlyIncomeTitle: {
    position: 'absolute',
    left: 53,
    top: 389,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  monthlyIncomeValue: {
    position: 'absolute',
    left: 53,
    top: 412,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  monthlyIncomeMeta: {
    position: 'absolute',
    left: 53,
    top: 448,
    fontSize: 11,
    fontWeight: '700',
    color: '#767676',
  },
  monthlyExpensesCard: {
    position: 'absolute',
    left: 219,
    top: 377,
    width: 170,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  monthlyExpensesTitle: {
    position: 'absolute',
    left: 236,
    top: 389,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  monthlyExpensesValue: {
    position: 'absolute',
    left: 236,
    top: 412,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  monthlyExpensesMeta: {
    position: 'absolute',
    left: 236,
    top: 448,
    fontSize: 11,
    fontWeight: '700',
    color: '#767676',
  },
  addButton: {
    position: 'absolute',
    left: 191,
    top: 746,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#000000',
  },
});

export { DashboardScreen };
export default DashboardScreen;
