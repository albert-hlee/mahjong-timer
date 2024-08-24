import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';
import { Button, Text, View } from 'react-native';

const Player = ({ id, starting_increment, starting_bank, is_playing, setTurn, current_turn })  => {

    return (
      <View disabled={!is_playing}>
        <Text>Player {id} + {is_playing.toString()}</Text>
        <Timer player_id={id} starting_increment={starting_increment} starting_bank={starting_bank} timer_running={is_playing} setTurn={setTurn} current_turn={current_turn}/>
        {/* <Button>click for turn</>
        <Text>Time Timer.time()</> */}
      </View>
    );
}

export default Player;
