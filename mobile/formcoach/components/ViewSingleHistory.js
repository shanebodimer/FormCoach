import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import ActionGraph from "./ActionGraph";
// import console = require("console");

export default class ViewSingleHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      title: " ",
      seconds: 0,
      actions: []
    };

    // Get id
    let { navigation } = this.props;
    let id = navigation.getParam("id", "no-sport-selected");

    // Get collection
    axios
      .get(`https://formcoach.appspot.com/api/capture/${id}`)
      .then(response => {
        // turn actions into array
        //   let actions = response.data.actions

        var actions = Object.keys(response.data.actions).map(function(key) {
          return [Number(key), response.data.actions[key]];
        });
        actions.pop();
        console.log(actions);
        // Update state
        this.setState({
          raw: JSON.stringify(actions),
          history: response.data,
          title:
            response.data.sport.charAt(0).toUpperCase() +
            response.data.sport.slice(1),
          seconds: response.data.date._seconds,
          actions: actions
        });
      });
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        {/* Back */}
        <TouchableOpacity
          onPress={() => navigate("Home")}
          style={styles.backArea}
        >
          <Text style={styles.back}>
            <Ionicons name="md-arrow-dropleft" size={12} /> Return home
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.date}>
          Recorded{" "}
          {this.state.seconds !== 0 &&
            moment
              .unix(this.state.seconds)
              .format("MMMM Do hh:mma")
              .toString()}
        </Text>
        {/* <Text>{this.state.raw}</Text> */}
        {/* Actions */}

        {this.state.actions !== [] &&
          this.state.actions.map((action, i) => {
            console.log("data", action[1].action_data);
            return (
              <View key={i} style={styles.action}>
                <ActionGraph data={action[1].action_data} />
              </View>
            );
          })}

        {/* <View style={styles.action}>
          <ActionGraph />
        </View>
        <View style={styles.action}>
          <ActionGraph />
        </View>
        <View style={styles.action}>
          <ActionGraph />
        </View> */}

        {/* Space */}
        <View style={{ height: 80 }} />
      </ScrollView>
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
  bold: {
    fontWeight: "bold"
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#002c6e"
  },
  date: {
    fontSize: 20,
    color: "#002c6e",
    marginBottom: 30
  },
  back: {
    marginBottom: 20,
    color: "#002c6e",
    display: "flex",
    alignItems: "center"
  },
  action: {
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
  }
});
