import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeProfileForm from "./ChangeProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const menuOptions = [
    {
      title: "Datos del usuario",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "black",
      iconNameRight: "chevron-right",
      iconColorRight: "black",
      onPress: () => selectedComponent("profile")
    },
    {
      title: "Métodos de pago",
      iconType: "material-community",
      iconNameLeft: "wallet",
      iconColorLeft: "black",
      iconNameRight: "chevron-right",
      iconColorRight: "black",
      onPress: () => console.log("Change payment")
    },
    {
      title: "Promociones",
      iconType: "material-community",
      iconNameLeft: "tag",
      iconColorLeft: "black",
      iconNameRight: "chevron-right",
      iconColorRight: "black",
      onPress: () => console.log("Promotions")
    },
    {
      title: "Ayuda",
      iconType: "material-community",
      iconNameLeft: "help",
      iconColorLeft: "black",
      iconNameRight: "chevron-right",
      iconColorRight: "black",
      onPress: () => console.log("Help")
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "email",
      iconColorLeft: "black",
      iconNameRight: "chevron-right",
      iconColorRight: "black",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "key",
      iconColorLeft: "black",
      iconNameRight: "chevron-right",
      iconColorRight: "black",
      onPress: () => selectedComponent("password")
    }
  ];

  //FUNCION PARA MANDAR FORMULARIO SEGUN EL MENU
  const selectedComponent = key => {
    switch (key) {
      case "profile":
        setRenderComponent(
          <ChangeProfileForm
            displayName={userInfo.displayName}
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
