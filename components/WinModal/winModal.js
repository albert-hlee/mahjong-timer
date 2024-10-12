import { React, View, StyleSheet, Text, Pressable, Modal, PixelRatio } from 'react-native';
import PropTypes from 'prop-types'

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale; // TODO(rxu): replace with breakpoints

// TODO: specify the types to boolean and function
const WinModal = ({ isVisible, onClose, roundWind, roundNumber, winners }) => {
  return (
    <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Player {winners} wins! </Text>
          <Text>{roundWind} {roundNumber}</Text>
          <Pressable onPress={onClose}>
              <Text style={styles.link}>Back</Text>
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
    height: '75%',
    width: '75%',
    padding: '10%',
    paddingTop: '15%',
    paddingBottom: '15%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: getFontSize(30),
    paddingBottom: 30
  },
});

WinModal.propTypes = {
  isVisible: PropTypes.bool, 
  onClose: PropTypes.func,
  roundWind: PropTypes.string,
  roundNumber: PropTypes.number,
  winners: PropTypes.arrayOf(PropTypes.number),
}

export default WinModal;