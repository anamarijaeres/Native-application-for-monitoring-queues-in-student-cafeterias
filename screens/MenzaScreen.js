import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
//import { ExpoLinksView } from "@expo/samples";

export default function MenzaScreen() {
  return (
    <ScrollView style={styles.container}>
      {
        <View>
          <View style={styles.container}>
            <Image source={require("./../assets/images/SC-menza.jpg")} />
          </View>
          <View style={styles.container}>
            <Image
              source={require("./../assets/images/StjepanRadic-menza.jpg")}
            />
          </View>
        </View>
      }
    </ScrollView>
  );
}

MenzaScreen.navigationOptions = {
  title: "Menza"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff"
  }
});
