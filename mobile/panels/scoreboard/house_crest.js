import React from 'react'
import { View, Image } from 'react-native'

// Styles
import styles from './score_styles'

// Image imports
const crests = {
  'DSP': require('../../images/crests/dsp.png'),
  'TKE': require('../../images/crests/tke.png'),
  'SIGCHI': require('../../images/crests/sigchi.png'),
  'SIGPI': require('../../images/crests/sigpi.png'),
  'KA': require('../../images/crests/ka.png'),
  'AEPI': require('../../images/crests/aepi.png'),
  'BSP': require('../../images/crests/bsp.png'),
  'DTD': require('../../images/crests/dtd.png'),
  'KSIG': require('../../images/crests/ksig.png'),
  'LCA': require('../../images/crests/lca.png'),
  'PHIKAPS': require('../../images/crests/phikaps.png'),
  'PIKE': require('../../images/crests/pike.png'),
  'WACKY': require('../../images/crests/wacky.png'),
  'SIGNU': require('../../images/crests/signu.png'),
  'SIGEP': require('../../images/crests/sigep.png'),
  'SIGTAU': require('../../images/crests/sigtau.png'),
  'TXI': require('../../images/crests/txi.png'),
  'TRI': require('../../images/crests/tri.png')
}

export default class HouseColors extends React.Component {
  render () {
    return (
      <View style={styles.crest}>
        <Image source={crests[this.props.abbr]} alt='' style={{ width: 50, height: 50 }} />
      </View>
    )
  }
}
