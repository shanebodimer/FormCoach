import React from 'react'
import { View, Text, Image, FlatList, StyleSheet, ListView } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

// Styles
import styles from './rules_styles'

// Images
import chevDown from '../../images/chev-down-white.png'

// Sport image imports
const sports = {
  'Corn Hole': require('../../images/events/cornhole.png'),
  'Chariot Race': require('../../images/events/crown.png'),
  'Ultimate Frisbee': require('../../images/events/frisbee.png'),
  'Homerun Derby': require('../../images/events/baseball.png'),
  'Volleyball': require('../../images/events/volleyball.png'),
  'Impersonation Contest': require('../../images/events/clown.png'),
  'Trivia Contest': require('../../images/events/trivia.png'),
  'Egg Toss': require('../../images/events/eggs.png'),
  '3-Legged Race': require('../../images/events/three.png'),
  'Idi-Relay': require('../../images/events/relay.png'),
  'Tire Roll': require('../../images/events/tire.png'),
  'Football Challenge': require('../../images/events/football.png'),
  'Limbo': require('../../images/events/limbo.png'),
  '100-Meter Sprint': require('../../images/events/sprint.png'),
  'Long Jump': require('../../images/events/jump.png'),
  'Loading Race': require('../../images/events/box.png'),
  'Rock Drag': require('../../images/events/rock.png'),
  'Rope Climb': require('../../images/events/rope.png'),
  'Pushups': require('../../images/events/pushups.png'),
  'Crucifix Hold': require('../../images/events/t.png'),
  'Farmers Carry': require('../../images/events/dumbbell.png'),
  'T-Test': require('../../images/events/running.png'),
  'Dead Hang': require('../../images/events/pullups.png'),
  'Planking': require('../../images/events/pushups.png'),
  'Kettle Bell Toss': require('../../images/events/kettlebell.png'),
  'Tire Run': require('../../images/events/tire.png'),
  'Pull-Ups': require('../../images/events/pullups.png'),
  'Bodyweight Bench': require('../../images/events/bench.png'),
  'Keg Toss': require('../../images/events/keg.png'),
  'Tire Flip': require('../../images/events/tire.png'),
  'Obstacle Course': require('../../images/events/obstacle.png'),
  'Soccer': require('../../images/events/soccer.png'),
  'Punt, Pass, Kick': require('../../images/events/football.png'),
  'Ladder Ball': require('../../images/events/ladder.png'),
  'Tug of War': require('../../images/events/pull.png')
}

export default class SubRule extends React.Component {
  render () {
    return (
      <Collapse style={styles.subEvent}>

        {/* Header */}
        <CollapseHeader style={styles.subHeader}>
          <View style={styles.subHeaderName}>
            <Image style={styles.subIcon} source={sports[this.props.rule.name]} />
            <Text style={styles.subHeaderText}>{this.props.rule.name}</Text>
          </View>
          <Image style={styles.subIcon} source={chevDown} />
        </CollapseHeader>

        {/* Sub events */}
        <CollapseBody>
          <View style={styles.subRules}>
            {this.props.rule.Rules &&
                <FlatList
                  data={this.props.rule.Rules}
                  renderItem={({item}) => <Text style={styles.subItem}>{item.subrule}</Text>}
                  keyExtractor={(item, index) => index.toString()}
                />
            }
          </View>
        </CollapseBody>

      </Collapse>

    )
  }
}
