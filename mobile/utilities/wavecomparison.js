import Math from 'Math'
// Get the user data for an action
// Get the "good" form data for the action


// Simple Implementation:
// Waveforms are lined up by data point 0
// For each of the 2 data points, take the absolute difference.
// Use the set of absolute differences to calculate Sample Variance

// absdiffs = []
// for i in set1:
//  absdiffs.append(abs(set1[i] - set2[i]))
// variance = Math.var(absdiffs)

// Normalize variance values
//  - To do this we need a set of variances
//  - We need multiple good form datasets

export const varianceCalc = (userData, idealData) => {
  var userLength = userData.length;
  var absDiffs = new Array();
  for (var i =0; i < userLength; i++) {
    absDiffs[absDiffs.length] = abs(userData[i].a.mag - idealData[i].a.mag)
  }
  variance = Math.var(absDiffs)
  return variance
}