import React from 'react';
import {Image, StyleSheet,ScrollView} from 'react-native';

const SplashScreen = () => {
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
      <Image
          source={require('../../assets/images/LargeLogo.png')}
          style={styles.LogoStyles}
        />
           <Image
          source={require('../../assets/images/LogoBottomRight.png')}
          style={styles.bottomRightAbsImg}
        />
    </ScrollView>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
        alignItems: 'center',
    justifyContent:'center',
  },
  LogoStyles: {
    width: 421,
    height: 309,
    resizeMode: 'contain',
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
  bottomRightAbsImg: {
    width: 350,
    height: 300,
    resizeMode: 'contain',
    position:'absolute',
    right:-20,
    bottom:-10,
  },

});
