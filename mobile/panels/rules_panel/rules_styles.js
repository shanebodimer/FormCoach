import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: '#777171'
  },
  events: {
    marginTop: 15,
    borderRadius: 4,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 10,
    backgroundColor: '#483F40',

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subEvents: {
    marginTop: -3,
    marginBottom: 0,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#483F40',

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 22,
    color: 'white'
  },
  subEvent: {
    width: '100%',
    padding: 10,
    marginTop: 5,
    borderRadius: 4,
    backgroundColor: '#777171'
  },
  subIcon: {
    width: 15,
    height: 15
  },
  subHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subHeaderName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  subHeaderText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10
  },
  subRules: {
    marginTop: 10
  },
  subItem: {
    padding: 10,
    color: 'white'
  }
})
