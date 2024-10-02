import { Link } from 'expo-router';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';

// TODO: specify the types to boolean and function
export default function PauseMenu( {isVisible, onClose, onReset} : any ) {
//   const isPresented = router.canGoBack();
  return (
    <Modal
        animationType='slide' 
        transparent={false}
        visible={isVisible}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Pause screen</Text>
        <Link style={styles.link} replace href="/">Home Page</Link>
        <Pressable onPress={onReset}>
            <Text style={styles.link}>Reset</Text>
        </Pressable>        
        <Pressable onPress={onClose}>
            <Text style={styles.link}>Back</Text>
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
    fontSize: 30,
    paddingBottom: 50
  },
  link: {
    fontSize: 18,             // Optional: set font size
    padding: 30,              // Optional: add padding around the links
  },
});