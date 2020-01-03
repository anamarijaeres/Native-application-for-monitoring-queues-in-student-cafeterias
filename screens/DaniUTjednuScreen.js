import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Dimensions
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ExpoConfigView } from "@expo/samples";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDQqBAW6AE6rpobF9LZ3zoU_4RxKrwcBQU",
  authDomain: "lad4-ecbd7.firebaseapp.com",
  databaseURL: "https://lad4-ecbd7.firebaseio.com",
  projectId: "lad4-ecbd7",
  storageBucket: "lad4-ecbd7.appspot.com",
  messagingSenderId: "876341894223",
  appId: "1:876341894223:web:8ae9525b2db61e68c5de3a",
  measurementId: "G-TJVM03NNL0"
};

// Initialize Firebase
if (firebase.apps.length !== 1) {
  firebase.initializeApp(firebaseConfig);
}

var podaciMenza = [];
var podaciZaGraf = null;
export default function DaniUTjednuScreen() {
  const [danUTjednu, setDanUTjednu] = useState(null);
  const [prikažiGraf, setPrikažiGraf] = useState(false);

  function izračunajVrijeme(startTime, endTime) {
    var newStartTime = startTime.split(":");
    var newEndTime = endTime.split(":");

    //Ovdje preračunavamo svo vrijeme u sekunde da možemo izračunati
    newStartTime =
      parseInt(newStartTime[0]) * 3600 +
      parseInt(newStartTime[1]) * 60 +
      parseInt(newStartTime[2]);
    newEndTime =
      parseInt(newEndTime[0]) * 3600 +
      parseInt(newEndTime[1]) * 60 +
      parseInt(newEndTime[2]);

    var time = (newEndTime - newStartTime) / 60;
    return time;
  }

  function iscrtajGraf(dow) {
    var menzaData = [];
    var podaci = [];
    var iterator = 0;
    var cekamZadnjiProlaz = 0;
    for (var i = 0; i < 9; ++i) {
      firebase
        .database()
        .ref("menze/" + i + "/data")
        .once("value")
        .then(function(snapshot) {
          menzaData = snapshot.val();
          return menzaData;
        })
        .then(menzaData => {
          var menzaData = menzaData.filter(menza => menza.dow === dow);
          if (menzaData.length) {
            var menzaData2 = menzaData.map(menza =>
              izračunajVrijeme(menza.startTime, menza.endTime)
            );
            var suma = 0;
            // podaci[iterator++] = menzaData2;
            for (var j = 0; j < menzaData2.length; ++j) {
              suma += menzaData2[j];
            }
            podaci[iterator++] = suma;
          } else {
            //podaci[iterator++] = menzaData;
            podaci[iterator++] = 0;
          }
          //console.log(podaci[iterator - 1]);
          podaciMenza[iterator - 1] = podaci[iterator - 1];
          //console.log(podaciMenza[iterator - 1]);
        })
        .finally(() => {
          cekamZadnjiProlaz++;
          if (cekamZadnjiProlaz === 9) {
            podaciZaGraf = {
              labels: [
                "MEDICINA",
                "FER",
                "FSB",
                "FFZG",
                "SC",
                "GRAĐEVINA",
                "CVJETNO",
                "EKONOMIJA",
                "SAVA"
              ],
              datasets: [
                {
                  data: [
                    podaciMenza[0],
                    podaciMenza[1],
                    podaciMenza[2],
                    podaciMenza[3],
                    podaciMenza[4],
                    podaciMenza[5],
                    podaciMenza[6],
                    podaciMenza[7],
                    podaciMenza[8]
                  ]
                }
              ]
            };
            setPrikažiGraf(true);
          }
        });
    }
  }

  if (!prikažiGraf) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.helpContainer}>
          <View style={styles.collegeButtons}>
            <Button title="Pon" onPress={() => iscrtajGraf(1)} />
          </View>

          <View style={styles.collegeButtons}>
            <Button title="Uto" onPress={() => iscrtajGraf(2)} />
          </View>

          <View style={styles.collegeButtons}>
            <Button title="Sri" onPress={() => iscrtajGraf(3)} />
          </View>

          <View style={styles.collegeButtons}>
            <Button title="Čet" onPress={() => iscrtajGraf(4)} />
          </View>

          <View style={styles.collegeButtons}>
            <Button title="Pet" onPress={() => iscrtajGraf(5)} />
          </View>

          <View style={styles.collegeButtons}>
            <Button title="Sub" onPress={() => iscrtajGraf(6)} />
          </View>

          <View style={styles.collegeButtons}>
            <Button title="Ned" onPress={() => iscrtajGraf(0)} />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.containerGraph}>
        <View>
          <BarChart
            style={{
              transform: [
                {
                  rotate: "90deg"
                }
              ]
            }}
            data={podaciZaGraf}
            width={Dimensions.get("window").height - 70}
            height={Dimensions.get("window").width}
            verticalLabelRotation={45}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
          />
          <View style={styles.helpContainerReturnButton}>
            <Button title="Vrati se" onPress={() => setPrikažiGraf(false)} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

DaniUTjednuScreen.navigationOptions = {
  title: "Dani u tjednu"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2ddf8"
  },
  containerGraph: {
    flex: 1,
    backgroundColor: "#f2ddf8"
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpContainerReturnButton: {
    marginTop: 15,
    alignItems: "center",
    paddingTop: Dimensions.get("window").height - 450,
    paddingBottom: 20
  },
  collegeButtons: {
    paddingBottom: 15
  }
});
