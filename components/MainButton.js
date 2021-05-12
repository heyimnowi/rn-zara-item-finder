import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: 5,
    height: 54,
    width: 290,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 24
  }
});

export default MainButton;
