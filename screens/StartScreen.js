import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
  Text,
  Dimensions,
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
  const [itemUrl, setItemUrl] = useState("");
  const [prodId, setProdId] = useState("");

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

  const getSize = (size) => {
    switch (size) {
      case 101:
        return "XS";
        break;
      case 102:
        return "S";
        break;
      case 103:
        return "M";
        break;
      case 104:
        return "L";
        break;
      case 105:
        return "XL";
        break;
      default:
        return size;
        break;
    }
  };

  const renderItemSize = (itemData) => (
    <Text>
      <Text style={styles.sizeText}>Talle {getSize(itemData.item.size)}:</Text>
      <Text>{itemData.item.quantity} unidades</Text>
    </Text>
  );

  const zeroPad = (num) => String(num).padStart(11, "0");

  const ListEmptyComponent = () => {
    return (
      <View style={styles.errorMessage}>
        <Text>No hay disponibilidad en tienda</Text>
      </View>
    );
  };

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText);
  };

  const inputHandler = () => {
    setItemUrl(enteredValue);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (!itemUrl) return;

    const fetchData = async () => {
      const response = await fetch(
        `https://rn-zara-backend.herokuapp.com/?url=${itemUrl}`
      );
      const data = await response.json();
      setProdId(data.prodId);
    };

    fetchData();
  }, [itemUrl]);

  useEffect(() => {
    if (!prodId) return;

    console.log("prodId " + prodId);

    const fetchData = async () => {
      const zaraApiEndpoint = getZaraEndpoint(prodId);
      const response = await fetch(zaraApiEndpoint);
      const data = await response.json();
      setItemStock(data.stocks);
      setEnteredValue("");
      setProdId("");
      Keyboard.dismiss();
    };

    fetchData();
  }, [prodId]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.searchContainer}>
          <TitleText style={styles.title}>Ingresa el link del producto:</TitleText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.searchButton}>
            <MainButton onPress={inputHandler}>Buscar</MainButton>
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={itemStock}
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
    alignItems: "center",
  },
  searchContainer: {
    backgroundColor: Colors.tertiary,
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
    position: "relative",
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
    left: Dimensions.get("window").width / 2 - 75,
    bottom: -15,
  },
  input: {
    minWidth: 250,
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
    marginVertical: 20,
  },
  sizeText: {
    fontWeight: "bold",
  },
  errorMessage: {
    alignItems: 'center',
    marginVertical: 30
  }
});

export default StartScreen;
