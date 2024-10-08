import { useState, useEffect } from "react";
import {
  Button,
  useWindowDimensions,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Card, Icon } from "@rneui/themed";
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
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const styles = StyleSheet.create({
    item: {
      borderWidth: 0, // Remove Border
      shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      paddingBottom: isTablet ? 75 : 40,
      fontSize: isTablet ? '24': '16',
      color: my_turn ? 'white' : 'black',
      //TODO: Determine with Richard whether this is best practice for turn color.
      backgroundColor: my_turn ? "green" : "white",
      //   transform: [{ rotate: '90deg' }],

      elevation: 0, // Remove Shadow for Android
      textAlign: "center", // <-- the magic
      fontWeight: "bold",
    },
    view: {
      height: "100%",
      width: "100%",
    },
  });

  return (
    <Card containerStyle={styles.item}>
      <View style={styles.view}>
        <Text style={styles.item}>Player {id}</Text>
        <Timer
          player_id={id}
          starting_increment={starting_increment}
          starting_bank={starting_bank}
          timer_running={my_turn}
          out_of_time_cb={out_of_time_cb}
          is_paused={pause_game_flag}
        />
      </View>
    </Card>
  );
};

export default Player;
