import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import GoalTimerCircle from "./GoalTimerCircle"; // adjust path as needed

export default function TodayGoals({ route }) {
  const { userId, BASE_URL } = route.params;

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/goals?userId=${userId}`);
        const data = await res.json();
        setGoals(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch goals", err);
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text>Loading your goals...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Today's Goals</Text>
      {goals.length === 0 ? (
        <Text style={styles.noGoals}>You have no goals set for today.</Text>
      ) : (
        goals.map((goal) => (
          <GoalTimerCircle
            key={goal.id}
            category={goal.category}
            targetMinutes={goal.targetMinutes}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  noGoals: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#555",
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
