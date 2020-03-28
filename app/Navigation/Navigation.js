import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreenStacks from "./HomeStacks";
import MyGroupsScreenStacks from "./MyGroupsStacks";
import SearchScreenStacks from "./SearchStacks";
import ProfileScreenStacks from "./ProfileStacks";

const NavigationStacks = createBottomTabNavigator(
  {
    //Stacks de navegacion
    Home: {
      screen: HomeScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-outline"
            size={25}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={25}
            color={tintColor}
          />
        )
      })
    },
    MyGroups: {
      screen: MyGroupsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "My groups",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="heart-outline"
            size={25}
            color={tintColor}
          />
        )
      })
    },
    Profile: {
      screen: ProfileScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={25}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    order: ["Home", "MyGroups", "Search", "Profile"],
    tabBarOptions: {
      inactiveTintColor: "#b4b4b4",
      activeTintColor: "#21CE99"
    }
  }
);

export default createAppContainer(NavigationStacks);
