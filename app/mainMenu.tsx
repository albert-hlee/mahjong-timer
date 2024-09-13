import { Image, StyleSheet, Platform, ScrollView, View, StatusBar } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MainMenu from '@/components/MainMenu/mainMenu';

import { Link } from 'expo-router';


export default function MainMenuView() {
  return (
      <ScrollView>
        {/* TODO: link mainmenu inputs to push to gameView */}
        <MainMenu/> 
        <Link push href={{
            pathname: "/gameView",
            params:{
              starting_increment: 5,
              starting_bank: 20
            },
          }}
        >
        Start Game
        </Link>
      </ScrollView>
  );
}
