//AddGroups
import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";
import AddGroupsForm from "../components/Groups/AddGroupsForm";

export default function AddGroups(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddGroupsForm
        navigation={navigation}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
      />
      <Toast ref={toastRef} position={"center"} opacity={0.5} />
      <Loading isVisible={isLoading} text="Creando grupo" />
    </View>
  );
}
