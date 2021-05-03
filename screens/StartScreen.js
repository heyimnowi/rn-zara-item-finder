import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
  Platform,
  Text,
  Alert,
} from "react-native";
import TitleText from "../components/TitleText";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { STOCK } from "../data/dummy-data";

const StartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const getStoreName = (storeId) => {
    return storeId === 7004 ? 'SANTA FE 1937' : 'FLORIDA, 651';
  }

  const renderStore = (itemData) => (
    <View style={styles.listItem}>
      <TitleText style={styles.title}>
        {getStoreName(itemData.item.physicalStoreId)}
      </TitleText>
      <FlatList
        keyExtractor={(item) => item.sizeId}
        data={itemData.item.sizeStocks}
        renderItem={renderItemSize.bind(this)}
        contentContainerStyle={styles.list}
      ></FlatList>
    </View>
  );

  const renderItemSize = (itemData) => (
    <Text>
      Size {itemData.item.size}: {itemData.item.quantity}
    </Text>
  );

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text>No items to show</Text>
      </View>
    );
  };

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const inputHandler = () => {
    const prodId = parseInt(enteredValue);
    if (isNaN(prodId) || prodId <= 0) {
      Alert.alert("Invalid number!", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setEnteredValue("");
    Keyboard.dismiss();
  };

  const resetInputHandler = () => {
    setEnteredValue("");
  };

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
          keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <View style={styles.button}>
          <MainButton onPress={inputHandler}>Find Store</MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={STOCK}
            keyExtractor={(item) => String(item.physicalStoreId)}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={renderStore}
            contentContainerStyle={styles.list}
          />
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
    marginVertical: 10
  },
  button: {
    width: 150,
    marginTop: 10,
  },
  input: {
    width: 200,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: 30,
    width: 300
  },
  listItem: {
    fontSize: 18,
  },
});

export default StartScreen;
