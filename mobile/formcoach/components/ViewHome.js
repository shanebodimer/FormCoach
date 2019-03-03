import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Picker,
  PickerIOS,
  Platform
} from "react-native";
import axios from "axios";
import ActionSheet from "react-native-action-sheet";

// Components
import HistoryItem from "./Home/HistoryItem";

// For "view more history" offset
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

// Sport selector options
var BUTTONSiOS = [
  "Golf swing",
  "Freestyle swim",
  "Baseball swing",
  "Disc golf",
  "Cancel"
];
var DESTRUCTIVE_INDEX = 4;
var CANCEL_INDEX = 4;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSport: "Select your activity...",
      captureDisabled: true,
      history: []
    };

    // Get history
    axios.get("https://bluetrace.tech/api").then(response => {
      var result = Object.keys(response.data).map(function(key) {
        return [Number(key), response.data[key]];
      });
      // Update state w/ last three
      result.pop();
      result.sort((a, b) =>
        a[1]["date"]["_seconds"] < b[1]["date"]["_seconds"]
          ? 1
          : b[1]["date"]["_seconds"] < a[1]["date"]["_seconds"]
          ? -1
          : 0
      );
      this.setState({
        raw: JSON.stringify(result),
        history: result.filter(entry => entry[1].count > 0).slice(0, 3)
      });
    });

    this.selectActivity = this.selectActivity.bind(this);
    this.startCapture = this.startCapture.bind(this);
  }

  selectActivity() {
    ActionSheet.showActionSheetWithOptions(
      {
        options: Platform.OS == "ios" ? BUTTONSiOS : BUTTONSandroid,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        tintColor: "blue"
      },
      buttonIndex => {
        if (BUTTONSiOS[buttonIndex] != "Cancel")
          this.setState({
            selectedSport: BUTTONSiOS[buttonIndex],
            captureDisabled: false
          });
      }
    );
  }

  startCapture() {
    const { navigate } = this.props.navigation;
    if (this.state.selectedSport != "Select your activity...") {
      navigate("Capture", { sport: this.state.selectedSport });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {/* Page title */}
        <View style={styles.title}>
          <Text style={styles.titleText}>
            <Image
              style={styles.titleImg}
              source={require("../assets/images/capture.png")}
            />{" "}
            Bluetrace
          </Text>
        </View>

        {/* Capture button */}
        <TouchableOpacity
          style={styles.captureTouch}
          onPress={
            this.state.selectedSport != "Select your activity..."
              ? this.startCapture
              : this.selectActivity
          }
        >
          <View style={styles.capture}>
            <Image
              style={
                this.state.captureDisabled
                  ? styles.captureImgDisabled
                  : styles.captureImgEnabled
              }
              source={require("../assets/images/capture.png")}
            />
          </View>
        </TouchableOpacity>

        {/* Select your sport */}
        <TouchableOpacity onPress={this.selectActivity}>
          <Text
            style={
              this.state.captureDisabled
                ? styles.captureTextDisabled
                : styles.captureTextEnabled
            }
          >
            {this.state.selectedSport}
          </Text>
        </TouchableOpacity>

        {/* Ready text */}
        <Text
          style={
            this.state.captureDisabled
              ? styles.readyDisabled
              : styles.readyEnabled
          }
        >
          Ready to capture
        </Text>

        {/* Space */}
        <View style={{ height: 50 }} />

        {/* Recent items */}
        <View style={styles.history}>
          <Text style={styles.historyTitle}>Recent Activity</Text>
          {this.state.history.map((event, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => navigate("Single", { id: event[1].id })}
              >
                <HistoryItem
                  height={55}
                  count={event[1].count}
                  date={event[1].date["_seconds"]}
                  sport={event[1].sport}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* View more */}
        <TouchableOpacity
          style={styles.historyMore}
          onPress={() => navigate("History")}
        >
          <Text style={styles.historyMoreText}>View all history</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#F0F4F8",
    alignItems: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#002c6e"
  },
  titleImg: {
    width: 35,
    height: 35
  },
  captureTouch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  capture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    shadowColor: "#BCCCDC",
    shadowRadius: 20,
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0
    },
    marginBottom: 20
  },
  captureImgDisabled: {
    opacity: 0.6,
    marginTop: 25,
    marginLeft: 35,
    width: 150,
    height: 150
  },
  captureImgEnabled: {
    opacity: 1,
    marginTop: 25,
    marginLeft: 35,
    width: 150,
    height: 150
  },
  captureTextDisabled: {
    fontWeight: "bold",
    fontSize: 25,
    color: "rgba(0, 44, 110,0.5)"
  },
  captureTextEnabled: {
    fontWeight: "bold",
    fontSize: 25,
    color: "rgba(0, 44, 110,1)"
  },
  history: {
    width: "100%",
    padding: 20
  },
  historyTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#002c6e",
    marginBottom: 15
  },
  historyMore: {
    position: "absolute",
    top: height - 60
  },
  historyMoreText: {
    fontSize: 18,
    color: "#002c6e"
  },
  readyDisabled: {
    marginTop: 10,
    color: "#F0F4F8"
  },
  readyEnabled: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold"
  }
});
