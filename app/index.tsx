import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function RunGame() {
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <StatusBar
            hidden={true}
          />
          <Text style={styles.title}>Mahjong Go! (name subject to change :D)</Text>
          <Link style={styles.link} push href="/mainMenu">Main Menu</Link>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    parent: {
      height: '100%',
      width: '100%',
      padding: '10%',
      backgroundColor: '#fff',  // Optional: set background color
    },
    container: {
      flex: 1,                // Takes up full screen
      justifyContent: 'center', // Centers items vertically
      alignItems: 'center',     // Centers items horizontally
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    link: {
      fontSize: 18,             // Optional: set font size
      padding: 100,              // Optional: add padding around the links
    },
  });