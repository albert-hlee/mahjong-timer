import { useState, useEffect } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';

const Timer = ({starting_increment, starting_bank, timer_running, setTurn})  => {

    // timer modal will pop up when player time hits 0
    const [current_increment_time, setCurrentIncrementTime] = useState(starting_increment);
    const [bank_time, setBankTime] = useState(starting_bank);
    const [timerRunning, setRun] = useState(timer_running);
    useEffect(() => {
        if (timerRunning) {
          if (current_increment_time > 0) {
            const incrementIntervalId = setInterval(() => {
              setCurrentIncrementTime(incrementTime => incrementTime - 1);  // Use the functional update form
            }, 1000);
            return () => clearInterval(incrementIntervalId);
          } else {
            if (bank_time <= 0) {
              console.log("you're fucked hehehehe");
              stopTimer()
            } else {
              const bankIntervalId = setInterval(() => {
                setBankTime(bankTime => bankTime - 1);  // Use the functional update form
              }, 1000);
              return () => clearInterval(bankIntervalId);
            }
          }

        } else {
          console.log("IS THIS STOP BEING HIT")
          stopTimer();
        }

    }, [current_increment_time, bank_time, timerRunning]);
    const stopTimer = () => {
        setTurn(turn => turn + 1);
        setRun(false);
      };
    const startTimer = () => {
        setCurrentIncrementTime(starting_increment);
        setRun(true);
    };
    return (
      <TouchableOpacity>
      <View>
        {/* <Button title="Start Timer" onPress={() => {startTimer()}}/> */}
        <Text>Timer {timer_running.toString()}</Text>
        {current_increment_time > 0 && timerRunning
        ?
        <Text>{current_increment_time} + {bank_time}</Text>
        : <Text>{bank_time}</Text>
      }
        {/* <Button title="Stop Timer" onPress={() => {stopTimer()}}/> */}
      </View>
      </TouchableOpacity>

    );
}

export default Timer;
