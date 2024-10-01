import { useState } from 'react';
import Player from '../Player/player';
import { Button, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, useWindowDimensions } from 'react-native';
import { Link, Stack } from 'expo-router';

const Game = ({ starting_increment, starting_bank })  => {
    const [currentTurn, setTurn] = useState(null);
    const startingNumberOfPlayers = [0, 1, 3, 2];
    const playerToDirection = {
        0: 90,
        1: -90,
        2: -90,
        3: 90,
    };

    const playerToLocationX = {
        0: 0,
        1: 1,
        2: 1,
        3: 0,
    }

    const playerToLocationY = {
        0: 0,
        1: 0,
        2: 1,
        3: 1,
    }

    const endTurnCb = () => {
        setTurn(playerTurn => (playerTurn + 1) % 4);
    }

    const playerStyle = function(player) {
        const {height, width} = useWindowDimensions();
        const x = playerToLocationX[player]
        const y = playerToLocationY[player]
        return {
            top: -(width-height)/4 + y*height/2,
            left: (width-height)/4 + x*width/2,
            width: height/2,
            height: width/2,
            justifyContent: 'center',
            alignItems: 'center',
            // margin: '0', 
            // padding: '0', 
            backgroundColor: 'white', 
            borderColor: 'black', 
            borderWidth: 1.5,
            transform: [{rotate: `${playerToDirection[player]}deg`}],
            position: 'absolute',
        }
    }

    return (
        <View style={styles.parentContainer}>
            <StatusBar
            hidden={true}
            />

            {startingNumberOfPlayers.map(player => {
                return (
                    <TouchableOpacity disabled={!((currentTurn === null) || currentTurn === player)} style={playerStyle(player)} onPress={() => { 
                        if(currentTurn === null) {
                            setTurn(player);
                        } else{
                            setTurn(playerTurn => (playerTurn + 1) % 4);
                        }
                    }}>
                        <Player 
                            id={player} 
                            starting_increment={starting_increment} 
                            starting_bank={starting_bank} 
                            endTurnCb={endTurnCb}
                            my_turn={currentTurn === player}
                        />
                    </TouchableOpacity>

                );
            }
        )}

        </View>

 

    );
}

const styles = StyleSheet.create({
    // button: { 
    //     width: '50%', 
    //     height: '50%', 
    //     margin: '0', 
    //     padding: '0', 
    //     backgroundColor: 'white', 
    //     borderColor: 'black', 
    //     borderWidth: 1.5
    //   },
    parentContainer: {
        width: '100%', 
        height: '100%',
    },
    test: {
        top: 0,
        left: 0,
        height:'50%',
        position: 'absolute',
        backgroundColor: 'red', 
    }

  });

export default Game;
