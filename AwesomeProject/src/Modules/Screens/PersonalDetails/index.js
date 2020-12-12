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
import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import HandleBack from '../../../SharedComponents/HandleBack';
import getStatusBarHeight from '../../../SharedComponents/StatusBarHeight';
import Dash from 'react-native-dash';
import ContinueButton from '../../../SharedComponents/ContinueButton';
import GLOBAL_DATA from '../../../Data/DataFile';
import GlobalStyles from '../../../CSS/GlobalStyles';

export default function PersonalDetails(props) {

  const onPress = () => {
   props.navigation.navigate('MobileNumber');
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

          <Text
            style={styles.headingText}
          >Your Details</Text>

          <KeyboardAvoidingView
            style={styles.innCont}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldName}
              >
                Name
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />

            </View>
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldValue}
              >
                {GLOBAL_DATA.fullName}
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />

            </View>
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldName}
              >
                Mobile No
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />

            </View>
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldValue}
              >
                {GLOBAL_DATA.mobileNumber}
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />
            </View>
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldName}
              >
                Upi Id
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />
            </View>
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldValue}
              >
                {GLOBAL_DATA.upiId}
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />

            </View>
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldName}
              >
                Profession
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />

            </View>
            <View
              style={styles.fieldContainer}
            >
              <Text
                style={styles.fieldValue}
              >
                {GLOBAL_DATA.profession}
              </Text>
              <Dash
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                dashThickness={1}
                dashColor={GlobalStyles.border_color}
              />

            </View>
          </KeyboardAvoidingView>
          <View style={styles.bottomContainer}
          >
            <ContinueButton
              onPress={onPress}
              primaryText={'Continue'}
            />
          </View>

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
  },
  innCont: {
    width: '100%',
    height: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GlobalStyles.color_white,
    borderRadius: 5,
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2 }, // For IOS
    shadowColor: '#000000',
    padding: 12,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: 'Montserrat-Light',
    fontWeight: '500',
    color: GlobalStyles.heading_color,
    fontSize: GlobalStyles.text_size_s,
    marginVertical: '2.5%',
  },
  fieldContainer: {
    width: '100%',
    height: '12.5%',
  },
  fieldName: {
    fontFamily: 'Montserrat-Light',
    color: GlobalStyles.heading_color,
    fontSize: GlobalStyles.text_size_s,
    fontWeight: '500',
    marginTop: '2.5%',
    marginLeft: '2%',
  },
  fieldValue: {
    fontFamily: 'Montserrat-Light',
    color: GlobalStyles.color_primary,
    fontSize: GlobalStyles.text_size_s,
    fontWeight: '500',
    marginTop: '2.5%',
    marginLeft: '2%',
  },
});
