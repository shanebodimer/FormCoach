import { observable, computed, action, decorate } from "mobx";
import axios from "axios";

class CaptureStore {
  captures = observable.map();

  get asList() {
    return [...this.captures.values()];
  }

  loadCaptures = () => {
    return axios.get("https://formcoach.appspot.com/api").then(response => {
      Object.keys(response.data).forEach(key => {
        if (key !== "length") {
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
