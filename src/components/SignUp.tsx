import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const SignUp = () => {
  const [check, setCheck] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageRef, setErrorMessageRef] = useState('');

  const navigation = useNavigation();

  const validateFields = () => {
    if (!name || !phone || !password || !check) {
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

  const registrationHandleAuthentication = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const registrationPostApi = 'https://tor.appdevelopers.mobi/api/register';
      const data = {
        name,
        phone,
        password,
      };

      const response = await axios.post(registrationPostApi, data);
      console.log(
        'registrationPostApi_Response===>',
        JSON.stringify(response, null, 2),
      );

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        setPhone('');
        setName('');
        setPassword('');
        setCheck(false);
        setErrorMessageRef('');
        navigation.navigate('SignIn');
      } else {
        console.error('Registration failed:', response.data);
        setErrorMessageRef('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <ScrollView style={[styles.mainContainer]}>
      <Image
        source={require('../../assets/images/SignUpBottomRight.png')}
        style={styles.bottomRightAbsImg}
      />
      <View style={[styles.LogoContainer]}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logoStyle}
        />
      </View>
      <View style={[styles.subContainer]}>
        <View style={[styles.signupContainer]}>
          <Text style={[styles.HeaderTitle]}>Sign Up</Text>
          <Text style={[styles.HeaderSubTitle]}>
            Fill in the below form and add life to your car!
          </Text>
        </View>
        {errorMessageRef && (
          <Text style={[styles.errorStyle]}>{errorMessageRef}</Text>
        )}
        <View style={[styles.textInputContainer]}>
          <Text style={[styles.inputTextLabel]}>Name</Text>
          <View style={[styles.inputFieldContainer]}>
            <Feather name="user" size={24} color="#808080" />
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              onChangeText={setName}
              value={name}
            />
          </View>
        </View>
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
              placeholder="Enter your password"
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

        <View style={[styles.termsContainer]}>
          <TouchableOpacity style={[]} onPress={() => setCheck(!check)}>
            <MaterialIcons
              name={check ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color="#9B9797"
            />
          </TouchableOpacity>
          <Text style={[styles.agreeText]}>Agree with</Text>
          <Text style={[styles.conditionsText]}>Terms & Conditions</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.signUpButton,
            (!name || !phone || !password || !check) && styles.bgGray,
          ]}
          onPress={registrationHandleAuthentication}>
          <Text style={[styles.signUpBtnText]}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={[styles.haveAccText]}>
          Àlready have an account?
          {
            <TouchableOpacity
              style={[styles.signUpLink]}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={[styles.signUpLinkText]}>Sign In</Text>
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
export default SignUp;
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
  signupContainer: {
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
    lineHeight: 20,
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
  signUpButton: {
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
  signUpBtnText: {
    fontSize: 20,
    color: '#092A4D',
    textAlign: 'center',
    fontWeight: 700,
    lineHeight: 30,
  },
  bgGray: {
    backgroundColor: '#d3d3d3',
    borderWidth: 1,
    borderColor: '#808080',
  },
  termsContainer: {
    flexDirection: 'row',
    marginTop: 8,
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
  },
  signUpLink: {
    bottom: 50,
  },
  signUpLinkText: {
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
  bottomRightAbsImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    bottom: -30,
  },
  checkBoxStyles: {
    // marginTop:3,
    // marginHorizontal:5,
  },
  openEyeIcon: {
    marginRight: 10,
  },
  errorStyle: {
    color: 'red',
    marginVertical: 10,
  },
});
