import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {Button, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/fetchGQL';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, setInputs} = useState({
    username: '',
    password: '',
  });
  const {postLogin} = useLogin();

  const logIn = async () => {
    try {
      const userData = await postLogin();
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
        placeholder="Username"
        onEndEditing={(text) => setInputs({username: text})}
      ></Input>
      <Input
        placeholder="Password"
        onEndEditing={(text) => setInputs({password: text})}
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
