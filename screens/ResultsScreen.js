import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from "react-native";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const ResultsScreen = (props) => {

  const getStoreName = (storeId) => {
    return storeId === 7004 ? "Av. Santa Fe 1937" : "Florida 651";
  };

  const renderStore = (itemData) => (
    <View style={styles.storeListItem}>
      <Text style={styles.storeTitle}>
        {getStoreName(itemData.item.physicalStoreId)}
      </Text>
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
    <View style={styles.sizeContainer}>
      <Text style={styles.sizeText}>{getSize(itemData.item.size)}</Text>
      <Text style={styles.quantityText}>{itemData.item.quantity} unid.</Text>
    </View>
  );

  const ListEmptyComponent = () => {
    return (
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>No hay disponibilidad en tienda</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TitleText style={styles.title}>Stock</TitleText>
        <Text style={styles.subtitle}>Solo se muestra el stock de los locales de Av. Santa Fe y Florida</Text>
      </View>
      <FlatList
        style={styles.storeListContainer}
        data={props.navigation.getParam("itemStock")}
        keyExtractor={(item) => String(item.physicalStoreId)}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderStore}
        contentContainerStyle={styles.storeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  header: {
    alignItems: "center"
  },
  title: {
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: Colors.lightGrey,
    maxWidth: 250,
    textAlign: "center"
  },
  storeListContainer: {
    flex: 1,
  },
  storeTitle: {
    fontSize: 22,
    color: "black",
    marginBottom: 20,
  },
  storeList: {
    width: '100%'
  },
  storeListItem: {
    fontSize: 18,
    marginVertical: 20,
    width: '100%',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    elevation: 8,
    padding: 20,
    borderRadius: 10
  },
  sizeContainer: {
    justifyContent: "space-between",
    backgroundColor: Colors.accent,
    height: 45,
    flexDirection: 'row',
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10
  },
  sizeText: {
    fontWeight: "bold",
    fontSize: 22
  },
  errorMessageContainer: {
    alignItems: "center",
    marginVertical: 70,
  },
  errorMessage: {
    fontWeight: 'bold',
    color: Colors.red,
    fontSize: 22
  },
  quantityText: {
    fontSize: 20
  }
});

export default ResultsScreen;
