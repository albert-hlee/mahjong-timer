import { useState} from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import Game from '@/components/Game/game';
import { useLocalSearchParams } from 'expo-router';

import PauseMenu from '../components/PauseModal/pauseModal';

export default function GameView() {
  // Router SearchParamType must extend type SearchParams = Record<string, string | string[]>;. 
  // Therefore you can not type number type. useLocalSearchParams only supports string or string[]
  const user = useLocalSearchParams<{ starting_increment: string; starting_bank: string }>();
  // So we can convert right after
  const starting_increment = parseInt(user.starting_increment)
  const starting_bank = parseInt(user.starting_bank)
  // TODO(Rxu): maybe add a default value in case starting_increment and starting_bank arent parsable

  return (
    <View style={styles.gameContainer}>
      <Game starting_increment={starting_increment} starting_bank={starting_bank}/>
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
});
