import { Image, StyleSheet, Platform, ScrollView, View, StatusBar } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Game from '@/components/Game/game';

export default function GameView() {
  return (
        <Game starting_increment={5} starting_bank={20}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
