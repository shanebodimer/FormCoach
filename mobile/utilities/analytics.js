import axios from 'axios'
import uniqueId from 'react-native-unique-id'

export const recordPageView = (page) =>
// Get device id
  uniqueId()
    .then(id =>

    // Post to endpoint
      axios
        .post(
          `https://shanebodimer.com/api/greekWeek.php`,
          {
            id: id,
            page: page
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .then(function (response) {
          return true
        })
        .catch(function (error) {
          // Do nothing
          return true
        })
    )
