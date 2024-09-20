import { Link, router} from 'expo-router';
import { StyleSheet, Text, Pressable, Modal } from 'react-native';

// TODO: specify the types to boolean and function
export default function PauseMenu( {isVisible, onClose} : any ) {
  const isPresented = router.canGoBack();

  return (
    <Modal
        animationType='slide' 
        transparent={true}
        visible={isVisible}
    >
        <Text>Pause screen</Text>
        <Link replace href="/">main menu</Link>
        <Pressable onPress={onClose}>
            Back
        </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});