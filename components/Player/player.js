import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';
import { Button, Text, View } from 'react-native';

const Player = ({ id, starting_increment, starting_bank, is_playing, setTurn })  => {

    return (
      <View disabled={!is_playing}>
        <Text>Player {id} + {is_playing.toString()}</Text>
        <Timer starting_increment={starting_increment} starting_bank={starting_bank} timer_running={is_playing} setTurn={setTurn}/>
        {/* <Button>click for turn</>
        <Text>Time Timer.time()</> */}
      </View>
    );
}

export default Player;
