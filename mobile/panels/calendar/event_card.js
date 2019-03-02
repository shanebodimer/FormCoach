import React from 'react'
import { Text, Image, View, TouchableOpacity, Linking, TouchableWithoutFeedback } from 'react-native'
import styles from './calendar_styles'

// Images
import chevDown from '../../images/chev-down-white.png'

export default class EventCard extends React.Component {
  constructor (props) {
    super(props)

    // Store house data
    this.state = {
      expanded: false
    }
  }
  resetExpands () {
    this.setState({expanded: false})
  }

  detailtoggle () {
    let old = this.state.expanded
    this.setState({expanded: !old})
  }
  render () {
    return (
      <TouchableOpacity
        onPress = { () => { this.detailtoggle() } }
      >
        <View
          style={styles.eventCard}>
          <View
            style={{ // main details
              flexDirection: 'row'
            }}
            justifyContent = 'space-between'
          >
            <Text
              style={{ // event name
                color: '#ffffff',
                fontSize: 20
              }}
            >{this.props.name}</Text>
            <View
              style = {{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#ffffff'
                }} // time
              >{this.props.time}</Text>
              <Image style={{width: 20, height: 20, marginLeft: 5}} source={chevDown} />
            </View>
          </View>
          {this.state.expanded // expanded details
            ? <View
              justifyContent = 'flex-start'>
              <TouchableWithoutFeedback>
                <TouchableOpacity onPress = {() => Linking.openURL(this.props.locationLink)}>
                  <Text style={{color: '#ffffff'}}>Location: <Text style = {{color: 'lightblue'}}>{this.props.location}{'\n'}</Text></Text>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
              <Text style={{color: '#ffffff'}}>{this.props.details}</Text>
            </View>
            : null }
        </View>
      </TouchableOpacity>
    )
  }
}
