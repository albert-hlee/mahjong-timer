import { useState, useEffect } from 'react';
import Timer from '../Timer/timer';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';



const MainMenu = ({})  => {


    return (
    <Card containerStyle={styles.item}>
      <View style={styles.view}>
        <Text style={styles.item}>Player 1</Text>
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
  

export default MainMenu;