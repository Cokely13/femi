import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchGoals, postGoal } from "../store/goalsStore";

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

export default function EnterGoals({ route }) {
  const { userId, BASE_URL } = route.params;
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);

  const [category, setCategory] = useState(categories[0]);
  const [minutes, setMinutes] = useState("");
  const [frequency, setFrequency] = useState(frequencies[0]);

  useEffect(() => {
    dispatch(fetchGoals(userId, BASE_URL));
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!minutes) {
      Alert.alert("Error", "Please enter target minutes");
      return;
    }

    const goal = {
      category,
      targetMinutes: parseInt(minutes),
      frequency,
      userId,
    };

    try {
      await dispatch(postGoal(goal, BASE_URL));
      setMinutes("");
      setCategory(categories[0]);
      setFrequency(frequencies[0]);
      Alert.alert("Success", "Goal saved!");
    } catch (err) {
      console.error("Goal save failed:", err);
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
      {goals.map((goal) => (
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
