import { createStackNavigator } from "react-navigation-stack";
import MyGroupsScreen from "../screens/MyGroups";

const MyGroupsScreenStacks = createStackNavigator({
  MyGroups: {
    screen: MyGroupsScreen,
    navigationOptions: () => ({
      title: "My Groups"
    })
  }
});

export default MyGroupsScreenStacks;
