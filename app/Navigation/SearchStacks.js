import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";

export const SearchScreenStacks = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Search"
    })
  }
});

export default SearchScreenStacks;
