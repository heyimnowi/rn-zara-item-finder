import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Text
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

    console.log("Fetch prod ID");

    const fetchData = async () => {
      //const prodIdEndpoint = `http://localhost:8081/?url=${itemUrl}`;
      const prodIdEndpoint = `https://rn-zara-backend.herokuapp.com/?url=${itemUrl}`;

      console.log(prodIdEndpoint);

      const response = await fetch(prodIdEndpoint);
      const data = await response.json();

      console.log(data.prodId);

      setProdId(data.prodId);
    };

    fetchData();
  }, [itemUrl]);

  useEffect(() => {
    if (!prodId) return;

    console.log("Fetch stock ID");

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
          <TitleText style={styles.title}>Encontrá tu prenda</TitleText>
            <View style={styles.inputContainer}>
              <Text style={styles.inputName}>Link del producto</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
            </View>
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
    backgroundColor: Colors.white,
    paddingTop: 90,
    paddingHorizontal: 0
  },
  searchContainer: {
    padding: 30,
    width: '100%',
    alignItems: 'center'
  },
  title: {
    marginBottom: 100
  },
  inputContainer: {
    alignContent: "flex-start",
    width: '100%',
  },
  inputName: {
    marginBottom: 10,
    color: Colors.lightGrey,
    fontSize: 16,
    fontWeight: "bold"
  },
  input: {
    textAlign: "center",
    marginBottom: 40
  },
  searchButton: {
    marginTop: 10
  }
});

export default StartScreen;
