import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

import HistoryItem from "./Home/HistoryItem";

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };

    // Get all history
    axios.get("https://formcoach.appspot.com/api").then(response => {
      var result = Object.keys(response.data).map(function(key) {
        return [Number(key), response.data[key]];
      });
      result.pop();
      // Update state
      this.setState({
        raw: JSON.stringify(result),
        history: result
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

        {/* Title */}
        <Text style={styles.title}>Activity History</Text>

        {/* History */}
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

  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#002c6e",
    marginBottom: 30
  },
  backArea: {},
  back: {
    marginBottom: 20,
    color: "#002c6e",
    display: "flex",
    alignItems: "center"
  }
});
