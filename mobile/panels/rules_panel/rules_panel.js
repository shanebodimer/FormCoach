import React from 'react'
import axios from 'axios'
import { View, Text, Image, ScrollView, RefreshControl, TouchableCapacity } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

// Utilities
import { recordPageView } from '../../utilities/analytics'

// Components
import SubRule from './sub_rule'

// Data
import rules from './rules.json'

// Styles
import styles from './rules_styles'

// Images
import chevDown from '../../images/chev-down.png'

export default class Rules extends React.Component {
  // When page loads
  componentDidMount () {
    recordPageView('Rules-Init')
  }

  render () {
    return (
      <ScrollView
        style={styles.container}
        horizontal={false}
      >

        {/* Event list */}
        {rules && rules.map((event, i) => {
          return (
            <Collapse key={i}>

              {/* Header */}
              <CollapseHeader style={styles.events}>
                <Text style={styles.header}>{event.name}</Text>
                <Image style={{width: 20, height: 20}} source={chevDown} />
              </CollapseHeader>

              {/* Sub events */}
              <CollapseBody style={styles.subEvents}>
                <View style={{width: '100%'}}>
                  {event.SubEvents && event.SubEvents.map((sub, i) => {
                    return (<SubRule key={i} rule={sub}/>)
                  })}
                </View>
              </CollapseBody>

            </Collapse>
          )
        })}

        {/* Bottom padding */}
        <Text style={{ width: '100%', height: 15 }}></Text>

      </ScrollView>
    )
  }
}
