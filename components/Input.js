import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
  return <TextInput placeholder='05536127712'  {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
});

export default Input;
