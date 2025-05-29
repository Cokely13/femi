import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const categories = [
  "App Development",
  "Walking",
  "Job Applications",
  "Algorithm Practice",
  "Sleep",
  "Food",
  "Steps",
  "Work",
  "Gym",
  "Bike",
  "Swim",
  "Reading",
  "Other",
];

const frequencies = ["Daily", "Weekdays", "Weekends", "Weekly", "One-Time"];

export default function EnterGoals({ route, navigation }) {
  const { userId, BASE_URL } = route.params;

  const [category, setCategory] = useState(categories[0]);
  const [minutes, setMinutes] = useState("");
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [existingGoals, setExistingGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/goals?userId=${userId}`);
      const data = await res.json();
      setExistingGoals(data);
    } catch (err) {
      console.error("Failed to fetch goals", err);
    }
  };

  const handleSubmit = async () => {
    if (!minutes) {
      Alert.alert("Error", "Please enter target minutes");
      return;
    }

    const newGoal = {
      category,
      targetMinutes: parseInt(minutes),
      frequency,
      userId,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoal),
      });

      if (!res.ok) throw new Error("Failed to save goal");

      setMinutes("");
      setCategory(categories[0]);
      setFrequency(frequencies[0]);

      await fetchGoals(); // refresh list
      Alert.alert("Success", "Goal saved!");
    } catch (err) {
      console.error("Failed to save goal", err);
      Alert.alert("Error", "Could not save goal.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Enter a New Goal</Text>

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      <Text style={styles.label}>Target Minutes</Text>
      <TextInput
        style={styles.input}
        value={minutes}
        onChangeText={setMinutes}
        placeholder="e.g. 45"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Frequency</Text>
      <Picker
        selectedValue={frequency}
        onValueChange={setFrequency}
        style={styles.picker}
      >
        {frequencies.map((freq) => (
          <Picker.Item key={freq} label={freq} value={freq} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Save Goal" onPress={handleSubmit} color="#1e90ff" />
      </View>

      <Text style={styles.header}>Your Goals</Text>
      {existingGoals.map((goal) => (
        <Text key={goal.id} style={styles.goalItem}>
          📌 {goal.category} – {goal.targetMinutes} mins ({goal.frequency})
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  picker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
  goalItem: {
    fontSize: 16,
    marginTop: 8,
  },
});
