import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Platform
} from "react-native";
import TitleText from "../components/TitleText";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

const StartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Product ID:</TitleText>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
          onChangeText={() => {}}
          value={enteredValue}
        />
        <View style={styles.button}>
          <MainButton onPress={() => {}}>Find Store</MainButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    paddingTop: 110,
  },
  title: {
    fontSize: 20,
    color: "black",
  },
  button: {
    width: 150,
    marginTop: 10
  },
  input: {
    width: 200,
    textAlign: "center",
  }
});

export default StartScreen;
