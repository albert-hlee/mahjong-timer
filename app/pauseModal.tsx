import { Link, router} from 'expo-router';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';

// TODO: specify the types to boolean and function
export default function PauseMenu( {isVisible, onClose} : any ) {
  const isPresented = router.canGoBack();

  return (
    <Modal
        animationType='slide' 
        transparent={false}
        visible={isVisible}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Pause screen</Text>
        <Link replace href="/">Home Page</Link>
        <Pressable onPress={onClose}>
            <Text>Back</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 30
  },
});