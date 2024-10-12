import { React, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import PropTypes from 'prop-types'

import Player from "../Player/player";
import PauseMenu from '../PauseModal/pauseModal';
import WinModal from '../WinModal/winModal';

const Game = ({ starting_increment, starting_bank }) => {
  const [currentTurn, setTurn] = useState(null);

  const winds = ["East", "South", "West", "North"]
  const [roundWindIndex, setRoundWindIndex] = useState(0); // The round wind [East, South, West, North]
  const [roundNumber, setRoundNumber] = useState(1); // Turn number within the wind [1,4]

  // TODO: change formatting and player information to use player type
  type Player = {
    id: number,
    wind: string,
    // TODO: Add formatting information
  }

  // ------------------------- For Win Modal -------------------------
  const [isPauseModalVisible, setIsPauseModalVisible] = useState(false);
  const [pauseGameFlag, setPauseGameFlag] = useState(false);

  const openPauseModal = () => {
    setPauseGameFlag(true);
    setIsPauseModalVisible(true);
  }

  const onPauseModalClose = () => {
    setIsPauseModalVisible(false);
    setPauseGameFlag(false);
  };

  // ------------------------- For Win Modal -------------------------
  const [isWinModalVisible, setIsWinModalVisible] = useState(false);
  const [winners, setWinners] = useState([]);

  const onWinModalClose = () => {
    setWinners([]);
    setIsWinModalVisible(false);
    setPauseGameFlag(false);
  };

  // TODO: add a 5s timer to allow for multiple Rons
  // The loser is implicitly the player who's current turn it is. We will also define Ron vs Tsumo based on that.
  const playerWin = (winner) => {
    winners.push(winner)

    console.log(winners)
    console.log(typeof winners)
    // TODO: Add logic for limiting east game/ south game
    if(roundNumber < 4){
      setRoundNumber((roundNumber) => roundNumber + 1)
    } else{
      setRoundWindIndex((roundWindIndex) => roundWindIndex + 1)
      setRoundNumber(0)
    }
    setIsWinModalVisible(true);
    setPauseGameFlag(true);

    setTurn(null);
  }

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
    return !(currentTurn - player === 1 || player - currentTurn == 3);
  };

  const { height, width } = useWindowDimensions();
  const isTablet = width >= 768;

  // Should we move stylesheets into the component itself?
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
      backgroundColor: "white",
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
      {startingNumberOfPlayers.map(player => {
        return (
          <View key={player} style={playerContainerStyle(player)}>
            <View style={styles.leftPlayerContainer}>
              <TouchableOpacity
                disabled={!(currentTurn === null || currentTurn === player)}
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
                  pause_game_flag={pauseGameFlag}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rightButtonContainer}>
              <TouchableOpacity
                style={[styles.smallButton, styles.chiButton]}
                disabled={chiDisabledCondition(player)}
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
                onPress={() => setTurn((playerTurn) => (playerTurn + 3) % 4)}
              >
                <Text style={smallButtonText}>Riichi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.ronTsumo]}
                onPress={() => playerWin(player)}
              >
                <Text style={smallButtonText}>Ron / Tsumo</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <TouchableOpacity onPress={() => openPauseModal()} style={styles.pauseButton}>
        <Image
          // TODO: why does eslint not like require?
          // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
          source={require('../../assets/images/winds/East.png')} // TODO: change wind based on round
          style={{
            borderRadius: 100,
            height: '100%',
            width: '100%',
          }} />
      </TouchableOpacity>
      <PauseMenu 
        isVisible={isPauseModalVisible}
        onClose={onPauseModalClose}
        roundWind={winds[roundWindIndex]}
        roundNumber={roundNumber}
      > 
      </PauseMenu>

      <WinModal
        isVisible ={isWinModalVisible}
        onClose = {onWinModalClose}
        roundWind = {winds[roundWindIndex]}
        roundNumber = {roundNumber}
        winners = {winners}
      ></WinModal>

    </View>
  );
};

const styles = StyleSheet.create({
  leftPlayerContainer: {
    backgroundColor: "transparent",
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
  parentContainer: {
    backgroundColor: "#F5F5F5",
    height: "100%",
    width: "100%",
    justifyContent: 'center', // to center the pauseButton
    alignItems: 'center',
    position: 'relative',
  },
  pauseButton: {
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 100,
    alignItems: 'center',
    aspectRatio: 1/1,
    width: '15%',
  },
});

Game.propTypes = {
  starting_increment: PropTypes.number, 
  starting_bank: PropTypes.number,
}

export default Game;
