import { React, useWindowDimensions, Text, View, StyleSheet } from "react-native";
import Timer from "../Timer/timer";
import PropTypes from 'prop-types'

const Player = ({
  id,
  wind,
  starting_increment,
  starting_bank,
  endTurnCb,
  my_turn,
  pause_game_flag,
  reset_timer,
}) => {
  const out_of_time_cb = () => {
    endTurnCb();
  };

  // Styles
  const width = useWindowDimensions().width;
  const isTablet = width >= 768;
  const styles = StyleSheet.create({
    playerContainer: {
      //TODO: Determine with Richard whether this is best practice for turn color. - For turn color we don't have multiple components
      // controlling it, so we should just have game set placements and timer set text color.
      // but we should still ask Britt
      backgroundColor: my_turn ? "#B6E2A1" : "white",
      height: "100%",
      width: "100%",
    },
    playerName: {
      borderWidth: 0, // Remove Border
      color: my_turn ? "white" : "black",
      elevation: 0, // Remove Shadow for Android
      fontSize: isTablet ? "24" : "16",
      fontWeight: "bold",
      paddingBottom: isTablet ? 20 : 10,
      paddingTop: isTablet ? 75 : 30,
      shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      textAlign: "center", // <-- the magic
    },
    wind: {
      borderWidth: 0, // Remove Border
      color: my_turn ? "white" : "black",
      elevation: 0, // Remove Shadow for Android
      fontSize: isTablet ? "16" : "12",
      paddingBottom: isTablet ? 40 : 25,
      shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      textAlign: "center",
    }
  });

  return (
    <View style={styles.playerContainer}>
      <Text style={styles.playerName}>Player {id}</Text>
      <Text style={styles.wind}>{wind}</Text>
      <Timer
        player_id={id}
        starting_increment={starting_increment}
        starting_bank={starting_bank}
        timer_running={my_turn}
        out_of_time_cb={out_of_time_cb}
        is_paused={pause_game_flag}
        reset_timer={reset_timer}
      />
    </View>
  );
};

Player.propTypes = {
  id: PropTypes.number,
  wind: PropTypes.string,
  starting_increment: PropTypes.number,
  starting_bank: PropTypes.number,
  endTurnCb: PropTypes.func,
  my_turn: PropTypes.bool,
  pause_game_flag: PropTypes.bool,
  reset_timer: PropTypes.bool,
}

export default Player;
