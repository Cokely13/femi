// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   Button,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// const categories = [
//   "App Development",
//   "Walking",
//   "Job Applications",
//   "Algorithm Practice",
//   "Sleep",
//   "Food",
//   "Steps",
//   "Work",
//   "Gym",
//   "Bike",
//   "Swim",
//   "Reading",
//   "Other",
// ];

// const frequencies = ["Daily", "Weekdays", "Weekends", "Weekly", "One-Time"];

// export default function EnterGoals({ route, navigation }) {
//   const { userId, BASE_URL } = route.params;

//   const [category, setCategory] = useState(categories[0]);
//   const [minutes, setMinutes] = useState("");
//   const [frequency, setFrequency] = useState(frequencies[0]);
//   const [existingGoals, setExistingGoals] = useState([]);

//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   const fetchGoals = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/goals?userId=${userId}`);
//       const data = await res.json();
//       setExistingGoals(data);
//     } catch (err) {
//       console.error("Failed to fetch goals", err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!minutes) {
//       Alert.alert("Error", "Please enter target minutes");
//       return;
//     }

//     const newGoal = {
//       category,
//       targetMinutes: parseInt(minutes),
//       frequency,
//       userId,
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/api/goals`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newGoal),
//       });

//       if (!res.ok) throw new Error("Failed to save goal");

//       setMinutes("");
//       setCategory(categories[0]);
//       setFrequency(frequencies[0]);

//       await fetchGoals(); // refresh list
//       Alert.alert("Success", "Goal saved!");
//     } catch (err) {
//       console.error("Failed to save goal", err);
//       Alert.alert("Error", "Could not save goal.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Enter a New Goal</Text>

//       <Text style={styles.label}>Category</Text>
//       <Picker
//         selectedValue={category}
//         onValueChange={setCategory}
//         style={styles.picker}
//       >
//         {categories.map((cat) => (
//           <Picker.Item key={cat} label={cat} value={cat} />
//         ))}
//       </Picker>

//       <Text style={styles.label}>Target Minutes</Text>
//       <TextInput
//         style={styles.input}
//         value={minutes}
//         onChangeText={setMinutes}
//         placeholder="e.g. 45"
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Frequency</Text>
//       <Picker
//         selectedValue={frequency}
//         onValueChange={setFrequency}
//         style={styles.picker}
//       >
//         {frequencies.map((freq) => (
//           <Picker.Item key={freq} label={freq} value={freq} />
//         ))}
//       </Picker>

//       <View style={styles.buttonContainer}>
//         <Button title="Save Goal" onPress={handleSubmit} color="#1e90ff" />
//       </View>

//       <Text style={styles.header}>Your Goals</Text>
//       {existingGoals.map((goal) => (
//         <Text key={goal.id} style={styles.goalItem}>
//           📌 {goal.category} – {goal.targetMinutes} mins ({goal.frequency})
//         </Text>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     paddingBottom: 100,
//     backgroundColor: "#f9f9f9",
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//     padding: 10,
//     marginTop: 5,
//     borderRadius: 5,
//   },
//   picker: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginTop: 5,
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     marginTop: 30,
//   },
//   goalItem: {
//     fontSize: 16,
//     marginTop: 8,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [category, setCategory] = useState(categories[0]);
  const [digit1, setDigit1] = useState(0);
  const [digit2, setDigit2] = useState(0);
  const [digit3, setDigit3] = useState(0);
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [goalDate, setGoalDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [existingGoals, setExistingGoals] = useState([]);

  const targetMinutes = digit1 * 100 + digit2 * 10 + digit3;

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/goals?userId=${userId}`);
      const data = await res.json();
      setExistingGoals(data);
    } catch (err) {
      console.error("Failed to fetch goals", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setGoalDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (targetMinutes === 0) {
      Alert.alert("Error", "Target minutes must be greater than 0");
      return;
    }

    const payload = {
      category,
      targetMinutes,
      frequency,
      userId,
    };

    if (frequency === "Daily" || frequency === "One-Time") {
      payload.date = goalDate.toISOString().split("T")[0];
    }

    try {
      const res = await fetch(`${BASE_URL}/api/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save goal");

      setDigit1(0);
      setDigit2(0);
      setDigit3(0);
      setCategory(categories[0]);
      setFrequency(frequencies[0]);
      setGoalDate(new Date());

      await fetchGoals();
      Alert.alert("Success", "Goal saved!");
    } catch (err) {
      console.error("Failed to save goal", err);
      Alert.alert("Error", "Could not save goal.");
    }
  };

  const renderDigitPicker = (value, setter) => (
    <Picker
      selectedValue={value}
      style={styles.digitPicker}
      onValueChange={setter}
    >
      {[...Array(10)].map((_, i) => (
        <Picker.Item key={i} label={`${i}`} value={i} />
      ))}
    </Picker>
  );

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
      <View style={styles.digitRow}>
        {renderDigitPicker(digit1, setDigit1)}
        {renderDigitPicker(digit2, setDigit2)}
        {renderDigitPicker(digit3, setDigit3)}
      </View>
      <Text style={{ textAlign: "center" }}>{targetMinutes} minutes</Text>

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

      {(frequency === "Daily" || frequency === "One-Time") && (
        <>
          <Text style={styles.label}>Date</Text>
          <Button
            title={goalDate.toISOString().split("T")[0]}
            onPress={() => setShowDatePicker(true)}
            color="#1e90ff"
          />
          {showDatePicker && (
            <DateTimePicker
              value={goalDate}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={handleDateChange}
            />
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Save Goal" onPress={handleSubmit} color="#1e90ff" />
      </View>

      <Text style={styles.header}>Your Goals</Text>
      {existingGoals.map((goal) => (
        <Text key={goal.id} style={styles.goalItem}>
          📌 {goal.category} – {goal.targetMinutes} mins ({goal.frequency}
          {goal.date ? ` on ${goal.date}` : ""})
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
    marginVertical: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  digitRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  digitPicker: {
    width: 80,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 30,
  },
  goalItem: {
    fontSize: 16,
    marginTop: 8,
  },
});
