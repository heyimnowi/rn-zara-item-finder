import React from "react";
import { TextInput, StyleSheet } from "react-native";

import Colors from '../constants/colors';

const Input = (props) => {
  return (
    <TextInput
      placeholder="https://www.zara.com/ar/es/chaqueta-p05755165.html"
      {...props}
      style={{ ...styles.input, ...props.style }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 20
  },
});

export default Input;
