import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import * as firebase from "firebase";
import NewGroups from "./NewGroups";
import ActionButton from "react-native-action-button";

export default function Home(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.textContainer}>
          <Text style={styles.textCategory}>Categorías</Text>
          <View style={{ height: 130, marginTop: 20 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.categoryContainer}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={require("../../assets/category/netflix.jpg")}
                    style={styles.imgCategory}
                  />
                </View>
                <View style={styles.imgCategoryDescription}>
                  <Text onPress={() => console.log("yendo a netflix")}>
                    Netflix
                  </Text>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={require("../../assets/category/spotify.jpg")}
                    style={styles.imgCategory}
                  />
                </View>
                <View style={styles.imgCategoryDescription}>
                  <Text>Spotify Premium</Text>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={require("../../assets/category/apple.jpg")}
                    style={styles.imgCategory}
                  />
                </View>
                <View style={styles.imgCategoryDescription}>
                  <Text>Apple Music</Text>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={require("../../assets/category/steam.jpg")}
                    style={styles.imgCategory}
                  />
                </View>
                <View style={styles.imgCategoryDescription}>
                  <Text>Steam</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <NewGroups />
      </ScrollView>
      {user && <AddGroupsButton navigation={navigation} />}
    </View>
  );
}

function AddGroupsButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="black"
      onPress={() => navigation.navigate("AddGroups")}
    ></ActionButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textCategory: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 20
  },
  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20
  },
  imgCategoryDescription: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10
  },
  categoryContainer: {
    height: 130,
    width: 140,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: "#e3e3e3"
  },
  imgCategory: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover"
  }
});
