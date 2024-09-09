import React from "react";
import { useState } from "react";
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
  ];

  function caulator() {
    let lastArr = currentNumber[currentNumber.length - 1];

    if (
      lastArr === "/" ||
      lastArr === "*" ||
      lastArr === "-" ||
      lastArr === "+" ||
      lastArr === "."
    ) {
      setCurrentNumber(currentNumber);
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  }
  function handlelnput(buttonpressed) {
    if (
      buttonpressed === "+" ||
      buttonpressed === "-" ||
      buttonpressed === "*" ||
      buttonpressed === "/"
    ) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonpressed);
      return;
    } else if (
      buttonpressed === 1 ||
      buttonpressed === 2 ||
      buttonpressed === 3 ||
      buttonpressed === 4 ||
      buttonpressed === 5 ||
      buttonpressed === 6 ||
      buttonpressed === 7 ||
      buttonpressed === 8 ||
      buttonpressed === 9 ||
      buttonpressed === 0 ||
      buttonpressed === "."
    ) {
      Vibration.vibrate(35);
    }
    switch (buttonpressed) {
      case "DEL":
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "C":
        Vibration.vibrate(35);
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        Vibration.vibrate(35);
        setLastNumber(currentNumber + "=");
        caulator();
        return;
    }
    setCurrentNumber(currentNumber + buttonpressed);
  }
  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      maxWidth: "100%",
      maxHeight: "35%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      borderRadius: 5,
    },
    resultText: {
      maxHeight: 45,
      color: "#00b9d6",
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontsize: 20,
      marginRight: 10,
      alignSelf: "flex-end",
    },
    themeButton: {
      alignSelf: "flex-start",
      bottom: "5%",
      margin: 15,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: "100%",
      height: "35%",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    button: {
      backgroundColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: "23%",
      height: "25%",
      flexDirection: "row",
      marginVertical: 10,
      borderRadius: 5,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 28,
    },
  });
  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
            onPress={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
          ></Entypo>
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === "=" ||
          button === "/" ||
          button === "*" ||
          button === "-" ||
          button === "+" ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: "#00b9d6" }]}
              onPress={() => handlelnput(button)}
            >
              <Text
                style={[styles.textButton, { color: "white", fontSize: 28 }]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ) : button === "." || button === "DEL" ? (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    button === "."
                      ? darkMode
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#414853"
                      : "#ededed",
                  minWidth: "37%",
                },
              ]}
              onPress={() => handlelnput(button)}
            >
              <Text style={[styles.textButton]}>{button}</Text>
            </TouchableOpacity>
          ) : button === "C" ? (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === "number"
                      ? darkMode
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#414853"
                      : "#ededed",
                  minWidth: "36%",
                },
              ]}
              onPress={() => handlelnput(button)}
            >
              <Text style={[styles.textButton]}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === "number"
                      ? darkMode
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#414853"
                      : "#ededed",
                },
              ]}
              onPress={() => handlelnput(button)}
            >
              <Text style={[styles.textButton]}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}
