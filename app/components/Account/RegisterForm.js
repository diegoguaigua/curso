import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import Loading from "../Loading";
import { withNavigation } from "react-navigation";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [isVisibleLoading, setVisibleLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true); // escribir contraseña estado
  const [hidePasswordR, setHidePasswordR] = useState(true); //repetir contraseña estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const register = async () => {
    setVisibleLoading(true);

    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("No son iguales");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("Profile");
            })
            .catch(() => {
              toastRef.current.show("Error al crear la cuenta");
            });
        }
      }
    }

    setVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRigth}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        password={true}
        secureTextEntry={hidePasswordR}
        containerStyle={styles.inputForm}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePasswordR ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => setHidePasswordR(!hidePasswordR)}
          />
        }
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="Creando una cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRigth: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%"
  },
  btnRegister: {
    backgroundColor: "#21CE99"
  }
});
