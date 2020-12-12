/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  Animated,
  Easing,
  NativeModules,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import { enableScreens } from 'react-native-screens';

import MobileNumber from './src/Modules/Screens/MobileNumber';
import PersonalDetails from './src/Modules/Screens/PersonalDetails';
import AccountSetup from './src/Modules/Screens/AccountSetup';

enableScreens();

if (Text.defaultProps == null) Text.defaultProps = {};
// Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
// Text.defaultProps.allowFontScaling = false;

Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps.adjustsFontSizeToFit = true;
Text.defaultProps.minimumFontScale = 0.5;

console.disableYellowBox = true; // Disable Warnings for Deprecated
const CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  return {
    opacity,
    transform: [{ scaleY }],
  };
};

const SlideFromRight = (sceneIndex, position, width, scene, height, propsIndex, scenes) => {
  // const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [sceneIndex - 1, sceneIndex, sceneIndex + 1],
    outputRange: [width, 0, 0],
  });
  const toIndex = propsIndex;
  const slideFromRight = { transform: [{ translateX }] };
  const lastSceneIndex = scenes[scenes.length - 1].index;
  if (lastSceneIndex - toIndex > 1) {
    // Do not transoform the screen being navigated to
    if (scene.index === toIndex) return;
    // Hide all screens in between
    if (scene.index !== lastSceneIndex) return { opacity: 0 };
    // Slide right
    return slideFromRight;
  }

  return slideFromRight;
};

const TransitionConfiguration = () => ({
  transitionSpec: {
    duration: 500,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const {
      layout, position, scene, index, scenes,
    } = sceneProps;
    const width = layout.initWidth;
    const height = layout.initHeight;
    const { route } = scene;
    const params = route.params || {}; // <- That's new
    const transition = params.transition || 'default'; // <- That's new
    return {
      collapseExpand: CollapseExpand(scene.index, position),
      default: SlideFromRight(scene.index, position, width, scene, height, index, scenes),
    }[transition];
  },
});

const RootStack = createStackNavigator(
  {
    MobileNumber: {
      screen: MobileNumber,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    AccountSetup: {
      screen: AccountSetup,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    PersonalDetails: {
      screen: PersonalDetails,
      navigationOptions: {
        gesturesEnabled: false,
      },
    }
  },
  {
    initialRouteName: 'MobileNumber',
    initialRouteParams: {},
    headerMode: 'none',
    defaultNavigationOptions: {
      headerShown: false,
    },
    transitionConfig: TransitionConfiguration,
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {

  render() {
    return (
      <AppContainer />
    );
  }
}
