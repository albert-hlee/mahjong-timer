import { Link, router} from 'expo-router';
import { StyleSheet, Text, View, StatusBar, Modal } from 'react-native';

export default function ModalView() {
  const isPresented = router.canGoBack();

  return (
    <View style={styles.container}>
        <Modal
            animationType='slide' 
            transparent={true}
        >
            <Text>Pause screen</Text>
            <Link replace href="/">main menu</Link>
            <Link href="../">Back</Link>
        </Modal>
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