import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';

import { Button, Keyboard, Text, TextInput, TouchableWithoutFeedback,TouchableOpacity,  View, ScrollView, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { Link, useRouter } from 'expo-router';

const MainMenu = ({})  => {
    const [startingNumberOfPlayers, setNumberOfPlayers] = useState(4);
    const [startingNumberOfRounds, setNumberOfRounds] = useState(4);
    const [startingPoints, setPoints] = useState(25000);
    const [baseTime, setBaseTime] = useState(20);
    const [incrementTime, setIncrementTime] = useState(5); // default values in mahjong soul kek

    const router = useRouter();

    const handlePress = () => {
      router.push({
        pathname: "/gameView",
        params: {
          starting_increment: incrementTime,
          starting_bank: baseTime,
        },
      });
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Card containerStyle={styles.item}>
          <View style={styles.view}>
            <Text style={styles.title}>Game Settings</Text>
            <Text style={styles.item}>Starting Number of Players</Text>
            <TextInput
            style={styles.input}
            onChangeText={setNumberOfPlayers}
            inputMode="numeric"
            keyboardType='numeric'
            >{startingNumberOfPlayers}</TextInput>
            <Text style={styles.item}>Rounds</Text>
            <TextInput
            style={styles.input}
            onChangeText={setNumberOfRounds}
            inputMode="numeric"
            keyboardType='numeric'
            type="number">{startingNumberOfRounds}</TextInput>
            <Text style={styles.item}>Starting Points</Text>
            <TextInput
            style={styles.input}
            onChangeText={setPoints}
            inputMode="numeric"
            keyboardType='numeric'
            type="number">{startingPoints}</TextInput>
            <Text style={styles.item}>Base Time</Text>
            <TextInput
            style={styles.input}
            onChangeText={setBaseTime}
            inputMode="numeric"
            keyboardType='numeric'
            type="number">{baseTime}</TextInput>
            <Text style={styles.item}>Increment Time</Text>
            <TextInput
            style={styles.input}
            onChangeText={setIncrementTime}
            inputMode="numeric"
            keyboardType='numeric'
            type="number">{incrementTime}</TextInput>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text>Start Game</Text>
            </TouchableOpacity>

            {/* <Link push href={{
                pathname: "/gameView",
                params:{
                  starting_increment: incrementTime,
                  starting_bank: baseTime,
                },
              }}
            >
              Start Game
            </Link> */}

          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({

    item: {
      borderWidth: 0, // Remove Border

      shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      
      elevation: 0, // Remove Shadow for Android
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
    },
    view: {
      backgroundColor: 'white',
      height: "100%",
      width: "100%",
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    title: {
      textAlign: 'center',
      fontStyle: 'bold',
      fontSize: '30'
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  

export default MainMenu;