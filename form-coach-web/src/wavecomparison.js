// Get the user data for an action
// Get the "good" form data for the action

// Simple Implementation:
// Waveforms are lined up by data point 0
// For each of the 2 data points, take the absolute difference.
// Use the set of absolute differences to calculate Sample Variance

// absdiffs = []
// for i in set1:
//  absdiffs.append(abs(set1[i] - set2[i]))
// variance = variance(absdiffs)

// Normalize variance values
//  - To do this we need a set of variances
//  - We need multiple good form datasets

var variance = require("compute-variance");

const ACCELERATION = "a";
const GYROSCOPE = "g";

const varianceCalc = (userData, idealData, range) => {
  // var userLength = userData.length;

  // Find the max entries for each data set
  var maxUserAcc = findMax(userData, ACCELERATION);
  var maxIdealAcc = findMax(idealData, ACCELERATION);
  var maxUserGyro = findMax(userData, GYROSCOPE);
  var maxIdealGyro = findMax(idealData, GYROSCOPE);

  var maxUserAccID = maxUserAcc[0];
  var maxIdealAccID = maxIdealAcc[0];
  var maxUserGyroID = maxUserGyro[0];
  var maxIdealGyroID = maxIdealGyro[0];

  // Calculate abs diffs
  var accAbsDiffs = getAbsDiffs(
    userData,
    idealData,
    maxUserAccID,
    maxIdealAccID,
    range,
    ACCELERATION
  );
  var gyroAbsDiffs = getAbsDiffs(
    userData,
    idealData,
    maxUserGyroID,
    maxIdealGyroID,
    range,
    GYROSCOPE
  );

  var accVariance = variance(accAbsDiffs);
  var gyroVariance = variance(gyroAbsDiffs);

  return [accVariance, gyroVariance];
};

// Returns the [maxIndex, maxValue] of an array of objects
function findMax(arr, measure) {
  if (arr.length === 0) {
    return -1;
  }

  if (measure === ACCELERATION) {
    let max = arr[0].aMag;
    let maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i].aMag > max) {
        maxIndex = i;
        max = arr[i];
      }
    }
    return [maxIndex, max];
  } else {
    let max = arr[0].gMag;
    let maxIndex = 0;

    for (i = 1; i < arr.length; i++) {
      if (arr[i].gMag > max) {
        maxIndex = i;
        max = arr[i];
      }
    }
    return [maxIndex, max];
  }
}

//
function getAbsDiffs(
  userData,
  idealData,
  userMaxID,
  idealMaxID,
  range,
  measure
) {
  var absDiffsTop = [];
  var absDiffsBot = [];

  var interval = Math.ceil(range / 2);

  // ACCELEROMETER DATA
  if (measure === ACCELERATION) {
    let i, j;
    // Loop to go from max up up to range/2
    for (i = userMaxID, j = idealMaxID; i < userMaxID + interval; i++, j++) {
      try {
        absDiffsTop[absDiffsTop.length] = Math.abs(
          userData[i].aMag - idealData[j].aMag
        );
      } catch (err) {
        break;
      }
    }
    // Loop to go from max down to range/2
    for (
      i = userMaxID - 1, j = idealMaxID - 1;
      i > userMaxID - interval;
      i--, j--
    ) {
      try {
        absDiffsBot[absDiffsBot.length] = Math.abs(
          userData[i].aMag - idealData[j].aMag
        );
      } catch (err) {
        break;
      }
    }
  }
  // GYRO DATA
  else {
    let i, j;
    // Loop to go from max up up to range/2
    for (i = userMaxID, j = idealMaxID; i < userMaxID + interval; i++, j++) {
      try {
        absDiffsTop[absDiffsTop.length] = Math.abs(
          userData[i].gMag - idealData[j].gMag
        );
      } catch (err) {
        break;
      }
    }
    // Loop to go from max down to range/2
    for (
      i = userMaxID - 1, j = idealMaxID - 1;
      i > userMaxID - interval;
      i--, j--
    ) {
      try {
        absDiffsBot[absDiffsBot.length] = Math.abs(
          userData[i].gMag - idealData[j].gMag
        );
      } catch (err) {
        break;
      }
    }
  }
  return [...absDiffsBot, ...absDiffsTop];
}

export default varianceCalc;
