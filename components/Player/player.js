import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';



const Player = ({ id, starting_increment, starting_bank, is_playing, setTurn, current_turn })  => {

    return (
    <Card containerStyle={{ width: '50%', height: '50%', margin: '0', padding: '0', backgroundColor: 'red'}} disabled={!is_playing}>
      <View>
        <Text>Player {id}</Text>
        <Timer player_id={id} starting_increment={starting_increment} starting_bank={starting_bank} timer_running={is_playing} setTurn={setTurn} current_turn={current_turn}/>
      </View>
    </Card>

    );
}

const styles = StyleSheet.create({
    item: {
      width: '50%', 
      height: '50%'
    }
  });
  

export default Player;
