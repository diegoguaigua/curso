import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody} centerContent>
      <Image
        source={require("../../../assets/img/UG.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil de Hommies</Text>
      <Text style={styles.description}>¿Quieres ser parte de Hommies?</Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center"
  },
  description: {
    marginBottom: 20,
    textAlign: "center"
  },
  viewBtn: {
    flex: 1,
    alignItems: "center"
  },
  btnStyle: {
    backgroundColor: "#21CE99"
  },
  btnContainer: {
    width: "50%"
  }
});
