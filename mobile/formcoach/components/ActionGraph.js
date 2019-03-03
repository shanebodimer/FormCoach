import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Defs, LinearGradient, Stop, G } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Ionicons } from "@expo/vector-icons";

export default class ActionGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gMag: [],
      aMag: []
    };

    let gMag = [];
    let aMag = [];
    // let z = [];

    if (this.props.data !== []) {
      for (var i = 0; i < this.props.data.length; i++) {
        gMag.push(this.props.data[i]["gMag"]);
        aMag.push(this.props.data[i]["aMag"]);
      }

      this.state = {
        gMag: aMag,
        aMag: gMag
      };
    }
  }
  render() {
    return (
      <View>
        <View style={{ height: 100 }}>
          <LineChart
            style={{ flex: 1 }}
            data={this.state.gMag}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "#647ACB"
            }}
          />
          <LineChart
            style={StyleSheet.absoluteFill}
            data={this.state.aMag}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "green"
            }}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.key}>
            <Text style={styles.keyItem}>
              <Ionicons
                name={"ios-radio-button-on"}
                size={12}
                color={"#647ACB"}
              />{" "}
              Rotation
            </Text>
            <Text style={styles.keyItem}>
              <Ionicons
                name={"ios-radio-button-on"}
                size={12}
                color={"green"}
              />{" "}
              Acceleration
            </Text>
          </View>
          <View>{/* <Text style={styles.feedback}>Good form!</Text> */}</View>
        </View>
        {/* <Text>{JSON.stringify(this.props.data)}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: "#F0F4F8"
  },
  bold: {
    fontWeight: "bold"
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#002c6e",
    marginBottom: 30
  },
  footer: {
    flex: 1,
    flexDirection: "row"
  },
  key: {
    flex: 1,
    flexDirection: "row"
  },
  keyItem: {
    marginRight: 10
  },
  feedback: {
    fontWeight: "bold",
    color: "green"
  }
});
