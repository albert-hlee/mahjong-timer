import { useState, useEffect } from 'react';
import Player from '../Player/player';
import { Button, Text, View } from 'react-native';

const Game = ({ starting_increment, starting_bank, timer_running })  => {
    const startingNumberOfPlayers = [0, 1, 2, 3];
    const [currentTurn, setTurn] = useState(0);
    // useEffect
        // on click/touch of currentPlayer component, update state of current Turn to next player in array 
        // 
    useEffect(() => {
        console.log("does this do anything")
    }, [currentTurn])
    
    const nextPlayer = () => {
        setTurn(currentTurn => (currentTurn + 1) % 4)
    };
    return (
        <View>
            {startingNumberOfPlayers.map(player => {
        if (player === currentTurn) {
            return (
                <Player 
                    id={player} 
                    starting_increment={starting_increment} 
                    starting_bank={starting_bank} 
                    is_playing={true} 
                    setTurn={setTurn}
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
                />
            );
        }
    })}
        <Button title="Next Player" onPress={() => {nextPlayer()}}/>
      </View>
    );
}

export default Game;
