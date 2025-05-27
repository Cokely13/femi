// app/screen/FoodScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function FoodScreen({ route }) {
  const rawFoodData = route.params?.food || [];

  const [foodData, setFoodData] = useState([]);
  const [avgHealthy, setAvgHealthy] = useState(0);
  const [avgPortion, setAvgPortion] = useState(0);

  useEffect(() => {
    const today = new Date();
    const lastWeek = rawFoodData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const diff = (today - entryDate) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });

    const totalHealthy = lastWeek.reduce((sum, f) => sum + f.healthy, 0);
    const totalPortion = lastWeek.reduce((sum, f) => sum + f.portion, 0);
    const count = lastWeek.length;

    setFoodData(lastWeek);
    setAvgHealthy(count ? (totalHealthy / count).toFixed(1) : 0);
    setAvgPortion(count ? (totalPortion / count).toFixed(1) : 0);
  }, [rawFoodData]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Food (Last 7 Days)</Text>
      <Text style={styles.summary}>Average Healthy: {avgHealthy} / 10</Text>
      <Text style={styles.summary}>Average Portion: {avgPortion} / 10</Text>

      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.date}: Healthy {item.healthy}/10 | Portion {item.portion}/10
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
    backgroundColor: "#fff8f0",
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
