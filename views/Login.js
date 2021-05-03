import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {Button, Input, Text} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, postRegister, useRegister} from '../hooks/fetchGQL';
import {Alert} from 'react-native';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [oldUser, setOldUser] = useState(true);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const {postLogin} = useLogin(inputs);
  const {postRegister} = useRegister(inputs);

  const handleInputChange = (name, text) => {
    console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const logIn = async (inputs) => {
    try {
      const userData = await postLogin(inputs);
      console.log(userData);
      if (userData === null) {
        Alert.alert('Incorrect credentials');
      }
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
  const register = async (inputs) => {
    try {
      const userData = await postRegister(inputs);
      if (userData) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, []);
  return (
    <View style={{margin: 20}}>
      {oldUser ? (
        <>
          <Input
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={(txt) => handleInputChange('username', txt)}
          ></Input>
          <Input
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(txt) => handleInputChange('password', txt)}
            secureTextEntry
          ></Input>
          <Button title="Login" onPress={() => logIn()}></Button>
          <Text
            style={{textAlign: 'center', margin: 20}}
            onPress={() => setOldUser(false)}
          >
            New user, register here
          </Text>
        </>
      ) : (
        <>
          <Input
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={(txt) => handleInputChange('username', txt)}
          ></Input>
          <Input
            autoCapitalize="none"
            placeholder="Full name"
            onChangeText={(txt) => handleInputChange('full_name', txt)}
          ></Input>
          <Input
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(txt) => handleInputChange('password', txt)}
            secureTextEntry
          ></Input>
          <Button
            title="Register a new user"
            onPress={() => register()}
          ></Button>
          <Text
            style={{textAlign: 'center', margin: 20}}
            onPress={() => setOldUser(true)}
          >
            Already have an account? Login here
          </Text>
        </>
      )}
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
