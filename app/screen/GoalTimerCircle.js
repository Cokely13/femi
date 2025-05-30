import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GoalTimerCircle({
  goalId,
  category,
  targetMinutes = 30,
  completedMinutes = 0,
  BASE_URL,
  userId,
  activeGoalId,
  setActiveGoalId,
}) {
  const totalSeconds = targetMinutes * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(
    (targetMinutes - completedMinutes) * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (remainingSeconds / totalSeconds) * circumference;

  const restoreState = async () => {
    try {
      const stored = await AsyncStorage.getItem(`goal-${goalId}`);
      if (stored) {
        const { startTime, isRunning: storedRunning } = JSON.parse(stored);
        if (storedRunning) {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          const newRemaining = Math.max(0, remainingSeconds - elapsed);
          setRemainingSeconds(newRemaining);
          if (newRemaining > 0) {
            setIsRunning(true);
            setActiveGoalId(goalId);
          }
        }
      }
    } catch (err) {
      console.error("Restore state error", err);
    }
  };

  useEffect(() => {
    restoreState();
  }, []);

  useEffect(() => {
    if (isRunning) {
      AsyncStorage.setItem(
        `goal-${goalId}`,
        JSON.stringify({ startTime: Date.now(), isRunning: true })
      );
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          const updated = prev - 1;
          if (updated <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            updateProgress(totalSeconds - (prev - 1));
            AsyncStorage.removeItem(`goal-${goalId}`);
            return 0;
          }
          if ((updated + 1) % 60 === 0) {
            updateProgress(60);
          }
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      AsyncStorage.setItem(
        `goal-${goalId}`,
        JSON.stringify({ startTime: Date.now(), isRunning: false })
      );
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (activeGoalId !== goalId && isRunning) {
      setIsRunning(false);
    }
  }, [activeGoalId]);

  const updateProgress = async (seconds) => {
    const minutes = Math.floor(seconds / 60);
    try {
      await fetch(`${BASE_URL}/api/goals/${goalId}/progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, minutes }),
      });
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePress = () => {
    if (remainingSeconds === 0) return;
    if (!isRunning) {
      setActiveGoalId(goalId);
    }
    setIsRunning((prev) => !prev);
  };

  return (
    <View style={styles.wrapper}>
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
  wrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
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
