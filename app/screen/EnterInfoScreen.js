// // app/screen/EnterInfoScreen.js
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";

// export default function EnterInfoScreen({ route, navigation }) {
//   const { userId, BASE_URL } = route.params;

//   const [sleepQuality, setSleepQuality] = useState("");
//   const [sleepTime, setSleepTime] = useState("");
//   const [foodHealthy, setFoodHealthy] = useState("");
//   const [foodPortion, setFoodPortion] = useState("");
//   const [steps, setSteps] = useState("");

//   const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

//   const handleSubmit = async () => {
//     try {
//       // Create all entries in parallel
//       await Promise.all([
//         fetch(`${BASE_URL}/api/sleeps`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             date: today,
//             quality: Number(sleepQuality),
//             time: Number(sleepTime),
//             userId,
//           }),
//         }),
//         fetch(`${BASE_URL}/api/foods`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             date: today,
//             healthy: Number(foodHealthy),
//             portion: Number(foodPortion),
//             userId,
//           }),
//         }),
//         fetch(`${BASE_URL}/api/steps`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             date: today,
//             value: Number(steps),
//             userId,
//           }),
//         }),
//       ]);

//       Alert.alert("Success", "Today's info saved!");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error saving info:", error);
//       Alert.alert("Error", "Failed to save. Please try again.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Enter Today’s Info ({today})</Text>

//       <Text style={styles.label}>Sleep Quality (1–10)</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={sleepQuality}
//         onChangeText={setSleepQuality}
//       />

//       <Text style={styles.label}>Sleep Time (hrs)</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={sleepTime}
//         onChangeText={setSleepTime}
//       />

//       <Text style={styles.label}>Food Healthy (1–10)</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={foodHealthy}
//         onChangeText={setFoodHealthy}
//       />

//       <Text style={styles.label}>Food Portion (1–10)</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={foodPortion}
//         onChangeText={setFoodPortion}
//       />

//       <Text style={styles.label}>Steps</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={steps}
//         onChangeText={setSteps}
//       />

//       <View style={styles.buttonContainer}>
//         <Button title="Submit" onPress={handleSubmit} color="#1e90ff" />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     paddingBottom: 100,
//     backgroundColor: "#f0fff0",
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 10,
//   },
//   input: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     marginTop: 30,
//   },
// });

// app/screen/EnterInfoScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function EnterInfoScreen({ route, navigation }) {
  const { userId, BASE_URL } = route.params;

  const [category, setCategory] = useState("sleep");

  const [sleepQuality, setSleepQuality] = useState(5);
  const [sleepTime, setSleepTime] = useState(7);

  const [foodHealthy, setFoodHealthy] = useState(5);
  const [foodPortion, setFoodPortion] = useState(5);

  const [steps, setSteps] = useState(5000);

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const handleSubmit = async () => {
    try {
      if (category === "sleep") {
        await fetch(`${BASE_URL}/api/sleeps`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: today,
            quality: sleepQuality,
            time: sleepTime,
            userId,
          }),
        });
      } else if (category === "food") {
        await fetch(`${BASE_URL}/api/foods`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: today,
            healthy: foodHealthy,
            portion: foodPortion,
            userId,
          }),
        });
      } else if (category === "steps") {
        await fetch(`${BASE_URL}/api/steps`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: today,
            value: steps,
            userId,
          }),
        });
      }

      Alert.alert("Success", `Today's ${category} saved!`);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save. Please try again.");
    }
  };

  const renderPicker = (value, onChange) => (
    <Picker
      selectedValue={value}
      onValueChange={(val) => onChange(val)}
      style={styles.picker}
    >
      {[...Array(10)].map((_, i) => (
        <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
      ))}
    </Picker>
  );

  const renderStepsPicker = () => (
    <Picker
      selectedValue={steps}
      onValueChange={(val) => setSteps(val)}
      style={styles.picker}
    >
      {[...Array(20)].map((_, i) => {
        const val = 1000 + i * 500;
        return <Picker.Item key={val} label={`${val}`} value={val} />;
      })}
    </Picker>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Enter Today’s Info ({today})</Text>

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.picker}
      >
        <Picker.Item label="Sleep" value="sleep" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Steps" value="steps" />
      </Picker>

      {category === "sleep" && (
        <>
          <Text style={styles.label}>Sleep Quality (1–10)</Text>
          {renderPicker(sleepQuality, setSleepQuality)}

          <Text style={styles.label}>Sleep Time (hrs, 1–10)</Text>
          {renderPicker(sleepTime, setSleepTime)}
        </>
      )}

      {category === "food" && (
        <>
          <Text style={styles.label}>Food Healthy (1–10)</Text>
          {renderPicker(foodHealthy, setFoodHealthy)}

          <Text style={styles.label}>Food Portion (1–10)</Text>
          {renderPicker(foodPortion, setFoodPortion)}
        </>
      )}

      {category === "steps" && (
        <>
          <Text style={styles.label}>Steps</Text>
          {renderStepsPicker()}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#1e90ff" />
      </View>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
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
});
