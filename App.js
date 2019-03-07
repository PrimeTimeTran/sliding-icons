import React from 'react'
import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native'

import { Icon } from 'react-native-elements'

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const { height, width } = Dimensions.get('screen')

export default class App extends React.Component {
  state = {
    shouldShowStickyHeader: false,
    scrollY: new Animated.Value(1)
  }

  componentDidMount() {
    this.state.scrollY.addListener(({ value }) => {
      const shouldShowStickyHeader = value > 90
      this.setState({ shouldShowStickyHeader, animatedPadding: value })
    })
  }

  keyExtractor = item => item.toString()

  renderItem = item => {
    const { evenRowStyle, oddRowStyle } = styles
    if ( item % 2 === 0 ) return <View style={evenRowStyle} />
    return <View style={oddRowStyle} />
  }

  renderHeader = () => {
    const { animatedViewStyle } = styles
    let { shouldShowStickyHeader, animatedPadding } = this.state

    if (animatedPadding > 90) animatedPadding = 90
    const animatedStyle = {
      paddingLeft: animatedPadding,
      paddingRight: animatedPadding / 2
    }

    if (!shouldShowStickyHeader) {
      return (
        <Animated.View style={[animatedViewStyle, animatedStyle]}>
          <Icon
            reverse
            type='ionicon'
            color='#517fa4'
            name='ios-american-football'
          />

          <Icon
            reverse
            color='#f50'
            name='heartbeat'
            type='font-awesome'
          />

          <Icon
            reverse
            type='ionicon'
            color='#507fa4'
            name='ios-american-football'
          />

          <Icon
            reverse
            color='#f50'
            name='heartbeat'
            type='font-awesome'
          />
        </Animated.View>
      )
    }
    return <View />
  }

  renderStickerHeader = () => {
    const { stickerHeaderStyle } = styles
    return (
      <View style={stickerHeaderStyle}>
        <Icon
          type='ionicon'
          color='#517fa4'
          name='ios-american-football'
        />
        <Icon
          color='#f50'
          name='heartbeat'
          type='font-awesome'
        />
        <Icon
          type='ionicon'
          color='#507fa4'
          name='ios-american-football'
        />
        <Icon
          color='#f50'
          name='heartbeat'
          type='font-awesome'
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.shouldShowStickyHeader && this.renderStickerHeader() }
        <FlatList
          data={rows}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => this.renderItem(item)}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  evenRowStyle: {
    width,
    backgroundColor: 'lightblue',
    height: height * 0.2
  },
  oddRowStyle: {
    width,
    backgroundColor: 'lightpink',
    height: height * 0.2
  },
  stickerHeaderStyle: {
    width,
    height: 90,
    paddingLeft: 80,
    paddingRight: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'yellow',
    justifyContent: 'space-around'
  },
  animatedViewStyle: {
    width,
    height: 180,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'yellow',
    justifyContent: 'space-around'
  }
})
