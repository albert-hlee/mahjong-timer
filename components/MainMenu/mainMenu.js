import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';

import { Button, InputAccessoryView, Keyboard, Text, TextInput, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';


const MainMenu = ({})  => {
    const [startingNumberOfPlayers, setNumberOfPlayers] = useState(4);
    const [startingNumberOfRounds, setNumberOfRounds] = useState(4);
    const [startingPoints, setPoints] = useState(25000);
    const [baseTime, setBaseTime] = useState(5);
    const [incrementTime, setIncrementTime] = useState(20); // default values in mahjong soul kek

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <ScrollView>
      <Card containerStyle={styles.item}>
        <View style={styles.view}>
          <Text style={styles.item}>Player 1</Text>
        </View>
      </Card>

      <Link push href={{
        pathname: "/gameView",
        params:{
          starting_increment: startingIncrement,
          starting_bank: startingBank,
        },
      }}
      >
      Start Game
      </Link>
    </ScrollView>

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
  });
  

export default MainMenu;