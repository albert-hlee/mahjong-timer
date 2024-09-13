import { Link, router} from 'expo-router';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <View style={styles.container}>
        <Text>Pause screen</Text>
        {!isPresented && <Link href="../">Dismiss modal</Link>}
        <Link replace href="/">main menu</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});