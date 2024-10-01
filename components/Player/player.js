import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';



const Player = ({ id, starting_increment, starting_bank, endTurnCb, my_turn, pause_game_flag })  => {

  const out_of_time_cb = () => {
    endTurnCb();
  };

    return (
    <Card containerStyle={styles.item}>
      <View style={styles.view}>
        <Text style={styles.item}>Player {id}</Text>
        <Timer player_id={id} 
               starting_increment={starting_increment} 
               starting_bank={starting_bank} 
               timer_running={my_turn} 
               out_of_time_cb={out_of_time_cb}
               is_paused={pause_game_flag}
        />
      </View>
    </Card>
    );
}

const styles = StyleSheet.create({
    item: {
      borderWidth: 0, // Remove Border

      shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    //   transform: [{ rotate: '90deg' }],
      
      elevation: 0, // Remove Shadow for Android
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
    },
    view: {
      backgroundColor: 'white',
      height: "100%",
      width: "100%",
    },
  });
  

export default Player;
