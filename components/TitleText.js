import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = props => (
  <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: 'center'
  }
});

export default TitleText;
