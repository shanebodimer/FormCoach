import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Moment from "react-moment";
import moment from "moment";

export default class HistoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSport: "Select your sport...",
      captureDisabled: true,
      history: []
    };
  }

  render() {
    let ico = "";
    switch (this.props.sport) {
      case "basketball":
        ico = "ios-basketball";
        break;
      case "baseball":
        ico = "ios-baseball";
        break;
      case "disc":
        ico = "md-disc";
        break;
    }

    let sport =
      this.props.sport.charAt(0).toUpperCase() + this.props.sport.slice(1);

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.left}>
            <View>
              <Ionicons name={ico} size={30} color={"#0064d5"} />
            </View>
            <View>
              <Text style={styles.date}>
                <Text style={styles.bold}>{sport}</Text> on{" "}
                {moment
                  .unix(this.props.date)
                  .format("MMMM Do hh:mma")
                  .toString()}
              </Text>
            </View>
          </View>
          <View>
            <Text>{this.props.count} actions</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 10
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  date: {
    color: "#002c6e",
    marginLeft: 10
  }
});
