
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
// Remove maybe later button with touchableOpacity

import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../CSS/GlobalStyles';

function ContinueButton (props) {
  return (
      <TouchableOpacity
        style={[
          styles.primaryButton,
        ]}
        onPress={props.onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>{props.primaryText}</Text>
      </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: 180,
    height: 50,
    borderRadius: 5,
    backgroundColor: GlobalStyles.color_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: GlobalStyles.text_size_regular,
    color: GlobalStyles.color_white,
    fontFamily: 'Montserrat-Light',
    fontWeight: '500',
    fontStyle: 'normal',
  },
});

export default ContinueButton;
