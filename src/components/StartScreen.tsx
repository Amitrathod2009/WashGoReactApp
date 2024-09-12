import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const StartScreen = () => {

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.mainContainer]}>
       <Image
          source={require('../../assets/images/WelcomeTopLeft.png')}
          style={styles.WelcomeTopLeftImg}
        />
        <Image
          source={require('../../assets/images/WelcomeTopRight.png')}
          style={styles.WelcomeTopRightImg}
        />
      <View style={[styles.LogoContainer]}>
        <Image
          source={require('../../assets/images/LargeLogo.png')}
          style={styles.LogoStyles}
        />
        <View style={[styles.usernameContainer]}>
          <Text style={[styles.usernameText]}>Sparkle & Shine  Transform {'\n'}
          Your Drive with Every Wash!</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.welcomeButton}  onPress={() => {
                navigation.navigate('SignIn');
              }}>
        <Text style={[styles.welcomeBtnText]}>Let’s Start</Text>
      </TouchableOpacity>
      <Text style={[styles.haveAccText]}>
          Àlready have an account?
          {
            <TouchableOpacity style={[styles.signUpLink]}>
              <Text style={[styles.signUpLinkText]}>Sign in</Text>
            </TouchableOpacity>
          }
        </Text>
    </ScrollView>
  );
};
export default StartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  LogoStyles: {
    width: 382,
    height: 280,
    resizeMode: 'contain',
    marginTop:200,
  },
  usernameContainer: {
    marginVertical: 50,
  },
  usernameText: {
    color: '#808080',
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
  },
  welcomeButton: {
    alignItems: 'center',
    backgroundColor: '#A3CFFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#94C7FF',
    borderRadius: 32,
    marginHorizontal: 24,
    marginVertical:24,
    paddingVertical: 16,
    elevation: 5,
    shadowColor: '#A3CFFF66',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  welcomeBtnText: {
    fontSize: 20,
    color: '#092A4D',
    textAlign: 'center',
    fontWeight: 700,
  },
  haveAccText: {
    color: '#000000B2',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom:20,
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
  WelcomeTopLeftImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position:'absolute',
    left:-15,
    top:0,
  },
  WelcomeTopRightImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position:'absolute',
    right:-30,
    top:0,
  },
});
