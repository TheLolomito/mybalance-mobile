import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <Text style={styles.title}>MyBalance</Text>
          <View style={styles.settingsWrapper}>
            <View style={styles.settingsIcon} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Dashboard</Text>

        <View style={[styles.card, styles.mainCard]}>
          <Text style={styles.cardLabel}>Balance</Text>
          <Text style={styles.cardValue}>$0.00</Text>
          <Text style={styles.cardMeta}>+0% month ever month</Text>
        </View>

        <View style={styles.secondaryRow}>
          <View style={[styles.card, styles.secondaryCard]}>
            <Text style={styles.secondaryLabel}>Ingresos</Text>
            <Text style={styles.secondaryValue}>$0.00</Text>
            <Text style={styles.cardMeta}>+0% month ever month</Text>
          </View>
          <View style={[styles.card, styles.secondaryCard]}>
            <Text style={styles.secondaryLabel}>Gastos</Text>
            <Text style={styles.secondaryValue}>$0.00</Text>
            <Text style={styles.cardMeta}>-0% month ever month</Text>
          </View>
        </View>
      </View>

      <View style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 27,
    fontWeight: '700',
    color: '#111111',
  },
  settingsWrapper: {
    width: 34,
    alignItems: 'center',
  },
  settingsIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#B0B0B0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    marginTop: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  cardValue: {
    fontSize: 40,
    fontWeight: '700',
    color: '#000000',
    marginTop: 8,
  },
  cardMeta: {
    fontSize: 12,
    color: '#9A9A9A',
    marginTop: 6,
  },
  mainCard: {
    minHeight: 130,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  secondaryCard: {
    flex: 1,
  },
  secondaryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
  },
  secondaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginTop: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4A4A4A',
  },
});

export default HomeScreen;
