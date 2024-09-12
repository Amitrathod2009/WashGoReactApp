import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName } = route.params || {};
  console.log("username++++",userName)

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      console.log('User logged-out');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error while logout:', error);
    }
  };
  return (
    <View style={[styles.mainContainer]}>
      <View style={[styles.LogoContainer]}>
        <Image
          source={require('../../src/assets/images/Logo.png')}
          style={styles.image}
        />
        <View style={[styles.usernameContainer]}>
          <Text style={[styles.usernameText]}> {userName ? userName : 'Guest'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.welcomeButton} onPress={handleLogout}>
        <Text style={[styles.welcomeBtnText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  usernameContainer: {
    marginVertical: 50,
  },
  usernameText: {
    color: '#000000',
    fontSize: 32,
    fontWeight: 700,
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
    marginVertical: 50,
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
});
