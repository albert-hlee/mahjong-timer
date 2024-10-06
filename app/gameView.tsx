import { useState} from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import Game from '@/components/Game/game';
import { Link, useLocalSearchParams, router } from 'expo-router';

import PauseMenu from './pauseModal';
import { Button } from '@rneui/base';

export default function GameView() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pauseGameFlag, setPauseGameFlag] = useState(false);

  const user = useLocalSearchParams()

  const openModal = () => {
    console.log("open")
    setPauseGameFlag(true);
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    console.log("close")
    setIsModalVisible(false);
    setPauseGameFlag(false);
  };

  return (
    <View style={styles.container}>
      <Game starting_increment={user.starting_increment} starting_bank={user.starting_bank} pause_game_flag={pauseGameFlag}/>
      <TouchableOpacity onPress={() => openModal()} style={styles.pauseButton}>
        <Image
          source={require('./ryan.png')}
          style={{
            borderRadius: 100,
            height: '100%',
            width: '100%',
          }} />
      </TouchableOpacity>
      <PauseMenu isVisible={isModalVisible} onClose={onModalClose}> </PauseMenu>
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
