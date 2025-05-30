// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import GoalTimerCircle from "./GoalTimerCircle"; // Make sure the path is correct

// export default function TodayGoals({ route }) {
//   const { userId, BASE_URL } = route.params;
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeGoalId, setActiveGoalId] = useState(null); // 🔥 Key to enforce one timer

//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/goals?userId=${userId}`);
//         const data = await res.json();
//         setGoals(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch goals", err);
//         setLoading(false);
//       }
//     };

//     fetchGoals();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#1e90ff" />
//         <Text>Loading your goals...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Today's Goals</Text>
//       {goals.length === 0 ? (
//         <Text style={styles.noGoals}>You have no goals set for today.</Text>
//       ) : (
//         goals.map((goal) => (
//           <GoalTimerCircle
//             key={goal.id}
//             goalId={goal.id}
//             category={goal.category}
//             targetMinutes={goal.targetMinutes}
//             completedMinutes={goal.completedMinutes || 0}
//             BASE_URL={BASE_URL}
//             userId={userId}
//             activeGoalId={activeGoalId}
//             setActiveGoalId={setActiveGoalId}
//           />
//         ))
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 40,
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   noGoals: {
//     fontSize: 18,
//     fontStyle: "italic",
//     color: "#555",
//     marginTop: 20,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// TodayGoals.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

export default function TodayGoals({ route, navigation }) {
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
          <TouchableOpacity
            key={goal.id}
            style={styles.goalItem}
            onPress={() =>
              navigation.navigate("GoalTimer", {
                goalId: goal.id,
                category: goal.category,
                targetMinutes: goal.targetMinutes,
                completedMinutes: goal.completedMinutes || 0,
                BASE_URL,
                userId,
              })
            }
          >
            <Text style={styles.goalText}>{goal.category}</Text>
            <Text style={styles.goalSubText}>
              {goal.completedMinutes || 0}/{goal.targetMinutes} min
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
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
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goalItem: {
    backgroundColor: "#f0f8ff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: "#1e90ff",
    borderWidth: 1,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "600",
  },
  goalSubText: {
    fontSize: 16,
    color: "#666",
  },
});
