import { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';

const Timer = ({total_time})  => {

    // timer modal will pop up when player time hits 0
    const [time, setTime] = useState(total_time)
    const [timerRunning, setRun] = useState(false);
    const [intervalRunning, setIntervalRun] = useState(false);
    useEffect(() => {
        if (time <= 0) {
            stopTimer();
        }
        if (timerRunning) {
            const intervalId = setInterval(() => {
                setTime(prevTime => prevTime - 1);  // Use the functional update form
              }, 1000);
              return () => clearInterval(intervalId);
        }

    }, [time, timerRunning, intervalRunning]);
    const stopTimer = () => {
        setRun(false);
      };
    const startTimer = () => {
        setRun(true);
    };
    return (
      <View>
        <Button title="Start Timer" onPress={() => {startTimer()}}/>
        <Text>Timer</Text>
        <Text>{time}</Text>
        <Button title="Stop Timer" onPress={() => {stopTimer()}}/>
      </View>
    );
}

export default Timer;
