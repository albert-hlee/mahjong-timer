import { Image, StyleSheet, Platform, ScrollView, View, StatusBar } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MainMenu from '@/components/MainMenu/mainMenu';

export default function GameView() {
  return (
        <MainMenu />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
