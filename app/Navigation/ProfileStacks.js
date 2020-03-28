import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/account/Profile";
import LoginScreen from "../screens/account/Login";
import RegisterScreen from "../screens/account/Register";

const ProfileScreenStacks = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: "Profile"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Register"
    })
  }
});

export default ProfileScreenStacks;
