import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function GoalTimerCircle({ category, targetMinutes = 30 }) {
  const totalSeconds = targetMinutes * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (remainingSeconds / totalSeconds) * circumference;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePress = () => {
    if (remainingSeconds === 0) return;
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
