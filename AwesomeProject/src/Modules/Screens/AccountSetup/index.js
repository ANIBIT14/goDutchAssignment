/* eslint-disable no-nested-ternary,max-len */
/* eslint-disable quotes */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-console */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-string-refs */
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
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import Toast from 'react-native-simple-toast';

import getStatusBarHeight from '../../../SharedComponents/StatusBarHeight';
import GlobalStyles from '../../../CSS/GlobalStyles';
import GLOBAL_DATA from '../../../Data/DataFile';
import HandleBack from '../../../SharedComponents/HandleBack';
import ContinueButton from '../../../SharedComponents/ContinueButton';
import Logo from '../../../../Assets/logo.svg';

const pattern = /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/;

const screenHeight = Dimensions.get('screen').height;

export default class AccountSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profession: null,
      upiId: null,
      fullName: null,
      scroll: false,
      scrollMargin: 0,
    };

    this.textInputRef1 = React.createRef();
    this.scrollView = React.createRef();
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    this.setState({
      scroll: true,
      scrollMargin: event.endCoordinates.height,
    });
  };

  _keyboardDidHide = (event) => {
    this.setState({
      scroll: false,
      scrollMargin: 0,
    });
  };

  onPress = () => {
    const {
      profession,
      upiId,
      fullName,
    } = this.state;
    const { navigation } = this.props;
    if(profession !== null) {
     if(fullName !== null && fullName.trim().length !== 0) {
       if(upiId !== null) {
         if(pattern.test(upiId)) {
           GLOBAL_DATA.profession = profession;
           GLOBAL_DATA.fullName = fullName;
           GLOBAL_DATA.upiId = upiId;
           navigation.navigate('PersonalDetails');
         } else {
           Toast.show('Please enter a valid UPI ID', Toast.LONG, ['RCTModalHostViewController', 'UIAlertController']);
         }
       } else{
         Toast.show('Please enter your UPI ID', Toast.LONG, ['RCTModalHostViewController', 'UIAlertController']);
       }
     } else {
       Toast.show('Please enter your full name', Toast.LONG, ['RCTModalHostViewController', 'UIAlertController']);
     }
    } else {
      Toast.show('Please select profession', Toast.LONG, ['RCTModalHostViewController', 'UIAlertController']);
    }
  }

  render() {
    const {
     upiId,
      fullName,
      profession,
    } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <HandleBack onBack={() => true}>
        { Platform.OS === 'ios' ? (
          <View
            style={{
              backgroundColor: GlobalStyles.bg_color,
              height: getStatusBarHeight(),
              zIndex: 1000,
            }}
          >
            <StatusBar barStyle="dark-content" backgroundColor={GlobalStyles.bg_color} animated />
          </View>
        ) : null }
          <KeyboardAvoidingView keyboardVerticalOffset={-screenHeight / 2} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.mainCont}>
          { Platform.OS === 'android' ? (
            <StatusBar barStyle="dark-content" backgroundColor={GlobalStyles.bg_color} animated />
          ) : null }
            <ScrollView
              style={{
                // width: '100%',
                // height: '100%',
              }}
              ref={this.scrollView}
              contentContainerStyle={{
                justifyContent: 'flex-start',
                flex: 1,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              scrollEnabled={true}
            >
              <Text
                style={styles.headingText}
              >setup your GoDutch account</Text>
              <View style={styles.inputCont}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: GlobalStyles.bg_color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: '2.5%',
                  }}
                >
                  <Logo width="75%" height="75%" />
                </View>
                <View
                  style={{
                    width: '92.5%',
                    height: '12.5%',
                  }}
                >
                  <Text
                    style={[styles.headingText, {marginVertical: '1%'}]}
                  >current Profession</Text>
                  <View
                    style={styles.professionButtonContainer}
                  >
                    <TouchableOpacity
                      style={[styles.professionButton,{
                        borderColor: profession === 'Student' ? GlobalStyles.color_primary : GlobalStyles.border_color,
                      }]}
                      activeOpacity={0.8}
                      onPress={() => {
                        GLOBAL_DATA.profession = 'Student';
                        this.setState({
                          profession: 'Student',
                        })
                      }}
                    >
                      <Text
                        style={[styles.headingText, {
                          fontWeight: '400',
                          color: profession === 'Student' ? GlobalStyles.color_primary : GlobalStyles.heading_color,
                        }]}
                      >
                        Student
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.professionButton,{
                        borderColor: profession === 'Professional' ? GlobalStyles.color_primary : GlobalStyles.border_color,
                      }]}
                      activeOpacity={0.8}
                      onPress={() => {
                        GLOBAL_DATA.profession = 'Professional';
                        this.setState({
                          profession: 'Professional',
                        })
                      }}
                    >
                      <Text
                        style={[styles.headingText, {
                          fontWeight: '400',
                          color: profession === 'Professional' ? GlobalStyles.color_primary : GlobalStyles.heading_color,
                        }]}
                      >
                        Professional
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputBoxCont}>
                  <Text style={styles.headingText}>full name
                    <Text style={[styles.headingText, {color: '#D33A57'}]}>
                      *
                    </Text>
                  </Text>
                  <View style={styles.innCont}>
                    <View style={styles.inputTextCont}>
                      <TextInput
                        style={styles.numTextInputStyle2}
                        selectionColor={GlobalStyles.color_black}
                        textAlign="center"
                        textContentType="name"
                        maxLength={50}
                        value={fullName}
                        onChangeText={(text) => {
                          this.setState({
                            fullName: text,
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.inputBoxCont}>
                  <Text style={styles.headingText}>UPI ID
                    <Text style={[styles.headingText, {color: '#D33A57'}]}>
                      *
                    </Text>
                  </Text>
                  <View style={styles.innCont}>
                    <View style={styles.inputTextCont}>
                      <TextInput
                        style={styles.numTextInputStyle2}
                        selectionColor={GlobalStyles.color_black}
                        textAlign="center"
                        value={upiId}
                        onChangeText={(text) => {
                          this.setState({
                            upiId: text,
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.bottomContainer}
                >
                  <ContinueButton
                    onPress={this.onPress}
                    primaryText={'Continue'}
                  />
                </View>
              </View>
            </ScrollView>

        </View>
          </KeyboardAvoidingView>
        </HandleBack>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: GlobalStyles.bg_color,
    paddingHorizontal: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputCont: {
    width: '99%',
    backgroundColor: GlobalStyles.color_white,
    borderRadius: 5,
    elevation: 5,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2 }, // For IOS
    shadowColor: GlobalStyles.color_black,
    alignItems: 'center',
    height: '90%',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  inputBoxCont: {
    marginTop: 4,
    width: '92.5%',
  },
  innCont: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: 6,
    alignItems: 'center',
    height: 50,
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
  headingText: {
    fontFamily: 'Montserrat-Light',
    fontWeight: '500',
    color: GlobalStyles.heading_color,
    fontSize: GlobalStyles.text_size_s,
    marginVertical: '2.5%',
  },
  professionButton: {
    width: '47.5%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  professionButtonContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputTextCont: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GlobalStyles.border_color,
    width: '100%',
    height: 50,
},
  bottomContainer: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
