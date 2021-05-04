import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
  Platform,
  Text,
  Dimensions
} from "react-native";
import TitleText from "../components/TitleText";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

const getZaraEndpoint = (productId) => {
  return `https://itxrest.inditex.com/LOMOServiciosRESTCommerce-ws/common/1/stock/campaign/I2021/product/part-number/${productId}?physicalStoreId=7004,7008&ajax=true`;
};

const StartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [itemStock, setItemStock] = useState([]);
  const [zaraApiEndpoint, setZaraApiEndpoint] = useState("");
  const [status, setStatus] = useState(true);

  const getStoreName = (storeId) => {
    return storeId === 7004 ? "Santa Fe 1937" : "Florida 651";
  };

  const renderStore = (itemData) => (
    <View style={styles.listItem}>
      <TitleText style={styles.title}>
        Local : {getStoreName(itemData.item.physicalStoreId)}
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
      <Text style={styles.sizeText}>Talle {itemData.item.size}:</Text>
      <Text>{itemData.item.quantity} unidades</Text>
    </Text>
  );

  const zeroPad = (num) => String(num).padStart(11, "0");

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text>Wrong product ID or no data to show</Text>
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
    setZaraApiEndpoint(getZaraEndpoint(prodId));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (!zaraApiEndpoint) return;

    const fetchData = async () => {
      const response = await fetch(zaraApiEndpoint);
      const data = await response.json();
      setItemStock(data.stocks);
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
        <View style={styles.searchContainer}>
          <TitleText style={styles.title}>ID de producto</TitleText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.searchButton}>
            <MainButton onPress={inputHandler}>
              Buscar
            </MainButton>
          </View>
        </View>
        <View style={styles.listContainer}>
          {status && (
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
    alignItems: "center",
  },
  searchContainer: {
    backgroundColor: Colors.tertiary,
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
    position: 'relative'
  },
  title: {
    fontSize: 20,
    color: "black",
    marginVertical: 10,
  },
  searchButton: {
    width: 150,
    marginTop: 10,
    position: "absolute",
    left: Dimensions.get('window').width / 2 - 75,
    bottom: -15,
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
    marginVertical: 20
  },
  sizeText: {
    fontWeight: "bold",
  }
});

export default StartScreen;
