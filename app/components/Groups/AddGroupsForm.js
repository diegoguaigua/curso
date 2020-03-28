//AddGroupsForm
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddGroupsForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imagesSelected, setImagesSelected] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <UploadImage
          imagesSelected={imagesSelected}
          setImagesSelected={setImagesSelected}
          toastRef={toastRef}
        />
      </ScrollView>
    </View>
  );
}

function UploadImage(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Acepta los permisos de la galería", 2000);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        toastRef.current.show("Galería cerrada");
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };
  console.log(imagesSelected);

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 2 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {imagesSelected.map(imageGroup => {
        <Avatar
          key={imageGroup}
          onPress={() => console.log("eliminado imagen")}
          style={styles.miniatureStyle}
          source={{ uri: imageGroup }}
        />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 25
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 100,
    width: 100,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    marginRight: 10,
    height: 100,
    width: 100
  }
});
