import { Image, StyleSheet, Platform, ScrollView, View, StatusBar } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MainMenu from '@/components/MainMenu/mainMenu';

import { Link } from 'expo-router';


export default function MainMenuView() {
  return (
    <MainMenu/> 
  );
}
