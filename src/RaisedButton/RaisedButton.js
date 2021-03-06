import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Animated,
} from 'react-native';

import Button from '../internal/Button';
import Icon from '../Icon';

import styles from './RaisedButton.styles';

/**
 * RaisedButton Component.
 */
export default class RaisedButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elevation: new Animated.Value(2)
    }
  }

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  }

  static propTypes = {
    /**
     * Label for the button.
     */
    label: PropTypes.string.isRequired,

    /**
     * Include icon from left side
     */
    iconLeft: PropTypes.string,

    /**
     * Include icon from right side
     */
    iconRight: PropTypes.string,

    /**
     * Callback function when button is pressed.
     */
    onPress: PropTypes.func,

    /**
     * Callback function when button is long pressed.
     */
    onLongPress: PropTypes.func,

    /**
     * Override button container styles.
     */
    style: PropTypes.object,

    /**
     * If true, colors button according to primary color from the Theme
     */
    primary: PropTypes.bool,

    /**
     * If true, colors button according to secondary color from the Theme
     */
    secondary: PropTypes.bool,

    /**
     * 	Disables the button if set to true.
     */
    disabled: PropTypes.bool,

  }

  static defaultProps = {
    onPress: () => { },
    onLongPress: null,
    style: {},
    labelStyle: {},
    primary: false,
    secondary: false,
    disabled: false
  }

  getIconLeft(style) {
    if (!this.props.iconLeft) {
      return null;
    }
    let styleList = [style.sheet.icon];
    if (this.props.label && this.props.label !== '') {
      styleList.push(style.sheet.iconLeft);
    }
    styleList.push(this.props.labelStyle);
    return <Icon name={this.props.iconLeft} style={styleList} />
  }

  getIconRight(style) {
    if (!this.props.iconRight) {
      return null;
    }
    let styleList = [style.sheet.icon];
    if (this.props.label && this.props.label !== '') {
      styleList.push(style.sheet.iconRight);
    }
    styleList.push(this.props.labelStyle);
    return <Icon name={this.props.iconRight} style={styleList} />
  }

  onPressIn() {
    Animated.timing(this.state.elevation, {
      toValue: 4,
      duration: 200
    }).start();
  }

  onPressOut() {
    Animated.timing(this.state.elevation, {
      toValue: 2,
      duration: 200
    }).start();
  }

  render() {
    const theme = this.context.theme.RaisedButton;
    const props = this.props;
    let style = styles(theme, props);
    return (
      <Button
        style={[style.sheet.container, props.style]}
        rippleColor={style.ripple}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        onPressIn={this.onPressIn.bind(this)}
        onPressOut={this.onPressOut.bind(this)}
        disabled={props.disabled}
        elevation={this.state.elevation}>
        {this.getIconLeft(style)}
        <Text style={[style.sheet.label, props.labelStyle]}>
          {props.label}
        </Text>
        {this.getIconRight(style)}
      </Button>
    );
  }
}