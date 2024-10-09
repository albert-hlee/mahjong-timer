import { React, useState } from "react";

import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const MainMenu = () => {
  const [startingNumberOfPlayers, setNumberOfPlayers] = useState(4);
  const [startingNumberOfRounds, setNumberOfRounds] = useState(4);
  const [startingPoints, setPoints] = useState(25000);
  const [baseTime, setBaseTime] = useState(60);
  const [incrementTime, setIncrementTime] = useState(15); // default values in mahjong soul kek

  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/gameView",
      params: {
        starting_increment: incrementTime,
        starting_bank: baseTime,
      },
    });
  };

  return (
    <View style={styles.parentContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.menu}>
          <Text style={styles.title}>Game Settings</Text>
          <Text style={styles.item}>Starting Number of Players</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNumberOfPlayers}
            inputMode="numeric"
            keyboardType="numeric"
          >
            {startingNumberOfPlayers}
          </TextInput>
          <Text style={styles.item}>Rounds</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNumberOfRounds}
            inputMode="numeric"
            keyboardType="numeric"
            type="number"
          >
            {startingNumberOfRounds}
          </TextInput>
          <Text style={styles.item}>Starting Points</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPoints}
            inputMode="numeric"
            keyboardType="numeric"
            type="number"
          >
            {startingPoints}
          </TextInput>
          <Text style={styles.item}>Base Time</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBaseTime}
            inputMode="numeric"
            keyboardType="numeric"
            type="number"
          >
            {baseTime}
          </TextInput>
          <Text style={styles.item}>Increment Time</Text>
          <TextInput
            style={styles.input}
            onChangeText={setIncrementTime}
            inputMode="numeric"
            keyboardType="numeric"
            type="number"
          >
            {incrementTime}
          </TextInput>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text>Start Game</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const $green = "#4CAF50";
const fullyTransparent = "rgba(0,0,0, 0.0)";
const white = "white";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: $green, // TODO: This doesn't show as green
    borderRadius: 5,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
  item: {
    borderWidth: 0, // Remove Border
    elevation: 0, // Remove Shadow for Android
    fontWeight: "bold",

    shadowColor: { fullyTransparent }, // Remove Shadow for iOS
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,

    textAlign: "center", // <-- the magic
  },
  menu: {
    height: "100%",
    width: "100%",
  },
  parentContainer: {
    backgroundColor: { white },
    height: "100%",
    padding: "10%",
    width: "100%",
  },
  title: {
    fontSize: "30",
    fontStyle: "bold",
    textAlign: "center",
  },
});

export default MainMenu;
