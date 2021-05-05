import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard
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
  const [itemUrl, setItemUrl] = useState("");
  const [prodId, setProdId] = useState("");

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
    const fetchData = async () => {
      const zaraApiEndpoint = getZaraEndpoint(prodId);
      const response = await fetch(zaraApiEndpoint);
      const data = await response.json();
      setEnteredValue("");
      setProdId("");
      props.navigation.navigate({ routeName: 'Results', params: {
        itemStock: data.stocks
      }});
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    justifyContent: 'center'
  },
  searchContainer: {
    alignItems: "center",
    padding: 15
  },
  title: {
    fontSize: 20,
    color: "black",
    marginVertical: 10,
  },
  searchButton: {
    width: 150,
    marginTop: 10
  },
  input: {
    textAlign: "center",
  }
});

export default StartScreen;
