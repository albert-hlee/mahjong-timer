import { useState} from 'react';
import { Image, StyleSheet, View} from 'react-native';

import Game from '@/components/Game/game';
import { Link, useLocalSearchParams } from 'expo-router';

import PauseMenu from './pauseModal';
import { Button } from '@rneui/base';

export default function GameView() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useLocalSearchParams()

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Game starting_increment={user.starting_increment} starting_bank={user.starting_bank}/>

      <View style={styles.pauseButton}>
        <Button onPress={() => showModal()}>P</Button>
      </View>
      <PauseMenu isVisible={isModalVisible} onClose={onModalClose}> </PauseMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // to center the pauseButton
    alignItems: 'center',
  },
  pauseButton: {
    position: 'absolute',
    backgroundColor: 'pink',
    alignSelf: 'center',
    borderRadius: 42,
    width: 50,
    height: 50,
    alignItems: 'center',
  },
});
