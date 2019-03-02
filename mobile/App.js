
import React from 'react'
import { Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { createStackNavigator } from 'react-navigation'

// Components
import Calendar from './panels/calendar/calendar_panel'
import Rules from './panels/rules_panel/rules_panel'
import Score from './panels/scoreboard/score_panel'
import InfoScreen from './panels/info_screen/info'

// Styles
import styles from './panels/panel_styles'

class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    
    // Store house data
    this.state = {
      index: 0,
      routes: [
        { key: 'score', title: 'Scoreboard' },
        { key: 'calendar', title: 'Calendar' },
        { key: 'rules', title: 'Rule Book' }
      ]
    }
    
    // Bind state functions
    this._renderTabBar = this.renderTabBar.bind(this)
  }

  static navigationOptions = { title: 'Home', header: null}

  renderTabBar (props) {
    return (
      <TabBar
        {...props}
        renderLabel={ (route) =>
          <Text style ={{ color: '#fff', paddingBottom: 15 }}>
            {route.route.title}
          </Text>
        }
        style={styles.header}
      />
    )
  }

  render () {
    return (
      <View
        style = {{
          flexGrow: 1
        }}
      >
        <View
          style = {{
            flex: 2,
            paddingTop: 25,
            backgroundColor: '#474040',
            borderBottomWidth: 1,
            borderBottomColor: '#3d3737',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style = {{
            fontSize: 25,
            color: '#fff'
          }}> Greek Week 2018
          </Text>
          <TouchableOpacity
            onPress = {() => this.props.navigation.navigate('Info')}
            style = {{paddingRight: 10, paddingTop: 5}}
          >
            <View
              style = {{
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                borderRadius: 100,
                backgroundColor: '#fff'
              }}>
              <Text style = {{color: '#474040', fontSize: 17, fontStyle: 'italic', fontFamily: 'serif'}}> i </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TabView
          style = {{
            flex: 30
          }}
          navigationState={this.state}
          renderTabBar= {this._renderTabBar}
          renderScene={SceneMap({
            score: Score,
            calendar: Calendar,
            rules: Rules
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}/>
      </View>
    )
  }
}

export default createStackNavigator({
  Home: { screen: HomeScreen },
  Info: { screen: InfoScreen }
})
