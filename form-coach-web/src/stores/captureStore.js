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

  loadCapture = captureID => {
    var capture = this.captures.get(captureID);
    return axios
      .get(`https://formcoach.appspot.com/api/capture/${captureID}`)
      .then(response => {
        capture["actions"] = response.data.actions;
      })
      .then(() => {
        capture["loaded"] = true;
      });
  };

  loadCaptures = () => {
    return axios.get("https://formcoach.appspot.com/api").then(response => {
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
