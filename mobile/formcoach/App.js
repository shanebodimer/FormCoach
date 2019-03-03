import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

// Views
import ViewHome from "./components/ViewHome";
import ViewCapture from "./components/ViewCapture";
import ViewHistory from "./components/ViewHistory";
import ViewSingleHistory from "./components/ViewSingleHistory";

// App views
const MainNavigator = createStackNavigator({
  Home: {
    screen: ViewHome,
    navigationOptions: {
      header: null
    }
  },
  Capture: {
    screen: ViewCapture,
    navigationOptions: {
      header: null
    }
  },
  History: {
    screen: ViewHistory,
    navigationOptions: {
      header: null
    }
  },
  Single: {
    screen: ViewSingleHistory,
    navigationOptions: {
      header: null
    }
  }
});

const App = createAppContainer(MainNavigator);

export default App;
