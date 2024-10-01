import { useState } from 'react';
import Player from '../Player/player';
import { Pressable, Text, View, StyleSheet, TouchableOpacity, StatusBar, useWindowDimensions } from 'react-native';

const Game = ({ starting_increment, starting_bank, pause_game_flag })  => {
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
        setTurn(playerTurn => (playerTurn - 1) % 4);
    }

    const chiDisabledCondition = (player) => {
        console.log("IS THIS BEING HIT", player)
        return player - currentTurn === 3 || player - currentTurn === -1;
    }

    const playerStyle = function(player) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
            flex: 1,
            flexDirection: 'row',
        }
    }

    return (
        <View style={styles.parentContainer}>
            <StatusBar
            hidden={true}
            />
            {startingNumberOfPlayers.map(player => {
                return (
                    <View style={styles.gameContainer}>
                        <View style={playerStyle(player)}>
                            <TouchableOpacity disabled={!((currentTurn === null) || currentTurn === player) && !pause_game_flag} style={styles.playerContainer} onPress={() => { 
                                if(currentTurn === null) {
                                    setTurn(player);
                                } else{
                                    setTurn(playerTurn => (playerTurn + 3) % 4);
                                }
                            }}>
                                <Player 
                                    id={player} 
                                    starting_increment={starting_increment} 
                                    starting_bank={starting_bank} 
                                    endTurnCb={endTurnCb}
                                    my_turn={currentTurn === player}
                                    pause_game_flag={pause_game_flag}
                                />
                            </TouchableOpacity>

                            <View style={styles.rightButtonContainer}>
                                <TouchableOpacity style={styles.smallButton} onPress={() => setTurn(player)}>
                                    <Text style={styles.smallButtonText}>Pon / Kan</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.smallButton} onPress={() => setTurn(player)}>
                                    <Text style={styles.smallButtonText}>Ron</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.smallButton} onPress={() => setTurn(player)}>
                                    <Text style={styles.smallButtonText}>Tsumo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.smallButton} onPress={() => setTurn(player)}>
                                    <Text style={styles.smallButtonText}>Chi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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

    gameContainer: {
        flexDirection: 'row', // Ensures left and right sections are side by side
        alignItems: 'center',
    },
    playerContainer: {
        //TODO: Figure out why the fuck the =player doesn't take up the whole container >:(
        width: '75%',
        height: '100%'
    },
    rightButtonContainer: {
        flexDirection: 'column', // Arranges buttons vertically
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%'
    },
    smallButton: {
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%', 
        width: '100%'
    },
    smallButtonText: {
        color: 'white'
    },
    parentContainer: {
        width: '100%', 
        height: '100%',
    },
    test: {
        top: 0,
        left: 0,
        height:'50%',
        position: 'absolute',
    }

  });

export default Game;
