import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Icon } from '@rneui/themed';



const Player = ({ id, starting_increment, starting_bank, endTurnCb, my_turn })  => {
  console.log("PlayerID: " + id + " my_turn: " + my_turn)

  const out_of_time_cb = () => {
    endTurnCb();
  };

    return (
    <TouchableOpacity disabled={!my_turn} style={styles.container} onPress={() => { 
      console.log("clicked player: " + id)
      endTurnCb(); }}>
    <Card containerStyle={styles.item}>
      <View style={styles.item}>
        <Text style={styles.item}>Player {id}</Text>
        <Timer player_id={id} starting_increment={starting_increment} starting_bank={starting_bank} timer_running={my_turn} out_of_time_cb={out_of_time_cb}/>
      </View>
    </Card>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { 
      width: '50%', 
      height: '50%', 
      margin: '0', 
      padding: '0', 
      backgroundColor: 'white', 
      borderColor: 'black', 
      borderWidth: 1.5
    },
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
