/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prop-types */
import React from 'react';
import { withNavigation } from 'react-navigation';
import { BackHandler, View } from 'react-native';

class HandleBack extends React.Component {
  constructor(props) {
    super(props);
    this.didFocus = props.navigation.addListener('didFocus', () => BackHandler.addEventListener('hardwareBackPress', this.onBack));
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.willBlur = navigation.addListener('willBlur', () => BackHandler.removeEventListener('hardwareBackPress', this.onBack));
  }

  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
  }

  onBack = () => this.props.onBack();

  render() {
    const { children } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {children}
      </View>
    );
  }
}
export default withNavigation(HandleBack);
