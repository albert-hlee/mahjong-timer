import {
  useWindowDimensions,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Timer from "../Timer/timer";

const Player = ({
  id,
  starting_increment,
  starting_bank,
  endTurnCb,
  my_turn,
  pause_game_flag,
}) => {
  const out_of_time_cb = () => {
    endTurnCb();
  };

  // Styles
  const { height, width } = useWindowDimensions();
  const isTablet = width >= 768;
  const styles = StyleSheet.create({
    playerContainer: {
      //TODO: Determine with Richard whether this is best practice for turn color. - For turn color we don't have multiple components
      // controlling it, so we should just have game set placements and timer set text color.
      // but we should still ask Britt
      backgroundColor: my_turn ? "#B6E2A1" : "white",
      height: '100%',
      width: '100%',
    },
    playerName: {
      borderWidth: 0, // Remove Border
      shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      paddingBottom: isTablet ? 75 : 30,
      paddingTop: isTablet ? 75 : 30,
      fontSize: isTablet ? '24': '16',
      color: my_turn ? 'white' : 'black',
      elevation: 0, // Remove Shadow for Android
      textAlign: "center", // <-- the magic
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.playerContainer}>
      <Text style={styles.playerName}>Player {id}</Text>
      <Timer
        player_id={id}
        starting_increment={starting_increment}
        starting_bank={starting_bank}
        timer_running={my_turn}
        out_of_time_cb={out_of_time_cb}
        is_paused={pause_game_flag}
      />
    </View>
  );
};

export default Player;
