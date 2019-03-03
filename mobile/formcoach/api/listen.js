import axios from "axios";

var ws = new WebSocket("ws://host.com/path");

export const listen = () =>
  axios
    .get(`https://formcoach.appspot.com/api`)
    .then(function(response) {
      console.log(response);
      return true;
    })
    .catch(function(error) {
      // Do nothing on error
      return true;
    });
