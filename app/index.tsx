import { View } from 'react-native';
import { Link } from 'expo-router';

export default function RunGame() {
    return (
      <View>
        <Link href="/gameView">Main Menu</Link>
        {/* ...other links */}
        <Link href="/mainMenu">View user</Link>
      </View>
    );
  }