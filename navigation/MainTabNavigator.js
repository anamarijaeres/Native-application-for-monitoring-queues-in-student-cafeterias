import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MenzaScreen from "../screens/MenzaScreen";
import DaniUTjednuScreen from "../screens/DaniUTjednuScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

HomeStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: MenzaScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Menza",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-restaurant" : "md-restaurant"}
    />
  )
};

LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: DaniUTjednuScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Gužva",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-hourglass" : "md-hourglass"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
