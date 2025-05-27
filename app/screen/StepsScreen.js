// app/screen/StepsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function StepsScreen({ route }) {
  const rawStepData = route.params?.steps || [];

  const [stepData, setStepData] = useState([]);
  const [averageSteps, setAverageSteps] = useState(0);

  useEffect(() => {
    const today = new Date();
    const lastWeek = rawStepData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const diff = (today - entryDate) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });

    const total = lastWeek.reduce((sum, s) => sum + s.value, 0);
    const count = lastWeek.length;

    setStepData(lastWeek);
    setAverageSteps(count ? Math.round(total / count) : 0);
  }, [rawStepData]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Steps (Last 7 Days)</Text>
      <Text style={styles.summary}>Average: {averageSteps} steps</Text>

      <FlatList
        data={stepData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.date}: {item.value} steps
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
    backgroundColor: "#f0f9ff",
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
