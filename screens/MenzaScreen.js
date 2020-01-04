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
        <Image source={require("./../assets/images/Medicina-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "MEDICINA" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 7:30-18:00" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/FER-menza.png")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "FER" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 10:00-16:00" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/FSB-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "FSB" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 8:00-16:00" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/FFZG-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "FFZG" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 8:00-10:00, 11:00-15:30" },
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
            { key: "PON-PET: 10:00-16:00" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/Građevina-menza.png")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "GRAĐEVINA" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 10:00-16:00" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/Cvjetno-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "CVJETNO" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 10:00-16:00" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPosition}>
        <Image source={require("./../assets/images/Ekonomija-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "EKONOMIJA" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 11:00-15:00" },
            { key: "SUB i NED: zatvoreno" }
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.menzaPositionLast}>
        <Image source={require("./../assets/images/StjepanRadic-menza.jpg")} />

        <FlatList
          style={styles.menzaText}
          data={[
            { key: "SAVA" },
            { key: "RADNO VRIJEME:" },
            { key: "PON-PET: 10:00-16:00" },
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
  menzaPositionLast: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    alignSelf: "flex-start",
    marginBottom: 15
  },
  menzaText: {
    paddingLeft: 15
  }
});
