import { api } from '../../api/api';
import md5 from 'md5';

export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const loginUserThunk = (credentials, rememberMe) => async (dispatch) => {
  const response = await api.post('/login', credentials);
  const data = response.data;

  const emailClean = credentials.email.trim().toLowerCase();
  const hash = md5(emailClean);
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

  const userData = {
    ...data,
    avatar: gravatarUrl,
  };

  dispatch(setUser(userData));
  api.defaults.headers.common['Authorization'] = data.token;

  if (rememberMe) {
    localStorage.setItem('token', data.token);
  }

  return userData;
};
