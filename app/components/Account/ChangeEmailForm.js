import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";

export default function ChangeEmailForm(props) {
  const { email, setIsVisibleModal, setReloadData, toastRef } = props;
  const [error, setError] = useState({});
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = () => {
    setError({});

    if (!newEmail || email === newEmail) {
      setError({ email: "El email no puede ser igual o vacío" });
    } else {
      setIsLoading(true);

      reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show("Email actualizado");
              setIsVisibleModal(false);
            })
            .catch(() => {
              setError({ email: "Error al actualizar el email" });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setError({ password: "La contraseña no es correcta" });
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Cambiar email</Text>

      <Input //EMAIL
        placeholder="Email"
        containerStyle={styles.input}
        defaultValue={email && email}
        onChange={e => setNewEmail(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2"
        }}
        errorMessage={error.email}
      />
      <Input //PASSWORD
        placeholder="Password"
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
      <Button
        title="Guardar cambios"
        containerStyle={styles.btnContainer}
        titleStyle={styles.btnTextStyle}
        buttonStyle={styles.btn}
        onPress={updateEmail}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20
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
