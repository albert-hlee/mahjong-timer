import { Image, StyleSheet, Platform, ScrollView, View, StatusBar } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Game from '@/components/Game/game';
import { useLocalSearchParams } from 'expo-router';

export default function GameView() {
  const user = useLocalSearchParams()
  return (
        <Game starting_increment={user.starting_increment} starting_bank={user.starting_bank}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
