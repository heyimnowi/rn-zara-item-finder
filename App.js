import React from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";

import StartScreen from './screens/StartScreen'

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Zara" />
      <StartScreen></StartScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: 'center',
  }
});
