import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {Button, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/fetchGQL';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const {postLogin} = useLogin(inputs);

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
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
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
    <View>
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
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
