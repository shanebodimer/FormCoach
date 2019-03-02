import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    // paddingTop: 10,
    overflow: 'scroll',
    backgroundColor: '#777171'
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFEB3C'
  },
  rank_append: {
    fontSize: 20,
    color: '#FFEB3C'
  },
  card: {
    backgroundColor: '#483F40',

    marginTop: 15,
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 0,
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  crest: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  f22: {
    fontSize: 18
  },
  f24: {
    fontSize: 22
  },
  bold: {
    fontWeight: 'bold'
  }
})
