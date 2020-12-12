/* eslint-disable quotes,react/no-unescaped-entities */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-console */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-return-assign */
import React, { useState, useEffect, useCallback } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import HandleBack from '../../../SharedComponents/HandleBack';
import getStatusBarHeight from '../../../SharedComponents/StatusBarHeight';
import Dash from 'react-native-dash';
import ContinueButton from '../../../SharedComponents/ContinueButton';
import GLOBAL_DATA from '../../../Data/DataFile';
import GlobalStyles from '../../../CSS/GlobalStyles';
import Logo from '../../../../Assets/logo.svg';
import BrandName from '../../../../Assets/goDutch.svg';

export default function MobileNumber(props) {
  const [phoneNumberState, setPhoneNumber] = useState(null);

  const reset = useCallback(() => {
    setPhoneNumber(null)
  }, [null])

  useEffect(() => {
      if (phoneNumberState !== null && phoneNumberState.length === 10) {
        Keyboard.dismiss();
      }
  })

  const submitMobileNumber = () => {
    const pattern = /^[6-9][0-9]{9}$/;
    const { navigation } = props;
    if (!pattern.test(phoneNumberState) || phoneNumberState.length !== 10) {
      Keyboard.dismiss();
      Toast.show('Please enter a valid mobile number', Toast.LONG, ['RCTModalHostViewController', 'UIAlertController']);
    } else {
      GLOBAL_DATA.mobileNumber = phoneNumberState;
      reset();
      navigation.navigate('AccountSetup');
    }
  };

  const onPress = () => {
    if(phoneNumberState !== null && phoneNumberState.length === 10) {
      submitMobileNumber();
    } else {
      Toast.show('Please enter a valid mobile number', Toast.LONG, ['RCTModalHostViewController', 'UIAlertController']);
    }
  }

  const onBack = () => true;
    return (
      <>
        <HandleBack onBack={onBack}>
          {Platform.OS === 'ios' ? (
            <View
              style={{
                backgroundColor: GlobalStyles.bg_color,
                height: getStatusBarHeight(),
                zIndex: 1000,
              }}
            >
              <StatusBar barStyle="dark-content" backgroundColor={GlobalStyles.bg_color} animated />
            </View>
          ) : null}
          <View style={styles.mainCont}>
            {Platform.OS === 'android' ? (
              <StatusBar barStyle="dark-content" backgroundColor={GlobalStyles.bg_color} animated />
            ) : null}

              <KeyboardAvoidingView
                style={styles.innCont}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <View
                  style={styles.topContainer}
                >
                  <Logo width={37} height={37} style={{
                    marginRight: 5,
                  }}/>
                  <BrandName width='40%' height='50%' style={{
                    marginLeft: 5,
                  }}/>
                  <Dash
                    style={{
                    flexDirection: 'row',
                    width: '85%',
                    position: 'absolute',
                    bottom: 0,
                  }}
                    dashThickness={1}
                    dashColor={GlobalStyles.border_color}
                  />

                </View>
                <View style={styles.inputCont}>
                  <Text style={styles.phoneNumbText}>Mobile Number
                    <Text style={[styles.phoneNumbText, {color: '#D33A57'}]}>
                      *
                    </Text>
                  </Text>
                  <View style={styles.phoneNumbInnCont}>
                    <View style={styles.phoneTextCont}>
                      <TextInput
                        style={styles.numTextInputStyle2}
                        selectionColor="black"
                        keyboardType="number-pad"
                        textAlign="center"
                        backgroundColor={GlobalStyles.color_white}
                        value={phoneNumberState}
                        maxLength={10}
                        textContentType="telephoneNumber"
                        onChangeText={(text) => setPhoneNumber(text)}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.bottomContainer}
                >
                  <ContinueButton
                    onPress={onPress}
                    primaryText={'Continue'}
                  />
                </View>
              </KeyboardAvoidingView>

          </View>
        </HandleBack>
      </>
    );
}

const styles = StyleSheet.create({
  mainCont: {
    width: '100%',
    height: '100%',
    backgroundColor: GlobalStyles.bg_color,
    paddingHorizontal: '3%',
    paddingTop: '20%',
  },
  innCont: {
    width: '100%',
    height: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GlobalStyles.color_white,
    borderRadius: 5,
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2 }, // For IOS
    shadowColor: '#000000',
  },
  textInput: {
    width: '100%',
    textAlign: 'center',
  },
  inputCont: {
    width: '92.5%',
    backgroundColor: GlobalStyles.color_white,
  },
  phoneNumbText: {
    fontSize: GlobalStyles.text_size_s,
    marginTop: 10,
    marginBottom: 10,
    color: GlobalStyles.heading_color,
    textAlign: 'left',
    lineHeight: 18,
    fontFamily: 'Montserrat-Light',
    fontWeight: '500',
  },
  phoneNumbInnCont: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  phoneTextCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GlobalStyles.border_color,
    width: '100%',
  },
  numTextInputStyle2: {
    width: '100%',
    fontSize: GlobalStyles.text_size_s,
    fontFamily: 'Montserrat-Light',
    fontWeight: '400',
    color: GlobalStyles.heading_color,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    height: 50,
  },
  topContainer: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
  },
  bottomContainer: {
    width: '100%',
    height: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
