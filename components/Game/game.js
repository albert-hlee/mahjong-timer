import { React, useState, useEffect } from "react";
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

  const { height, width } = useWindowDimensions();
  // ------------------------- For Pause Modal -------------------------
  const [isPauseModalVisible, setIsPauseModalVisible] = useState(false);
  const [pauseGameFlag, setPauseGameFlag] = useState(false);
  const [resetTimerFlag, setResetTimerFlag] = useState(false);

  const openPauseModal = () => {
    setPauseGameFlag(true);
    setIsPauseModalVisible(true);
  }

  const onPauseModalClose = () => {
    setIsPauseModalVisible(false);
    setPauseGameFlag(false);
  };

  const onPauseModalResetRound =() => {
    setResetTimerFlag(true);
    setTimeout(() => {
      setResetTimerFlag(false);
    }, 0); // This ensures the reset is temporary

    setIsPauseModalVisible(false);
    setPauseGameFlag(false);
    setTurn(null);
  }

  // ------------------------- For Win Modal -------------------------
  const [isWinModalVisible, setIsWinModalVisible] = useState(false);
  const [winners, setWinners] = useState([]);

  const onWinModalClose = () => {
    setWinners([]);
    setTurn(null);

    // TODO: Add logic for limiting east game/ south game
    if (roundNumber < 4) {
      setRoundNumber((roundNumber) => roundNumber + 1)
    } else {
      setRoundWindIndex((roundWindIndex) => roundWindIndex + 1)
      setRoundNumber(0)
    }

    setResetTimerFlag(true);
    setTimeout(() => {
      setResetTimerFlag(false);
    }, 0); // This ensures the reset is temporary

    setCheckWinnerTime(winTimerSec);
    setIsWinModalVisible(false);
    setPauseGameFlag(false);
  };

  // 3 second timer after a Ron/Tsumo is called in case of mulitple Rons
  const winTimerSec = 3;
  const [checkWinnerTime, setCheckWinnerTime] = useState(winTimerSec);

  const [checkWinnerFlag, setCheckWinnerFlag] = useState(false);
  // The loser is implicitly the player who's current turn it is. We will also define Ron vs Tsumo based on that.
  // TODO: Add logic for setting winner and loser, no loser on tsumo
  const playerWin = (winner) => {
    winners.push(winner);

    setPauseGameFlag(true);
    setCheckWinnerFlag(true);
    setIsWinModalVisible(true);
  }

  useEffect(() => {
    if (checkWinnerFlag) {
      if (checkWinnerTime > 0) {
        const winnerTimeIntervalId = setInterval(() => {
          setCheckWinnerTime((checkWinnerTime) => checkWinnerTime - 1);
        }, 1000);
        return () => clearInterval(winnerTimeIntervalId);
      } else {
        // setCheckWinnerTime(winTimerSec);
        setCheckWinnerFlag(false);
      }
    }
  }, [checkWinnerFlag, checkWinnerTime]);

  // ------------------------- Player Display Information/Formatting -------------------------
  // playerDirection - orientation rotation clockwise angle
  // playerLocationX, playerLocationY - the top left corner of the container
  class PlayerInfo {
    constructor(id, wind, direction, locationX, locationY, height, width) {
      this.id = id;
      this.wind = wind;
      this.direction = direction;
      this.locationX = locationX;
      this.locationY = locationY;
      this.height = height;
      this.width = width;
    }
  }

  const [startingWind] = useState(Math.floor(Math.random() * 4));
  const players = [
    new PlayerInfo(0, winds[startingWind % 4], 180, 0, 0, height / 4, width),
    new PlayerInfo(1, winds[(startingWind + 1) % 4], -90, height / 4 + height / 4 - width / 4, - height / 4 + 3 * width / 4, width / 2, height / 2),
    new PlayerInfo(2, winds[(startingWind + 2) % 4], 0, 3 * height / 4, 0, height / 4, width),
    new PlayerInfo(3, winds[(startingWind + 3) % 4], 90, height / 4 + height / 4 - width / 4, - height / 4 + width / 4, width / 2, height / 2),
  ]

  const endTurnCb = () => {
    setTurn((playerTurn) => (playerTurn + 3) % 4);
  };

  const chiDisabledCondition = (player) => {
    return !(currentTurn - player === 1 || player - currentTurn == 3);
  };

  const isTablet = width >= 768;

  const smallButtonText = {
    fontSize: isTablet ? 24 : 14,
    color: "black",
    fontWeight: "bold",
  };

  const playerContainerStyle = function (player) {
    return {
      top: player.locationX,
      left: player.locationY,
      width: player.width,
      height: player.height,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1.5,
      transform: [{ rotate: `${player.direction}deg` }],
      position: "absolute",
      flex: 1,
      flexDirection: "row",
    };
  };

  return (
    <View style={styles.parentContainer}>
      {players.map(player => {
        return (
          <View key={player.id} style={playerContainerStyle(player)}>
            <View style={styles.leftPlayerContainer}>
              <TouchableOpacity
                disabled={!(currentTurn === null || currentTurn === player.id)}
                onPress={() => {
                  if (currentTurn === null) {
                    setTurn(player.id);
                  } else {
                    setTurn((playerTurn) => (playerTurn + 3) % 4);
                  }
                }}
              >
                <Player
                  id={player.id}
                  wind={player.wind}
                  starting_increment={starting_increment}
                  starting_bank={starting_bank}
                  endTurnCb={endTurnCb}
                  my_turn={currentTurn === player.id}
                  pause_game_flag={pauseGameFlag}
                  reset_timer={resetTimerFlag}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rightButtonContainer}>
              <TouchableOpacity
                style={[styles.smallButton, styles.chiButton]}
                disabled={chiDisabledCondition(player.id)}
                onPress={() => setTurn(player.id)}
              >
                <Text style={smallButtonText}>Chi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.ponKonButton]}
                onPress={() => setTurn(player.id)}
              >
                <Text style={smallButtonText}>Pon / Kan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!(currentTurn === player.id)}
                style={[styles.smallButton, styles.riichiButton]}
                onPress={() => setTurn((playerTurn) => (playerTurn + 3) % 4)}
              >
                <Text style={smallButtonText}>Riichi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.ronTsumo]}
                onPress={() => playerWin(player.id)}
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
        onResetRound={onPauseModalResetRound}
      > 
      </PauseMenu>

      <WinModal
        isVisible ={isWinModalVisible}
        onClose = {onWinModalClose}
        roundWind = {winds[roundWindIndex]}
        roundNumber = {roundNumber}
        winners = {winners}
        loser = {currentTurn}
        checkWinnerTime={checkWinnerTime}
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
