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

const getZaraEndpoint = (productId) => {
  return `https://itxrest.inditex.com/LOMOServiciosRESTCommerce-ws/common/1/stock/campaign/I2021/product/part-number/${productId}?physicalStoreId=7004,7008&ajax=true`;
};

const StartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [itemStock, setItemStock] = useState([]);
  const [zaraApiEndpoint, setZaraApiEndpoint] = useState("");
  const [status, setStatus] = useState("");

  const getStoreName = (storeId) => {
    return storeId === 7004 ? "SANTA FE 1937" : "FLORIDA, 651";
  };

  const renderStore = (itemData) => (
    <View style={styles.listItem}>
      <TitleText style={styles.title}>
        {getStoreName(itemData.item.physicalStoreId)}
      </TitleText>
      <FlatList
        keyExtractor={(item) => item.sizeId.toString()}
        data={itemData.item.sizeStocks}
        renderItem={renderItemSize.bind(this)}
        contentContainerStyle={styles.list}
      ></FlatList>
    </View>
  );

  const renderItemSize = (itemData) => (
    <Text>
      Size {itemData.item.size}: {itemData.item.quantity} units
    </Text>
  );

  const zeroPad = (num) =>String(num).padStart(11, '0')

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

  // 01014417505 remera perkins
  // 13007610032 botas

  const inputHandler = () => {
    const prodId = zeroPad(parseInt(enteredValue));
    console.log(prodId);
    setZaraApiEndpoint(getZaraEndpoint(prodId));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (!zaraApiEndpoint) return;

    const fetchData = async () => {
      setStatus("fetching");
      console.log(zaraApiEndpoint);
      const response = await fetch(zaraApiEndpoint);
      const data = await response.json();
      setItemStock(data.stocks);
      console.log(data);
      setStatus("fetched");
    };

    fetchData();
  }, [zaraApiEndpoint]);

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
          <MainButton onPress={inputHandler}>Find Availability</MainButton>
        </View>
        <View style={styles.listContainer}>
          {itemStock && itemStock.length != 0 && (
            <FlatList
              data={itemStock}
              keyExtractor={(item) => String(item.physicalStoreId)}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={renderStore}
              contentContainerStyle={styles.list}
            />
          )}
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
    marginVertical: 10,
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
    width: 300,
  },
  listItem: {
    fontSize: 18,
  },
});

export default StartScreen;
