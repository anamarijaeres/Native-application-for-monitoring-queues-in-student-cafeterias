import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList
} from "react-native";
//import { ExpoLinksView } from "@expo/samples";

export default function MenzaScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/FER-menza.png")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "FER" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 10-16h" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/SC-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "SC" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 10-16h" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/StjepanRadic-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "SAVA" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 10-16h" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
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
  menzaPosition: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    alignSelf: "flex-start"
  },
  menzaText: {
    paddingLeft: 15
  }
});
