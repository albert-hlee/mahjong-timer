import { useState} from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import Game from '@/components/Game/game';
import { Link, useLocalSearchParams } from 'expo-router';

import PauseMenu from './pauseModal';
import { Button } from '@rneui/base';

export default function GameView() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pauseGameFlag, setPauseGameFlag] = useState(false);
  //TODO: make this logic better
  const [isNewGame, setNewGame] = useState(false);

  const user = useLocalSearchParams()

  const openModal = () => {
    setPauseGameFlag(true);
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
    setPauseGameFlag(false);
  };

  const onReset = () => {
    console.log("this is being hit for reset")
    setIsModalVisible(false);
    setPauseGameFlag(false);
    setNewGame(true);
  }

  return (
    <View style={styles.container}>
      <Game resetGame={isNewGame} startNewGame={setNewGame} starting_increment={user.starting_increment} starting_bank={user.starting_bank} pause_game_flag={pauseGameFlag}/>
      <TouchableOpacity onPress={() => openModal()} style={styles.pauseButton}>
        <Image
          source={require('./ryan.png')}
          style={{
            borderRadius: 100,
            height: '100%',
            width: '100%',
          }} />
      </TouchableOpacity>
      <PauseMenu isVisible={isModalVisible} onClose={onModalClose} onReset={onReset}> </PauseMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // to center the pauseButton
    alignItems: 'center',
    position: 'relative',
    height:'100%',
    width:'100%'
  },
  pauseButton: {
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 100,
    alignItems: 'center',
    aspectRatio: 1/1,
    width: '15%',
  },
});
