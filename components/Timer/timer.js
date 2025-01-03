import { React, useState, useEffect } from "react";
import {
  useWindowDimensions,
  Text,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types'

const Timer = ({
  player_id, 
  starting_increment, 
  starting_bank, 
  timer_running, 
  out_of_time_cb, 
  is_paused,
  reset_timer,
}) => {
  // timer modal will pop up when player time hits 0
  const [current_increment_time, setCurrentIncrementTime] =
    useState(starting_increment);
  const [bank_time, setBankTime] = useState(starting_bank);


  // Styles
  const width = useWindowDimensions().width;
  const isTablet = width >= 768; // Example tablet breakpoint

  const styles = StyleSheet.create({
    timer: {
      textAlign: "center", // <-- the magic
      fontWeight: "bold",
      fontSize: isTablet ? "100" : "40",
      backgroundColor: "transparent",
      // TODO: come up with extra ternary for the black color to default to green if it's that player's turn
      color: current_increment_time > 0 ? (timer_running ? 'white': 'black') : "#F7A4A4",
    },
    timerContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: 'transparent',
    },
  });

  useEffect(() => {
    if (!is_paused) {
      if (timer_running) {
        if (current_increment_time > 0) {
          const incrementIntervalId = setInterval(() => {
            setCurrentIncrementTime((incrementTime) => incrementTime - 1); // Use the functional update form
          }, 1000);
          return () => clearInterval(incrementIntervalId);
        } else {
          if (bank_time <= 0) {
            console.log("Player " + player_id + " out of time.");
            out_of_time_cb();
          } else {
            const bankIntervalId = setInterval(() => {
              setBankTime((bankTime) => bankTime - 1); // Use the functional update form
            }, 1000);
            return () => clearInterval(bankIntervalId);
          }
        }
      } else {
        setCurrentIncrementTime(starting_increment);
      }
    }
  }, [current_increment_time, bank_time, timer_running, out_of_time_cb]);

  // Not sure if best practice, maybe use forward refs? 
  useEffect(() => {
    if (reset_timer) {
      setBankTime(starting_bank);
    }
  }, [reset_timer]);

  return (
    <View style={styles.timerContainer}>
      {current_increment_time > 0 && timer_running ? (
        <Text style={styles.timer}>
          {current_increment_time} + {bank_time}
        </Text>
      ) : (
        <Text style={styles.timer}>{bank_time}</Text>
      )}
    </View>
  );
};

Timer.propTypes = {
  player_id: PropTypes.number,
  starting_increment: PropTypes.number,
  starting_bank: PropTypes.number,
  timer_running: PropTypes.bool,
  out_of_time_cb: PropTypes.func,
  is_paused: PropTypes.bool,
  reset_timer: PropTypes.bool,
}

export default Timer;
