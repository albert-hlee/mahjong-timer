import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function RunGame() {
    return (
      <View style={styles.container}>
        <Link style={styles.link} push href="/gameView">Default Game</Link>
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
    link: {
      fontSize: 18,             // Optional: set font size
      padding: 100,              // Optional: add padding around the links
    },
  };