import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import axios from "axios";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Ionicons } from "@expo/vector-icons";

import CorrectGraph from "./CorrectGraph";
import PastActionGraph from "./PastActionGraph";
// import console = require("console");

var ws = new WebSocket("ws://192.168.4.1:8080/formdata");

export default class Capture extends React.Component {
  constructor(props) {
    super(props);
    let empty = [];
    // for (var i = 0; i < 100; i++) empty[i] = 0;
    this.state = {
      data: [],
      x: empty,
      y: empty,
      z: empty,
      mag: [],
      cx: [100, 200, 400],
      cy: [200, 400, 500],
      cz: [300, 600, 900]
      //   raw: ""
    };
  }

  componentDidMount() {
    ws.onmessage = e => {
      // gyro xyz acc xyz
      //   console.log(e.data);
      let data = e.data.split(" ");
      //   console.log(e.data);
      console.log(
        parseFloat(data[0]),
        parseFloat(data[1]),
        parseFloat(data[2])
      );

      let mag = Math.sqrt(
        Math.pow(parseFloat(data[0]), 2) +
          Math.pow(parseFloat(data[1]), 2) +
          Math.pow(parseFloat(data[2]), 2)
      );
      magArr = this.state.mag.concat(mag.toFixed(3));
      console.log(magArr);
      //   if (mag.length > 50) {
      //     mag = mag.slice(mag.length - 100, mag.length - 1);
      //   }

      //   let xJoin = this.state.x.concat(parseFloat(data[0]));
      //   let yJoin = this.state.y.concat(parseFloat(data[1]));
      //   let zJoin = this.state.z.concat(parseFloat(data[2]));

      //   //   console.log(joined);
      //   if (xJoin.length > 50) {
      //     xJoin = xJoin.slice(xJoin.length - 100, xJoin.length - 1);
      //   }
      //   if (yJoin.length > 50) {
      //     yJoin = yJoin.slice(yJoin.length - 100, yJoin.length - 1);
      //   }
      //   if (zJoin.length > 50) {
      //     zJoin = zJoin.slice(zJoin.length - 100, zJoin.length - 1);
      //   }
      this.setState({
        // x: xJoin,
        // y: yJoin,
        // z: zJoin,
        mag: magArr
      });
    };
  }

  componentWillUnmount() {
    // ws.close();
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const sport = navigation.getParam("sport", "Golf swing");
    return (
      <View style={styles.container}>
        {/* Back */}
        <TouchableOpacity
          onPress={() => navigate("Home")}
          style={styles.backArea}
        >
          <Text style={styles.back}>
            <Ionicons name="md-arrow-dropleft" size={12} /> Return home
          </Text>
        </TouchableOpacity>

        {/* <Text style={styles.bold}>Capturing...</Text> */}

        <Text style={styles.title}>{sport}</Text>

        <View style={{ height: 200 }}>
          <LineChart
            style={{ flex: 1 }}
            data={this.state.mag}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "#647ACB"
            }}
            yMax={255}
            yMin={-255}
          >
            {/* <Grid /> */}
          </LineChart>
          {/* <LineChart
            style={StyleSheet.absoluteFill}
            data={this.state.y}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "#D64545"
            }}
            yMax={255}
            yMin={-255}
          />
          <LineChart
            style={StyleSheet.absoluteFill}
            data={this.state.z}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "#E9B949"
            }}
            yMax={255}
            yMin={-255}
          /> */}
          {/* <LineChart
            style={{ flex: 1 }}
            data={this.state.cx}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "#647ACB"
            }}
          />
          <LineChart
            style={StyleSheet.absoluteFill}
            data={this.state.cy}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "#D64545"
            }}
          />
          <LineChart
            style={StyleSheet.absoluteFill}
            data={this.state.cz}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "#E9B949"
            }}
          /> */}
        </View>

        <View style={styles.keyContainer}>
          <View style={styles.key}>
            <Text style={styles.keyItem}>
              <Ionicons
                name={"ios-radio-button-on"}
                size={12}
                color={"#E9B949"}
              />{" "}
              Z
            </Text>
            <Text style={styles.keyItem}>
              <Ionicons
                name={"ios-radio-button-on"}
                size={12}
                color={"#D64545"}
              />{" "}
              Y
            </Text>
            <Text style={styles.keyItem}>
              <Ionicons
                name={"ios-radio-button-on"}
                size={12}
                color={"#647ACB"}
              />{" "}
              X
            </Text>
          </View>
        </View>

        <View style={styles.correct}>
          <CorrectGraph type={sport} />
        </View>

        {/* <Text style={styles.subtitle}>Recorded actions</Text>

        <ScrollView>
          <View style={styles.holder}>
            <PastActionGraph data={[]} />
          </View>
          <View style={styles.holder}>
            <PastActionGraph data={[]} />
          </View>
          <View style={styles.holder}>
            <PastActionGraph data={[]} />
          </View>
          <View style={styles.holder}>
            <PastActionGraph data={[]} />
          </View>
        </ScrollView> */}

        <TouchableOpacity style={styles.stop}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../assets/images/red.png")}
            />
            <Text style={styles.stopText}>End capture</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    padding: 20,
    backgroundColor: "#F0F4F8"
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
    marginTop: 20,
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
    marginBottom: 60
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
  }
});
