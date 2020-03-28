import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";

export default function ChangePasswordForm(props) {
  const { setIsVisibleModal, toastRef } = props;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);

  const updatePassword = () => {
    setError({});

    if (!password || !newPassword || !newPasswordRepeat) {
      let objError = {};
      !password && (objError.password = "Campo vacío");
      !newPassword && (objError.newPassword = "Campo vacío");
      !newPasswordRepeat && (objError.newPasswordRepeat = "Campo vacío");
      setError(objError);
    } else {
      if (newPassword !== newPasswordRepeat) {
        setError({
          newPassword: "No son iguales",
          newPasswordRepeat: "No son iguales"
        });
      } else {
        setIsLoading(true);
        reauthenticate(password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updatePassword(newPassword)
              .then(() => {
                setIsLoading(false);
                toastRef.current.show("Contraseña actualizada");
                setIsVisibleModal(false);
                // firebase.auth().signOut(); PARA SALIR DE CESION AL ACTUALIZAR
              })
              .catch(() => {
                setError({ general: "Error desconocido" });
                setIsLoading(false);
              });
          })
          .catch(() => {
            setError({ password: "Contraseña actual incorrecta" });
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Cambiar Contraseña</Text>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={error.password}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hideNewPassword}
        onChange={e => setNewPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPassword(!hideNewPassword)
        }}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder="Repetir nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hideNewPasswordRepeat}
        onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
        }}
        errorMessage={error.newPasswordRepeat}
      />
      <Button
        title="Guardar cambios"
        containerStyle={styles.btnContainer}
        titleStyle={styles.btnTextStyle}
        buttonStyle={styles.btn}
        onPress={updatePassword}
        loading={isLoading}
      />
      <Text>{error.general}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20
  },
  text: {
    alignSelf: "baseline",
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "black"
  },
  btnTextStyle: {
    color: "#21CE99"
  }
});
