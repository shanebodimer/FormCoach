import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Constants } from 'expo'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 50,
    backgroundColor: '#474040',
    paddingTop: 5,
    paddingBottom: 5
  }
})
