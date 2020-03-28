import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeProfileForm(props) {
  //PROPS PARA CAMBIAR DATOS USUARIO
  const {
    displayName,
    email,
    setIsVisibleModal,
    setReloadData,
    toastRef
  } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateProfileData = () => {
    setError(null);
    if (!newDisplayName) {
      setError("Nombre del usuario no ha cambiado");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Actualizado");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Perfil de usuario</Text>
      <Input //NOMBRE Y APELLIDO
        placeholder="Nombre y Apellido"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-edit",
          color: "#c2c2c2"
        }}
        errorMessage={error}
      />
      <Input //EMAIL SIN CAMBIOS
        placeholder="Email"
        containerStyle={styles.input}
        defaultValue={email && email}
        onChange={null}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2"
        }}
      />

      <Button
        title="Guardar cambios"
        containerStyle={styles.btnContainer}
        titleStyle={styles.btnTextStyle}
        buttonStyle={styles.btn}
        onPress={updateProfileData}
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
