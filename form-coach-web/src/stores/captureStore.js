import { observable, computed, action, decorate } from "mobx";
import axios from "axios";

class CaptureStore {
  captures = observable.map();

  get asList() {
    return [...this.captures.values()].sort((a, b) => {
      if (a.date._seconds < b.date._seconds) {
        return 1;
      }
      if (a.date._seconds > b.date._seconds) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  updateCapture = capture => {
    capture["loaded"] = false;
    this.captures.set(capture.id, capture);
  };

  loadCapture = captureID => {
    var capture = this.captures.get(captureID);
    return axios
      .get(`https://bluetrace.tech/api/capture/${captureID}`)
      .then(response => {
        capture["actions"] = response.data.actions;
        delete capture.actions.length;
      })
      .then(() => {
        capture["loaded"] = true;
      });
  };

  loadCaptures = () => {
    return axios.get("https://bluetrace.tech/api").then(response => {
      Object.keys(response.data).forEach(key => {
        if (key !== "length") {
          response.data[key]["loaded"] = false;
          this.captures.set(response.data[key].id, response.data[key]);
        }
      });
    });
  };
}

decorate(CaptureStore, {
  captures: observable,
  asList: computed,
  loadCaptures: action
});

export default CaptureStore;
