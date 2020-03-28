import React from "react";
import Navigation from "./app/Navigation/Navigation";
import { firebaseApp } from "./app/utils/Firebase";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return <Navigation />;
}
