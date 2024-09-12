import { useState, useEffect } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Timer = ({player_id, starting_increment, starting_bank, timer_running, out_of_time_cb})  => {

    // timer modal will pop up when player time hits 0
    const [current_increment_time, setCurrentIncrementTime] = useState(starting_increment);
    const [bank_time, setBankTime] = useState(starting_bank);
    const [timerRunning, setRun] = useState(timer_running);
    useEffect(() => {
      if (timer_running) { // TODO: why does this only work if it's timer_running and not the state variable timerRunning?
        if (current_increment_time > 0) {
          const incrementIntervalId = setInterval(() => {
            setCurrentIncrementTime(incrementTime => incrementTime - 1);  // Use the functional update form
          }, 1000);
          return () => clearInterval(incrementIntervalId);
        } else {
          if (bank_time <= 0) {
            console.log("Player " + player_id + " out of time.");
            resetTimer();
            out_of_time_cb();
          } else {
            const bankIntervalId = setInterval(() => {
              setBankTime(bankTime => bankTime - 1);  // Use the functional update form
            }, 1000);
            return () => clearInterval(bankIntervalId);
          }
        }
      } else {
        resetTimer();
      }

    }, [current_increment_time, bank_time, timer_running, out_of_time_cb]);
    const resetTimer = () => {
      setCurrentIncrementTime(starting_increment);
      };
    return (
      <View>
        {current_increment_time > 0 && timer_running
        ?
        <Text style={styles.timer}>{current_increment_time} + {bank_time}</Text>
        : <Text style={styles.timer}>{bank_time}</Text>
      }
      </View>

    );
}

const styles = StyleSheet.create({
  timer: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
}
})

export default Timer;
