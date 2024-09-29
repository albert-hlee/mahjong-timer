import { useState } from 'react';
import Player from '../Player/player';
import { Button, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Link, Stack } from 'expo-router';

const Game = ({ starting_increment, starting_bank })  => {
    const [currentTurn, setTurn] = useState(null);
    const startingNumberOfPlayers = [0, 1, 2, 3];

    const endTurnCb = () => {
        setTurn(playerTurn => (playerTurn + 1) % 4);
    }

    return (
        <ScrollView contentContainerStyle={styles.parentContainer}>
            <StatusBar
            hidden={true}
            />

            <View style={styles.container}>
                {startingNumberOfPlayers.map(player => {
                    return (
                        <TouchableOpacity disabled={!((currentTurn === null) || currentTurn === player)} style={styles.button} onPress={() => { 
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

        </ScrollView>

    );
}


const styles = StyleSheet.create({
    button: { 
        width: '50%', 
        height: '50%', 
        margin: '0', 
        padding: '0', 
        backgroundColor: 'white', 
        borderColor: 'black', 
        borderWidth: 1.5
      },
    container: {
      display: 'flex', 
      flexDirection: 'row',
      flexWrap: 'wrap', 
      flex: 1
    },
    parentContainer: {
        width: '100%', 
        height: '100%', 
    }

  });

export default Game;
