import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#777171',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 30,
    alignItems: 'stretch'
  },
  dayListContainer: {
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1
  },
  dayList: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1
  },
  dayButton: {
    backgroundColor: '#232323',
    borderRadius: 50,
    height: 40,
    width: 40,
    alignContent: 'center',
    justifyContent: 'center'
  },
  currentDateDisplay: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
    paddingLeft: 10
  },

  eventCard: {
    backgroundColor: '#483F40',

    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  f24: {
    fontSize: 24
  },
  bold: {
    fontWeight: 'bold'
  }
})
