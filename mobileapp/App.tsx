import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMobileTripStore } from './src/store/useTripStore';

const queryClient = new QueryClient();

function MainAppScreen() {
  const { itinerary, destination, durationDays, budgetAmount, travelStyle, setDestination, setDurationDays, setBudgetAmount } = useMobileTripStore();
  const [selectedDay, setSelectedDay] = useState(1);

  const activeDayPlan = itinerary?.dayPlans.find(d => d.dayNumber === selectedDay) || itinerary?.dayPlans[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0f19" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Mobile Header */}
        <View style={styles.header}>
          <Text style={styles.badge}>REACT NATIVE • EXPO • NATIVEWIND</Text>
          <Text style={styles.title}>Tour<Text style={styles.titleAccent}>Itinerary</Text> Mobile</Text>
          <Text style={styles.subtitle}>AI-Powered Travel Companion</Text>
        </View>

        {/* Input Parameters Box */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>✈️ Trip Specification</Text>

          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Destination</Text>
              <TextInput 
                style={styles.input} 
                value={destination} 
                onChangeText={setDestination} 
                placeholderTextColor="#6b7280"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Days</Text>
              <TextInput 
                style={styles.input} 
                value={String(durationDays)} 
                keyboardType="numeric" 
                onChangeText={(v) => setDurationDays(Number(v) || 1)} 
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Budget (₹)</Text>
            <TextInput 
              style={styles.input} 
              value={String(budgetAmount)} 
              keyboardType="numeric" 
              onChangeText={(v) => setBudgetAmount(Number(v) || 0)} 
              placeholderTextColor="#6b7280"
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>✨ Generate Mobile Itinerary</Text>
          </TouchableOpacity>
        </View>

        {/* Generated Itinerary Display */}
        {itinerary && (
          <View style={styles.card}>
            <Text style={styles.itineraryTitle}>{itinerary.title}</Text>
            <Text style={styles.itinerarySummary}>{itinerary.summary}</Text>

            {/* Day Selector Horizontal Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
              {itinerary.dayPlans.map(d => (
                <TouchableOpacity
                  key={d.dayNumber}
                  onPress={() => setSelectedDay(d.dayNumber)}
                  style={[styles.tab, selectedDay === d.dayNumber && styles.tabActive]}
                >
                  <Text style={[styles.tabText, selectedDay === d.dayNumber && styles.tabTextActive]}>
                    Day {d.dayNumber}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Active Day Detail */}
            {activeDayPlan && (
              <View style={styles.dayBox}>
                <Text style={styles.dayTitle}>{activeDayPlan.title}</Text>
                <Text style={styles.dayOverview}>{activeDayPlan.overview}</Text>

                <View style={styles.activitiesList}>
                  {activeDayPlan.activities.map((act, idx) => (
                    <View key={idx} style={styles.actItem}>
                      <View style={styles.actHeader}>
                        <Text style={styles.actTime}>🕒 {act.timeSlot}</Text>
                        <Text style={styles.actCost}>₹{act.estimatedCost}</Text>
                      </View>
                      <Text style={styles.actTitle}>{act.title}</Text>
                      <Text style={styles.actDesc}>{act.description}</Text>
                      <Text style={styles.actLoc}>📍 {act.location}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainAppScreen />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 8,
  },
  badge: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },
  titleAccent: {
    color: '#38bdf8',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    flex: 1,
  },
  fieldMargin: {
    marginTop: 12,
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#374151',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#0284c7',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itineraryTitle: {
    color: '#38bdf8',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  itinerarySummary: {
    color: '#9ca3af',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  tabsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#1f2937',
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#0284c7',
  },
  tabText: {
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: 12,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  dayBox: {
    backgroundColor: '#0b0f19',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  dayTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayOverview: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },
  activitiesList: {
    gap: 10,
  },
  actItem: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  actHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  actTime: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '600',
  },
  actCost: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: 'bold',
  },
  actTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actDesc: {
    color: '#d1d5db',
    fontSize: 12,
    marginTop: 2,
  },
  actLoc: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 6,
  },
});
