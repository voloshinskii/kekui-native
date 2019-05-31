import React, {Component} from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../style/colors';

/**
 * Button component.
 */

export default class KekButton extends Component {
  render() {
    const {bordered, disabled, size, fontFamily, color, title, styles, ...restProps} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.45}
        disabled={disabled}
        style={{
          ...size[size],
          ...buttonStyle.default,
          backgroundColor: `${ disabled ? colors[color].lighten : colors[color].primary }`,
          borderWidth: `${ bordered ? 1 : 0 }`,
          borderColor: `${ bordered && colors[color].darken }`,
        }}
        {...restProps}
      >
        <Text style={{
          ...textSize[size],
          fontFamily,
          color: colors[color].text
        }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

KekButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf(['pink', 'green', 'yellow', 'blue', 'purple']),
  fontFamily: PropTypes.string,
  size: PropTypes.oneOf(['normal']),
  disabled: PropTypes.bool,
  bordered: PropTypes.bool
}

KekButton.defaultProps = {
  title: "Submit",
  accessibilityLabel: "Submit",
  color: "blue",
  styles: {},
  fontFamily: "Roboto",
  size: 'normal',
  disabled: false,
  bordered: false
};

const buttonStyle = StyleSheet.create({
  default: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 5
  },
});

const size = StyleSheet.create({
  little: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  normal: {
    paddingHorizontal: 28,
    paddingVertical: 9,
  }
});

const textSize = StyleSheet.create({
  little: {
    fontSize: 16
  },
  normal: {
    fontSize: 18
  }
});
