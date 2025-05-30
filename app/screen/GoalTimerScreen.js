import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GoalTimerScreen({ route }) {
  const {
    goalId,
    category,
    targetMinutes,
    completedMinutes = 0,
    BASE_URL,
    userId,
  } = route.params || {};

  if (
    !goalId ||
    !category ||
    typeof targetMinutes !== "number" ||
    typeof completedMinutes !== "number"
  ) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Invalid goal data.</Text>
      </View>
    );
  }

  const initialRemaining = (targetMinutes - completedMinutes) * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(initialRemaining);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (remainingSeconds / (targetMinutes * 60)) * circumference;

  // console.log("GoalTimerScreen params:", {
  //   goalId,
  //   category,
  //   targetMinutes,
  //   completedMinutes,
  //   BASE_URL,
  //   userId,
  // });

  useEffect(() => {
    const checkStoredTimer = async () => {
      try {
        const stored = await AsyncStorage.getItem(`goal-${goalId}`);
        if (stored) {
          const { startTime, wasRunning, lastRemaining } = JSON.parse(stored);
          if (typeof lastRemaining === "number") {
            if (wasRunning) {
              const elapsed = Math.floor((Date.now() - startTime) / 1000);
              const updatedRemaining = Math.max(lastRemaining - elapsed, 0);
              setRemainingSeconds(updatedRemaining);
              setIsRunning(true);
              startInterval(updatedRemaining);
            } else {
              setRemainingSeconds(lastRemaining);
            }
          } else {
            setRemainingSeconds(initialRemaining);
          }
        } else {
          setRemainingSeconds(initialRemaining);
        }
      } catch (err) {
        console.error("Failed to load timer from storage", err);
        setRemainingSeconds(initialRemaining);
      }
    };

    checkStoredTimer();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startInterval = (startFrom) => {
    let current = startFrom;
    intervalRef.current = setInterval(() => {
      current -= 1;
      setRemainingSeconds(current);
      if (current <= 0) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        updateCompletedTime(targetMinutes * 60);
        AsyncStorage.removeItem(`goal-${goalId}`);
      } else {
        AsyncStorage.setItem(
          `goal-${goalId}`,
          JSON.stringify({
            startTime: Date.now(),
            wasRunning: true,
            lastRemaining: current,
          })
        );
      }
    }, 1000);
  };

  const updateCompletedTime = async (elapsedSeconds) => {
    const minutes = Math.floor((targetMinutes * 60 - remainingSeconds) / 60);
    try {
      await fetch(`${BASE_URL}/api/goals/${goalId}/progress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, minutes }),
      });
    } catch (err) {
      console.error("Failed to update goal progress", err);
    }
  };

  const handlePress = async () => {
    if (remainingSeconds === 0) return;
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      const stored = await AsyncStorage.getItem(`goal-${goalId}`);
      if (stored) {
        const { startTime, lastRemaining } = JSON.parse(stored);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const updatedRemaining = Math.max(lastRemaining - elapsed, 0);
        await updateCompletedTime(targetMinutes * 60 - updatedRemaining);
        await AsyncStorage.setItem(
          `goal-${goalId}`,
          JSON.stringify({
            startTime: Date.now(),
            wasRunning: false,
            lastRemaining: updatedRemaining,
          })
        );
        setRemainingSeconds(updatedRemaining);
      }
    } else {
      setIsRunning(true);
      startInterval(remainingSeconds);
      await AsyncStorage.setItem(
        `goal-${goalId}`,
        JSON.stringify({
          startTime: Date.now(),
          wasRunning: true,
          lastRemaining: remainingSeconds,
        })
      );
    }
  };

  const formatTime = (s) => {
    if (typeof s !== "number" || isNaN(s)) return "00:00";
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>

      <TouchableOpacity onPress={handlePress}>
        <Svg height="150" width="150">
          <Circle
            stroke="#eee"
            fill="none"
            cx="75"
            cy="75"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#1e90ff"
            fill="none"
            cx="75"
            cy="75"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            rotation="-90"
            origin="75,75"
          />
        </Svg>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>
            {remainingSeconds === 0 ? "✅ Done!" : formatTime(remainingSeconds)}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.status}>
        {remainingSeconds === 0
          ? "Goal Completed!"
          : isRunning
          ? "Timer Running..."
          : "Paused"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timeTextContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  timeText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  status: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: "italic",
  },
});
