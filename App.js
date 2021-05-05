import React from "react";
import { enableScreens } from 'react-native-screens';

import StockNavigator from './navigation/StockNavigator';

enableScreens();

export default function App() {
  return <StockNavigator />;
}
