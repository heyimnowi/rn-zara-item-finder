import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const ResultsScreen = (props) => {

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
      case 102:
        return "S";
      case 103:
        return "M";
      case 104:
        return "L";
      case 105:
        return "XL";
      default:
        return size;
    }
  };

  const renderItemSize = (itemData) => (
    <Text>
      <Text style={styles.sizeText}>Talle {getSize(itemData.item.size)}:</Text>
      <Text>{itemData.item.quantity} unidades</Text>
    </Text>
  );

  const ListEmptyComponent = () => {
    return (
      <View style={styles.errorMessage}>
        <Text>No hay disponibilidad en tienda</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.navigation.getParam("itemStock")}
        keyExtractor={(item) => String(item.physicalStoreId)}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderStore}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    color: "black",
    marginVertical: 10,
  },
  list: {
    flex: 1,
    alignItems: "center",
  },
  listItem: {
    fontSize: 18,
    marginVertical: 20,
    alignItems: "center",
  },
  sizeText: {
    fontWeight: "bold",
  },
  errorMessage: {
    alignItems: "center",
    marginVertical: 30,
  },
});

export default ResultsScreen;
