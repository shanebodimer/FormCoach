import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Defs, LinearGradient, Stop, G } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Ionicons } from "@expo/vector-icons";

export default class CorrectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [1, 2, 4],
      y: [2, 4, 5],
      z: [3, 6, 9]
    };
  }
  render() {
    return (
      <View>
        <Text>
          <Text style={styles.feedback}>Correct </Text>
          {this.props.type.toLowerCase()}s generate this trend:
        </Text>
        <View style={{ height: 100 }}>
          <LineChart
            style={{ flex: 1 }}
            data={this.state.x}
            contentInset={{ top: 10, bottom: 10 }}
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

        <View style={styles.footer}>
          <View style={styles.key}>
            <Text style={styles.keyItem}>
              <Ionicons
                name={"ios-radio-button-on"}
                size={12}
                color={"#647ACB"}
              />{" "}
              X
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
                color={"#E9B949"}
              />{" "}
              Z
            </Text>
          </View>
          <View>
            <Text style={styles.feedback}>Good form!</Text>
          </View>
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