import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Modal component.
 */

export default class KekModal extends Component {
  constructor() {
    super();
    this.state={
      closed: false,
      closeProcess: false,
    }

    this.closeAnimation = this.closeAnimation.bind(this);
    this.getHeight = this.getHeight.bind(this);

    this._bottom = new Animated.Value(-300);
    this._opacity = new Animated.Value(0);
  }

  getHeight(e){
    this.setState({
      height: e.nativeEvent.layout.height,
    })
  }

  componentDidMount(){
    Animated.timing(
      this._bottom,
      {
        toValue: 10,
        duration: 350,
      }
    ).start();

    Animated.timing(
      this._opacity,
      {
        toValue: 0.45,
        duration: 350,
      }
    ).start();
  }

  async closeAnimation(){
    await this.setState({closeProcess: true});

    Animated.timing(
      this._bottom,
      {
        toValue: (this.state.height * -1) -200,
        duration: 350,
      }
    ).start();

    Animated.timing(
      this._opacity,
      {
        toValue: 0,
        duration: 350,
      }
    ).start();

    //If we have onClose action func
    if(this.props.onClose) return setTimeout(() => this.props.onClose(), 350);

    //else
    await setTimeout(() => this.setState({closed: true}), 350);

  }

  render() {
    const {title, style, ...restProps} = this.props;
    if(!this.state.closed){
      return (
        <View style={{...style, ...modalStyle.cover}}>
          <Animated.View style={{zIndex: 4999, position: 'absolute', top: 0, width: '100%', height: '100%', backgroundColor: 'black', opacity: this._opacity}}>
            <TouchableOpacity style={{zIndex: 4999, position: 'absolute', top: 0, width: '100%', height: '100%'}} onPress={this.closeAnimation}/>
          </Animated.View>
          <Animated.View
            onLayout={this.getHeight}
            style={{...style, ...modalStyle.modal, bottom: this._bottom}}
          >
            {title && <Text style={{...modalStyle.title}}>{title}</Text>}
            {this.props.children}
          </Animated.View>
        </View>
      );
    }
    return <View/>;
  }
}

KekModal.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  title: PropTypes.string
}

KekModal.defaultProps = {

};

const modalStyle = StyleSheet.create({
  cover: {
    position: 'absolute',
    top: 0,
    zIndex: 4995,
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 35,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 5000,
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30
  },
});
