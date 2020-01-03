import React from "react";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
//import { ExpoLinksView } from "@expo/samples";

export default function MenzaScreen() {
  return (
    <ScrollView style={styles.container}>
      {
        <View>
          <View style={styles.container}>
            <Image source={require("./../assets/images/SC-menza.jpg")} />

            <View>
              <Text style={styles.menzaText}>Ovo je tekst!</Text>
            </View>
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
    backgroundColor: "#f2ddf8"
  },
  menzaText: {
    textAlign: "right"
  }
});
