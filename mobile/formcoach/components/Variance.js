import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Defs, LinearGradient, Stop, G } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Ionicons } from "@expo/vector-icons";

export default class Variance extends React.Component {
  render() {
    let feedback = "";
    let color = "#fff";
    if (this.props.val < 200) {
      feedback = "Good job";
      color = "#DFF0D8";
    } else if (this.props.val < 500) {
      feedback = "A bit too much";
      color = "#FCF8E3";
    } else {
      feedback = "Too much!";
      color = "#F2DEDE";
    }
    return (
      <View
        style={{
          width: "100%",
          marginBottom: 10,
          padding: 10,
          backgroundColor: color,
          borderRadius: 4,
          shadowColor: "#BCCCDC",
          shadowRadius: 10,
          shadowOpacity: 1,
          shadowOffset: {
            height: 0,
            width: 0
          }
        }}
      >
        <Text>
          {this.props.type} variance: {this.props.val}
        </Text>
        <Text style={styles.feedback}>{feedback}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#BCCCDC",
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  feedback: {
    fontWeight: "bold",
    fontSize: 25,
    alignItems: "center"
  }
});
