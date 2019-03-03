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
      x: [9, 6, 3],
      y: [4, 8, 6],
      z: [3, 4, 5]
    };
  }

  render() {
    return (
      <View style={{ height: 50 }}>
        <LineChart
          style={{ flex: 1 }}
          data={this.state.x}
          contentInset={{ top: 10, bottom: 10 }}
          curve={shape.curveNatural}
          svg={{
            strokeWidth: 2,
            stroke: "#647ACB"
          }}
        >
          {/* <Grid /> */}
        </LineChart>
        <LineChart
          style={StyleSheet.absoluteFill}
          data={this.state.y}
          contentInset={{ top: 10, bottom: 10 }}
          curve={shape.curveNatural}
          svg={{
            strokeWidth: 2,
            stroke: "#D64545"
          }}
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
        />
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
  },
  holder: {
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
  }
});
