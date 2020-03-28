import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home";
import AddGroupsScreen from "../screens/AddGroups";

export const HomeScreenStacks = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Home"
    })
  },
  AddGroups: {
    screen: AddGroupsScreen,
    navigationOptions: () => ({
      title: "Nuevo Grupo"
    })
  }
});

export default HomeScreenStacks;
