import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function RunGame() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mahjong Go! (name subject to change :D)</Text>
        {/* TODO: Delete link but also consider how this is used for pause reset */}
        {/* <Link style={styles.link} push href="/gameView">Default Game</Link> */}
        <Link style={styles.link} push href="/mainMenu">Main Menu</Link>
      </View>
    );
  }


  const styles = {
    container: {
      flex: 1,                // Takes up full screen
      justifyContent: 'center', // Centers items vertically
      alignItems: 'center',     // Centers items horizontally
      backgroundColor: '#fff',  // Optional: set background color
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    link: {
      fontSize: 18,             // Optional: set font size
      padding: 100,              // Optional: add padding around the links
    },
  };