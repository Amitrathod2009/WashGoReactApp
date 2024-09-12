import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.mainContainer]}>
      <View style={[styles.LogoContainer]}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.image}
        />
        <View style={[styles.usernameContainer]}>
          <Text style={[styles.usernameText]}>Amit Rathod</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.welcomeButton}  onPress={() => {
              navigation.navigate('SignIn');
            }}>
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
