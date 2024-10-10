import { useState} from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import Game from '@/components/Game/game';
import { Link, useLocalSearchParams, router } from 'expo-router';

import PauseMenu from './pauseModal';

export default function GameView() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pauseGameFlag, setPauseGameFlag] = useState(false);

  // Router SearchParamType must extend type SearchParams = Record<string, string | string[]>;. 
  // Therefore you can not type number type. useLocalSearchParams only supports string or string[]
  const user = useLocalSearchParams<{ starting_increment: string; starting_bank: string }>();
  // So we can convert right after
  const starting_increment = parseInt(user.starting_increment)
  const starting_bank = parseInt(user.starting_bank)
  // TODO(Rxu): maybe add a default value in case starting_increment and starting_bank arent parsable

  const openModal = () => {
    setPauseGameFlag(true);
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
    setPauseGameFlag(false);
  };

  return (
    <View style={styles.gameContainer}>
      <Game starting_increment={starting_increment} starting_bank={starting_bank} pause_game_flag={pauseGameFlag}/>
      <TouchableOpacity onPress={() => openModal()} style={styles.pauseButton}>
        <Image
          source={require('../assets/images/winds/East.png')} // TODO: change wind based on round
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
  gameContainer: {
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
