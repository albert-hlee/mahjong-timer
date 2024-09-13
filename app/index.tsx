import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function RunGame() {
    return (
      <View>
        <Text>Something</Text>
        <Link push href="/gameView">Default Game</Link>
        <Link push href="/mainMenu">Main Menu</Link>
      </View>
    );
  }