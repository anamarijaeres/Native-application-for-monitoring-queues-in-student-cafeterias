import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
} from "react-native";

import { MonoText } from "../components/StyledText";

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

var database = firebase.database();

var menza_data = [];
export default function HomeScreen() {
  //Gumb za prikazati screen sa Start i End gumbom
  const [buttonPressed, setButtonPressed] = useState(false);

  //Gumb Start
  const [buttonZaUlazak, setButtonZaUlazak] = useState(false);

  //Provjera jel se pokušava unijeti zapis van radnog vremena
  const [menzaRadi, setMenzaRadi] = useState(false);

  //Ove 3 vrijednosti postavi na null kad se stisne End
  const [imeMenze, setImeMenze] = useState(null);
  const [idMenze, setIdMenze] = useState(null);
  const [startTime, setStartTime] = useState(null);

  function gumbPritisnut(ime, zaPostaviti, idMenze) {
    firebase
      .database()
      .ref("menze/" + idMenze)
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();

        //Indeksi: 0-dow, 1-sati, 2-minute
        var mojeVrijeme = [
          new Date().getDay(),
          new Date().getHours(),
          new Date().getMinutes()
        ];

        //Provjere radi li menza

        var radniDani = data.working_days.split("-");
        //Razdvojim dijelove radnog vremena
        var radniSati = data.working_hours.split(";");

        if (radniDani[0] <= mojeVrijeme[0] && radniDani[1] >= mojeVrijeme[0]) {
          radniSati.forEach(element => {
            //Razdvojim početak i kraj jednog dijela radnog vremena, npr. element = [7:30, 10:30]
            element = element.split("-");
            //Razdvojim sate i minute
            var pocRadVrem = element[0].split(":");
            var krajRadVrem = element[1].split(":");

            if (
              (pocRadVrem[0] < mojeVrijeme[1] ||
                (pocRadVrem[0] === mojeVrijeme[1] &&
                  pocRadVrem[1] < mojeVrijeme[2])) &&
              (krajRadVrem[0] > mojeVrijeme[1] ||
                (krajRadVrem[0] === mojeVrijeme[1] &&
                  krajRadVrem[1] > mojeVrijeme[2]))
            ) {
              setMenzaRadi(true);
            }
          });
        }

        if (menzaRadi) {
          setIdMenze(idMenze);
          setImeMenze(ime);
          setButtonPressed(zaPostaviti);
        } else {
          Alert.alert("Menza " + ime + " trenutno ne radi. Unos nije moguć!");
        }
      })
      .catch(err => console.log(err));
  }

  function ugasiGumb(zaPostaviti) {
    setButtonZaUlazak(false);
    setButtonPressed(zaPostaviti);
  }

  function ulazakUMenzu() {
    setButtonZaUlazak(true);
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var date = hours + ":" + min + ":" + sec;
    setStartTime(date);
  }

  function izlazakIzMenze(zaPostaviti) {
    const newId = firebase
      .database()
      .ref("menze/" + idMenze + "/data")
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        return data.length;
      })
      .then(function(noviId) {
        firebase
          .database()
          .ref("menze/" + idMenze + "/data/" + noviId)
          .set({
            dow: new Date().getDay(),
            endTime:
              new Date().getHours() +
              ":" +
              new Date().getMinutes() +
              ":" +
              new Date().getSeconds(),
            startTime: startTime
          });
      })
      .finally(() => {
        setButtonZaUlazak(false);
        setButtonPressed(zaPostaviti);
      });

    //console.log(newId);
  }

  // function ImenaMenzi() {
  //   var output = [];
  //   for (var i = 1; i < 9; i++) {
  //     firebase
  //       .database()
  //       .ref("menze/" + i)
  //       .once("value")
  //       .then(function(snapshot) {
  //         menza_data = snapshot.val();
  //         var tempItem = (
  //           <View>
  //             <Button
  //               title={menza_data.name}
  //               onPress={() => gumbPritisnut(menza_data.name, true)}
  //             />
  //           </View>
  //         );
  //         output.push(tempItem);
  //       });
  //   }
  //   return <View>{output}</View>;
  // }

  // function imenaMenzi() {
  //   var output = [];
  //   for (var i = 0; i < 8; i++) {
  //     firebase
  //       .database()
  //       .ref("menze/" + i)
  //       .once("value")
  //       .then(function(snapshot) {
  //         menza_data[i] = snapshot.val();
  //         var tempItem = (
  //           <View>
  //             <Button
  //               title={menza_data[i].name}
  //               onPress={() => gumbPritisnut(menza_data[i].name, true)}
  //             />
  //           </View>
  //         );
  //         output[i] = tempItem;
  //       });
  //   }
  //   return <View>{output}</View>;
  // }

  if (!buttonPressed) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              style={styles.welcomeImage}
              source={require("../assets/images/LAD_natpis.png")}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {/* <DevelopmentModeNotice /> */}

            {/* <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText>screens/HomeScreen.js</MonoText>
            </View> */}
          </View>

          <View style={styles.helpContainer}>
            {/* <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Kratke upute za korištenje
              </Text>
            </TouchableOpacity> */}

            <View style={styles.collegeButtons}>
              <Button
                title="MEDICINA"
                onPress={() => gumbPritisnut("MEDICINA", true, 0)}
              />
            </View>

            <View style={styles.collegeButtons}>
              <Button
                title="FER"
                onPress={() => gumbPritisnut("FER", true, 1)}
              />
            </View>

            <View style={styles.collegeButtons}>
              <Button
                title="FSB"
                onPress={() => gumbPritisnut("FSB", true, 2)}
              />
            </View>

            <View style={styles.collegeButtons}>
              <Button
                title="FFZG"
                onPress={() => gumbPritisnut("FFZG", true, 3)}
              />
            </View>

            <View style={styles.collegeButtons}>
              <Button title="SC" onPress={() => gumbPritisnut("SC", true, 4)} />
            </View>

            <View style={styles.collegeButtons}>
              <Button
                title="GRAĐEVINA"
                onPress={() => gumbPritisnut("GRAĐEVINA", true, 5)}
              />
            </View>

            <View style={styles.collegeButtons}>
              <Button
                title="CVJETNO"
                onPress={() => gumbPritisnut("CVJETNO", true, 6)}
              />
            </View>

            <View style={styles.collegeButtons}>
              <Button
                title="EKONOMIJA"
                onPress={() => gumbPritisnut("EKONOMIJA", true, 7)}
              />
            </View>

            <View style={styles.collegeButtons}>
              <Button
                title="SAVA"
                onPress={() => gumbPritisnut("SAVA", true, 8)}
              />
            </View>
          </View>
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View> */}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.nameOfMensah}>{imeMenze}</Text>

          <View style={styles.welcomeContainer}>
            <Image
              style={styles.welcomeImage}
              source={require("../assets/images/LAD_natpis.png")}
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              title="START"
              onPress={() => ulazakUMenzu()}
              disabled={buttonZaUlazak}
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              title="END"
              onPress={() => izlazakIzMenze(false)}
              disabled={!buttonZaUlazak}
            />
          </View>
        </ScrollView>

        <View style={styles.returnContainer}>
          <Button title="Vrati se" onPress={() => ugasiGumb(false)} />
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use
//         useful development tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/development-mode/"
//   );
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2ddf8"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain"
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  nameOfMensah: {
    fontSize: 42,
    alignSelf: "center",
    color: "#2e78b7"
  },
  returnContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  startAndEndButtons: {
    width: 100,
    height: 100,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    backgroundColor: "#fff"
  },
  collegeButtons: {
    paddingBottom: 15
  }
});
