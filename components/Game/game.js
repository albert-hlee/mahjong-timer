import { useState, useEffect } from 'react';
import Player from '../Player/player';
import { Button, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Link } from 'expo-router';

const Game = ({ starting_increment, starting_bank })  => {
    const startingNumberOfPlayers = [0, 1, 2, 3];
    const [currentTurn, setTurn] = useState(null);

    const endTurnCb = () => {
        setTurn(playerTurn => (playerTurn + 1) % 4);
    }

    return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <View style={styles.pauseButton}>
            <Link href="/pauseModal"> Press me </Link>
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
        justifyContent: 'center', // to center the pauseButton

        display: 'flex', 
        flexDirection: 'row',
        flexWrap: 'wrap', 
        flex: 1
    },
    pauseButton: {
        position: 'absolute',
        backgroundColor: 'pink',
        maxwidth: 'fit-content',
        alignSelf: 'center',
    }
  });
  

export default Game;
