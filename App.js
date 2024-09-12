import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  // Button array with sin, cos, tan, cot, and arithmetic operators
  const buttons = [
    "C",
    "DEL",
    "/",

    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "=",
    "sin",
    "cos",
    "tan",
    "cot",
  ];

  // Operators and trigonometric functions arrays
  const operators = ["+", "-", "*", "/"];
  const trigFunctions = ["sin", "cos", "tan", "cot"];

  const handleInput = (buttonPressed) => {
    // Check if the input is a number or decimal and not an operator
    const isNumberOrDecimal = !isNaN(buttonPressed) || buttonPressed === ".";

    // Check if the last character is an operator or if input is an operator
    const lastChar = currentNumber.slice(-1);
    const isLastCharOperator = operators.includes(lastChar);
    const isInputOperator = operators.includes(buttonPressed);

    // Restrict to 15 characters for numbers only (not including operators)
    if (
      isNumberOrDecimal &&
      currentNumber.replace(/[\+\-\*\/]/g, "").length >= 20
    ) {
      if (!isInputOperator) return; // If input is not an operator, restrict it
    }

    // Prevent multiple consecutive operators
    if (isInputOperator && isLastCharOperator) return;

    // Handle operator input
    if (isInputOperator) {
      Vibration.vibrate(35);
    }

    // Handle number and decimal input
    if (isNumberOrDecimal) {
      Vibration.vibrate(35);
    }

    // Handle special button presses
    switch (buttonPressed) {
      case "DEL":
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.slice(0, -1));
        return;
      case "C":
        Vibration.vibrate(35);
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        Vibration.vibrate(35);
        setLastNumber(currentNumber + "=");
        calculateResult();
        return;
      case "sin":
      case "cos":
      case "tan":
      case "cot":
        calculateTrig(buttonPressed);
        return;
      default:
        setCurrentNumber(currentNumber + buttonPressed);
    }
  };

  const calculateTrig = (operation) => {
    let result = eval(currentNumber);
    switch (operation) {
      case "sin":
        result = Math.sin(result);
        break;
      case "cos":
        result = Math.cos(result);
        break;
      case "tan":
        result = Math.tan(result);
        break;
      case "cot":
        result = 1 / Math.tan(result);
        break;
    }
    setCurrentNumber(result.toString());
  };

  const calculateResult = () => {
    let lastChar = currentNumber.slice(-1);
    if (["+", "-", "*", "/", "."].includes(lastChar)) return;

    try {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
    } catch (e) {
      setCurrentNumber("Error");
    }
  };

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      maxWidth: "100%",
      maxHeight: "35%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      borderRadius: 5,
      padding: 10,
    },
    resultText: {
      color: "#00b9d6",
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
      alignSelf: "flex-end",
    },
    themeButton: {
      alignSelf: "flex-start",
      margin: 15,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    wideButton: {
      width: "46%",
    },
    buttons: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 10,
    },
    button: {
      backgroundColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: "22%",
      height: "15%",
      marginVertical: 5,
      borderRadius: 10,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 25,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Entypo
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => {
          const isWideButton = button === "DEL" || button === "=";
          const isTrigFunction = trigFunctions.includes(button);
          const isOperator = operators.includes(button);

          return (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                isWideButton ? styles.wideButton : null,
                isTrigFunction ? { backgroundColor: "#d9a84e" } : null,
                isOperator ? { backgroundColor: "#00b9d6" } : null,
              ]}
              onPress={() => handleInput(button)}
            >
              <Text
                style={[
                  styles.textButton,
                  isWideButton ? { color: "white" } : null,
                  isTrigFunction ? { color: "white" } : null,
                  isOperator ? { color: "white" } : null,
                ]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
