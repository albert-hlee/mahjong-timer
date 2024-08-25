import { useState, useEffect } from 'react';
import Player from '../Player/player';
import { Button, Text, View, StyleSheet } from 'react-native';

const Game = ({ starting_increment, starting_bank })  => {
    const startingNumberOfPlayers = [0, 1, 2, 3];
    const [currentTurn, setTurn] = useState(0);

    return (
        <View style={styles.container}>
            {startingNumberOfPlayers.map(player => {
        if (player === currentTurn) {
            return (
                <Player 
                    id={player} 
                    starting_increment={starting_increment} 
                    starting_bank={starting_bank} 
                    is_playing={true} 
                    setTurn={setTurn}
                    current_turn={currentTurn === player}
                />
            );
        } else {
            return (
                <Player 
                    id={player} 
                    starting_increment={starting_increment} 
                    starting_bank={starting_bank} 
                    is_playing={false} 
                    setTurn={setTurn}
                    current_turn={currentTurn === player}
                />
            );
        }
    })}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex', 
      flexDirection: 'row',
      flexWrap: 'wrap', 
      flex: 1
    }
  });
  

export default Game;
