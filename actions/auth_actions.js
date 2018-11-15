import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
} from './types';

const FB_TOKEN_KEY = 'fb_token';

const doFacebookLogin = async (dispatch) => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('1140688302753563', {
    permissions: ['public_profile'],
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem(FB_TOKEN_KEY, token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });

  return null;
};

export const facebookLogin = () => async (dispatch) => {
  const token = await AsyncStorage.getItem(FB_TOKEN_KEY);
  if (token) {
    // dispatch fb login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // start up FB login process
    doFacebookLogin(dispatch);
  }
};
