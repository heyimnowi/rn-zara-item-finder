import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StartScreen from "../screens/StartScreen";
import ResultsScreen from "../screens/ResultsScreen";

const StockNavigator = createStackNavigator({
  Start: {
    screen: StartScreen,
    navigationOptions: {
      title: "Buscar producto"
    }
  },
  Results: {
    screen: ResultsScreen,
    navigationOptions: {
      title: "Resultados"
    }
  }
}, {
  initialRouteName: 'Start',
});

export default createAppContainer(StockNavigator);
