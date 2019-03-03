import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import moment from "moment";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Ionicons } from "@expo/vector-icons";

import CorrectGraph from "./CorrectGraph";
import PastActionGraph from "./PastActionGraph";
import Variance from "./Variance";

import { varianceCalc } from "../api/wavecomparison";
import { getCorrectDataset } from "../api/correctgraphs";

// import console = require("console");

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

var ws = new WebSocket("ws://192.168.2.60:8080/formdata");

export default class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gMag: [],
      aMag: [],
      currentActivity: [],
      id: "",
      recording: false,
      aVar: 0,
      gVar: 0
    };

    this.end = this.end.bind(this);
    this.startAction = this.startAction.bind(this);
    this.stopAction = this.stopAction.bind(this);
  }

  startAction() {
    this.setState({
      recording: true,
      currentActivity: []
    });
  }

  stopAction() {
    let action = this.state.currentActivity;
    const { navigation } = this.props;
    const sport = navigation.getParam("sport", "Golf swing");
    axios
      .post(`https://formcoach.appspot.com/api/capture/${this.state.id}`, {
        data: JSON.stringify(this.state.currentActivity)
      })
      .then(response => {
        console.log("posted", response.data);
        this.setState({
          currentActivity: [],
          recording: false
        });
      });

    let correct = getCorrectDataset(sport);
    let vars = varianceCalc(action, correct, 100);

    this.setState({
      aVar: vars[0].toFixed(0),
      gVar: vars[1].toFixed(0)
    });
  }

  end() {
    const { navigate } = this.props.navigation;
    this.setState({
      currentActivity: []
    });
    ws.close();
    navigate("Home");
  }

  componentDidMount() {
    ws = new WebSocket("ws://192.168.2.60:8080/formdata");

    // Create new capture
    const { navigation } = this.props;
    const sport = navigation.getParam("sport", "Golf swing");
    axios
      .post(`https://bluetrace.tech/api/capture`, { sport: sport })
      .then(response => {
        console.log(response.data.id);
        this.setState({
          id: response.data.id
        });
      });

    ws.onmessage = e => {
      // gyro xyz acc xyz
      // Parse input
      let data = e.data.split(" ");
      let gx = parseFloat(data[0]);
      let gy = parseFloat(data[1]);
      let gz = parseFloat(data[2]);
      let ax = parseFloat(data[3]).toFixed(4) * 100;
      let ay = parseFloat(data[4]).toFixed(4) * 100;
      let az = parseFloat(data[5]).toFixed(4) * 100;

      // Calculate magnitude
      let gMagnitude = Math.sqrt(gx * gx + gy * gy + gz * gz);
      let aMagnitude = Math.sqrt(ax * ax + ay * ay + az * az);
      //   console.log(aMagnitude);

      // If enough motion detected, start to capture
      let activityArr = [];
      if (this.state.recording) {
        let record = {};
        record.aMag = aMagnitude;
        record.gMag = gMagnitude;
        let currentActivity = this.state.currentActivity;
        activityArr = currentActivity.concat(record);
      }

      // Append to data array
      let currentGMagArray = this.state.gMag;
      let gMagArr = currentGMagArray.concat(gMagnitude);
      let currentAMagArray = this.state.aMag;
      let aMagArr = currentAMagArray.concat(aMagnitude);

      // Trim to most recent 50 reports
      if (gMagArr.length > 150) {
        gMagArr = gMagArr.slice(gMagArr.length - 150, gMagArr.length - 1);
      }
      if (aMagArr.length > 150) {
        aMagArr = aMagArr.slice(aMagArr.length - 150, aMagArr.length - 1);
      }

      // Update state
      this.setState({
        gMag: gMagArr,
        aMag: aMagArr,
        currentActivity: activityArr
      });
    };
  }

  componentWillUnmount() {
    ws.close();
    this.setState({
      currentActivity: [],
      recording: false
    });
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const sport = navigation.getParam("sport", "Golf swing");
    return (
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.title}>{sport}</Text>

          <View style={{ height: 200 }}>
            <LineChart
              style={StyleSheet.absoluteFill}
              data={this.state.gMag}
              contentInset={{ top: 10, bottom: 10 }}
              curve={shape.curveNatural}
              svg={{
                strokeWidth: 2,
                stroke: "#647ACB"
              }}
              yMax={900}
              yMin={0}
            />
            <LineChart
              style={{ flex: 1 }}
              data={this.state.aMag}
              contentInset={{ top: 10, bottom: 10 }}
              curve={shape.curveNatural}
              svg={{
                strokeWidth: 2,
                stroke: "green"
              }}
              yMax={900}
              yMin={0}
            />
          </View>

          <View style={styles.keyContainer}>
            <View style={styles.key}>
              <Text style={styles.keyItem}>
                <Ionicons
                  name={"ios-radio-button-on"}
                  size={12}
                  color={"green"}
                />{" "}
                Acceleration
              </Text>
              <Text style={styles.keyItem}>
                <Ionicons
                  name={"ios-radio-button-on"}
                  size={12}
                  color={"#647ACB"}
                />{" "}
                Rotation
              </Text>
            </View>
          </View>

          {!this.state.recording && (
            <TouchableOpacity
              style={styles.activity}
              onPress={this.startAction}
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={styles.startActivityText}>
                  Start action recoding
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {this.state.recording && (
            <TouchableOpacity style={styles.activity} onPress={this.stopAction}>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={styles.stopActivityText}>
                  Stop action recoding
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.correct}>
            <CorrectGraph type={sport} data={getCorrectDataset(sport)} />
          </View>
        </View>

        {this.state.aVar == 0 && (
          <View style={styles.processing}>
            <ActivityIndicator size="small" color="#002c6e" />
            <Text style={styles.processingText}>Waiting for action record</Text>
          </View>
        )}

        {this.state.aVar != 0 && (
          <View style={styles.result}>
            <Variance type={"Acceleration"} val={this.state.aVar} />
            <Variance type={"Rotation"} val={this.state.gVar} />
          </View>
        )}
        {/* <Text>
            {this.state.aVar},{this.state.gVar}
          </Text> */}
        {/* </View> */}

        <View style={styles.stopContainer}>
          <TouchableOpacity style={styles.stop} onPress={this.end}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../assets/images/red.png")}
              />
              <Text style={styles.stopText}>End capture</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    padding: 20,
    backgroundColor: "#F0F4F8",
    alignItems: "center"
  },
  result: {
    width: "100%"
    // flex: 1,
    // flexDirection: "row"
  },
  back: {
    marginBottom: 20,
    color: "#002c6e",
    display: "flex",
    alignItems: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#002c6e",
    marginBottom: 20
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#002c6e",
    marginBottom: 10
  },
  correct: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#BCCCDC",
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0
    },
    marginBottom: 20
  },
  holder: {
    opacity: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#BCCCDC",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0
    },
    marginBottom: 10
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row"
  },
  keyContainer: {
    padding: 10
  },
  key: {
    width: "100%",
    flex: 1,
    flexDirection: "row-reverse"
  },
  keyItem: {
    height: 15,
    marginRight: 10
  },
  stopContainer: {
    width: "100%",
    position: "absolute",
    top: height - 110,
    alignItems: "center"
  },
  stop: {
    width: "70%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#BCCCDC",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  stopText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002c6e",
    marginLeft: 10
  },
  processing: {
    width: "95%"
    // alignItems: "left"
  },
  processingText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: "center",
    color: "#002c6e"
  },
  activity: {
    width: "50%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#BCCCDC",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  startActivityText: {
    color: "green",
    fontWeight: "bold"
  },
  stopActivityText: {
    color: "red",
    fontWeight: "bold"
  }
});
