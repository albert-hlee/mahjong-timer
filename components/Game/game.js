import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import Player from "../Player/player";

const Game = ({ starting_increment, starting_bank, pause_game_flag }) => {
  const [currentTurn, setTurn] = useState(null);
  const { height, width } = useWindowDimensions();
  const isTablet = width >= 768;
  //TODO: Add wind indicator for given player
  const startingNumberOfPlayers = [0, 1, 3, 2];
  const playerToDirection = {
    0: 90,
    1: -90,
    2: -90,
    3: 90,
  };

  const playerToLocationX = {
    0: 0,
    1: 1,
    2: 1,
    3: 0,
  };

  const playerToLocationY = {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
  };

  const endTurnCb = () => {
    setTurn((playerTurn) => (playerTurn - 1 + 4) % 4);
  };

  const chiDisabledCondition = (player) => {
    return player - currentTurn === 3 || player - currentTurn === -1;
  };

  const smallButtonText = {
    fontSize: isTablet ? 24 : 14,
    color: "black",
    fontWeight: "bold",
  };

  const playerContainerStyle = function (player) {
    const x = playerToLocationX[player];
    const y = playerToLocationY[player];
    return {
      top: -(width - height) / 4 + (y * height) / 2,
      left: (width - height) / 4 + (x * width) / 2,
      width: height / 2,
      height: width / 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'white',
      borderColor: "black",
      borderWidth: 1.5,
      transform: [{ rotate: `${playerToDirection[player]}deg` }],
      position: "absolute",
      flex: 1,
      flexDirection: "row",
    };
  };

  return (
    <View style={styles.parentContainer}>
      {startingNumberOfPlayers.map((player) => {
        return (
          <View style={playerContainerStyle(player)}>
            <View style={styles.leftPlayerContainer}>
              <TouchableOpacity
                disabled={
                  !(currentTurn === null || currentTurn === player) &&
                  !pause_game_flag
                }
                onPress={() => {
                  if (currentTurn === null) {
                    setTurn(player);
                  } else {
                    setTurn((playerTurn) => (playerTurn + 3) % 4);
                  }
                }}
              >
                <Player
                  id={player}
                  starting_increment={starting_increment}
                  starting_bank={starting_bank}
                  endTurnCb={endTurnCb}
                  my_turn={currentTurn === player}
                  pause_game_flag={pause_game_flag}
                />
            </TouchableOpacity>
            </View>
            <View style={styles.rightButtonContainer}>
              <TouchableOpacity
                style={[styles.smallButton, styles.chiButton]}
                onPress={() => setTurn(player)}
              >
                <Text style={smallButtonText}>Chi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.ponKonButton]}
                onPress={() => setTurn(player)}
              >
                <Text style={smallButtonText}>Pon / Kan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!(currentTurn === player)}
                style={[styles.smallButton, styles.riichiButton]}
                onPress={() =>
                  setTurn((playerTurn) => (playerTurn + 3) % 4)
                }
              >
                <Text style={smallButtonText}>Riichi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.ronTsumo]}
                onPress={() => setTurn(null)}
              >
                <Text style={smallButtonText}>Ron / Tsumo</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  leftPlayerContainer: {
    backgroundColor: 'transparent',
    //TODO: Figure out why the fuck the =player doesn't take up the whole container >:(
    width: "75%",
    height: "100%",
  },
  rightButtonContainer: {
    flexDirection: "column", // Arranges buttons vertically
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
  },
  smallButton: {
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    height: "25%",
    justifyContent: "center",
    width: "100%",
  },
  riichiButton: {
    backgroundColor: "#FEBE8C",
  },
  ronTsumo: {
    backgroundColor: "#FAE3D9",
  },
  chiButton: {
    backgroundColor: "#B0C4DE",
  },
  ponKonButton: {
    backgroundColor: "#FFFBC1",
  },
  // smallButtonText: {
  //     fontSize: isTablet ? 24 : 16,
  //     color: 'white'
  // },
  parentContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
});

export default Game;
