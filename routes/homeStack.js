import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "../screens/main";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Date App",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
