// app/screen/SleepScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function SleepScreen({ route }) {
  const rawSleepData = route.params?.sleep || [];

  const [sleepData, setSleepData] = useState([]);
  const [averageQuality, setAverageQuality] = useState(0);
  const [averageTime, setAverageTime] = useState(0);

  useEffect(() => {
    // Filter last 7 days
    const today = new Date();
    const lastWeek = rawSleepData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const diff = (today - entryDate) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });

    // Calculate averages
    const totalQuality = lastWeek.reduce((sum, s) => sum + s.quality, 0);
    const totalTime = lastWeek.reduce((sum, s) => sum + s.time, 0);
    const count = lastWeek.length;

    setSleepData(lastWeek);
    setAverageQuality(count ? (totalQuality / count).toFixed(1) : 0);
    setAverageTime(count ? (totalTime / count).toFixed(1) : 0);
  }, [rawSleepData]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sleep (Last 7 Days)</Text>
      <Text style={styles.summary}>Average Quality: {averageQuality} / 10</Text>
      <Text style={styles.summary}>Average Time: {averageTime} hrs</Text>

      <FlatList
        data={sleepData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.date}: {item.time} hrs | Quality: {item.quality}/10
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#e6f7ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
    marginBottom: 5,
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 4,
  },
});
