import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Icon } from '@rneui/themed';



const Player = ({ id, starting_increment, starting_bank, is_playing, setTurn, current_turn })  => {

    return (
    <TouchableOpacity disabled={!is_playing} style={styles.container} onPress={() => { 
        setTurn(turn => (turn + 1) % 4); }}>
    <Card containerStyle={styles.item}>
      <View style={styles.item}>
        <Text style={styles.item}>Player {id}</Text>
        <Timer player_id={id} starting_increment={starting_increment} starting_bank={starting_bank} timer_running={is_playing} setTurn={setTurn} current_turn={current_turn}/>
      </View>
    </Card>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { width: '50%', height: '50%', margin: '0', padding: '0', backgroundColor: 'white'},
    item: {
        borderWidth: 0, // Remove Border

        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        
        elevation: 0, // Remove Shadow for Android
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
    }
  });
  

export default Player;
