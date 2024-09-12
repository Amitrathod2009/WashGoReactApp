import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageRef, setErrorMessageRef] = useState('');

  const navigation = useNavigation();

  const validateFields = () => {
    if (!phone || !password) {
      setErrorMessageRef('Please fill in all required fields.');
      return false;
    }
    const phoneNumber = phone.replace(/\D/g, '');
    if (phoneNumber.length < 6 || phoneNumber.length > 14) {
      setErrorMessageRef('The phone number must be between 6 and 14 digits.');
      return false;
    }
    return true;
  };

  const loginHandleAuthentication = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const loginPostApi = 'https://tor.appdevelopers.mobi/api/login';
      const data = {
        phone,
        password,
      };

      const response = await axios.post(loginPostApi, data);
      console.log(
        'loginPostApi_Response===>',
        JSON.stringify(response, null, 2),
      );

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        
        const userName = await AsyncStorage.getItem('userName');
        if (userName) {
          await AsyncStorage.setItem('userName', userName);
          console.log('UserName here:', userName);

          console.log("TOKEN===>",response.data.token)
         navigation.navigate('WelcomeScreen', { userName });
         
         setPhone('');
         setPassword('');
         setErrorMessageRef('');
        } else {
          console.error('Username not found in response');
          setErrorMessageRef('Username not found.');
        }
  
      } else {
        console.error('Login failed:', response.data);
        setErrorMessageRef('')
      }
    } catch (error) {
      console.error('API Error:', error);
      setErrorMessageRef('Error, ');
    }
  };
  const onGoogleIconPress = () => {
    Linking.openURL('https://accounts.google.co.in/');
  };
  const onAppleIconPress = () => {
    Linking.openURL('https://www.icloud.com/');
  };

  return (
    <ScrollView style={[styles.mainContainer]}>
      <Image
        source={require('../../src/assets/images/SignInBottomLeft.png')}
        style={styles.bottomLeftAbsImg}
      />
      <View style={[styles.LogoContainer]}>
        <Image
          source={require('../../src/assets/images/Logo.png')}
          style={styles.logoStyle}
        />
      </View>
      <View style={[styles.subContainer]}>
        <View style={[styles.signInContainer]}>
          <Text style={[styles.HeaderTitle]}>Sign In</Text>
          <Text style={[styles.HeaderSubTitle]}>
            Hi ! Welcome back, you{'\n'} have been missed
          </Text>
        </View>
        {errorMessageRef && (
          <Text style={{ color: 'red', marginVertical: 10 }}>
            {errorMessageRef}
          </Text>
        )}
        <View style={[styles.textInputContainer]}>
          <Text style={[styles.inputTextLabel]}>Phone</Text>
          <View style={[styles.inputFieldContainer]}>
            <FontAwesome
              name="phone"
              size={20}
              color="#808080"
              style={[styles.phoneIcon]}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your Phone number"
              onChangeText={setPhone}
              value={phone}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={[styles.textInputContainer]}>
          <Text style={[styles.inputTextLabel]}>Password</Text>
          <View style={[styles.inputFieldContainer]}>
            <Feather name="lock" size={20} color="#808080" />
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              secureTextEntry={secureTextEntry}
              onChangeText={setPassword}
              value={password}
            />
            <View style={[styles.openEyeIcon]}>
              <TouchableOpacity
                style={[]}
                onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Feather
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color="#9B9797"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.forgotPassContainer]}>
          <TouchableOpacity style={[]}>
            <Text style={[styles.forgotPassText]}>Forgot password ?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.signInButton, (!phone || !password) && styles.bgGray]}
          onPress={loginHandleAuthentication}
          disabled={!phone || !password}
        >
          <Text style={[styles.signInBtnText]}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.hrContainer}>
          <View style={styles.hrLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.hrLine} />
        </View>
        <View style={[styles.socialMediaContainer]}>
          <TouchableOpacity onPress={onGoogleIconPress}>
            <Image
              source={require('../../src/assets/images/GoogleIcon.png')}
              style={[styles.IconStyles]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onAppleIconPress}>
            <Image
              source={require('../../src/assets/images/AppleIcon.png')}
              style={[styles.IconStyles]}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.haveAccText]}>
          Don’t have an account?
          {
            <TouchableOpacity
              style={[styles.signInLink]}
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={[styles.signInLinkText]}>Sign Up</Text>
            </TouchableOpacity>
          }
        </Text>
        <Text style={[styles.policyText]}>
          By login or sign up, you agree to our terms of use and privacy policy
        </Text>
      </View>
    </ScrollView>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  LogoContainer: {
    alignItems: 'center',
  },
  
  subContainer: {
    marginHorizontal: 24,
  },
  signInContainer: {
    marginVertical: 16,
  },
  textInputContainer: {
    marginVertical: 8,
  },
  HeaderTitle: {
    marginTop: 18,
    fontSize: 32,
    color: '#000000',
    fontWeight: 700,
    lineHeight: 48,
  },
  HeaderSubTitle: {
    marginTop: 18,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.42)',
    fontWeight: 500,
    lineHeight: 24,
  },
  logoStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  inputTextLabel: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 21,
  },
  inputFieldContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#808080',
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  phoneIcon: {
    marginLeft: 5,
  },
  signInButton: {
    alignItems: 'center',
    backgroundColor: '#A3CFFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#94C7FF',
    borderRadius: 32,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginVertical: 24,
    elevation: 5,
    shadowColor: '#A3CFFF66',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  signInBtnText: {
    fontSize: 24,
    color: '#092A4D',
    textAlign: 'center',
    fontWeight: 700,
  },
  bgGray: {
    backgroundColor: '#d3d3d3',
    borderWidth: 1,
    borderColor: '#808080',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  agreeText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  conditionsText: {
    color: '#0000007D',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  haveAccText: {
    color: '#000000B2',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: 25,
  },
  signInLink: {
    bottom: 50,
  },
  signInLinkText: {
    color: '#000',
    fontWeight: 700,
    textDecorationLine: 'underline',
    paddingLeft: 5,
    marginBottom: -4,
  },
  policyText: {
    textAlign: 'center',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  openEyeIcon: {
    marginRight: 10,
  },
  forgotPassContainer: {
    alignItems: 'flex-end',
    textDecorationLine: 'underline',
  },
  forgotPassText: {
    color: '#000000',
    fontWeight: 500,
    textDecorationLine: 'underline',
    paddingLeft: 5,
    marginBottom: -4,
    textAlign: 'center',
  },
  hrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 20,
  },
  hrLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#A3CFFF',
    marginHorizontal: 20,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15,
    color: '#666161',
    paddingHorizontal: 6,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightblue',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  IconStyles: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
  },
  bottomLeftAbsImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    bottom: -30,
  },
});
