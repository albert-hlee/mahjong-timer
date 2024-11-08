import { Link } from 'expo-router';
import { React, View, StyleSheet, Text, Pressable, Modal, PixelRatio } from 'react-native';
import PropTypes from 'prop-types'

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale; // TODO(rxu): replace with breakpoints

// TODO: specify the types to boolean and function
const PauseMenu = ({ isVisible, onClose, roundWind, roundNumber, onResetRound }) => {
  return (
    <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Pause screen</Text>
          <Text>{roundWind} {roundNumber}</Text>
          <Link style={styles.link} href="/">Home</Link>
          <Pressable onPress={onClose}>
              <Text style={styles.link}>Back</Text>
          </Pressable>
          <Pressable onPress={onResetRound}>
              <Text style={styles.link}>Reset Round</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: '50%',
    width: '50%',
    padding: '10%',
    paddingTop: '15%',
    paddingBottom: '15%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#e0d6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: getFontSize(20),
    paddingBottom: 30
  },
  link: {
    textAlign: 'center',
    fontSize: getFontSize(18),             // Optional: set font size
    padding: 10,              // Optional: add padding around the links
  },
});

PauseMenu.propTypes = {
  isVisible: PropTypes.bool, 
  onClose: PropTypes.func,
  roundWind: PropTypes.string,
  roundNumber: PropTypes.number,
  onResetRound: PropTypes.func,
}


export default PauseMenu;