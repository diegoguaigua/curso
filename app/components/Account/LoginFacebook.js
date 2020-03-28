import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import { StyleSheet } from "react-native";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    await Facebook.initializeAsync("191355775624003");
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"]
    });

    if (type === "success") {
      setIsLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          navigation.navigate("Profile");
        })
        .catch(() => {
          toastRef.current.show("Error al acceder con Facebook");
        });
    } else if (type === "cancel") {
      toastRef.current.show("Inicio de sesión cancelado");
    } else {
      toastRef.current.show("Error desconocido");
    }
    setIsLoading(false);
  };

  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        style={styles.btnstyle}
        onPress={login}
      />
      <Loading isVisible={isLoading} text="Iniciando sesión" />
    </>
  );
}

const styles = StyleSheet.create({
  btnstyle: {
    backgroundColor: "black"
  }
});
