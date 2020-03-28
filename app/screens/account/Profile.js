import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { View, Text } from "react-native";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function Profile() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return login ? <UserLogged /> : <UserGuest />;
}
